/**
 * Cloudflare Pages Function - 智能客服 API 网关（第四层优化：全链路质量校验 + 自动重试）
 *
 * 功能：
 * - 接收前端聊天请求，转发给扣子 Open API
 * - 支持流式响应（SSE），逐字返回给前端
 * - 频率限制（同一 IP 每分钟 30 条）
 * - 域名白名单校验
 * - 会话隔离（基于 conversation_id）
 * - 访客信息预收集：语言/来源/当前页面/页面分类
 * - 首条消息附带上下文，让 Bot 知道用户在浏览什么
 * - 回复质量校验：禁词检测 + 语言一致性 + 核心事实反向校验 + 自动重试
 *
 * 环境变量：
 * - COZE_PAT: 扣子 Personal Access Token
 * - COZE_BOT_ID: 扣子 Bot ID
 *
 * 部署到 Cloudflare Pages Functions: /functions/api/chat.js
 * 访问路径: POST /api/chat
 */

// ========== 配置 ==========
const COZE_API_ENDPOINT = 'https://api.coze.cn/open_api/v2/chat';
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_RETRY_COUNT = 2; // 质量校验失败最多重试2次

const COZE_PAT = 'pat_rqNvQTy7enkEsB5jFOi8VGYnY4xVe5QT8HbhDDWg1RuUqkEHa7y1egk012SZWfox';
const COZE_BOT_ID = '7677859860893040694';

const ALLOWED_ORIGINS = [
  'https://eternalcnc.com',
  'https://www.eternalcnc.com',
  'https://eternalcnc-website.pages.dev',
];

const ALLOWED_LOCAL = /^http:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0):\d+$/;

// ========== 质量校验规则 ==========

// 1. 禁用句式（出现即不合格，必须重试）
const FORBIDDEN_PATTERNS = [
  // 复读机核心禁句
  /什么类型的零件/,
  /what type of (parts|part|components|component|product|products)/i,
  /what kind of (parts|part|components|component)/i,
  /what (parts|part) do you need/i,
  /milling (parts|part).*turning.*combination/i,
  /铣削件.*车削件.*多种工艺/,
  /铣削.*车削.*磨削.*线切割.*多种组合/,
  // 敏感词铁律
  /\bCMM\b/i,
  /三坐标/,
  /\bSPC\b/,
  /统计过程控制/,
  /precision aerospace/i,
  /零累积误差/,
  // 医疗植入
  /implant/i,
  /植入/,
  // 越界能力
  /注塑|injection mold/i,
  /3D打印|3d print/i,
  /钣金|sheet metal/i,
  /激光切割|laser cut/i,
  /冲压|stamp/i,
  /铸造|cast(ing)?/i,
];

// 2. 核心事实反向校验（检测到错误数字/事实就重试）
// 规则：{ pattern: 正则, test: 检测到就触发失败的内容 }
const FACT_VIOLATIONS = [
  // 设备数量错误（不能说70台、50台、10台等离谱数字）
  { pattern: /(\d{2,3})\s*(?:台|sets? of|machines?|equipments?|production|testing equipment)/i,
    test: (match) => {
      const num = parseInt(match[1]);
      // 正确范围是30左右，20-40之间算合理，超出就触发
      return num < 20 || num > 40;
    },
    reason: 'wrong_machine_count'
  },
  // 公司年限错误（不能说8年、5年、20年等）
  { pattern: /(\d{1,2})\s*(?:年|years?)(?:of|的)?\s*(?:经验|experience|in CNC|history)/i,
    test: (match) => {
      const num = parseInt(match[1]);
      // 正确是15+年，12-18之间算合理
      return num < 12 || num > 20;
    },
    reason: 'wrong_years_experience'
  },
  // 成立年份错误
  { pattern: /(?:established|founded|set up|成立).*(20\d{2})/i,
    test: (match) => {
      const year = parseInt(match[1]);
      return year !== 2009;
    },
    reason: 'wrong_founding_year'
  },
  // ISO 9001已认证错误
  { pattern: /ISO 9001[^。.!?\n]*(?:certified|certification\s+is\s+complete|已认证|通过认证)/i,
    test: () => true,
    reason: 'iso_certified_claim'
  },
  // 常规公差±0.01错误（常规应该是±0.05，精密级才是±0.01）
  { pattern: /(?:standard|general|regular|常规|一般|普通)[^。.!?\n]*?(±\s*0\.01|0\.01\s*mm|0\.01\s*毫米)/i,
    test: () => true,
    reason: 'wrong_standard_tolerance'
  },
  // 交期错误（不能说3-15天这种生产交期，报价交期是24h/1-2天）
  { pattern: /(?:standard|general|regular|lead time|delivery time|交期|交付)[^。.!?\n]*(?:3[-\s~]*15|5[-\s~]*10|7[-\s~]*14|7\s*[-~]\s*15)\s*(?:days?|工作日|天)/i,
    test: () => true,
    reason: 'wrong_lead_time'
  },
];

