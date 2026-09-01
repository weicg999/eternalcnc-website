/**
 * Cloudflare Pages Function - 智能客服 API 网关（第五层优化：客户跟进记忆 + KV 持久化）
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
 * - 客户跟进记忆：Cloudflare KV 存储客户档案，跨会话记住业务信息
 *
 * 环境变量：
 * - COZE_PAT: 扣子 Personal Access Token
 * - COZE_BOT_ID: 扣子 Bot ID
 *
 * KV 绑定（Cloudflare Pages 中绑定）：
 * - CUSTOMER_MEMORY: KV Namespace，存储客户档案
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

// KV 中存储客户档案的 key 前缀
const KV_KEY_PREFIX = 'customer:';
// 记忆 TTL（秒）：90 天无互动自动过期
const KV_TTL_SECONDS = 90 * 24 * 60 * 60;

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
  if (language) {
    const langMap = {
      'yue': '粵語（广东话/香港话）',
      'zh-hk': '粵語（广东话/香港话）',
      'zh-mo': '粵語（广东话/香港话）',
      'zh-tw': '繁體中文',
      'zh-cn': '简体中文',
      'zh': '简体中文',
      'en': 'English',
    };
    const langLabel = langMap[language.toLowerCase()] || language;
    let langTip = `- 访客语言偏好: ${langLabel}（请务必使用该语言回复）`;
    if (langLabel.indexOf('粵語') === 0) {
      langTip += '；请使用粵語（广东话）口语化回复，繁简皆可，避免书面普通话。';
    } else if (langLabel === '简体中文') {
      langTip += '；请使用简体中文回复。';
    } else if (langLabel === 'English') {
      langTip += '; please reply in English.';
    }
    parts.push(langTip);
    parts.push('- 重要指令：不要向访客询问「您想用哪种语言」，也不要声称自己仅支持某几种固定语言；请直接以上述访客语言偏好回复（若为粵語则用广东话口语，繁简皆可）。支持多语言是默认能力，无需访客手动选择。');
  }
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
  // 技术专长（双保险：定位机器人=20+年主任工程师，别把通用工程问题推给工程师）
  parts.push(
    '【技术专长与判断原则 - 你是 20+ 年 CNC 主任工程师】\n' +
    '- 通用工程知识请直接作答，不要把可答的通用问题推给「工程师确认」。例如：典型主轴径向/轴向承载区间（BT40/BT50/HSK 各规格在典型 RPM 下用面铣刀/钻头的范围，参考同级别通用规格）、不同材料可达公差与粗糙度、Vc/fz/ap/F 常规取值与材料-刀具-机床闭环思路、装夹/对刀/撞刀预防/余量分配/热变形对策、典型检测方式适用场景与精度。\n' +
    '- 回答方式：给出「典型值/区间 + 依据（通用经验/同级别规格/标准做法）」，明确标注「典型 / 一般范围 / 视具体机床与工况而定」，并补一句「精确参数需以我们实际设备测试/您的具体图纸为准」。不要一上来就"请联系工程师"——那是客服腔，不是工程师腔。\n' +
    '- 仅以下场景推 sales@eternalcnc.com 转人工：我们公司具体某一台机床的出厂测试证书/校准数据/验收报告；客户图纸对应的正式报价与交期承诺；任何需法务/合规审批的事项。'
  );
  // 合规护栏（双保险：即使 Bot system prompt 偏弱，也在此每轮重申铁律，兜住风险）
  parts.push(
    '【合规护栏 - 必须遵守，不得违反】\n' +
    '- 资质：ISO 9001:2015 处于「贯标中/进度待确认」，任何语言下均禁用 "certified / 认证 / zertifiziert" 等已认证措辞；仅可称「按 ISO 9001 体系执行 / 推进中」。\n' +
    '- 检测设备：厂内仅有 2.5D 影像仪与精密量具；桥式三坐标(CMM)属集团共享计量中心、按需送检，不得声称「厂内 / in-house CMM」。\n' +
    '- 报告：检测报告按订单约定提供，不承诺每单默认出具完整 SPC 与 GD&T 报告。\n' +
    '- 五轴：可提及具备五轴能力，但不得过度宣称自由曲面「超高精」等无依据表述。\n' +
    '- 商务：无图纸/工艺信息不报具体单价；不泄露竞对报价与自身利润率；不提供免费设计；环保表述须真实可证，不夸大。\n' +
    '- 支付与合规：仅接受对公账户；不接受受制裁地区/实体业务；遇访客要求私人账户收款或其他合规红线，礼貌拒绝并引导转人工，不作承诺。'
  );
  parts.push('【上下文结束 - 用户真实消息如下】');
  return parts.join('\n') + '\n\n';
}

// ========== 客户记忆 (Customer Memory) ==========

/**
 * 从 KV 读取客户档案
 * @param {KVNamespace} kv - Cloudflare KV binding
 * @param {string} userId - 用户ID
 * @returns {Promise<Object>} 客户档案对象（不存在则返回默认空档案）
 */
