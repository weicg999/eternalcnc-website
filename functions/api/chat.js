/**
 * Cloudflare Pages Function - 智能客服 API 网关（第三层优化：质量校验 + 自动重试）
 *
 * 功能：
 * - 接收前端聊天请求，转发给扣子 Open API
 * - 支持流式响应（SSE），逐字返回给前端
 * - 频率限制（同一 IP 每分钟 30 条）
 * - 域名白名单校验
 * - 会话隔离（基于 conversation_id）
 * - 访客信息预收集：语言/来源/当前页面/页面分类
 * - 首条消息附带上下文，让 Bot 知道用户在浏览什么
 * - 【新增】回复质量校验：语言一致性 + 禁词检测，失败自动重试
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
const RATE_LIMIT_MAX = 30; // 每分钟最多请求数
const RATE_LIMIT_WINDOW = 60 * 1000; // 时间窗口（毫秒）
const MAX_RETRY_COUNT = 1; // 质量校验失败最大重试次数

// 扣子配置（写死，绕过Cloudflare环境变量读取问题）
const COZE_PAT = 'pat_rqNvQTy7enkEsB5jFOi8VGYnY4xVe5QT8HbhDDWg1RuUqkEHa7y1egk012SZWfox';
const COZE_BOT_ID = '7677859860893040694';

// 允许的来源域名
const ALLOWED_ORIGINS = [
  'https://eternalcnc.com',
  'https://www.eternalcnc.com',
  'https://eternalcnc-website.pages.dev',
];

// 本地开发环境也允许
const ALLOWED_LOCAL = /^http:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0):\d+$/;

// ========== 质量校验配置 ==========
// 禁止出现的句式（中英文都列，检测到就重试）
const FORBIDDEN_PATTERNS = [
  // 复读机核心禁句
  /什么类型的零件/,
  /what type of (parts|part|components|component)/i,
  /what kind of (parts|part|components|component)/i,
  /what (parts|part) do you need/i,
  /milling parts, turning parts.*combination/i,
  /铣削件.*车削件.*多种工艺/,
  // 敏感词铁律
  /CMM/i,
  /三坐标/,
  /SPC/i,
  /统计过程控制/,
  /precision aerospace/i,
  /零累积误差/,
  // 医疗植入
  /implant/i,
  /植入/,
];

// ========== 频率限制（内存级，单 Worker 实例有效） ==========
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

  if (timestamps.length >= RATE_LIMIT_MAX) {
    return false;
  }

  timestamps.push(now);
  return true;
}

// ========== 工具函数 ==========
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
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(origin),
    },
  });
}

// ========== 语言检测 ==========
/**
 * 检测文本主要语言，返回 'zh' 或 'en'
 * 基于中文字符占比判断
 */
function detectLanguage(text) {
  if (!text) return 'en';
  const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
  const chineseCount = chineseChars ? chineseChars.length : 0;
  const totalChars = text.replace(/\s/g, '').length;
  if (totalChars === 0) return 'en';
  // 中文字符占比超过15%认为是中文
  return (chineseCount / totalChars) > 0.15 ? 'zh' : 'en';
}

// ========== 质量校验 ==========
/**
 * 校验回复质量
 * @returns {{ valid: boolean, reason: string }}
 */
function validateReply(userMessage, replyContent) {
  if (!replyContent || replyContent.trim().length < 2) {
    return { valid: false, reason: 'empty_reply' };
  }

  // 1. 禁词检测
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(replyContent)) {
      return { valid: false, reason: 'forbidden_pattern: ' + pattern.toString().slice(0, 50) };
    }
  }

  // 2. 语言一致性检测
  const userLang = detectLanguage(userMessage);
  const replyLang = detectLanguage(replyContent);
  if (userLang !== replyLang) {
    return { valid: false, reason: `language_mismatch: user=${userLang}, reply=${replyLang}` };
  }

  return { valid: true, reason: 'ok' };
}

/**
 * 生成重试时的强化提示词
 * 把用户原始消息包裹在强指令里，迫使模型遵守规则
 */
function buildRetryMessage(originalMessage, failureReason, userLang) {
  const langInstruction = userLang === 'zh'
    ? '【严重警告：你必须用中文回复！绝对不可以说英文！】'
    : '【CRITICAL: YOU MUST REPLY IN ENGLISH ONLY! DO NOT USE ANY CHINESE!】';

  const forbiddenInstruction = userLang === 'zh'
    ? '【严重警告：绝对禁止询问"什么类型的零件"、"铣削件还是车削件"这类问题！用户问什么就直接回答什么，不要反问加工类型！】'
    : '【CRITICAL: NEVER ask "what type of parts", "milling or turning" or similar questions! Answer the user\'s question directly. Do NOT ask about part types!】';

  const directAnswer = userLang === 'zh'
    ? '【规则：直接回答用户的问题，不要反问，不要引导，不要收集信息。用户问什么答什么。】'
    : '【RULE: Answer the user\'s question directly. Do NOT ask follow-up questions. Do NOT try to collect information. Just answer what they asked.】';

  return langInstruction + '\n' + forbiddenInstruction + '\n' + directAnswer + '\n\n用户问题：\n' + originalMessage;
}