const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  let timestamps = rateLimitMap.get(ip);
  if (!timestamps) {
    timestamps = [];
    rateLimitMap.set(ip, timestamps);
  }
  timestamps = timestamps.filter(t => t > windowStart);
  rateLimitMap.set(ip, timestamps);
  if (timestamps.length >= RATE_LIMIT_MAX) return false;
  timestamps.push(now);
  return true;
}

function getClientIp(request) {
  return request.headers.get('cf-connecting-ip')
    || request.headers.get('x-forwarded-for')?.split(',')[0].trim()
    || 'unknown';
}

function isOriginAllowed(origin) {
  if (!origin) return false;
  if (ALLOWED_LOCAL.test(origin)) return true;
  return ALLOWED_ORIGINS.includes(origin);
}

function corsHeaders(origin) {
  const allowed = isOriginAllowed(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function jsonResponse(status, data, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...corsHeaders(origin) },
  });
}

function detectLanguage(text) {
  if (!text) return 'en';
  const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
  const chineseCount = chineseChars ? chineseChars.length : 0;
  const totalChars = text.replace(/\s/g, '').length;
  if (totalChars === 0) return 'en';
  return (chineseCount / totalChars) > 0.15 ? 'zh' : 'en';
}

function validateReply(userMessage, replyContent) {
  if (!replyContent || replyContent.trim().length < 2) {
    return { valid: false, reason: 'empty_reply' };
  }

  // 1. 禁词检测
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(replyContent)) {
      return { valid: false, reason: 'forbidden_pattern' };
    }
  }

  // 2. 语言一致性检测
  const userLang = detectLanguage(userMessage);
  const replyLang = detectLanguage(replyContent);
  if (userLang !== replyLang) {
    return { valid: false, reason: `language_mismatch: user=${userLang}, reply=${replyLang}` };
  }

  // 3. 核心事实反向校验
  for (const rule of FACT_VIOLATIONS) {
    const match = replyContent.match(rule.pattern);
    if (match && rule.test(match)) {
      return { valid: false, reason: rule.reason };
    }
  }

  return { valid: true, reason: 'ok' };
}

