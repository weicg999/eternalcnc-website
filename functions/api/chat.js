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

// ========== 个人邮箱（非对公）域名清单 ==========
// 背景：2026-09-03 线上事故——访客在对话中留了个人 Gmail，被抽取进 profile.contact_email
// 并在后续对话里被 Bot 包装成「您之前留的 xxx 对应的对接邮箱」引用出来，造成"公司有个人邮箱"
// 的误导。护栏第 346 行虽有「个人邮箱不算对公」约束，但只作用于回复生成，管不到档案抽取。
// 故此处做代码级硬保证：个人邮箱不写入 contact_email，也不作为「联系邮箱」注入上下文。
const PERSONAL_EMAIL_DOMAINS = [
  // 国内主流公众邮箱
  'qq.com', 'vip.qq.com', 'foxmail.com', '163.com', '126.com', 'yeah.net',
  'sina.com', 'sina.cn', 'sohu.com', 'aliyun.com', 'tom.com', '21cn.com',
  '139.com', '189.cn', 'wo.cn',
  // 国际主流公众邮箱
  'gmail.com', 'googlemail.com', 'outlook.com', 'hotmail.com', 'live.com',
  'msn.com', 'yahoo.com', 'yahoo.com.cn', 'ymail.com', 'icloud.com',
  'me.com', 'mac.com', 'aol.com', 'protonmail.com', 'proton.me',
  'zoho.com', 'gmx.com', 'gmx.de', 'mail.com', 'mail.ru', 'yandex.com',
  'naver.com', 'hanmail.net', 'daum.net', 'nate.com',
];

/**
 * 判断邮箱是否为个人/公众邮箱（非对公企业邮箱）
 * @param {string} email
 * @returns {boolean} true=个人邮箱，不应作为对公联系方式存储或引用
 */
function isPersonalEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const at = email.lastIndexOf('@');
  if (at < 0) return false;
  const domain = email.slice(at + 1).toLowerCase().trim();
  if (!domain) return false;
  return PERSONAL_EMAIL_DOMAINS.some((d) => domain === d || domain.endsWith('.' + d));
}

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
  // 越界能力（只挡"我方做/提供该工艺"的过承诺；"可介绍/伙伴/对接"等牵线话术放行）
  // 否定环视 (?![^。.!?\n]{0,15}不) 排除"我们不做X/不涉及X/不直接做X"等正确否认句式，避免误杀牵线回复
  /(我们|我方|本公司|本厂|我司)(?![^。.!?\n]{0,15}不)[^。.!?\n]{0,8}(做|提供|承接|主营|擅长|专做|也做|涉及|具备|拥有)[^。.!?\n]{0,6}(注塑|injection|3D打印|3d print|钣金|sheet metal|激光切割|laser cut|冲压|stamp|铸造|cast)/i,
  // 英文同理：挡 "we do/offer injection..." 过承诺；"we can introduce you to our injection partner" 因 intro 词在 15 字窗外而放行；(?![^.!?\n]{0,10}(?:n't|\bnot\b)) 排除 "we do not / we don't offer"
  /we (?:also |can |do |offer |provide |handle |manufacture)(?![^.!?\n]{0,10}(?:n't|\bnot\b))[^.!?\n]{0,15}(?:injection|sheet metal|laser cutting|stamping|casting|3d printing)/i,
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

// ========== 细粒度语言识别（2026-09-04 新增） ==========
// 背景：下面的 detectLanguage() 只有 zh/en 两档，日语/韩语/印地语/阿拉伯语/泰语/俄语/
// 希腊语等全部被判成 en，导致 validateReply 的语言一致性检测在 18/20 个非中英场景里
// 完全失效 —— 用户用印地语提问、bot 回英文，两边都判 en → "一致" → 放行（R12 实测）。
// 故新增基于 Unicode 文段的识别，专供语言护栏使用。
// 判定规则：按"独有文字"顺序检查，某文段出现 ≥2 个字符即判定（假名只用于日语，
// 谚文只用于韩语，依此类推），避免日文回复因汉字占多数而被误判成中文。
const SCRIPT_RANGES = [
  { lang: 'ja', re: /[\u3040-\u309F\u30A0-\u30FF]/g },          // 平假名 / 片假名
  { lang: 'ko', re: /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/g }, // 谚文
  { lang: 'hi', re: /[\u0900-\u097F]/g },                        // 天城文
  { lang: 'th', re: /[\u0E00-\u0E7F]/g },                        // 泰文
  { lang: 'ar', re: /[\u0600-\u06FF\u0750-\u077F]/g },           // 阿拉伯文
  { lang: 'he', re: /[\u0590-\u05FF]/g },                        // 希伯来文
  { lang: 'el', re: /[\u0370-\u03FF]/g },                        // 希腊文
  { lang: 'ru', re: /[\u0400-\u04FF]/g },                        // 西里尔文
  { lang: 'zh', re: /[\u4E00-\u9FFF\u3400-\u4DBF]/g },           // 汉字（普通话与粤语共用）
];

function detectScript(text) {
  if (!text || typeof text !== 'string') return 'en';
  for (const s of SCRIPT_RANGES) {
    const m = text.match(s.re);
    if (m && m.length >= 2) return s.lang;
  }
  return 'en';
}

// 浏览器语言码 → 内部语言码。
// 前端 EternalChat.astro 的 detectInitialLang() 已传标准码（ja / hi / yue / zh-CN / en …），
// 故此处只需归一：粤语与繁体中文共用汉字，统一映射为 zh，否则粤语回复会被判成不匹配。
function normalizeLang(lang) {
  if (!lang || typeof lang !== 'string') return '';
  const l = lang.trim().toLowerCase();
  if (!l) return '';
  if (l === 'yue' || l === 'zh-hk' || l === 'zh-mo' || l === 'zh-tw') return 'zh';
  return l.split('-')[0] || '';
}

// 语种名称，供重试指令下发正确语言。
// 修复缺陷：原 buildRetryMessage 对非 zh 用户一律下发 "REPLY IN PURE ENGLISH ONLY"，
// 把日语/德语/法语用户本该用母语的回复硬掰成英文（R01 日本 100% 英文疑似由此而来）。
const LANG_NAMES = {
  ja: 'Japanese', ko: 'Korean', hi: 'Hindi', th: 'Thai', ar: 'Arabic',
  he: 'Hebrew', el: 'Greek', ru: 'Russian', de: 'German', fr: 'French',
  es: 'Spanish', pt: 'Portuguese', it: 'Italian', nl: 'Dutch', pl: 'Polish',
  tr: 'Turkish', vi: 'Vietnamese', id: 'Indonesian', ms: 'Malay',
  sv: 'Swedish', cs: 'Czech', ro: 'Romanian', uk: 'Ukrainian', fa: 'Persian',
  zh: 'Chinese', en: 'English',
};

function detectLanguage(text) {
  if (!text) return 'en';
  const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
  const chineseCount = chineseChars ? chineseChars.length : 0;
  const totalChars = text.replace(/\s/g, '').length;
  if (totalChars === 0) return 'en';
  return (chineseCount / totalChars) > 0.15 ? 'zh' : 'en';
}

// ========== 邮箱露出护栏（2026-09-04 新增） ==========
// 背景：实测 14/20 场景在非问价、非要报价、非发图的情况下露出 sales@eternalcnc.com。
// 原 validateReply 的三道检测（禁词 / 语言 / 事实）里，跟邮箱相关的规则命中数为 0，
// 口径只写在 system prompt 中，没有任何代码兜底。
// 策略：采用「后置删除」而非「判不合格重试」—— 重试会串行再跑一次 LLM，
// 直接把响应耗时翻倍；删除是纯本地操作，零延迟。
const EMAIL_DETECT_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
// 按句删除：从句首（不含句末标点）一直删到句末标点，不会跨句误伤
const EMAIL_SENTENCE_RE = /[^。！？!?\n]*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}[^。！？!?\n]*[。！？!?]?/g;
// 允许露邮箱的两种场景：客户问价 / 客户要发图纸。
// ⚠️ 不能只匹配裸「图纸」二字：R19 实测客户问「我啲圖紙會唔會保密㗎」是问保密而非要发图，
// 关键词里却有"圖紙"，旧规则会误判成发图意图、邮箱照露。故必须「动作词 + 图纸」才放行。
const EMAIL_ALLOWED_INTENT_RE = new RegExp(
  '(报价|報價|价格|價錢|价钱|多少钱|多少錢|询价|詢價|費用|费用|\\bquote\\b|\\bquotation\\b|' +
  '\\bpricing\\b|\\bprice\\b|\\bcost\\b|\\brfq\\b)' +
  '|' +
  '((发|發|寄|传|傳|上传|上傳|提交|递交|遞交)[^。！？!?\\n]{0,8}(图|圖|檔|档|文件|图纸)|' +
  '(图|圖|檔|档|文件|图纸)[^。！？!?\\n]{0,8}(发|發|寄|传|傳|上传|上傳|提交)|' +
  '\\b(send|upload|share)\\b[^.\\n]{0,20}(drawing|file|step|stp|dxf|model)|' +
  '(drawing|file)[^.\\n]{0,20}\\b(send|upload|share)\\b)',
  'i'
);

const FALLBACK_REPLY = {
  yue: '明白，呢個問題我轉畀項目工程師同你確認。方便留低貴司企業郵箱嗎？我會安排工程師盡快回覆你。',
  zh: '明白，这个问题我转给项目工程师跟您确认。方便留个贵司企业邮箱吗？我会安排工程师尽快回复您。',
  en: 'Understood — let me route this to our project engineer for confirmation. Could you share your corporate email so we can follow up with the details?',
};

function getFallbackReply(userLang, visitorLangRaw) {
  const raw = String(visitorLangRaw || '').toLowerCase();
  if (raw === 'yue' || raw === 'zh-hk' || raw === 'zh-mo') return FALLBACK_REPLY.yue;
  return userLang === 'zh' ? FALLBACK_REPLY.zh : FALLBACK_REPLY.en;
}

// 悬空指代清理：删掉邮箱地址后，常留下「请发到上面的邮箱」「via the above email」之类
// 指代残留 —— 客户看得见指代却找不到地址，比露出邮箱更糟。
// 通用做法：只要剩余文本仍提到邮箱类词汇（各语言写法），就把那一句一并删掉。
const EMAIL_MENTION_DETECT_RE = /\b(e-?mail|mail)\b|邮箱|郵箱|邮件|郵件|电邮|電郵/i;
const EMAIL_MENTION_STRIP_RE = /[^\n。！？!?]*(\b(e-?mail|mail)\b|邮箱|郵箱|邮件|郵件|电邮|電郵)[^\n。！？!?]*[。！？!?]?/gi;
// 删掉的比例过高，说明回复主体就在讲邮箱，删完会答非所问 —— 此时改用兜底话术
const STRIP_RATIO_LIMIT = 0.6;

function stripEmailIfNotAllowed(userMessage, replyContent) {
  if (!replyContent || typeof replyContent !== 'string') {
    return { text: replyContent, stripped: false, tooShort: false };
  }
  if (!EMAIL_DETECT_RE.test(replyContent)) {
    return { text: replyContent, stripped: false, tooShort: false };
  }
  // 客户确实在问价 / 要发图纸 —— 允许露出邮箱
  if (EMAIL_ALLOWED_INTENT_RE.test(userMessage || '')) {
    return { text: replyContent, stripped: false, tooShort: false };
  }

  let cleaned = replyContent.replace(EMAIL_SENTENCE_RE, '');
  // 连同「上面的邮箱」这类悬空指代一起清掉，最多迭代 3 次防止死循环
  for (let i = 0; i < 3 && EMAIL_MENTION_DETECT_RE.test(cleaned); i++) {
    cleaned = cleaned.replace(EMAIL_MENTION_STRIP_RE, '');
  }
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();

  const ratio = replyContent.length ? 1 - cleaned.length / replyContent.length : 0;
  const gutted = cleaned.length < 40 || ratio > STRIP_RATIO_LIMIT;
  return { text: cleaned, stripped: true, tooShort: gutted };
}

function validateReply(userMessage, replyContent, visitorLang) {
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
  // 基准优先级：访客浏览器语言 > 用户消息语言。
  // 原实现以「用户消息语言」为基准，客户用英文提问、浏览器是日语时，
  // 英文回复会被判「一致」而放行（R01 日本 / R12 印度实测即此缺陷：
  // 印地语提问 → 判 en，英文回复 → 判 en → 通过）。
  // 改为优先取浏览器语言后，日语场景的英文回复才能被正确拦下。
  const browserLang = normalizeLang(visitorLang);
  const expectedLang = browserLang || detectScript(userMessage);
  const replyLang = detectScript(replyContent);
  if (replyLang !== expectedLang) {
    return {
      valid: false,
      reason: `language_mismatch: expected=${expectedLang}(via ${browserLang ? 'browser' : 'message'}), reply=${replyLang}`,
    };
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

function buildRetryMessage(originalMessage, failureReason, userLang, retryCount, visitorLangRaw) {
  const parts = [];

  // 语言强制：按访客实际语种下发指令。
  // 原实现对非中文用户一律下发 "REPLY IN PURE ENGLISH ONLY"，导致日语/德语/法语用户
  // 一旦触发重试，回复就被硬掰成英文 —— R01 日本场景 100% 英文回复疑似由此而来。
  const raw = String(visitorLangRaw || '').toLowerCase();
  const langName = LANG_NAMES[userLang] || 'English';
  if (raw === 'yue' || raw === 'zh-hk' || raw === 'zh-mo' || raw === 'zh-tw') {
    parts.push('【最高優先級指令：必須用廣東話口語回覆，繁體字；唔好夾雜簡體字，亦唔好夾普通話詞彙（例如「還是」「什麼」「我們」「多少」）。違反將不合格。】');
  } else if (userLang === 'zh') {
    parts.push('【最高优先级指令：你必须用纯中文回复，不能夹杂任何英文单词！违反将不合格。】');
  } else if (userLang === 'en') {
    parts.push('【TOP PRIORITY: REPLY IN PURE ENGLISH ONLY! NO CHINESE CHARACTERS AT ALL.】');
  } else {
    parts.push(`【TOP PRIORITY: YOU MUST REPLY ENTIRELY IN ${langName.toUpperCase()}! ` +
      `Do NOT reply in English or any other language — the customer is browsing in ${langName}.】`);
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

// 轻量语言指令：供非首条消息使用。
// 原实现只在首条消息通过 buildContextPrefix 下发语言信息，第二轮之后完全没有语言提示，
// bot 会在多轮对话中悄悄切回英文。这里补一条短指令，控制 prompt 长度。
function buildLanguageDirective(visitorLangRaw, userLang) {
  const raw = String(visitorLangRaw || '').toLowerCase();
  if (raw === 'yue' || raw === 'zh-hk' || raw === 'zh-mo' || raw === 'zh-tw') {
    return '【语言指令：必須使用廣東話口語回覆，繁體字，唔好夾雜簡體字同普通話詞彙。】\n';
  }
  if (userLang === 'zh') return '【语言指令：必须使用简体中文回复。】\n';
  if (userLang === 'en') return '【Language directive: you must reply entirely in English.】\n';
  const name = LANG_NAMES[userLang];
  if (name) return `【Language directive: you must reply entirely in ${name}, not in English.】\n`;
  return '';
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
    // ⚠️ 原实现 langMap 只覆盖 7 个语言码，日语 / 印地语 / 德语 / 法语等其余 18 个语种
    // 全部落到 `|| language` 兜底分支，bot 只看到「访客语言偏好: ja」这种弱提示，
    // 缺少明确指令 —— 实测 15/20 场景因此仍回英文（R01 日本、R12 印度等）。
    // 现用 LANG_NAMES 补全语种名称，并对所有语种统一加强措辞。
    const langKey = language.toLowerCase();
    const langBase = langKey.split('-')[0];
    let langLabel = langMap[langKey];
    if (!langLabel) {
      const name = LANG_NAMES[langBase];
      langLabel = name ? `${name}（${language}）` : language;
    }
    let langTip;
    if (langLabel.indexOf('粵語') === 0) {
      langTip = `- 访客语言偏好: ${langLabel}。请使用粵語（广东话）口语化回复，使用繁体字，避免书面普通话词汇；不得改用英文或其他语言。`;
    } else if (langLabel === '简体中文') {
      langTip = `- 访客语言偏好: 简体中文。请使用简体中文回复，不得改用英文或其他语言。`;
    } else if (langLabel === 'English') {
      langTip = `- 访客语言偏好: English. You must reply entirely in English.`;
    } else {
      const name = LANG_NAMES[langBase] || langLabel;
      langTip = `- 访客语言偏好: ${name}（${language}）。You must write the entire reply in ${name}, not in English.`;
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
    '- 仅以下场景推 sales@eternalcnc.com 转人工：我们公司具体某一台机床的出厂测试证书/校准数据/验收报告；厂内具体某台 CMM 的校准证书/精度溯源数据；客户图纸对应的正式报价与交期承诺；任何需法务/合规审批的事项。'
  );
  // 合规护栏（双保险：即使 Bot system prompt 偏弱，也在此每轮重申铁律，兜住风险）
  parts.push(
    '【合规护栏 - 必须遵守，不得违反】\n' +
    '- 资质：ISO 9001:2015 处于「贯标中/进度待确认」，任何语言下均禁用 "certified / 认证 / zertifiziert" 等已认证措辞；仅可称「按 ISO 9001 体系执行 / 推进中」。\n' +
    '- 检测能力与 CMM：厂内配置 2.5D 影像仪与精密量具；桥式三坐标(CMM)位于「集团共享计量中心」，按需送检（非厂内常驻设备）。客户问 CMM，直接肯定作答：「我们具备桥式三坐标(CMM)检测能力，由集团共享计量中心按需送检完成，可满足您的尺寸/形位公差检测需求；检测报告按订单约定出具」。不要因 CMM 不在厂内就推给工程师——这是既有能力，直接说即可；仅「厂内某台具体设备型号/校准证书/精度溯源数据」才转 sales@eternalcnc.com 转人工。\n' +
    '- 报告：检测报告按订单约定提供，不承诺每单默认出具完整 SPC 与 GD&T 报告。\n' +
    '- 五轴：可提及具备五轴能力，但不得过度宣称自由曲面「超高精」等无依据表述。\n' +
    '- 商务：无图纸/工艺信息不报具体单价；不泄露竞对报价与自身利润率；不提供免费设计；环保表述须真实可证，不夸大。\n' +
    '- 支付与合规：仅接受对公账户；不接受受制裁地区/实体业务；遇访客要求私人账户收款或其他合规红线，礼貌拒绝并引导转人工，不作承诺。' +
    '- 邮箱对接：仅接受对公企业邮箱（个人 Gmail/QQ/163/126/Outlook/Yahoo/Hotmail/Foxmail 等不算对公）。访客用个人邮箱索要报价/图纸/技术资料，礼貌说明「我们对公邮箱对接，请提供贵司企业邮箱」，并转 sales@eternalcnc.com 让销售跟；绝不承诺把报价/资料发到任何个人邮箱。' +
    '- 业务范围澄清：本公司是精密机加工「零部件」制造商，不做整车/终端产品/装配。用「辆/台/部/台套」等非零件量词（零件用「件/个/套」），或提到典型整车/消费成品型号（Tesla Model X/Y/3、BMW X 系、iPhone 等），礼貌澄清「我们仅做精密机加工零件，不造整车/整机；如 X 是您内部零件编号请发图纸评估」，不承诺承接整车/整机/装配业务。' +
    '- 法律与赔偿条款：赔偿责任 / indemnity / 质保范围属法务与合同范畴，机器人不得承诺出具书面赔偿条款、不得承诺具体回复时限(SLA)、不得自行判定「材料费是否包赔」。正确做法：说明「具体责任与赔偿以双方签订的合同/订单条款为准，我方法务/合同团队会据需求评估并跟进」，并转 sales@eternalcnc.com；可给通用原则性说明（如「通常我方责任以合同约定为限，来料加工场景下材料责任需在合同中明确」），但不下结论、不出条款文本。' +
    '- 设备安全与操作边界：EternalCNC 是精密加工厂（非机床厂），按客户图纸加工「零部件」。① 红线（必须说死）：绝不改造机床、绝不解除/打磨/移位限位开关等安全联锁——那会使设备精度认证失效并带来严重安全隐患，我们不做也不建议。② 工件略超机床行程（如 852 vs 850mm）属常见工艺问题，给「工艺硬方案」并量化风险让客户选：方案A(精度优先·二次装夹)先 G54 加工主体、再 G55 偏移坐标系加工超出段，接刀处可能有 ~0.01–0.015mm 台阶(公差允许即可行)；方案B(装夹优先·悬空支撑)让超出段悬空、定制千斤顶支承、60% 进给减振，避免二次装夹误差但节拍 +40%，问客户重精度还是重交期。③ 量化兜底：CMM 报告(由集团共享计量中心按需送检)会分段测量；若要求全长无缝且平坦度 ≤0.005mm，须坦诚「该尺寸机床物理上一次走刀无法保证」、可能拒单或换更大行程设备(我方最大行程可达 1270mm 级，同类问题同理)。全程给典型值+依据、标「典型/视工况」，不吹无依据精度。'
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
    // 兜底拦截：即便 LLM 未按抽取规则区分，个人邮箱也不得写入 contact_email，
    // 否则会被 Bot 当作「您之前留的邮箱」引用出来（2026-09-03 线上事故）。
    if (profile.contact_email && isPersonalEmail(profile.contact_email)) {
      // 注意：notes 同样会被注入上下文供 Bot 读取，故此处【不得】记录具体邮箱地址，
      // 否则等于绕过拦截——Bot 仍能看到并引用它。只记性质，不落地址。
      const note = '客户留的是个人邮箱（非对公），需引导提供企业邮箱';
      if (!profile.notes || !profile.notes.includes(note)) {
        profile.notes = profile.notes ? `${profile.notes}；${note}` : note;
      }
      if (profile.notes.length > 500) profile.notes = profile.notes.slice(0, 500);
      profile.contact_email = '';
    }
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
    // 个人邮箱不注入：历史档案中可能已存有个人邮箱（脏数据），若注入会被 Bot 包装成
    // 「您之前留的 xxx 对应的对接邮箱」引用出来。命中个人邮箱时改为提示走对公口径。
    if (profile.contact_email && !isPersonalEmail(profile.contact_email)) {
      lines.push(`- 联系邮箱: ${profile.contact_email}`);
    } else if (profile.contact_email) {
      lines.push('- 联系邮箱: 客户此前留的是个人邮箱（非对公），请礼貌引导其提供贵司企业邮箱后再推进报价/图纸对接');
    }
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
    // 同上：个人邮箱不注入，改为提示走对公口径
    if (profile.contact_email && !isPersonalEmail(profile.contact_email)) {
      lines.push(`- Contact email: ${profile.contact_email}`);
    } else if (profile.contact_email) {
      lines.push('- Contact email: the customer previously left a personal (non-corporate) email — politely ask for their company email before moving forward with quotes or drawings');
    }
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
9. 如果客户留下了【企业/对公】邮箱，填入 contact_email；若是个人邮箱（Gmail/QQ/163/126/Outlook/Yahoo/Hotmail/Foxmail/icloud/sina 等公众邮箱），【不要】填入 contact_email，改为在 notes 追加「客户留的是个人邮箱，需引导提供企业邮箱」
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
9. If the customer left a CORPORATE email, fill "contact_email". If it is a PERSONAL/public email (Gmail, QQ, 163, 126, Outlook, Yahoo, Hotmail, Foxmail, iCloud, Sina, etc.), do NOT fill "contact_email" — instead append to "notes": "customer left a personal email, need to ask for their company email"
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

// ============================================================
// FAQ 秒答拦截层（2026-09-04）
// 目标：高频问题不进 LLM，命中即流式直答（<1s），且口径 100% 可控。
// - 覆盖：中/粤/英（其他语种放行 LLM 路径，由语言护栏兜底）
// - 邮箱口径（与全站一致）：仅「询价 / 发图」意图的答案带 sales@eternalcnc.com；
//   其余答案不带邮箱，结尾软引导"发图询价"——访客真的问价时，邮箱自然出现。
// - 匹配条件：消息 8-200 字符 + 命中意图关键词；不命中一律走原 LLM 路径。
// - 事实口径来源：官网 equipment-matrix / capabilities / tolerance 等页面（勿凭记忆改）。
// ============================================================
const FAQ_EMAIL = 'sales@eternalcnc.com';

const FAQ_INTENTS = [
  {
    id: 'quote',
    // 询价/报价 —— 转化时刻，直接给路径 + 邮箱
    re: /报价|价格|多少钱|费用|怎么合作|quotation|quote|price|pricing|cost|\brfq\b|how much/i,
    zh: '好的，报价流程很简单：把图纸（STEP / STP / IGS / DXF / PDF 均可）发到 ' + FAQ_EMAIL + '，或通过官网询价表单提交。工程师评估后常规 2 小时内回复报价，复杂件最多 1 个工作日。',
    yue: '冇問題，報價好簡單：將圖紙（STEP / STP / IGS / DXF / PDF 都得）發去 ' + FAQ_EMAIL + '，或者喺官網詢價表單提交。工程師評估後常規 2 小時內回覆報價，複雜件最多 1 個工作日。',
    en: 'Sure — getting a quote is simple: send your drawing (STEP / STP / IGS / DXF / PDF) to ' + FAQ_EMAIL + ' or use the RFQ form on our website. Engineers typically reply within 2 hours; complex parts within 1 business day.',
  },
  {
    id: 'drawing',
    // 发图纸/文件 —— 同为转化时刻，带邮箱
    re: /发图纸|發圖紙|发图|發圖|传图纸|傳圖紙|图纸给|圖紙畀|发文件|发模型|send (you )?(the |us )?(drawing|file|model|step)|upload[^.]{0,20}(drawing|file|step)|share[^.]{0,20}(drawing|file|step)/i,
    zh: '可以直接发：支持 STEP / STP / IGS / DXF / PDF 等格式，发到 ' + FAQ_EMAIL + ' 即可（也支持官网询价表单上传）。收到后工程师评估，常规 2 小时内给您反馈可行性、工艺建议与报价。',
    yue: '可以直接發：支持 STEP / STP / IGS / DXF / PDF 等格式，發去 ' + FAQ_EMAIL + ' 就得（亦可以喺官網詢價表單上傳）。收到後工程師評估，常規 2 小時內同你講可行性、工藝建議同報價。',
    en: 'You can send it directly: we accept STEP / STP / IGS / DXF / PDF at ' + FAQ_EMAIL + ' (or upload via the RFQ form). Our engineers will review it and reply within 2 hours with feasibility, process advice and a quote.',
  },
  {
    id: 'tolerance',
    re: /公差|精度|误差|誤差|tolerance|precision|accuracy|±\s*0\.00/i,
    zh: '我们的精密加工公差可达 ±0.005mm（关键特征、恒温车间），角度公差 ±0.01°，表面粗糙度最高 Ra 0.4。具体以零件特征与材料为准——把图纸发来，工程师会给出每个特征的可达精度。',
    yue: '我哋嘅精密加工公差可達 ±0.005mm（關鍵特徵、恒溫車間），角度公差 ±0.01°，表面粗糙度最高 Ra 0.4。具體以零件特徵同材料為準——將圖紙發嚟，工程師會逐個特徵話你知可達精度。',
    en: 'Tolerance: down to ±0.005mm on critical features (temperature-controlled shop), angular ±0.01°, surface finish down to Ra 0.4. Exact capability depends on the feature and material — send your drawing and our engineers will confirm feature by feature.',
  },
  {
    id: 'fiveaxis',
    re: /五轴|五軸|5\s*轴|5\s*軸|five.?axis|5.?axis/i,
    zh: '有的。我们配备五轴联动加工中心（SUNRISE DMU 400、HANMER LU320），复杂曲面、异形结构件可一次装夹完成，避免多次装夹的累积误差。您的零件具体适不适合五轴，欢迎发图，工程师会给工艺建议。',
    yue: '有嘅。我哋配備五軸聯動加工中心（SUNRISE DMU 400、HANMER LU320），複雜曲面、異形結構件可以一次裝夾完成，避免多次裝夾嘅累積誤差。你件嘢啱唔啱用五軸，歡迎發圖，工程師會畀工藝建議。',
    en: 'Yes — we run 5-axis machining centers (SUNRISE DMU 400, HANMER LU320). Complex curved surfaces and irregular parts can be done in one setup, avoiding accumulated error from multiple fixtures. Send your part drawing and our engineers will advise whether 5-axis is the right process.',
  },
  {
    id: 'cmm',
    re: /CMM|三坐标|三座標|检测|檢測|檢驗|测量|測量|量测|inspection|measurement/i,
    zh: '可以的。厂内配备 2.5D 影像仪与精密量具做常规尺寸检测；桥式三坐标（CMM）由集团共享计量中心按需送检，可满足尺寸与形位公差检测需求。检测报告（含 SPC / GD&T）按订单约定出具。',
    yue: '得嘅。廠內配備 2.5D 影像儀同精密量具做常規尺寸檢測；橋式三坐標（CMM）由集團共享計量中心按需送檢，可以滿足尺寸同形位公差檢測需求。檢測報告（含 SPC / GD&T）按訂單約定出具。',
    en: 'Yes. In-house we run a 2.5D vision measuring machine and precision gauges for routine dimensional checks; bridge-type CMM is provided on demand through our group shared metrology center, covering dimensional and GD&T requirements. Inspection reports (incl. SPC / GD&T) are provided as agreed per order.',
  },
  {
    id: 'iso',
    re: /ISO\s*9001|质量体系|質量體系|认证|認證|certified|certification/i,
    zh: '我们按 ISO 9001 质量管理体系贯标运行（认证进度以正式公示为准）。全流程按体系文件执行：来料检验、过程管控、出货检验；材质证明（EN 10204 3.1）与检测报告可按订单约定提供。',
    yue: '我哋按 ISO 9001 質量管理體系貫標運行（認證進度以正式公示為準）。全流程按體系文件執行：來料檢驗、過程管控、出貨檢驗；材質證明（EN 10204 3.1）同檢測報告可以按訂單約定提供。',
    en: 'We operate under an ISO 9001 quality management system (certification in progress; formal status per official publication). The full process follows QMS procedures: incoming inspection, in-process control, outgoing inspection. Material certs (EN 10204 3.1) and inspection reports available per order agreement.',
  },
  {
    id: 'leadtime',
    re: /交期|货期|貨期|多久|多长时间|多長時間|交货|交貨|lead.?time|how long|delivery/i,
    zh: '打样常规数个工作日内完成，具体取决于工艺复杂度、材料与表面处理；报价时会一并确认准确交期。报价响应时效：常规 2 小时内，特殊件最多 2 个工作日。',
    yue: '打樣常規幾個工作日內完成，具體視乎工藝複雜度、材料同表面處理；報價時會一併確認準確交期。報價響應時效：常規 2 小時內，特殊件最多 2 個工作日。',
    en: 'Prototypes are typically completed within a few working days, depending on complexity, material and surface treatment; the exact lead time is confirmed with the quote. Quote response: usually within 2 hours, up to 2 business days for special parts.',
  },
  {
    id: 'moq',
    re: /起订|起訂|MOQ|最小批量|打样|打樣|样件|样品|小批量|1\s*件|一件|minimum\s*(order|quantit)|\bsample|\bproto/i,
    zh: '我们没有硬性 MOQ，1 件起做，打样和小批量都是常规业务，量产也一样接。批量越大单价越优——把图纸和数量发来，工程师按工艺和批量给您准确报价。',
    yue: '我哋冇硬性 MOQ，1 件起做，打樣同比小批量都係常規業務，量產一樣接。批量越大單價越平——將圖紙同比數量發嚟，工程師按工藝同比批量畀你準確報價。',
    en: 'No hard MOQ — we regularly take single-piece prototypes and small batches, as well as volume production. Unit price improves with quantity. Send your drawing and quantity, and our engineers will quote precisely.',
  },
  {
    id: 'materials',
    re: /材料|铝|鋁|不锈鋼|不鏽鋼|不锈|钛|鈦|铜|銅|材料表|material|aluminum|aluminium|titanium|stainless|steel|inconel|brass|copper|peek|delrin/i,
    zh: '常规加工材料覆盖：铝合金（6061 / 7075）、不锈钢（303 / 304 / 316 / 17-4PH）、钛合金（Ti-6Al-4V）、铜、模具钢及工程塑料（PEEK / Delrin / PP 等）；难加工材料如 Inconel 718 / 625 也有成熟案例。您这批零件用什么材料？',
    yue: '常規加工材料覆蓋：鋁合金（6061 / 7075）、不鏽鋼（303 / 304 / 316 / 17-4PH）、鈦合金（Ti-6Al-4V）、銅、模具鋼及工程塑膠（PEEK / Delrin / PP 等）；難加工材料如 Inconel 718 / 625 亦有成熟案例。你批零件用咩材料？',
    en: 'Common materials we machine: aluminum (6061 / 7075), stainless steel (303 / 304 / 316 / 17-4PH), titanium (Ti-6Al-4V), copper, tool steel and engineering plastics (PEEK / Delrin / PP, etc.). Difficult alloys like Inconel 718 / 625 are also well established here. What material are your parts?',
  },
  {
    id: 'payment',
    re: /付款|支付|转账|轉賬|对公|對公|私人账户|私人賬戶|payment|bank transfer|\bT\/T\b|paypal/i,
    zh: '我们仅接受对公账户付款（银行转账 / T/T 等）。基于合规要求，不接受私人账户收款，也不与受制裁地区交易。具体付款条款会在报价单中注明。',
    yue: '我哋只接受對公賬戶付款（銀行轉賬 / T/T 等）。基於合規要求，唔接受私人賬戶收款，亦唔同受制裁地區交易。具體付款條款會喺報價單註明。',
    en: 'We only accept corporate bank transfers (T/T etc.). For compliance reasons we cannot accept payments to personal accounts, and we do not trade with sanctioned regions. Payment terms are specified on the quotation.',
  },
  {
    id: 'nda',
    re: /保密|機密|机密|泄露|洩露|NDA|confidential/i,
    zh: '请放心，保密是底线：可签署正式保密协议（NDA）；您的图纸仅在项目相关工程师与生产部门内部流转，未经您书面同意，绝不外泄或用作案例展示。',
    yue: '你放心，保密係底線：可以簽正式保密協議（NDA）；你嘅圖紙只會喺項目相關工程師同比生產部門內部流轉，未經你書面同意，絕對唔會外洩或者攞去做案例展示。',
    en: 'Rest assured, confidentiality is a baseline for us: we can sign a formal NDA; your drawings only circulate among the project engineers and production team, and will never be shared externally or used as case studies without your written consent.',
  },
  {
    id: 'shipping',
    re: /发货|發貨|物流|快递|快遞|运费|運費|shipping|dhl|fedex|\bups\b/i,
    zh: '支持 DHL / FedEx / UPS 等国际快递全球发货，深圳及周边可自提或同城配送。运费按实际重量与目的地计算，报价时会一并确认。',
    yue: '支持 DHL / FedEx / UPS 等國際快遞全球發貨，深圳及周邊可以自提或者同城配送。運費按實際重量同比目的地計算，報價時會一併確認。',
    en: 'We ship worldwide via DHL / FedEx / UPS; self-pickup or local delivery available in Shenzhen. Shipping cost depends on actual weight and destination, confirmed together with the quote.',
  },
  {
    id: 'discount',
    re: /折扣|便宜|优惠|優惠|还价|還價|打折|打\d*\s*折|\d+\s*折|五折|半价|discount|cheaper|rebate/i,
    zh: '我们没有统一折扣政策——报价基于实际材料、工艺与精度要求核算。首次合作或批量订单，工程师会在报价时给您优化建议（工艺替代、材料选型等），把成本花在刀刃上。',
    yue: '我哋冇統一折扣政策——報價基於實際材料、工藝同比精度要求核算。首次合作或者批量訂單，工程師會喺報價時畀你優化建議（工藝替代、材料選型等），成本用喺刀刃上。',
    en: "We don't run a blanket discount policy — quotes are costed on actual material, process and precision requirements. For first orders or volume production, our engineers will suggest optimizations (process alternatives, material selection) to get the most out of your budget.",
  },
  {
    // 语言元问题兜底（2026-09-05）：用户实测 bot 自称"仅支持中英德日"——错误声明来自
    // Coze 线上旧 prompt（本地新版已明令禁止该行为，待发布）。网站侧 FAQ 秒答正确口径。
    id: 'cantonese',
    // 粤语能力确认 —— 访客要粤语就一定用粤语答（铁律：粤语必须真通）
    re: /粤语|粵語|广东话|廣東話|白话|白話|讲粤语|講粵語|cantonese/i,
    zh: '支持，粤语、普通话都可以。您直接用粤语提问就行——报价、工艺、材料、交期都能用粤语沟通；有图纸也可以直接发过来，工程师逐项讲解。',
    yue: '冇問題，我哋一直都可以用粵語傾！報價、工藝、材料、交期咩都用粵語講得。有圖紙嘅話可以直接發過嚟，工程師逐樣同你講解。',
    en: 'Yes — we speak Cantonese (and Mandarin and English). Feel free to continue in Cantonese: quoting, processes, materials, lead times — all covered.',
  },
  {
    id: 'language',
    // 语言能力清单 —— 不列死"仅支持X种"，列主要语种+20多种口径
    re: /什么语言|甚麼語言|哪些语言|哪種語言|邊種語言|几种语言|幾種語言|语言呢|語言呢|会.{0,3}语言|會.{0,3}語言|语言能力|語言能力|支持语言|支持語言|支持.{0,2}语种|德语|德語|德文|法语|法語|西班牙语|西班牙語|俄语|俄語|阿拉伯|葡萄牙语|葡萄牙語|意大利语|意大利語|韩语|韓語|(what|which)\s+languages?|speak\s+(arabic|spanish|french|russian|german)|\barabic\b|\bespanol\b|العربية/i,
    zh: '语言不用担心——我们支持全球主要语言：中文（含粤语）、英语、日语、韩语、德语、法语、西班牙语、俄语、阿拉伯语、葡萄牙语、意大利语、土耳其语、越南语、泰语、印地语等 20 多种。您直接用母语提问即可，工程师对接无障碍。',
    yue: '語言唔使擔心——我哋支持全球主要語言：中文（含粵語）、英語、日語、韓語、德語、法語、西班牙語、俄語、阿拉伯語、葡萄牙語、意大利語等 20 多種，你直接用母語問就得，工程師對接冇障礙。',
    en: "No worries — we support 20+ major languages: English, Chinese (incl. Cantonese), Japanese, Korean, German, French, Spanish, Russian, Arabic, Portuguese, Italian, Turkish, Vietnamese, Thai, Hindi and more. Just ask in your native language and our engineers will follow up seamlessly.",
  },
];

/**
 * FAQ 秒答匹配。命中返回 { id, answer }，否则返回 null。
 * 规则：消息 ≥5 字符（中文信息密度高，7 字符短问句如"打样交期多久？"是常态）、
 *       ≤200 字符；仅 zh / en（yue 归 zh，按浏览器语言给粤语版）；其他语种放行 LLM。
 * 简繁归一：粤语/繁体用户打"報價/圖紙/檢測"等繁体，先归一为简体再匹配正则。
 */
const FAQ_T2S = {
  '報': '报', '價': '价', '錢': '钱', '圖': '图', '發': '发', '傳': '传', '檢': '检', '測': '测',
  '驗': '验', '誤': '误', '認': '认', '證': '证', '質': '质', '體': '体', '訂': '订',
  '樣': '样', '機': '机', '洩': '泄', '轉': '转', '賬': '账', '對': '对', '運': '运',
  '費': '费', '遞': '递', '優': '优', '還': '还', '軸': '轴', '鈦': '钛', '鋁': '铝',
  '鋼': '钢', '銅': '铜', '鏽': '锈', '膠': '胶',
};

function matchFaq(message, userLang, visitorLangRaw) {
  const raw = String(message || '').trim();
  if (raw.length < 5 || raw.length > 200) return null;
  if (userLang !== 'zh' && userLang !== 'en') return null;
  const msg = userLang === 'zh' ? raw.replace(/[報價錢圖發傳檢測驗誤認證質體訂樣機洩轉賬對運費遞優還軸鈦鋁鋼銅鏽膠]/g, (c) => FAQ_T2S[c] || c) : raw;
  const rawLang = String(visitorLangRaw || '').toLowerCase();
  let lang;
  if (rawLang === 'yue' || rawLang === 'zh-hk' || rawLang === 'zh-mo') {
    lang = 'yue';
  } else if (userLang === 'en') {
    lang = 'en';
  } else {
    // 浏览器语言无粤语信号时，按消息里的粤语特征字兜底
    // （手动测试/内嵌浏览器不带 visitor_info 的场景，如"你哋做唔做到五軸加工"）
    lang = /[唔嘅咗喺佢乜咁啲嚟畀冇哋]/.test(raw) ? 'yue' : 'zh';
  }
  for (const intent of FAQ_INTENTS) {
    if (intent.re.test(msg)) {
      // 粤语能力确认：zh 用户问粤语 → 直接用粤语答（要粤语就给他粤语，最强确认）
      const answerKey = (intent.id === 'cantonese' && lang === 'zh') ? 'yue' : lang;
      return { id: intent.id, answer: intent[answerKey] || intent.zh };
    }
  }
  return null;
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
  // 语言基准：优先取浏览器语言（前端 EternalChat.astro 已传标准语言码
  // ja / hi / yue / zh-CN / en …），取不到再退回"用户消息语言"。
  // 原实现只认消息语言，导致客户用英文提问时，日语/印地语场景的英文回复被判"一致"放行。
  // 归一化后 zh / yue 同为 'zh'，粤语客户走中文注入层，其余语种走英文注入层。
  const visitorLangRaw = (visitorInfo && visitorInfo.language) || '';
  const userLang = normalizeLang(visitorLangRaw) || detectScript(message);


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
    } else {
      // 非首条消息：原先只带客户档案，完全没有语言提示，bot 会在多轮对话中切回英文。
      // 这里补一条轻量语言指令（首条消息已由 buildContextPrefix 下发，不重复）。
      finalMessage = buildLanguageDirective(visitorLangRaw, userLang) + (profileContext || '') + message;
    }
  } catch (e) {
    finalMessage = message;
    console.warn('Profile context build failed:', e.message);
  }

  // ===== FAQ 秒答拦截层 =====
  // 高频问题（询价/公差/MOQ/五轴/CMM/ISO…）命中即流式直答，不进 LLM。
  // 0.5s 内响应（对比 LLM 路径 8-15s），且预写口径 100% 准确。
  const faqHit = matchFaq(message, userLang, visitorLangRaw);
  if (faqHit) {
    console.log('FAQ fast answer [' + faqHit.id + ']:', message.slice(0, 60));

    // 客户档案 touch（不阻断响应）：记录最后联系时间与最后消息，保持画像连续
    if (kv) {
      try {
        const now = new Date().toISOString().split('T')[0];
        customerProfile.last_contact = now;
        if (!customerProfile.first_contact) customerProfile.first_contact = now;
        customerProfile.language = userLang;
        if (message) customerProfile.last_message = message.slice(0, 100);
        const touchPromise = saveCustomerProfile(kv, userId, customerProfile);
        if (context.waitUntil) context.waitUntil(touchPromise);
      } catch (e) {
        console.warn('FAQ profile touch failed:', e.message);
      }
    }

    return new Response(createSseStream(faqHit.answer, conversationId || ('faq_' + userId)), {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
        ...corsHeaders(origin),
      },
    });
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

      // 后置修正：非问价 / 非发图场景的邮箱露出，直接删掉含邮箱的整句。
      // 走本地改写而非判不合格重试 —— 重试会串行再跑一次 LLM，把响应耗时翻倍。
      const emailFix = stripEmailIfNotAllowed(message, result.content);
      if (emailFix.stripped) {
        if (emailFix.tooShort) {
          // 整段都在讲邮箱，删完没内容了 —— 直接给兜底话术，不再重试
          result.content = getFallbackReply(userLang, visitorLangRaw);
          console.log('Email stripped, reply too short — using fallback:', visitorLangRaw || userLang);
          break;
        }
        console.log('Email stripped from reply (non-quote scenario)');
        result.content = emailFix.text;
      }

      const validation = validateReply(message, result.content, userLang);

      if (validation.valid) break;

      lastFailureReason = validation.reason;
      retryCount++;

      // 语言类失败只重试 1 次（其余类型仍按 MAX_RETRY_COUNT）。
      // 原因：Coze bot 若生不出某个语种，多试几次通常还是不行（R12 印地语实测连跑 3 次
      // 均为英文），而每次重试都是一次完整 LLM 调用、串行累加 8s 左右。
      // 语言问题重试超过 1 次就接受，避免把响应拖到 20s 以上。
      const maxRetry = /^language_mismatch/.test(validation.reason) ? 1 : MAX_RETRY_COUNT;
      if (retryCount > maxRetry) {
        console.warn('Quality check failed after all retries:', validation.reason);
        break;
      }

      console.log('Quality check failed (attempt ' + retryCount + '):', validation.reason);

      currentMessage = buildRetryMessage(message, validation.reason, userLang, retryCount, visitorLangRaw);
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