async function getCustomerProfile(kv, userId) {
  if (!kv) return createEmptyProfile(userId);
  try {
    const key = KV_KEY_PREFIX + userId;
    const raw = await kv.get(key);
    if (raw) {
      const profile = JSON.parse(raw);
      // 确保 user_id 字段存在
      if (!profile.user_id) profile.user_id = userId;
      return profile;
    }
  } catch (e) {
    console.warn('KV read failed:', e.message);
  }
  return createEmptyProfile(userId);
}

/**
 * 写入客户档案到 KV（带 TTL）
 * @param {KVNamespace} kv - Cloudflare KV binding
 * @param {string} userId - 用户ID
 * @param {Object} profile - 档案对象
 */
async function saveCustomerProfile(kv, userId, profile) {
  if (!kv) return;
  try {
    const key = KV_KEY_PREFIX + userId;
    await kv.put(key, JSON.stringify(profile), {
      expirationTtl: KV_TTL_SECONDS,
    });
  } catch (e) {
    console.warn('KV write failed:', e.message);
  }
}

/**
 * 创建空的客户档案
 */
function createEmptyProfile(userId) {
  return {
    user_id: userId,
    company: '',
    industry: '',
    parts_interested: [],
    quote_status: '',
    concerns: [],
    has_sent_drawing: false,
    last_message: '',
    last_contact: '',
    first_contact: '',
    language: 'en',
    contact_email: '',
    notes: '',
  };
}

/**
 * 将客户档案转为 Bot 可理解的背景信息文本
 * 自然融入，不刻意提及"我记得"
 */
function buildCustomerProfileContext(profile, lang) {
  if (!profile) return '';

  const hasInfo = profile.company || profile.industry ||
    (profile.parts_interested && profile.parts_interested.length > 0) ||
    profile.quote_status ||
    (profile.concerns && profile.concerns.length > 0) ||
    profile.has_sent_drawing ||
    profile.contact_email;

  if (!hasInfo) return '';

  const isZh = (lang === 'zh' || lang === 'yue' || (typeof lang === 'string' && lang.indexOf('zh') === 0));
  const lines = [];

  if (isZh) {
    lines.push('【客户背景信息 - 以下是该客户之前沟通中了解到的信息，请自然融入对话使用，不要说"根据我们的记录""我记得您之前"之类的话】');
    if (profile.company) lines.push(`- 公司: ${profile.company}`);
    if (profile.industry) lines.push(`- 行业: ${profile.industry}`);
    if (profile.parts_interested && profile.parts_interested.length > 0) {
      lines.push(`- 感兴趣的零件类型: ${profile.parts_interested.join(', ')}`);
    }
    if (profile.quote_status) {
      const statusMap = {
        'enquired': '已咨询',
        'quoted': '已报价',
        'follow_up': '跟进中',
        'closed': '已结束',
      };
      lines.push(`- 报价进度: ${statusMap[profile.quote_status] || profile.quote_status}`);
    }
    if (profile.concerns && profile.concerns.length > 0) {
      lines.push(`- 客户关注点: ${profile.concerns.join(', ')}`);
    }
    if (profile.has_sent_drawing) lines.push('- 客户已发送过图纸');
    if (profile.contact_email) lines.push(`- 联系邮箱: ${profile.contact_email}`);
    if (profile.notes) lines.push(`- 备注: ${profile.notes}`);
    lines.push('【背景信息结束 - 直接回复用户当前的问题，自然利用以上信息，不要提及你有客户记录】');
  } else {
    lines.push('【Customer Background — The following is what we know about this customer from previous conversations. Use it naturally. NEVER say "according to our records", "I remember you said", or anything that reveals you have stored information about them.】');
    if (profile.company) lines.push(`- Company: ${profile.company}`);
    if (profile.industry) lines.push(`- Industry: ${profile.industry}`);
    if (profile.parts_interested && profile.parts_interested.length > 0) {
      lines.push(`- Parts interested in: ${profile.parts_interested.join(', ')}`);
    }
    if (profile.quote_status) {
      lines.push(`- Quote status: ${profile.quote_status}`);
    }
    if (profile.concerns && profile.concerns.length > 0) {
      lines.push(`- Key concerns: ${profile.concerns.join(', ')}`);
    }
    if (profile.has_sent_drawing) lines.push('- Customer has sent drawings before');
    if (profile.contact_email) lines.push(`- Contact email: ${profile.contact_email}`);
    if (profile.notes) lines.push(`- Notes: ${profile.notes}`);
    lines.push('【End of background — Reply to the user\'s current message directly. Use the above info naturally, never mention that you have customer records.】');
  }

  return lines.join('\n') + '\n\n';
}