function buildRetryMessage(originalMessage, failureReason, userLang, retryCount) {
  const parts = [];

  // 语言强制
  if (userLang === 'zh') {
    parts.push('【最高优先级指令：你必须用纯中文回复，不能夹杂任何英文单词！违反将不合格。】');
  } else {
    parts.push('【TOP PRIORITY: REPLY IN PURE ENGLISH ONLY! NO CHINESE CHARACTERS AT ALL.】');
  }

  // 禁问引导
  if (failureReason === 'forbidden_pattern') {
    if (userLang === 'zh') {
      parts.push('【绝对禁令：绝对不允许问"请问您需要加工什么类型的零件"这类问题！用户问什么就直接回答什么，回答完就结束，不要追加引导性问题。】');
    } else {
      parts.push('【ABSOLUTE BAN: NEVER ask "what type of parts" or similar questions! Answer the user question directly and do NOT add guiding questions at the end.】');
    }
  }

  // 事实纠正（针对不同错误类型强化）
  if (failureReason === 'wrong_machine_count') {
    if (userLang === 'zh') {
      parts.push('【事实校验：我们有30余台CNC设备。严禁说70台、50台、10台等任何错误数字。】');
    } else {
      parts.push('【FACT CHECK: We have over 30 CNC machines. NEVER say 70, 50, 10 or any wrong number.】');
    }
  }
  if (failureReason === 'wrong_years_experience') {
    if (userLang === 'zh') {
      parts.push('【事实校验：公司2009年成立，15年+CNC经验。严禁说8年、5年、20年等错误年限。】');
    } else {
      parts.push('【FACT CHECK: Founded in 2009, 15+ years of CNC experience. NEVER say 8, 5, 20 years.】');
    }
  }
  if (failureReason === 'wrong_standard_tolerance') {
    if (userLang === 'zh') {
      parts.push('【事实校验：常规CNC公差±0.05mm，精密级±0.01mm，磨削/线切割最高±0.005mm。严禁说常规公差是±0.01mm。】');
    } else {
      parts.push('【FACT CHECK: Standard CNC tolerance is ±0.05mm (ISO 2768-m), precision grade ±0.01mm, grinding/wire EDM up to ±0.005mm. NEVER say standard tolerance is ±0.01mm.】');
    }
  }
  if (failureReason === 'wrong_lead_time') {
    if (userLang === 'zh') {
      parts.push('【事实校验：报价时效——常规零件24小时内出报价，复杂件1-2个工作日。严禁说3-15天这种生产交期。】');
    } else {
      parts.push('【FACT CHECK: Quotation lead time — standard parts within 24 hours, complex parts 1-2 business days. NEVER say 3-15 days for quotation.】');
    }
  }
  if (failureReason === 'iso_certified_claim') {
    if (userLang === 'zh') {
      parts.push('【事实校验：ISO 9001正在认证中，只能说"认证中"，绝对不能说已认证。】');
    } else {
      parts.push('【FACT CHECK: ISO 9001 certification is IN PROGRESS. Only say "in process" or "pending". NEVER say "certified".】');
    }
  }

  // 通用事实铁律
  if (userLang === 'zh') {
    parts.push('【通用铁律：所有事实性数据必须严格准确，严禁编造数字和信息。不确定的就说"需要工程师确认"。】');
  } else {
    parts.push('【GENERAL RULE: All factual data must be strictly accurate. NEVER invent numbers or information. If unsure, say "our engineer will confirm".】');
  }

  parts.push('');
  parts.push('用户问题：');
  parts.push(originalMessage);

  return parts.join('\n');
}

function buildContextPrefix(visitorInfo) {
  if (!visitorInfo || typeof visitorInfo !== 'object') return '';

  const {
    language = '',
    referrer = '',
    current_page = '',
    page_category = '',
    page_category_en = '',
    screen_size = '',
  } = visitorInfo;

  const parts = [];
  parts.push('【系统上下文 - 以下是访客浏览信息，请根据这些信息用恰当的语言回复用户，不要提及你看到了这些系统信息】');
  if (language) parts.push(`- 访客浏览器语言: ${language}（请使用该语言回复）`);
  if (current_page) parts.push(`- 访客当前浏览页面: ${current_page}`);
  if (page_category || page_category_en) {
    const cat = page_category && page_category_en
      ? `${page_category} / ${page_category_en}`
      : (page_category || page_category_en);
    parts.push(`- 页面内容分类: ${cat}`);
  }
  if (referrer) {
    try {
      const refUrl = new URL(referrer);
      parts.push(`- 访客来源网站: ${refUrl.hostname}`);
    } catch (e) {
      if (referrer.length < 100) parts.push(`- 访客来源: ${referrer}`);
    }
  }
  if (screen_size) parts.push(`- 访客屏幕尺寸: ${screen_size}`);
  parts.push('【上下文结束 - 用户真实消息如下】');
  return parts.join('\n') + '\n\n';
}