// ========== 上下文构建 ==========
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

  if (language) {
    parts.push(`- 访客浏览器语言: ${language}（请使用该语言回复）`);
  }
  if (current_page) {
    parts.push(`- 访客当前浏览页面: ${current_page}`);
  }
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
      if (referrer.length < 100) {
        parts.push(`- 访客来源: ${referrer}`);
      }
    }
  }
  if (screen_size) {
    parts.push(`- 访客屏幕尺寸: ${screen_size}`);
  }

  parts.push('【上下文结束 - 用户真实消息如下】');

  return parts.join('\n') + '\n\n';
}

// ========== 扣子 API 调用 ==========
async function callCoze({ message, userId, conversationId, pat, botId, customVariables }) {
  const requestBody = {
    bot_id: botId,
    user: userId,
    query: message,
    stream: false, // 非流式，便于质量校验
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

  // 提取回复内容（兼容 v2/v3 格式）
  let content = '';
  let newConversationId = conversationId;

  if (data.messages) {
    // v2 格式
    const answerMsg = data.messages.find(m => m.type === 'answer' && m.content_type === 'text');
    if (answerMsg) content = answerMsg.content;
    if (data.conversation_id) newConversationId = data.conversation_id;
  } else if (data.data) {
    // v3 格式
    if (data.data.content) content = data.data.content;
    if (data.data.conversation_id) newConversationId = data.data.conversation_id;
  }

  return { content, conversationId: newConversationId };
}

// ========== 流式输出给前端（模拟流式效果） ==========
function createSseStream(fullContent, conversationId) {
  const encoder = new TextEncoder();
  let index = 0;
  const chunkSize = 3; // 每次输出几个字符，模拟打字效果

  const stream = new ReadableStream({
    start(controller) {
      // 先发 conversation_id 事件
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event: 'conversation', conversation_id: conversationId })}\n\n`));

      // 按字符拆分输出，模拟流式
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
      }, 30); // 每30ms输出一块
    },
  });

  return stream;
}

// ========== 主处理函数 ==========
export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get('origin') || '';

  // 1. 来源校验
  if (origin && !isOriginAllowed(origin)) {
    return jsonResponse(403, { code: 403, msg: 'Origin not allowed' }, origin);
  }

  // 2. 频率限制
  const clientIp = getClientIp(request);
  if (!checkRateLimit(clientIp)) {
    return jsonResponse(429, { code: 429, msg: 'Rate limit exceeded. Please try again later.' }, origin);
  }

  // 3. 环境变量检查
  const pat = env.COZE_PAT || COZE_PAT;
  const botId = env.COZE_BOT_ID || COZE_BOT_ID;
  if (!pat || !botId) {
    return jsonResponse(500, { code: 500, msg: 'Server configuration error' }, origin);
  }

  // 4. 解析请求体
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

  // 5. 构建最终消息（首条消息加上下文）
  let finalMessage = message;
  let customVariables = null;

  try {
    if (isFirstMessage && visitorInfo) {
      const contextPrefix = buildContextPrefix(visitorInfo);
      if (contextPrefix) {
        finalMessage = contextPrefix + message;
      }
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

  // 6. 调用扣子 API + 质量校验 + 自动重试
  try {
    let result = null;
    let currentMessage = finalMessage;
    let currentConvId = conversationId || undefined;
    let retryCount = 0;

    while (retryCount <= MAX_RETRY_COUNT) {
      result = await callCoze({
        message: currentMessage,
        userId,
        conversationId: currentConvId,
        pat,
        botId,
        customVariables: retryCount > 0 ? null : customVariables, // 重试时不传 customVariables 避免干扰
      });

      // 用用户原始消息做语言校验（去掉上下文前缀）
      const validation = validateReply(message, result.content);

      if (validation.valid) {
        break;
      }

      // 校验失败，准备重试
      retryCount++;
      if (retryCount > MAX_RETRY_COUNT) {
        // 超过最大重试次数，用最后一次的结果（总比报错好）
        console.warn('Quality check failed after retries:', validation.reason);
        break;
      }

      console.log('Quality check failed, retrying:', validation.reason);

      // 构建强化版重试消息
      const userLang = detectLanguage(message);
      currentMessage = buildRetryMessage(message, validation.reason, userLang);
      // 重试时使用新的 conversation_id 避免历史干扰
      currentConvId = undefined;
    }

    // 7. 流式输出给前端（模拟打字效果）
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

// OPTIONS 请求（CORS 预检）
export async function onRequestOptions(context) {
  const { request } = context;
  const origin = request.headers.get('origin') || '';
  return new Response(null, {
    status: 204,
    headers: corsHeaders(origin),
  });
}