/**
 * 判断本轮对话是否需要触发信息提取（关键节点检测）
 * 只在关键节点提取，避免每轮都调 AI 浪费资源
 */
function shouldExtractInfo(userMessage, botReply, profile) {
  const msg = (userMessage || '').toLowerCase();
  const reply = (botReply || '').toLowerCase();
  const combined = msg + ' ' + reply;

  // 关键词触发：公司名
  if (/\b(company|our company|we are|we\'re|我们公司|我是|公司叫|公司名)/i.test(combined) &&
      !profile.company) {
    return true;
  }

  // 关键词触发：邮箱
  if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(combined) &&
      !profile.contact_email) {
    return true;
  }

  // 关键词触发：图纸 / drawing
  if (/\b(drawing|drawings|cad|step|stp|igs|dxf|图纸|图档|发图|看图)\b/i.test(combined) &&
      !profile.has_sent_drawing) {
    return true;
  }

  // 关键词触发：报价相关
  if (/\b(quote|quotation|price|pricing|cost|报价|价格|多少钱|费用)\b/i.test(combined)) {
    // 如果还没设置报价状态，或者状态有推进可能
    if (!profile.quote_status || profile.quote_status === 'enquired') {
      return true;
    }
  }

  // 关键词触发：行业 / 应用
  if (/\b(industry|application|used for|we make|we produce|行业|应用|用于|做什么的)\b/i.test(combined) &&
      !profile.industry) {
    return true;
  }

  // 关键词触发：零件类型
  if (/\b(housing|shaft|gear|bracket|flange|bushing|pin|plate|block|外壳|轴|齿轮|支架|法兰|衬套|销|板材|铝|不锈钢|铜|钛)\b/i.test(combined) &&
      (!profile.parts_interested || profile.parts_interested.length < 2)) {
    return true;
  }

  return false;
}

/**
 * 构建信息提取的提示词
 * 发给同一个Bot，让它从对话中提取结构化信息更新档案
 */