async function callCoze({ message, userId, conversationId, pat, botId, customVariables }) {
  const requestBody = {
    bot_id: botId,
    user: userId,
    query: message,
    stream: false,
    conversation_id: conversationId,
  };
  if (customVariables && Object.keys(customVariables).length > 0) {
    requestBody.custom_variables = customVariables;
  }

  const response = await fetch(COZE_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${pat}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`Coze API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  let content = '';
  let newConversationId = conversationId;

  if (data.messages) {
    const answerMsg = data.messages.find(m => m.type === 'answer' && m.content_type === 'text');
    if (answerMsg) content = answerMsg.content;
    if (data.conversation_id) newConversationId = data.conversation_id;
  } else if (data.data) {
    if (data.data.content) content = data.data.content;
    if (data.data.conversation_id) newConversationId = data.data.conversation_id;
  }

  return { content, conversationId: newConversationId };
}

function createSseStream(fullContent, conversationId) {
  const encoder = new TextEncoder();
  let index = 0;
  const chunkSize = 3;

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event: 'conversation', conversation_id: conversationId })}\n\n`));

      const interval = setInterval(() => {
        if (index >= fullContent.length) {
          clearInterval(interval);
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
          return;
        }
        const chunk = fullContent.slice(index, index + chunkSize);
        index += chunkSize;
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event: 'message', message: { content: chunk } })}\n\n`));
      }, 30);
    },
  });

  return stream;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get('origin') || '';

  if (origin && !isOriginAllowed(origin)) {
    return jsonResponse(403, { code: 403, msg: 'Origin not allowed' }, origin);
  }

  const clientIp = getClientIp(request);
  if (!checkRateLimit(clientIp)) {
    return jsonResponse(429, { code: 429, msg: 'Rate limit exceeded' }, origin);
  }

  const pat = env.COZE_PAT || COZE_PAT;
  const botId = env.COZE_BOT_ID || COZE_BOT_ID;
  if (!pat || !botId) {
    return jsonResponse(500, { code: 500, msg: 'Server configuration error' }, origin);
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonResponse(400, { code: 400, msg: 'Invalid JSON body' }, origin);
  }

  const {
    message,
    user_id: userId,
    conversation_id: conversationId,
    visitor_info: visitorInfo,
    is_first_message: isFirstMessage,
  } = body;

  if (!message || typeof message !== 'string') {
    return jsonResponse(400, { code: 400, msg: 'Invalid message parameter' }, origin);
  }
  if (!userId || typeof userId !== 'string') {
    return jsonResponse(400, { code: 400, msg: 'Invalid user_id parameter' }, origin);
  }
  if (message.length > 4000) {
    return jsonResponse(400, { code: 400, msg: 'Message too long' }, origin);
  }

  let finalMessage = message;
  let customVariables = null;

  try {
    if (isFirstMessage && visitorInfo) {
      const contextPrefix = buildContextPrefix(visitorInfo);
      if (contextPrefix) finalMessage = contextPrefix + message;
      customVariables = {
        visitor_language: visitorInfo.language || '',
        visitor_page: visitorInfo.current_page || '',
        visitor_page_category: visitorInfo.page_category || visitorInfo.page_category_en || '',
        visitor_referrer: visitorInfo.referrer || '',
      };
    }
  } catch (e) {
    finalMessage = message;
  }

  try {
    let result = null;
    let currentMessage = finalMessage;
    let currentConvId = conversationId || undefined;
    let retryCount = 0;
    let lastFailureReason = '';

    while (retryCount <= MAX_RETRY_COUNT) {
      result = await callCoze({
        message: currentMessage,
        userId,
        conversationId: currentConvId,
        pat,
        botId,
        customVariables: retryCount > 0 ? null : customVariables,
      });

      const validation = validateReply(message, result.content);

      if (validation.valid) break;

      lastFailureReason = validation.reason;
      retryCount++;

      if (retryCount > MAX_RETRY_COUNT) {
        console.warn('Quality check failed after all retries:', validation.reason);
        break;
      }

      console.log('Quality check failed (attempt ' + retryCount + '):', validation.reason);

      const userLang = detectLanguage(message);
      currentMessage = buildRetryMessage(message, validation.reason, userLang, retryCount);
      currentConvId = undefined; // 重试用新会话，避免历史干扰
    }

    const outputStream = createSseStream(result.content, result.conversationId);

    return new Response(outputStream, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
        ...corsHeaders(origin),
      },
    });

  } catch (err) {
    if (err.name === 'AbortError') {
      return jsonResponse(499, { code: 499, msg: 'Client closed request' }, origin);
    }
    console.error('Chat API error:', err);
    return jsonResponse(502, { code: 502, msg: 'Upstream service error', detail: err.message }, origin);
  }
}

export async function onRequestOptions(context) {
  const { request } = context;
  const origin = request.headers.get('origin') || '';
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
}