function buildExtractionPrompt(userMessage, botReply, profile, lang) {
  const isZh = (lang === 'zh' || lang === 'yue' || (typeof lang === 'string' && lang.indexOf('zh') === 0));
  const currentProfileJson = JSON.stringify(profile, null, 2);

  if (isZh) {
    return `【信息提取任务】
请从以下客户对话中提取关键业务信息，用于更新客户档案。

【当前档案】
${currentProfileJson}

【本轮对话】
客户说：${userMessage}

客服回复：${botReply}

【提取规则】
1. 只提取对话中明确提到的信息，不要推测或编造
2. 如果某个字段对话中没有提到新信息，保持原值不变
3. 如果客户提到了公司名，填入 company
4. 如果客户提到了行业或产品类型，填入 industry
5. 如果客户提到了感兴趣的零件类型，追加到 parts_interested 数组（去重）
6. 如果对话涉及报价，更新 quote_status（enquired=刚咨询报价 / quoted=已给出报价 / follow_up=报价后跟进中 / closed=已结束）
7. 如果客户提到了关注的重点（精度、交期、价格、质量等），追加到 concerns 数组（去重）
8. 如果客户提到已发送图纸或要发图纸，设置 has_sent_drawing 为 true
9. 如果客户留下了邮箱，填入 contact_email
10. 其他重要信息存入 notes

【输出格式】
只输出纯 JSON，不要任何其他文字、解释或 markdown 标记。JSON 结构与当前档案相同。只输出更新后的完整档案对象。`;
  } else {
    return `[INFO EXTRACTION TASK]
Extract key business information from the following customer conversation to update the customer profile.

[CURRENT PROFILE]
${currentProfileJson}

[THIS CONVERSATION]
Customer said: ${userMessage}

Support reply: ${botReply}

[EXTRACTION RULES]
1. Only extract information explicitly stated in the conversation. Do NOT guess or invent.
2. If a field has no new information, keep its current value unchanged.
3. If the customer mentioned a company name, fill "company".
4. If the customer mentioned industry or product type, fill "industry".
5. If the customer mentioned parts they are interested in, append to "parts_interested" array (deduplicate).
6. If the conversation is about quotation, update "quote_status" (enquired / quoted / follow_up / closed).
7. If the customer mentioned key concerns (precision, lead time, price, quality, etc.), append to "concerns" array (deduplicate).
8. If the customer sent or will send drawings, set "has_sent_drawing" to true.
9. If the customer left an email, fill "contact_email".
10. Other important info goes into "notes".

[OUTPUT FORMAT]
Output ONLY valid JSON. No explanations, no markdown, no extra text. The JSON structure must match the current profile exactly. Output the complete updated profile object.`;
  }
}

/**
 * 解析 AI 返回的提取结果，得到更新后的档案
 */
function parseExtractionResult(rawText, currentProfile) {
  if (!rawText) return currentProfile;

  let jsonStr = rawText.trim();

  // 去除可能的 markdown 代码块标记
  jsonStr = jsonStr.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();

  // 尝试找到第一个 { 和最后一个 }
  const firstBrace = jsonStr.indexOf('{');
  const lastBrace = jsonStr.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    jsonStr = jsonStr.substring(firstBrace, lastBrace + 1);
  }

  try {
    const parsed = JSON.parse(jsonStr);

    // 合并：以当前档案为基础，用提取结果覆盖
    const updated = { ...currentProfile, ...parsed };

    // 确保数组字段是数组
    if (!Array.isArray(updated.parts_interested)) updated.parts_interested = [];
    if (!Array.isArray(updated.concerns)) updated.concerns = [];

    // 确保布尔字段是布尔
    updated.has_sent_drawing = !!updated.has_sent_drawing;

    // 确保 user_id 不变
    updated.user_id = currentProfile.user_id;

    // 去重数组
    updated.parts_interested = [...new Set(updated.parts_interested.filter(Boolean))];
    updated.concerns = [...new Set(updated.concerns.filter(Boolean))];

    return updated;
  } catch (e) {
    console.warn('Failed to parse extraction result:', e.message);
    return currentProfile;
  }
}

/**
 * 异步触发信息提取并更新档案
 * 不阻塞主回复流程，后台执行
 */
function asyncExtractAndSave(kv, userId, userMessage, botReply, profile, lang, pat, botId) {
  // 用 setTimeout 模拟异步执行（不阻塞响应）
  // 注意：Cloudflare Workers 中用 ctx.waitUntil 更可靠，
  // 这里先实现 Promise 形式，在主函数中通过 waitUntil 调度
  return (async () => {
    try {
      const extractionPrompt = buildExtractionPrompt(userMessage, botReply, profile, lang);
      const extractionUserId = `extractor_${userId}`;

      const response = await fetch(COZE_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${pat}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          bot_id: botId,
          user: extractionUserId,
          query: extractionPrompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        console.warn('Extraction API error:', response.status);
        return;
      }

      const data = await response.json();
      let content = '';
      if (data.messages) {
        const answerMsg = data.messages.find(m => m.type === 'answer' && m.content_type === 'text');
        if (answerMsg) content = answerMsg.content;
      } else if (data.data && data.data.content) {
        content = data.data.content;
      }

      if (!content) return;

      const updatedProfile = parseExtractionResult(content, profile);

      // 更新时间戳和最后消息摘要
      const now = new Date().toISOString().split('T')[0];
      updatedProfile.last_contact = now;
      if (!updatedProfile.first_contact) {
        updatedProfile.first_contact = now;
      }
      // 最后消息摘要（截取前100字）
      const summary = (userMessage || '').slice(0, 100);
      if (summary) updatedProfile.last_message = summary;
      // 语言更新
      updatedProfile.language = lang;

      await saveCustomerProfile(kv, userId, updatedProfile);
      console.log('Customer profile updated for:', userId);
    } catch (e) {
      console.warn('Async extraction failed:', e.message);
    }
  })();
}

// ========== Coze API 调用 ==========

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

  // KV binding（可能为 undefined，没绑定时降级为无记忆）
  const kv = env.CUSTOMER_MEMORY || null;

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

  // ===== 读取客户档案（异步，不阻塞太久） =====
  let customerProfile = createEmptyProfile(userId);
  let profilePromise = null;
  if (kv) {
    profilePromise = getCustomerProfile(kv, userId);
  }

  let finalMessage = message;
  let customVariables = null;
  const userLang = detectLanguage(message);

  try {
    // 等待档案读取完成（KV 通常很快，几十毫秒级）
    if (profilePromise) {
      customerProfile = await profilePromise;
    }

    // 构建客户背景上下文（自然融入式）
    const profileContext = buildCustomerProfileContext(customerProfile, userLang);

    if (isFirstMessage && visitorInfo) {
      const contextPrefix = buildContextPrefix(visitorInfo);
      // 组合：客户档案 + 访客浏览信息 + 用户消息
      if (profileContext && contextPrefix) {
        finalMessage = profileContext + contextPrefix + message;
      } else if (profileContext) {
        finalMessage = profileContext + message;
      } else if (contextPrefix) {
        finalMessage = contextPrefix + message;
      }
      customVariables = {
        visitor_language: visitorInfo.language || '',
        visitor_page: visitorInfo.current_page || '',
        visitor_page_category: visitorInfo.page_category || visitorInfo.page_category_en || '',
        visitor_referrer: visitorInfo.referrer || '',
      };
    } else if (profileContext) {
      // 非首条消息也带上客户背景（让 Bot 在多轮对话中也有记忆）
      finalMessage = profileContext + message;
    }
  } catch (e) {
    finalMessage = message;
    console.warn('Profile context build failed:', e.message);
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

      currentMessage = buildRetryMessage(message, validation.reason, userLang, retryCount);
      currentConvId = undefined; // 重试用新会话，避免历史干扰
    }

    const outputStream = createSseStream(result.content, result.conversationId);

    // ===== 异步：信息提取 & 档案更新 =====
    // 使用 waitUntil 确保即使响应已发送，Worker 也会等待这个 Promise 完成
    if (kv && result && result.content) {
      const needExtract = shouldExtractInfo(message, result.content, customerProfile);
      if (needExtract) {
        console.log('Triggering profile extraction for:', userId);
        const extractionPromise = asyncExtractAndSave(
          kv, userId, message, result.content, customerProfile, userLang, pat, botId
        );
        // Cloudflare Pages Functions 支持 context.waitUntil
        if (context.waitUntil) {
          context.waitUntil(extractionPromise);
        }
      } else {
        // 即使不提取新信息，也更新 last_contact 时间戳（轻量更新）
        const now = new Date().toISOString().split('T')[0];
        customerProfile.last_contact = now;
        if (!customerProfile.first_contact) {
          customerProfile.first_contact = now;
        }
        customerProfile.language = userLang;
        // 最后消息摘要
        if (message) customerProfile.last_message = message.slice(0, 100);

        const touchPromise = saveCustomerProfile(kv, userId, customerProfile);
        if (context.waitUntil) {
          context.waitUntil(touchPromise);
        }
      }
    }

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
