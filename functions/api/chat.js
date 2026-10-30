/**
 * Cloudflare Pages Function - 智能客服 API 网关（方案 B：Workers AI 模型兜底 + 博客知识库）
 *
 * 功能：
 * - 接收前端聊天请求，本地 FAQ 秒答拦截（高频问题不进模型）
 * - 未命中走 Workers AI（env.AI.run，免密钥，CF 网络内调用）+ 博客知识库检索兜底
 * - 支持流式响应（SSE），逐字返回给前端
 * - 频率限制（同一 IP 每分钟 30 条）
 * - 域名白名单校验
 * - 多轮对话（前端上报 history，最多带最近 6 条）
 * - 访客信息预收集：语言/来源/当前页面/页面分类
 * - 回复质量校验：禁词检测 + 语言一致性 + 核心事实反向校验 + 自动重试
 * - 客户跟进记忆：Cloudflare KV 存储客户档案，跨会话记住业务信息
 *
 * 环境变量（Cloudflare Dashboard 配置）：
 * - AI_MODEL: 可选，覆盖默认模型（默认 @cf/meta/llama-3.1-8b-instruct）
 *
 * 绑定（Cloudflare Pages 中绑定）：
 * - AI: Workers AI 绑定（必需，否则返回 500）
 * - CUSTOMER_MEMORY: KV Namespace，存储客户档案（可选，没绑定时降级为无记忆）
 *
 * 部署到 Cloudflare Pages Functions: /functions/api/chat.js
 * 访问路径: POST /api/chat
 */

// 本地模块（方案 B：Workers AI 模型兜底 + 博客知识库检索）
import { buildSystemPrompt } from './system-prompt';
import { retrieveKnowledge } from './blog-knowledge';

// ========== 配置 ==========
const COZE_API_ENDPOINT = 'https://api.coze.cn/open_api/v2/chat';
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_RETRY_COUNT = 1; // 质量校验失败最多重试1次（原 2）
// 延迟预算：Coze 单次响应基线就有 14-19s，20s 是体验红线。
// 重试前先算账——已经耗掉的时间 + 一次完整调用（按 12s 估）若超过 TOTAL_BUDGET_MS，
// 就不再重试，直接接受当前结果。宁可放过一次质检，也不要让访客等 30 秒。
const COZE_TIMEOUT_MS = 26000;   // 单次调用硬超时，防上游挂死
const TOTAL_BUDGET_MS = 26000;   // 端到端总耗时预算
const RETRY_RESERVE_MS = 8000;  // 判定"还够不够再跑一次"的预留
const LANG_RETRY_ENABLED = true; // 语言类失败是否重试（A/B 验证中：仅"本不该中文却回中文"重试1次）

// COZE_PAT 已移除：密钥只能来自 Cloudflare 环境变量 env.COZE_PAT，绝不硬编码。
const COZE_BOT_ID = '7679396158112317440';

// ===== 方案 B：Workers AI 配置（扣子已停用，以下 COZE_* 常量仅作历史参考）=====
// 模型可在 Cloudflare Dashboard 环境变量 AI_MODEL 覆盖。
// 默认 glm-5.3-flash（智谱 GLM）：中英双语母语级、flash 快、非推理模型适合客服。
// 备选：@cf/meta/llama-3.1-8b-instruct-fp8（英文强但中文弱）、
//       @cf/deepseek-ai/deepseek-r1-distill-qwen-32b（推理强但慢、会输出思考过程）。
// 注意：原 @cf/meta/llama-3.1-8b-instruct 已于 2026-05-30 弃用，勿再用。
const AI_MODEL_DEFAULT = '@cf/qwen/qwen3-30b-a3b-fp8';
const AI_MAX_TOKENS = 900;
const AI_TEMPERATURE = 0.6;
const AI_TIMEOUT_MS = 25000; // Workers AI 单次调用软超时（不可真正 abort，仅提前报错降级）

// KV 中存储客户档案的 key 前缀
const KV_KEY_PREFIX = 'customer:';

// ===== 高意向未留资访客告警（2026-10-16）=====
// 背景：客户档案此前"只写 KV、无任何出口推送"，高意向但没点「转人工」的访客静默流失。
// 触发：会话轮次 ≥ LEAD_ALERT_MIN_TURNS，且档案出现高价值信号，但始终未留下任何联系方式。
// 去重：档案内 lead_alerted 标记（同一访客只推一次）+ 每日总量上限，防止刷屏企业微信群。
const LEAD_ALERT_MIN_TURNS = 3;
const LEAD_ALERT_DAILY_CAP = 20;
const LEAD_ALERT_DAILY_KEY = 'leadalert:';
const LEAD_ALERT_INTERNAL_KEYS = ['msg_count', 'lead_alerted'];
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
  { pattern: /(\d{2,3})\s*(?:台|設備|设备)|(\d{2,3})(?:\s+\S+){0,6}?\s+(?:sets?\s+of|machines?|equipments?|CNC|máy|maschinen?|станок|машин|機械|기계|대|máquina|macchina|mesin|peralatan|production\s+equipment|testing\s+equipment)/i,
    test: (match) => {
      const num = parseInt(match[1]);
      // 真相是 30 台（官网统一口径，用户 2026-10-30 确认）；允许 25-35 的合理表述，原 20-40 会把 24 漏过去
      // 双分支：CJK 无空格（"24台"）+ 拉丁多语种（"24 CNC machines" / "24 máy CNC"，窗口放宽到 6 词）
      return num < 25 || num > 35;
    },
    reason: 'wrong_machine_count'
  },
  // 五轴定位精度过度宣称（R09 真违规：bot 曾声称 DMU 400 定位精度 0.002mm；官网 index 页也曾误写 0.002，已校正为 ±0.006）
  { pattern: /(?:定位精度|positioning accuracy|positioning precision|точность позиционирования|độ chính xác định vị)[^。.!?\n]{0,40}(?:0[.,]00[0-4]|0[.,]0[0-4]\s?mm)/i,
    test: () => true,
    reason: 'five_axis_accuracy_overclaim'
  },
  // 公司年限错误（不能说8年、5年、20年等）
  { pattern: /(\d{1,2})\s*(?:年|years?)(?:of|的)?\s*(?:经验|experience|in CNC|history)/i,
    test: (match) => {
      const num = parseInt(match[1]);
      // 合法口径：15（团队 2011 创立）、23（2003 入行）、20+ 通用；其余拦
      return num < 12 || num > 23;
    },
    reason: 'wrong_years_experience'
  },
  // 成立年份错误（两种正确口径：团队 2011 年创立、公司 2024 年 4 月注册）
  { pattern: /(?:established|founded|set up|成立).*(20\d{2})/i,
    test: (match) => {
      const year = parseInt(match[1]);
      return year !== 2011 && year !== 2024;
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

// 2026-09-08 修复：原只有 yue/zh/en 三档，其余 20+ 语种一旦走到兜底就掉英文
// （R20 希腊 / R18 马来西亚实测：回复一字不差都是 FALLBACK_REPLY.en，被判 P0）。
// 现按 LANG_NAMES 的语种集合补齐；缺失语种仍回落 en，但不会再出现"希腊客户收到英文"。
// 口径与中文版一致：转项目工程师确认 + 索取企业邮箱（不露出我们自己的邮箱地址）。
const FALLBACK_REPLY = {
  yue: '明白，呢個問題我轉畀項目工程師同你確認。方便留低貴司企業郵箱嗎？我會安排工程師盡快回覆你。',
  zh: '明白，这个问题我转给项目工程师跟您确认。方便留个贵司企业邮箱吗？我会安排工程师尽快回复您。',
  'zh-tw': '明白，這個問題我轉給專案工程師跟您確認。方便留個貴司企業郵箱嗎？我會安排工程師盡快回覆您。',
  ja: '承知いたしました。この件はプロジェクトエンジニアに確認のうえ、折り返しご連絡いたします。恐れ入りますが、貴社の会社用メールアドレスをお知らせいただけますでしょうか。',
  ko: '알겠습니다. 이 부분은 프로젝트 엔지니어에게 확인 후 회신드리겠습니다. 귀사의 회사 이메일 주소를 남겨주시겠습니까?',
  hi: 'समझ गया। इस विषय की पुष्टि मैं हमारे प्रोजेक्ट इंजीनियर से करवाकर आपको उत्तर दूँगा। कृपया अपनी कंपनी का ईमेल पता साझा करें।',
  th: 'รับทราบครับ ผมจะส่งเรื่องนี้ให้วิศวกรโปรเจกต์ตรวจสอบแล้วตอบกลับคุณ ขออนุญาตทราบอีเมลของบริษัทคุณเพื่อติดตามรายละเอียดครับ',
  ar: 'فهمت. سأحيل هذا الأمر إلى مهندس المشروع للتأكيد ثم أعود إليك. هل يمكنك مشاركة البريد الإلكتروني لشركتك؟',
  he: 'הבנתי. אעביר זאת למהנדס הפרויקט לאישור ואחזור אליך. האם תוכל לשתף את כתובת המייל העסקית שלך?',
  el: 'Κατανοητό — θα το διαβιβάσω στον μηχανικό του έργου για επιβεβαίωση. Θα μπορούσατε να μοιραστείτε το εταιρικό σας email;',
  ru: 'Понял вас. Я передам этот вопрос инженеру проекта для подтверждения и вернусь с ответом. Не могли бы вы оставить корпоративный email вашей компании?',
  de: 'Verstanden — ich gebe das an unseren Projektingenieur zur Bestätigung weiter. Könnten Sie uns Ihre Firmen-E-Mail-Adresse nennen?',
  fr: 'Bien compris — je transmets cette question à notre ingénieur projet pour confirmation. Pourriez-vous partager l’e-mail professionnel de votre entreprise ?',
  es: 'Entendido — voy a remitir esto a nuestro ingeniero de proyecto para confirmarlo. ¿Podría compartir el correo corporativo de su empresa?',
  pt: 'Entendido — vou encaminhar isso ao nosso engenheiro de projeto para confirmação. Poderia compartilhar o e-mail corporativo da sua empresa?',
  it: 'Capito — inoltro la questione al nostro ingegnere di progetto per conferma. Potrebbe condividere l’email aziendale della vostra ditta?',
  nl: 'Begrepen — ik leg dit voor aan onze projectingenieur ter bevestiging. Zou u het zakelijke e-mailadres van uw bedrijf kunnen delen?',
  pl: 'Rozumiem — przekażę to naszemu inżynierowi projektu do potwierdzenia. Czy może Pan/Pani podać firmowy adres e-mail?',
  tr: 'Anlaşıldı — bunu doğrulamak üzere proje mühendisimize ileteceğim. Şirketinizin kurumsal e-posta adresini paylaşabilir misiniz?',
  vi: 'Đã hiểu — tôi sẽ chuyển việc này cho kỹ sư dự án xác nhận rồi phản hồi lại. Bạn có thể cho biết email công ty không?',
  id: 'Baik, saya akan teruskan hal ini ke engineer proyek kami untuk dikonfirmasi. Bolehkah Anda membagikan email perusahaan Anda?',
  ms: 'Faham — saya akan serahkan ini kepada jurutera projek kami untuk pengesahan. Bolehkah anda kongsi emel korporat syarikat anda?',
  sv: 'Uppfattat — jag vidarebefordrar detta till vår projektingenjör för bekräftelse. Kan du dela företagets e-postadress?',
  cs: 'Rozumím — předám to našemu projektovému inženýrovi k potvrzení. Můžete sdělit firemní e-mailovou adresu?',
  ro: 'Am înțeles — voi transmite această solicitare inginerului de proiect pentru confirmare. Puteți furniza adresa de e-mail a companiei?',
  uk: 'Зрозуміло — я передам це нашому інженеру проєкту для підтвердження. Чи могли б ви надати корпоративну електронну пошту?',
  fa: 'متوجه شدم — این مورد را برای تأیید به مهندس پروژه ارجاع می‌دهم. لطفاً ایمیل شرکتی خود را در اختیار ما قرار دهید.',
  en: 'Understood — let me route this to our project engineer for confirmation. Could you share your corporate email so we can follow up with the details?',
};

function getFallbackReply(userLang, visitorLangRaw) {
  const raw = String(visitorLangRaw || '').toLowerCase();
  if (raw === 'yue' || raw === 'zh-hk' || raw === 'zh-mo') return FALLBACK_REPLY.yue;
  if (raw === 'zh-tw') return FALLBACK_REPLY['zh-tw'];
  // 先按浏览器语种精确匹配，再退到语种主码（如 pl-PL → pl），都没有才用英文
  if (FALLBACK_REPLY[raw]) return FALLBACK_REPLY[raw];
  const base = raw.split('-')[0];
  if (FALLBACK_REPLY[base]) return FALLBACK_REPLY[base];
  if (FALLBACK_REPLY[userLang]) return FALLBACK_REPLY[userLang];
  return FALLBACK_REPLY.en;
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

  // 整句删除会把回复掏空（实测 403 字删到 51 字）。此时退一步：只抹掉邮箱地址本身，
  // 保住正文与语种。宁可留一处地址，也不要让整段话被掏空后掉进兜底话术——
  // 实测 R20 希腊 / R18 马来西亚即因删空走 getFallbackReply，而旧兜底只有 yue/zh/en
  // 三档，语种直接丢失、判成 P0「语言完全不跟随」。
  if (gutted) {
    const masked = replyContent
      .replace(EMAIL_DETECT_RE, '')
      .replace(/[ \t]{2,}/g, ' ')
      .trim();
    if (masked.length >= 40) {
      return { text: masked, stripped: true, tooShort: false };
    }
  }

  return { text: cleaned, stripped: true, tooShort: gutted };
}

// ========== NDA 在线即时签署护栏（2026-09-18 新增） ==========
// 背景：R17 印尼场景实测 bot 直接答「Tentu bisa, kami bisa menandatangani NDA」（当然可以，
// 我们可以签 NDA）——NDA 是正式法务文件，客服无权在聊天窗口内即时完成签署。
// 该承诺一旦给出，客户会认为"已经签了"，法务风险高于口径错误，故单列护栏。
// 根因两条：① Coze prompt 无 NDA 条款（已在 coze-system-prompt.md 补，需后台发布）；
//          ② 网站侧 FAQ 意图 'nda' 只覆盖 zh/en（matchFaq 第 1183 行直接 return null），
//             印尼语等语种全落到 LLM，无任何本地兜底。
// 策略同邮箱护栏：**本地改写**而非判不合格重试 —— 重试会串行再跑一次 LLM，把耗时翻倍。
//   层1（先手）：用户消息命中"签 NDA"请求 → 直接秒答正确口径，不进 LLM（0.5s，语言无关）。
//   层2（后卫）：bot 回复命中"在线即时签 NDA"承诺 → 删掉违规句，补正确话术。
// ⚠️ 正确话术刻意**不含我方邮箱**：NDA 场景不属于"问价/发图"，露出邮箱会被
//    stripEmailIfNotAllowed 删掉，删完还可能触发 tooShort 兜底、答非所问。
//    改为索取客户企业邮箱——既合规，又接住转化链路⑥行动引导（留资）。

// 层2：bot 回复中的"在线即时签 NDA"承诺。
// 结构 = 肯定词（可/当然/yes/tentu…）+ 签署动词 + NDA/保密协议，
// 且整句后 80 字内**没有**出现流程类词（正式/法务/sales@/process/formal…）。
// 两个否定先行断言：前者排除"我们不能在线签"的正确否认，后者放行"可以签，但要走流程"的正确表述。
// 拆词表拼接而成，便于增补语种与单测。语序必须**双向**：
// 德/日/韩等 SOV 语言动词在后（"eine NDA unterschreiben" / "NDA に署名できます"），
// 只写「动词→NDA」单向会整类漏检（实测 de/ja 违规句 100% 漏）。
// ⚠️ 肯定词刻意不含 can / können / podemos / pouvez：这类"能愿动词"太泛，
//    会把「we can sign an NDA, but it must go through legal」的正确表述一并打死。
const NDA_POSITIVE_WORDS = '(?:yes|sure|certainly|of\\s+course|absolutely|tentu|bisa|boleh|dapat|iya|ya|sí|si|claro|por\\s+supuesto|oui|bien\\s+s[uú]r|ja|nat[uú]rlich|gerne|sim|はい|ええ|可以|當然|当然|沒問題|没问题|行)';
const NDA_SIGN_WORDS = '(?:sign|signing|signed|tanda\\s*tangan|tandatangani|menandatangani|firmar|firma|signer|unterschreiben|assinar|assina|署名|サイン|できます|簽|签|签署|簽署)';
const NDA_TERM_WORDS = '(?:NDA|保密协议|保密協議|confidentiality\\s+agreement|perjanjian\\s+kerahasiaan|accord\\s+de\\s+confidentialit[ée]|acuerdo\\s+de\\s+confidencialidad|秘密保持契約|機密保持契約)';
const NDA_NEG_WORDS = '(?:不|沒|没|無|无|(?:^|[^a-zA-Z])(?:tidak|bukan|belum|not|cannot|niet|nicht|ne|pas|non)(?![a-zA-Z])|n\'t)';
const NDA_PROCESS_WORDS = '(?:流程|正式|銷售|销售|團隊|团队|法務|法务|sales@|process|formal|procedure|legal|team|department|proses\\s+formal|hukum|tim\\s+sales|departemen|bagian\\s+hukum)';
const NDA_ONLINE_SIGN_RE = new RegExp(
  NDA_POSITIVE_WORDS +
  '(?![^。.!?\\n]{0,20}' + NDA_NEG_WORDS + ')' +                      // 排除"我们不能在线签"的正确否认
  '[^。.!?\\n]{0,30}' +
  '(?:' +
  NDA_SIGN_WORDS + '[^。.!?\\n]{0,30}' + NDA_TERM_WORDS +             // 动词在前：中 / 英 / 印尼 / 西…
  '|' +
  NDA_TERM_WORDS + '[^。.!?\\n]{0,30}' + NDA_SIGN_WORDS +             // 名词在前：德 / 日 / 韩…
  ')' +
  '(?![^。.!?\\n]{0,80}' + NDA_PROCESS_WORDS + ')',                   // 放行"可以签，但要走正式流程"
  'i'
);
// ⚠️ 豁免窗口用 [^。.!?\n] —— **不跨句号**。所以正确话术必须把澄清词写进**同一句**
//    （"，但需走正式签署流程"），写成"可以签署 NDA。需说明：…"会因句号阻断而自伤。

// 层1：用户消息中的"签 NDA"请求（双向：签署动词在前 / NDA 在前，各语种语序不同）
const NDA_REQUEST_PATTERNS = [
  /(?:签|簽|签署|簽署|sign|signing|tanda\s*tangan|menandatangani|firmar|firma|signer|unterschreiben|assinar|署名)[^。.!?\n]{0,30}(?:NDA|保密协议|保密協議|confidentiality\s+agreement|perjanjian\s+kerahasiaan|accord\s+de\s+confidentialit[ée]|acuerdo\s+de\s+confidencialidad|秘密保持契約|機密保持契約)/i,
  /(?:NDA|保密协议|保密協議|confidentiality\s+agreement|perjanjian\s+kerahasiaan|accord\s+de\s+confidentialit[ée]|acuerdo\s+de\s+confidencialidad|秘密保持契約|機密保持契約)[^。.!?\n]{0,30}(?:签|簽|签署|簽署|sign|signed|tanda\s*tangan|menandatangani|firmar|signer|unterschreiben|assinar|署名)/i,
];

// 正确口径：三段式 ①保密是底线、可签正式 NDA ②但需正式签署流程、我方出具文本、聊天内无法即时完成
// ③索取企业邮箱，由销售/法务对接。语种键与 FALLBACK_REPLY 对齐，缺失语种回落 en。
const NDA_CORRECT_REPLY = {
  yue: '你放心，保密係我哋嘅底線。正式保密協議（NDA）我哋可以簽，但佢係正式法務文件，要走正式簽署流程、由我哋出具正式文本，客服無辦法喺傾計視窗入面即時簽到。方便留低貴司企業郵箱？我會安排銷售／法務團隊同你對接，傳正式 NDA 文本過嚟。',
  zh: '请放心，保密是我们的底线。正式保密协议（NDA）我们可以签，但它属正式法务文件，需走正式签署流程、由我方出具正式文本，客服无法在聊天窗口内即时完成签署。方便留下贵司企业邮箱吗？我会安排销售／法务团队与您对接，发送正式 NDA 文本。',
  'zh-tw': '請放心，保密是我們的底線。正式保密協議（NDA）我們可以簽，但它屬正式法務文件，需走正式簽署流程、由我方出具正式文本，客服無法在聊天視窗內即時完成簽署。方便留下貴司企業郵箱嗎？我會安排銷售／法務團隊與您對接，發送正式 NDA 文本。',
  ja: 'ご安心ください。保密は私どもの基本方針であり、正式な秘密保持契約（NDA）の締結は可能です。ただし NDA は正式な法務文書のため、正式な署名手続きを経て当社が正式文書を発行する必要があり、チャット窓口で即時に署名を完了することはできません。貴社の会社用メールアドレスをいただけますでしょうか。営業・法務チームより正式な NDA 文書をお送りします。',
  ko: '안심하셔도 됩니다. 보안은 저희의 기본 원칙이며 정식 비밀유지계약(NDA) 체결이 가능합니다. 다만 NDA는 정식 법무 문서이므로 정식 서명 절차를 거쳐 저희가 정식 문서를 발행해야 하며, 채팅 창에서 즉시 서명을 완료할 수는 없습니다. 귀사의 회사 이메일 주소를 남겨주시겠습니까? 영업/법무팀이 정식 NDA 문서를 보내드리겠습니다.',
  hi: 'चिंता न करें — गोपनीयता हमारी बुनियादी नीति है और हम औपचारिक NDA पर हस्ताक्षर कर सकते हैं। एक स्पष्टीकरण: NDA एक औपचारिक कानूनी दस्तावेज़ है, जिसे औपचारिक हस्ताक्षर प्रक्रिया से गुज़रना होता है और आधिकारिक पाठ हमारी ओर से जारी किया जाता है — चैट विंडो में तुरंत हस्ताक्षर पूरे नहीं किए जा सकते। कृपया अपनी कंपनी का ईमेल साझा करें; हमारी सेल्स/लीगल टीम औपचारिक NDA पाठ भेजेगी।',
  th: 'ขอให้วางใจ — การรักษาความลับคือหลักการพื้นฐานของเรา และเราสามารถลงนาม NDA อย่างเป็นทางการได้ สิ่งที่ต้องชี้แจง: NDA เป็นเอกสารทางกฎหมายอย่างเป็นทางการ ต้องผ่านขั้นตอนการลงนามอย่างเป็นทางการและออกเอกสารโดยเรา — เจ้าหน้าที่แชทไม่สามารถดำเนินการลงนามให้เสร็จในหน้าต่างแชทได้ ขอทราบอีเมลบริษัทของคุณได้ไหมครับ ทีมขาย/กฎหมายจะส่งข้อความ NDA อย่างเป็นทางการให้',
  ar: 'لا تقلق — السرية أساس عملنا ويمكننا توقيع اتفاقية سرية رسمية (NDA). توضيح مهم: اتفاقية NDA وثيقة قانونية رسمية تتطلب إجراء توقيع رسمي وإصدار النص الرسمي من جانبنا، ولا يمكن إتمام التوقيع داخل نافذة المحادثة. هل يمكنك مشاركة البريد الإلكتروني لشركتك؟ سيتولى فريق المبيعات/الشؤون القانونية إرسال نص اتفاقية NDA الرسمي.',
  he: 'אל דאגה — סודיות היא בסיס אצלנו ונוכל לחתום על NDA רשמי. הבהרה אחת: NDA הוא מסמך משפטי רשמי הדורש הליך חתימה מסודר והנפקת הנוסח הרשמי על ידינו — לא ניתן להשלים חתימה בתוך חלון הצ\'אט. תוכל לשתף את המייל העסקי של החברה? צוות המכירות/משפטי ישלח את נוסח ה-NDA הרשמי.',
  el: 'Μην ανησυχείτε — η εμπιστευτικότητα είναι βασική αρχή μας και μπορούμε να υπογράψουμε επίσημη NDA. Μία διευκρίνιση: η NDA είναι επίσημο νομικό έγγραφο, απαιτεί επίσημη διαδικασία υπογραφής και έκδοση του επίσημου κειμένου από εμάς — δεν μπορεί να ολοκληρωθεί μέσα στο παράθυρο συνομιλίας. Θα μπορούσατε να μοιραστείτε το εταιρικό σας email; Η ομάδα πωλήσεων/νομικού θα στείλει το επίσημο κείμενο NDA.',
  ru: 'Не беспокойтесь — конфиденциальность для нас принципиальна, и мы можем подписать официальное соглашение о неразглашении (NDA). Важное уточнение: NDA — официальный юридический документ, который требует официальной процедуры подписания и выпуска официального текста с нашей стороны; подписание не может быть завершено прямо в окне чата. Не могли бы вы оставить корпоративный email вашей компании? Наша команда продаж и юристы направят вам официальный текст NDA.',
  de: 'Keine Sorge — Vertraulichkeit ist bei uns eine Grundvoraussetzung, und wir können eine formelle Geheimhaltungsvereinbarung (NDA) unterzeichnen. Ein wichtiger Hinweis: Eine NDA ist ein formelles Rechtsdokument, das ein formelles Unterzeichnungsverfahren erfordert und dessen offizieller Text von uns ausgestellt wird — im Chat-Fenster kann die Unterzeichnung nicht sofort abgeschlossen werden. Könnten Sie uns Ihre Firmen-E-Mail-Adresse nennen? Unser Vertriebs-/Rechtsteam sendet Ihnen dann den offiziellen NDA-Text zu.',
  fr: 'Soyez rassuré — la confidentialité est une règle de base chez nous et nous pouvons signer un accord de confidentialité (NDA) formel. Une précision importante : un NDA est un document juridique formel qui exige une procédure de signature officielle et l’émission du texte officiel par nos soins — la signature ne peut pas être finalisée dans cette fenêtre de chat. Pourriez-vous partager l’e-mail professionnel de votre entreprise ? Notre équipe commerciale/juridique vous enverra le texte officiel du NDA.',
  es: 'No se preocupe — la confidencialidad es una norma básica para nosotros y podemos firmar un acuerdo de confidencialidad (NDA) formal. Una aclaración importante: el NDA es un documento legal formal que requiere un proceso de firma oficial y la emisión del texto oficial por nuestra parte; la firma no puede completarse dentro de esta ventana de chat. ¿Podría compartir el correo corporativo de su empresa? Nuestro equipo comercial/legal le enviará el texto oficial del NDA.',
  pt: 'Não se preocupe — a confidencialidade é uma regra básica para nós e podemos assinar um acordo de confidencialidade (NDA) formal. Um esclarecimento importante: o NDA é um documento jurídico formal que exige um processo de assinatura oficial e a emissão do texto oficial por nossa parte; a assinatura não pode ser concluída nesta janela de chat. Poderia compartilhar o e-mail corporativo da sua empresa? A nossa equipa comercial/jurídica enviará o texto oficial do NDA.',
  it: 'Nessun problema — la riservatezza è una regola di base per noi e possiamo firmare un accordo di riservatezza (NDA) formale. Un chiarimento importante: l’NDA è un documento legale formale che richiede una procedura di firma ufficiale e l’emissione del testo ufficiale da parte nostra; la firma non può essere completata in questa finestra di chat. Potrebbe condividere l’email aziendale della vostra ditta? Il nostro team commerciale/legale invierà il testo ufficiale dell’NDA.',
  nl: 'Geen zorgen — vertrouwelijkheid is bij ons een basisregel en we kunnen een formele geheimhoudingsovereenkomst (NDA) ondertekenen. Eén belangrijke verduidelijking: een NDA is een formeel juridisch document dat een officiële ondertekeningsprocedure vereist en waarvan de officiële tekst door ons wordt uitgegeven — ondertekening kan niet in dit chatvenster worden voltooid. Zou u het zakelijke e-mailadres van uw bedrijf kunnen delen? Ons sales-/juridische team stuurt u dan de officiële NDA-tekst.',
  pl: 'Proszę się nie martwić — poufność jest u nas zasadą podstawową i możemy podpisać formalną umowę o zachowaniu poufności (NDA). Ważne wyjaśnienie: NDA to formalny dokument prawny wymagający oficjalnej procedury podpisania i wydania oficjalnego tekstu przez nas — podpisanie nie może zostać zakończone w oknie czatu. Czy może Pan/Pani podać firmowy adres e-mail? Nasz zespół sprzedaży/prawny prześle oficjalny tekst NDA.',
  tr: 'Endişelenmeyin — gizlilik bizim için temel bir ilkedir ve resmî bir gizlilik sözleşmesi (NDA) imzalayabiliriz. Önemli bir açıklama: NDA resmî bir hukuk belgesidir, resmî bir imza süreci gerektirir ve resmî metnin tarafımızdan düzenlenmesi gerekir; imza bu sohbet penceresinde tamamlanamaz. Şirketinizin kurumsal e-posta adresini paylaşabilir misiniz? Satış/hukuk ekibimiz resmî NDA metnini gönderecektir.',
  vi: 'Xin yên tâm — bảo mật là nguyên tắc cơ bản của chúng tôi và chúng tôi có thể ký thỏa thuận bảo mật (NDA) chính thức. Một điểm cần làm rõ: NDA là văn bản pháp lý chính thức, cần quy trình ký chính thức và do chúng tôi ban hành văn bản chính thức — không thể hoàn tất việc ký ngay trong cửa sổ chat. Bạn có thể cho biết email công ty không? Đội ngũ kinh doanh/pháp chế sẽ gửi văn bản NDA chính thức.',
  id: 'Jangan khawatir — kerahasiaan adalah prinsip dasar kami. NDA resmi bisa kami tandatangani, tetapi harus melalui proses penandatanganan formal dan teks resminya diterbitkan oleh kami — penandatanganan tidak dapat diselesaikan di dalam jendela chat ini. Bolehkah Anda membagikan email perusahaan Anda? Tim sales/legal kami akan mengirimkan teks NDA resmi.',
  ms: 'Jangan risau — kerahsiaan ialah prinsip asas kami. NDA rasmi boleh kami tandatangani, tetapi perlu melalui proses tandatangan formal dan teks rasmi dikeluarkan oleh kami — tandatangan tidak dapat diselesaikan dalam tetingkap chat ini. Bolehkah anda kongsi emel korporat syarikat anda? Pasukan sales/undang-undang kami akan menghantar teks NDA rasmi.',
  sv: 'Oroa er inte — sekretess är en grundregel för oss och vi kan underteckna ett formellt sekretessavtal (NDA). En viktig förklaring: ett NDA är ett formellt juridiskt dokument som kräver en officiell underteckningsprocess och att den officiella texten utfärdas av oss — undertecknandet kan inte slutföras i detta chattfönster. Kan ni dela företagets e-postadress? Vårt sälj-/juridikteam skickar den officiella NDA-texten.',
  cs: 'Nemějte obavy — důvěrnost je u nás základním pravidlem a můžeme podepsat formální dohodu o mlčenlivosti (NDA). Jedno důležité vysvětlení: NDA je formální právní dokument, který vyžaduje oficiální proces podpisu a vydání oficiálního textu z naší strany — podpis nelze dokončit v okně chatu. Můžete sdělit firemní e-mail? Náš obchodní/právní tým zašle oficiální text NDA.',
  ro: 'Nu vă faceți griji — confidențialitatea este o regulă de bază pentru noi și putem semna un acord de confidențialitate (NDA) formal. O clarificare importantă: NDA este un document juridic formal care necesită o procedură oficială de semnare și emiterea textului oficial de către noi — semnarea nu poate fi finalizată în fereastra de chat. Puteți furniza adresa de e-mail a companiei? Echipa noastră de vânzări/juridică va trimite textul oficial al NDA.',
  uk: 'Не хвилюйтеся — конфіденційність є базовим правилом для нас, і ми можемо підписати офіційну угоду про нерозголошення (NDA). Важливе уточнення: NDA — офіційний юридичний документ, який потребує офіційної процедури підписання та випуску офіційного тексту з нашого боку; підписання не може бути завершене у вікні чату. Чи могли б ви надати корпоративну пошту компанії? Наша команда продажів/юристи надішле офіційний текст NDA.',
  fa: 'نگران نباشید — محرمانگی یک اصل پایه برای ماست و می‌توانیم توافق‌نامه محرمانگی (NDA) رسمی امضا کنیم. یک نکته مهم: NDA یک سند حقوقی رسمی است که نیازمند فرایند امضای رسمی و صدور متن رسمی از سوی ماست — امضا نمی‌تواند در همین پنجره گفت‌وگو تکمیل شود. لطفاً ایمیل شرکتی خود را در اختیار ما قرار دهید؛ تیم فروش/حقوقی متن رسمی NDA را ارسال خواهد کرد.',
  en: 'Confidentiality is a baseline for us and we can sign a formal NDA. One thing to clarify: an NDA is a formal legal document that must go through a formal signing process with the official text issued by us — our chat agent cannot complete the signing inside this window. Could you share your corporate email? Our sales/legal team will then send you the official NDA text.',
};

// 语种选择逻辑与 getFallbackReply 一致：粤语信号优先 → 精确匹配 → 主码 → userLang → en
function getNdaReply(visitorLangRaw, userLang) {
  const raw = String(visitorLangRaw || '').toLowerCase();
  if (raw === 'yue' || raw === 'zh-hk' || raw === 'zh-mo') return NDA_CORRECT_REPLY.yue;
  if (raw === 'zh-tw') return NDA_CORRECT_REPLY['zh-tw'];
  if (NDA_CORRECT_REPLY[raw]) return NDA_CORRECT_REPLY[raw];
  const base = raw.split('-')[0];
  if (NDA_CORRECT_REPLY[base]) return NDA_CORRECT_REPLY[base];
  if (NDA_CORRECT_REPLY[userLang]) return NDA_CORRECT_REPLY[userLang];
  return NDA_CORRECT_REPLY.en;
}

// 层1：用户消息是否"请求签 NDA"。命中则走秒答，不进 LLM（不受 matchFaq 的 zh/en 语种限制）。
function matchNdaRequest(message, visitorLangRaw, userLang) {
  const raw = String(message || '').trim();
  if (raw.length < 3 || raw.length > 300) return null;
  for (const re of NDA_REQUEST_PATTERNS) {
    if (re.test(raw)) {
      return { id: 'nda_sign', answer: getNdaReply(visitorLangRaw, userLang) };
    }
  }
  return null;
}

// 层2：bot 回复改写。删掉违规承诺句，把正确话术补在前面。
// 逐句判定而非整段替换 —— 只删命中 NDA_ONLINE_SIGN_RE 的句子，保留回复中其余有效内容
// （客户可能同时问了交期/材料，整段替换会把有用信息一起抹掉）。
const NDA_SENTENCE_SPLIT_RE = /[^。.！？!?\n]+[。.！？!?]?/g;

function fixNdaOnlineSign(replyContent, visitorLangRaw, userLang) {
  const text = String(replyContent || '');
  if (!text || !NDA_ONLINE_SIGN_RE.test(text)) return { text, fixed: false };
  const correct = getNdaReply(visitorLangRaw, userLang);
  const kept = [];
  const rx = new RegExp(NDA_SENTENCE_SPLIT_RE.source, 'g');
  let m;
  while ((m = rx.exec(text)) !== null) {
    const s = m[0];
    if (NDA_ONLINE_SIGN_RE.test(s)) continue; // 违规句：整句丢弃
    if (kept.join('').includes(correct.slice(0, 12))) continue; // 已含正确话术，避免重复
    kept.push(s);
    if (m.index === rx.lastIndex) rx.lastIndex++;
  }
  const rest = kept.join('').trim();
  return { text: rest ? correct + '\n' + rest : correct, fixed: true };
}

// ========== 设备台数本地硬改（2026-10-30） ==========
// 背景：模型随机性会偶发把设备数说成 24（其训练记忆或旧口径），质检重试又偶尔漏网。
// 故采用「本地改写」而非依赖重试——确定性把错误数字替换回 30 台，零延迟、不靠模型配合。
// 真相 = 30 台（官网统一口径，用户 2026-10-30 确认）；25-35 视为合理放行，其余强制改回 30。
// ========== 设备台数本地硬改（2026-10-30，针对模型随机性偶发偏 24 / 越语「máy CNC」等漏网） ==========
// 确定性替换：凡出现「数字 + 设备/机床类名（跨语种）」且数字不在 25–35 区间，一律改写为 30 台。
// 放行 25–35（含官方 30），不碰无关数字（如 24/7、±0.005mm、X1270mm、Ra 0.4）。
// 教训：初版正则只认英文 machines / 中文台，漏掉越语「24 máy CNC」，线上实测仍报 24 → 已补全多语种关键词。
const MACHINE_CJK_RE = /(\d{2,3})\s*(?:台|設備|设备)/;
const MACHINE_LAT_RE = /(\d{2,3})(?:\s+\S+){0,6}?\s+(?:sets?\s+of|machines?|equipments?|CNC|máy|maschinen?|станок|машин|機械|기계|대|máquina|macchina|mesin|peralatan|production\s+equipment|testing\s+equipment)/i;
function fixMachineCount(replyContent, userLang) {
  const text = String(replyContent || '');
  for (const re of [MACHINE_CJK_RE, MACHINE_LAT_RE]) {
    const m = text.match(re);
    if (!m) continue;
    const num = parseInt(m[1], 10);
    if (num >= 25 && num <= 35) return { text, fixed: false }; // 30 等合理值放行
    // 仅替换命中的那处数字，保留单位与上下文（如 "24 CNC machines" → "30 CNC machines"、"24 máy CNC" → "30 máy CNC"）
    const fixed = text.replace(re, (whole, numStr) => '30' + whole.slice(numStr.length));
    return { text: fixed, fixed: true };
  }
  return { text, fixed: false };
}

// ========== 五轴定位精度过度宣称本地硬改（R09 真违规，2026-10-30） ==========
// 模型曾声称 DMU 400 定位精度 0.002mm（照抄官网 index 页旧值，已校正为 ±0.006）。
// 同款本地改写：命中即将含该 claims 的整句替换为正确口径，杜绝残留"官方技术数据"等误导表述。
// ========== 五轴定位精度过度宣称本地硬改（R09 真违规，2026-10-30） ==========
// 模型曾声称 DMU 400 定位精度 0.002mm（照抄官网 index 页旧值，已校正为 ±0.006）。
// 关键教训：真实回复里「定位精度」关键词与「0.002mm」数字常相隔 >15 字符（如
// "The positioning accuracy of our 5-axis machine (Sunrise DMU 400) is **0.002mm**"），
// 原紧窗口正则漏抓 → 线上实测仍报 0.002。改为「整句级别」检测：同一句内同时含精度关键词
// 与 0.002/0,002mm 即判定过度宣称，整句替换为正确口径（按该句自身语种），与关键词-数字距离解耦。
const ACC_KW = /定位精度|positioning\s+accuracy|positioning\s+precision|точность\s+позиционирования|độ\s+chính\s+xác\s+định\s+vị|positioniergenauigkeit|positioneringsnauwkeurigheid|précision\s+de\s+positionnement|precisione\s+di\s+posizionamento/i;
function detectSentenceLang(s) {
  if (/[ươđăâêôáàéèóòúùíìý]/i.test(s)) return 'vi';
  if (/[Ѐ-ӿ]/.test(s)) return 'ru';
  if (/[一-鿿]/.test(s)) return 'zh';
  return 'en';
}
const ACC_REPLACEMENT = {
  zh: '五轴机床定位精度具体以官网 DMU 400 机型页公开参数为准（直线轴 ±0.006 mm），或发图纸由工程师评估',
  en: 'The exact 5-axis positioning accuracy is detailed on our official DMU 400 machine page (linear axis ±0.006 mm), or our engineer will confirm against your drawing',
  vi: 'Độ chính xác định vị 5 trục chính xác được ghi trên trang thông số máy DMU 400 chính thức của chúng tôi (trục thẳng ±0,006 mm), hoặc kỹ sư sẽ xác nhận dựa trên bản vẽ của bạn',
  ru: 'Точная погрешность позиционирования 5-осевого станка указана на официальной странице модели DMU 400 (линейные оси ±0,006 мм), либо инженер подтвердит по вашему чертежу',
};
function fixFiveAxisAccuracy(replyContent, userLang) {
  const text = String(replyContent || '');
  const parts = text.split(/([。！？!?]|\n+|\.(?![0-9]))/g); // 句界：中英文句号/感叹/问号/换行；英文 "." 仅当非小数点时作句界，避免把 0.002mm 拆断
  let changed = false;
  let out = '';
  for (let i = 0; i < parts.length; i += 2) {
    let seg = parts[i] || '';
    const delim = parts[i + 1] || '';
    if (ACC_KW.test(seg) && /0[.,]002\s?mm/i.test(seg)) {
      // 整句替换为正确口径，语种跟随该句自身（避免混入他语）；保留原句首空白，避免句号后丢空格
      const leadWs = seg.slice(0, seg.length - seg.replace(/^\s+/, '').length);
      seg = leadWs + (ACC_REPLACEMENT[detectSentenceLang(seg)] || ACC_REPLACEMENT.en);
      changed = true;
    }
    out += seg + delim;
  }
  return changed ? { text: out, fixed: true } : { text, fixed: false };
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
  // 只拦「能确定错位」的漂移。detectScript 只区分独有文字语种
  // （ja/ko/hi/th/ar/he/el/ru/zh），其余拉丁语系（es/it/pt/sv/de/fr/nl/pl/tr/vi/id/ms/cs/ro…）
  // 全归 'en'，无法进一步区分 —— 若把 en vs es 当 mismatch，所有拉丁语系用户都会误落兜底。
  const SCRIPT_ONLY = ['ja', 'ko', 'hi', 'th', 'ar', 'he', 'el', 'ru', 'zh'];
  const langMismatch =
    (replyLang === 'zh' && expectedLang !== 'zh') ||                                            // 非中文用户收到汉字
    (SCRIPT_ONLY.includes(replyLang) && replyLang !== expectedLang) ||                          // 回复用了非目标的独有文字
    (SCRIPT_ONLY.includes(expectedLang) && expectedLang !== 'zh' && replyLang === 'en');        // 目标独有文字，回复却是拉丁字母
  if (langMismatch) {
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
      parts.push('【事实校验：我们厂内自有 30 台 CNC 设备。严禁说 24 台、70 台、50 台、10 台等任何错误数字。】');
    } else {
      parts.push('【FACT CHECK: We have exactly 30 CNC machines in-house. NEVER say 24, 70, 50, 10 or any wrong number.】');
    }
  }
  if (failureReason === 'five_axis_accuracy_overclaim') {
    if (userLang === 'zh') {
      parts.push('【事实校验：五轴机床的「定位精度」具体数值严禁主动声称（如 0.002mm）。客户问五轴精度，只说「具体以官网 DMU 400 机型页公开参数为准，或发图纸由工程师评估」，绝不自己报数字。】');
    } else {
      parts.push('【FACT CHECK: NEVER state a specific 5-axis positioning-accuracy number (e.g. 0.002mm). If asked, say "the exact figure is on our official DMU 400 machine page, or our engineer confirms against your drawing" — do NOT invent a number.】');
    }
  }
  if (failureReason === 'wrong_years_experience') {
    if (userLang === 'zh') {
      parts.push('【事实校验：创始人2003年入行（23年行业经验）；团队2011年创立（当年挂靠师傅公司运作，现为自营工厂）；公司2024年4月正式注册。严禁说2009年、2004年、2008年等错误年份。】');
    } else {
      parts.push('【FACT CHECK: Our founder entered the trade in 2003 (23 years in manufacturing). Our team was founded in 2011 (operating under a mentor\'s workshop at first, now independent). The company was officially incorporated in April 2024. NEVER say 2009, 2004, or other wrong years.】');
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
    parts.push('【通用铁律：回复只能基于访客已明确陈述的内容。访客未提及的材料、行业、产品型号、应用场景，严禁当作既成需求来表述或猜测；严禁用"航空钛合金/Model X/消费电子"等行业关键词替客户填充需求。不清楚访客做什么，就用提问引导（如"请问您做什么材料/什么精度？发图纸我们2小时出方案"），绝不可替客户构想需求。】');
  } else {
    parts.push('【GENERAL RULE: All factual data must be strictly accurate. NEVER invent numbers or information. If unsure, say "our engineer will confirm".】');
    parts.push('【GENERAL RULE: Reply ONLY based on what the visitor has explicitly stated. Materials/industries/product models/application scenarios the visitor has NOT mentioned must NOT be presented or guessed as their needs; do NOT fill gaps with industry keywords like "aerospace titanium / Model X / consumer electronics". If unsure what they make, ask (e.g. "What material/tolerance? Send drawings — we respond within 2h"), never invent their requirements.】');
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
  // 转化引导原则（促单：把答疑收尾成转化机会，但绝不编造需求）
  parts.push(
    '【转化引导原则 - 把每次答疑收尾成转化机会，但绝不编造需求】\n' +
    '- 当访客表达模糊意向（如"想做几个零件""需要加工"），不要替客户构想具体材料/产品，而是用提问逼出真实需求：材料？数量？精度/公差？有图纸吗？一次问 1-2 个关键点即可，别像问卷。\n' +
    '- 在合规且自然的节点，给出明确的下一步行动，把对话收尾成转化：引导发图纸（"发图纸我们 2 小时内出方案"）、留企业邮箱、或转销售对接。不要以"随时联系"这类空话结束。\n' +
    '- 报价/交期/发图场景下，主动给出时效承诺（常规 2h / 偶发 1 工作日 / 特殊 2 工作日）并附企业邮箱 sales@eternalcnc.com，符合口径。\n' +
    '- 分寸：不过度推销、不施压、不重复追问已答内容。目标是让有真实意向的访客顺利走到"发图纸/留邮箱"，而非把每个访客都当订单逼。'
  );

  // 合规护栏（双保险：即使 Bot system prompt 偏弱，也在此每轮重申铁律，兜住风险）
  parts.push(
    '【合规护栏 - 必须遵守，不得违反】\n' +
    '- 资质：ISO 9001:2015 处于「贯标中/进度待确认」，任何语言下均禁用 "certified / 认证 / zertifiziert" 等已认证措辞；仅可称「按 ISO 9001 体系执行 / 推进中」。\n' +
    '- 检测能力与 CMM：厂内配置 2.5D 影像仪与精密量具；桥式三坐标(CMM)位于「集团共享计量中心」，按需送检（非厂内常驻设备）。客户问 CMM，直接肯定作答：「我们具备桥式三坐标(CMM)检测能力，由集团共享计量中心按需送检完成，可满足您的尺寸/形位公差检测需求；检测报告按订单约定出具」。不要因 CMM 不在厂内就推给工程师——这是既有能力，直接说即可；仅「厂内某台具体设备型号/校准证书/精度溯源数据」才转 sales@eternalcnc.com 转人工。\n' +
    '- 报告：检测报告按订单约定提供，不承诺每单默认出具完整 SPC 与 GD&T 报告。\n' +
    '- 五轴：可提及具备五轴能力，但① 严禁主动声称五轴机床的「定位精度」具体数值（如 0.002mm / 0.003mm 等），客户问五轴精度时，只说「具体定位精度以官网 DMU 400 机型页公开参数为准，或发图纸由工程师评估」，绝不自己报具体数字；② 不得过度宣称自由曲面「超高精」等无依据表述。\n' +
    '- 设备规模：厂内自有 30 台 CNC 设备（含五轴加工中心 DMU 400 与 HANMER LU320 共两台五轴）；严禁说 24 台 / 50 台 / 10 台等错误数字，五轴机型以这两台为准，不得编造其他五轴型号。\n' +
    '- 商务：无图纸/工艺信息不报具体单价；不泄露竞对报价与自身利润率；不提供免费设计；环保表述须真实可证，不夸大。\n' +
    '- 支付与合规：仅接受对公账户；不接受受制裁地区/实体业务；遇访客要求私人账户收款或其他合规红线，礼貌拒绝并引导转人工，不作承诺。' +
    '- 邮箱对接：仅接受对公企业邮箱（个人 Gmail/QQ/163/126/Outlook/Yahoo/Hotmail/Foxmail 等不算对公）。访客用个人邮箱索要报价/图纸/技术资料，礼貌说明「我们对公邮箱对接，请提供贵司企业邮箱」，并转 sales@eternalcnc.com 让销售跟；绝不承诺把报价/资料发到任何个人邮箱。' +
    '- 业务范围澄清：本公司是精密机加工「零部件」制造商，不做整车/终端产品/装配。用「辆/台/部/台套」等非零件量词（零件用「件/个/套」），或访客主动提及整车/消费成品型号时，礼貌澄清「我们仅做精密机加工零件，不造整车/整机；如该型号是您内部零件编号请发图纸评估」，不承诺承接整车/整机/装配业务。注意：仅在访客主动提及整车/成品型号时才做此澄清；访客未提及任何型号时，严禁在回复中写入任何整车/成品型号名称（如某电动车/手机型号），不得替访客构想具体产品需求。' +
    '- 法律与赔偿条款：赔偿责任 / indemnity / 质保范围属法务与合同范畴，机器人不得承诺出具书面赔偿条款、不得承诺具体回复时限(SLA)、不得自行判定「材料费是否包赔」。正确做法：说明「具体责任与赔偿以双方签订的合同/订单条款为准，我方法务/合同团队会据需求评估并跟进」，并转 sales@eternalcnc.com；可给通用原则性说明（如「通常我方责任以合同约定为限，来料加工场景下材料责任需在合同中明确」），但不下结论、不出条款文本。' +
    '- 设备安全与操作边界：EternalCNC 是精密加工厂（非机床厂），按客户图纸加工「零部件」。① 红线（必须说死）：绝不改造机床、绝不解除/打磨/移位限位开关等安全联锁——那会使设备精度认证失效并带来严重安全隐患，我们不做也不建议。② 工件略超机床行程（如 852 vs 850mm）属常见工艺问题，给「工艺硬方案」并量化风险让客户选：方案A(精度优先·二次装夹)先 G54 加工主体、再 G55 偏移坐标系加工超出段，接刀处可能有 ~0.01–0.015mm 台阶(公差允许即可行)；方案B(装夹优先·悬空支撑)让超出段悬空、定制千斤顶支承、60% 进给减振，避免二次装夹误差但节拍 +40%，问客户重精度还是重交期。③ 量化兜底：CMM 报告(由集团共享计量中心按需送检)会分段测量；若要求全长无缝且平坦度 ≤0.005mm，须坦诚「该尺寸机床物理上一次走刀无法保证」、可能拒单或换更大行程设备(我方最大行程可达 1270mm 级，同类问题同理)。全程给典型值+依据、标「典型/视工况」，不吹无依据精度。'
  );
  // 英文版合规护栏（与中文护栏一一对应，约束英文回复——中文护栏对英文输出约束力弱）
  if (userLang === 'en') {
    parts.push(
      '【COMPLIANCE GUARDRAIL - must obey】\n' +
      '- 5-axis: you MAY mention 5-axis capability, but NEVER state a specific 5-axis "positioning accuracy" number (e.g. 0.002mm / 0.003mm). If asked about 5-axis accuracy, reply "the exact positioning accuracy is on our official DMU 400 machine page, or our engineer will confirm against your drawing" — do NOT invent a number.\n' +
      '- Equipment scale: we have exactly 30 CNC machines in-house, including two 5-axis centers (SUNRISE DMU 400 and HANMER LU320). NEVER say 24 / 50 / 10 machines, and do NOT invent other 5-axis models.\n'
    );
  }
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
 * 高意向访客（未留联系方式）告警推送企业微信群机器人。
 * 与 chat-lead.js 的 notifyWecom 共用同一 webhook（env.FEEDBACK_WEBHOOK_URL），
 * 消息风格保持一致，便于在同一群里分流查看。
 */
async function notifyLeadAlert(webhook, profile, userId) {
  const parts = (profile.parts_interested || []).join(', ');
  const concerns = (profile.concerns || []).join(', ');
  const lines = [
    '🔔 **高意向访客 · 未留联系方式**',
    '> 时间：' + new Date().toISOString(),
    '> 语言：' + (profile.language || '-') + '｜会话轮次：' + (profile.msg_count || '-'),
  ];
  if (profile.company) lines.push('\n**公司**：' + profile.company);
  if (profile.industry) lines.push('**行业**：' + profile.industry);
  if (parts) lines.push('**关注零件**：' + parts);
  if (profile.quote_status) lines.push('**报价进度**：' + profile.quote_status);
  if (concerns) lines.push('**关注点**：' + concerns);
  if (profile.has_sent_drawing) lines.push('**已发图纸**：是');
  if (profile.last_message) lines.push('\n**最后一句话**：\n' + profile.last_message);
  if (profile.notes) lines.push('**备注**：' + profile.notes);
  lines.push('\n访客 ID：' + userId);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const resp = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msgtype: 'markdown', markdown: { content: lines.join('\n') } }),
      signal: controller.signal,
    });
    if (!resp.ok) console.warn('lead-alert wecom notify failed:', resp.status);
  } catch (e) {
    console.warn('lead-alert wecom notify error:', e.message);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * 判定「高意向但没留联系方式」并推送一次。
 * 任何异常都自吞，绝不影响访客回复；同一访客只推一次（profile.lead_alerted 落档）。
 */
async function maybeAlertLead(kv, userId, profile, webhookUrl) {
  try {
    if (!kv || !profile) return;
    if (profile.lead_alerted) return;
    if (profile.contact_email) return;
    const turns = profile.msg_count || 0;
    if (turns < LEAD_ALERT_MIN_TURNS) return;

    const signals = [];
    if (profile.company) signals.push('公司');
    if (profile.industry) signals.push('行业');
    if (profile.parts_interested && profile.parts_interested.length) signals.push('零件');
    if (profile.quote_status) signals.push('报价');
    if (profile.concerns && profile.concerns.length) signals.push('关注点');
    if (profile.has_sent_drawing) signals.push('图纸');
    if (profile.notes && profile.notes.indexOf('个人邮箱') !== -1) signals.push('仅个人邮箱');
    if (!signals.length) return;

    const today = new Date().toISOString().slice(0, 10);
    const capKey = LEAD_ALERT_DAILY_KEY + today;
    let used = 0;
    try { used = parseInt(await kv.get(capKey), 10) || 0; } catch (e) { used = 0; }
    if (used >= LEAD_ALERT_DAILY_CAP) {
      console.log('[lead-alert] daily cap reached, skipped user=' + userId);
      return;
    }

    profile.lead_alerted = true;
    try { await kv.put(capKey, String(used + 1), { expirationTtl: 48 * 60 * 60 }); } catch (e) { /* 计数失败不阻断 */ }

    if (webhookUrl) {
      await notifyLeadAlert(webhookUrl, profile, userId);
      console.log('[lead-alert] pushed user=' + userId + ' turns=' + turns + ' signals=' + signals.join('/'));
    } else {
      console.log('[lead-alert] FEEDBACK_WEBHOOK_URL 未配置，仅记录不推送 user=' + userId + ' signals=' + signals.join('/'));
    }

    await saveCustomerProfile(kv, userId, profile);
  } catch (e) {
    console.warn('maybeAlertLead failed:', e.message);
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
    msg_count: 0,
    lead_alerted: false,
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
  // 内部字段（轮次计数 / 告警标记）不进提取提示词，避免被 LLM 改写或回显
  const profileForPrompt = { ...profile };
  for (const k of LEAD_ALERT_INTERNAL_KEYS) delete profileForPrompt[k];
  const currentProfileJson = JSON.stringify(profileForPrompt, null, 2);

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
function asyncExtractAndSave(kv, userId, userMessage, botReply, profile, lang, ai, model, webhookUrl) {
  // 用 setTimeout 模拟异步执行（不阻塞响应）
  // 注意：Cloudflare Workers 中用 ctx.waitUntil 更可靠，
  // 这里先实现 Promise 形式，在主函数中通过 waitUntil 调度
  return (async () => {
    try {
      const extractionPrompt = buildExtractionPrompt(userMessage, botReply, profile, lang);

      const response = await ai.run(model, {
        messages: [{ role: 'user', content: extractionPrompt }],
        stream: false,
        max_tokens: AI_MAX_TOKENS,
        temperature: 0.2, // 信息提取要稳定，低温度减少发散
      });

      let content = '';
      if (response && typeof response === 'object' && typeof response.response === 'string') {
        content = response.response;
      } else if (typeof response === 'string') {
        content = response;
      }

      if (!content) return;

      const updatedProfile = parseExtractionResult(content, profile);
      // 内部字段以本地状态为准，防止被提取结果覆盖（lead_alerted 被回显成 false 会导致重复告警）
      updatedProfile.msg_count = profile.msg_count || 0;
      if (profile.lead_alerted) updatedProfile.lead_alerted = true;

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
      await maybeAlertLead(kv, userId, updatedProfile, webhookUrl);
    } catch (e) {
      console.warn('Async extraction failed:', e.message);
    }
  })();
}

// ========== Workers AI 模型调用（方案 B）==========

async function callWorkersAI({ message, userId, conversationId, ai, model, systemPrompt, history, timeoutMs }) {
  // Workers AI 无状态，多轮上下文靠前端把历史塞进 messages。
  // 最多带最近 6 条历史，防止上下文膨胀（更早历史由前端截断）。
  const messages = [{ role: 'system', content: systemPrompt }];
  if (Array.isArray(history)) {
    for (const h of history.slice(-6)) {
      if (h && (h.role === 'user' || h.role === 'assistant') && typeof h.content === 'string' && h.content.trim()) {
        messages.push({ role: h.role, content: h.content });
      }
    }
  }
  messages.push({ role: 'user', content: message });

  const run = ai.run(model, {
    messages,
    stream: false,
    max_tokens: AI_MAX_TOKENS,
    temperature: AI_TEMPERATURE,
  });

  // env.AI.run 不接受外部 AbortSignal；用 Promise.race 做软超时，
  // 底层调用无法真正取消，但能在超时后提前返回错误，避免 Worker 一直被挂住。
  const timer = new Promise((_, reject) => {
    setTimeout(() => reject(Object.assign(new Error('Workers AI timeout'), { name: 'AbortError' })), timeoutMs || AI_TIMEOUT_MS);
  });

  const response = await Promise.race([run, timer]);

  let content = '';
  if (response && typeof response === 'object' && typeof response.response === 'string') {
    content = response.response;
  } else if (typeof response === 'string') {
    content = response;
  }

  if (!content || !content.trim()) {
    throw new Error('Workers AI returned empty content');
  }

  // conversationId：Workers AI 无服务端会话，仅回传原值供前端/日志标识，不承担记忆职责
  return { content, conversationId: conversationId || userId };
}

// ============================================================
// 视觉识别层（2026-10-28 重写）
// 背景：原实现用 Moondream，其 image 字段 schema 与运行时校验不一致，一直调不通，
//      截图/图纸上传后只能回"已收到、请发原图"。
// 现改为「按优先级回落的多个视觉模型」+「先判类型再决定话术」：
//   1) qwen2.5-vl-7b  —— messages + image_url 多模态格式（官方支持写法）
//   2) llama-3.2-11b-vision —— 同格式
//   3) llava-1.5-7b   —— 入参形态不同（image:number[] + prompt）
// 数据出网：图片仅在本次请求内经 Cloudflare Workers AI 推理，同一 Cloudflare 账号内闭环，
//   不写 KV、不落盘、不转第三方。图片只在这一次请求里用。
// 设计原则：任何一环失败都不阻断主对话——识别不到就让模型按"已收图 + 引导发原图"回。
// ============================================================
// 2026-10-28 实测校准（真机跑完全部候选，结果写进注释，别再靠猜）：
//   @cf/meta/llama-4-scout-17b-16e-instruct  ✅ 4.2s 成功，读图最准（图纸尺寸/材料全对）
//   @cf/mistralai/mistral-small-3.1-24b      ✅ 2.8s 成功
//   @cf/meta/llama-3.2-11b-vision-instruct   ✗ 需先接受 Meta 许可（5016 agree）
//   @cf/llava-hf/llava-1.5-7b-hf             ⚠ 可用但 20s 超时，太慢，不放进主链路
//   @cf/qwen/qwen2.5-vl-7b-instruct          ✗ 本账号不存在（5007）
const VISION_TRIES = [
  { model: '@cf/meta/llama-4-scout-17b-16e-instruct', kind: 'chat' },
  { model: '@cf/mistralai/mistral-small-3.1-24b-instruct', kind: 'chat' },
];
const VISION_TIMEOUT_MS = 12000;

const LANG_NAMES_VISION = {
  zh: 'Chinese', yue: 'Chinese', ja: 'Japanese', ko: 'Korean', ru: 'Russian',
  es: 'Spanish', de: 'German', fr: 'French', ar: 'Arabic', en: 'English',
};

function buildVisionPrompt(userLang) {
  const langName = LANG_NAMES_VISION[userLang] || LANG_NAMES[userLang] || 'English';
  return [
    'You are the assistant of a precision CNC machining factory.',
    'Look at the image and reply in EXACTLY this format, no extra text:',
    'TYPE: <drawing | part_photo | chat_screenshot | document | other>',
    'TEXT: <verbatim transcription, or NONE>',
    'SUMMARY: <2-4 sentences>',
    '',
    'TYPE rules:',
    '- drawing = engineering / technical drawing or blueprint (dimension lines, tolerance callouts, title block, section views, scale).',
    '- part_photo = photo or render of a machined part / workpiece.',
    '- chat_screenshot = screenshot of a chat / messaging conversation.',
    '- document = spec sheet, purchase order, table, email or text document.',
    '',
    'TEXT rules:',
    '- If the image contains readable text, copy the most important lines VERBATIM (max 8 lines), especially emails, phone numbers, part numbers, material grades, quantities and prices.',
    '- Never translate or paraphrase the transcribed text. If there is no readable text, write NONE.',
    '',
    'SUMMARY rules:',
    '- drawing: material, overall size, holes / threads, key dimensions and tolerance callouts you can actually read. NEVER guess numbers.',
    '- part_photo: material if identifiable, shape / features, machining operations needed, surface finish.',
    '- chat_screenshot / document: what the text says and any question or requirement it raises.',
    '- Write SUMMARY in ' + langName + ' (the customer language).',
    '- Do not add anything that is not visible in the image. If something is unclear, say it is not clearly readable instead of guessing.',
  ].join('\n');
}

function dataUriToBytes(dataUri) {
  const comma = dataUri.indexOf(',');
  const b64 = comma >= 0 ? dataUri.slice(comma + 1) : dataUri;
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function parseVisionOutput(txt) {
  let kind = '';
  const tm = txt.match(/TYPE\s*[:：]\s*([a-zA-Z_]+)/);
  if (tm) kind = tm[1].toLowerCase();
  if (['drawing', 'part_photo', 'chat_screenshot', 'document', 'other'].indexOf(kind) < 0) kind = '';
  // 逐字转录（图中文字原文）：让主模型能引用原话，而不是二道转述
  let verbatim = '';
  const vm = txt.match(/TEXT\s*[:：]\s*([\s\S]*?)(?=\n\s*SUMMARY\s*[:：]|$)/i);
  if (vm) {
    verbatim = vm[1].trim();
    if (/^none\.?$/i.test(verbatim)) verbatim = '';
  }
  const sm = txt.match(/SUMMARY\s*[:：]\s*([\s\S]+)/i);
  let summary = sm ? sm[1].trim() : txt.trim();
  // 模型没按格式输出时，用图纸特征词兜底判定（宁可当图纸走人工，也不要瞎报尺寸）
  if (!kind) {
    kind = /(title block|section view|tolerance|datum|dimension|blueprint|图纸|标题栏|公差|剖视|比例\s*1\s*:|scale\s*1\s*:)/i.test(txt)
      ? 'drawing' : 'other';
  }
  return { kind, summary: summary.slice(0, 1200), verbatim: verbatim.slice(0, 800) };
}

async function analyzeImage(ai, dataUri, forceAll, userLang) {
  const attempts = [];
  let best = null;
  const prompt = buildVisionPrompt(userLang);
  for (let i = 0; i < VISION_TRIES.length; i++) {
    const cand = VISION_TRIES[i];
    const t0 = Date.now();
    try {
      const input = cand.kind === 'llava'
        ? {
            image: Array.from(dataUriToBytes(dataUri)),
            prompt: prompt,
            max_tokens: 600,
            temperature: 0.2,
          }
        : {
            messages: [{
              role: 'user',
              content: [
                { type: 'image_url', image_url: { url: dataUri } },
                { type: 'text', text: prompt },
              ],
            }],
            max_tokens: 600,
            temperature: 0.2,
          };
      // Workers AI 不接受外部 AbortSignal，用 Promise.race 做软超时，避免图片请求拖死整条链路
      const timer = new Promise(function (_, reject) {
        setTimeout(function () {
          reject(Object.assign(new Error('vision timeout'), { name: 'AbortError' }));
        }, VISION_TIMEOUT_MS);
      });
      const res = await Promise.race([ai.run(cand.model, input), timer]);
      let txt = '';
      if (res && typeof res === 'object') txt = res.response || res.description || res.result || '';
      if (Array.isArray(txt)) txt = txt.join(' ');
      txt = String(txt || '').trim();
      if (!txt) throw new Error('empty vision output');
      const ms = Date.now() - t0;
      console.log('Vision ok via ' + cand.model + ' in ' + ms + 'ms (' + txt.length + ' chars)');
      attempts.push({ model: cand.model, ms: ms, ok: true, chars: txt.length });
      if (!best) {
        const parsed = parseVisionOutput(txt);
        parsed.attempts = attempts;
        best = parsed;
        // 非诊断模式：第一个成功就返回，不浪费配额和延迟
        if (!forceAll) return best;
      }
    } catch (e) {
      const ms = Date.now() - t0;
      attempts.push({ model: cand.model, ms: ms, err: (e && e.message) || 'unknown' });
      console.warn('Vision failed [' + cand.model + '] after ' + ms + 'ms: ' + (e && e.message));
    }
  }
  if (best) { best.attempts = attempts; return best; }
  return { kind: '', summary: '', verbatim: '', attempts: attempts };
}

// 图纸受理话术：不交给模型自由发挥，固定口径 + 把视觉摘要作为"初步识别"附上。
// 原因：给模型下"必须提邮箱/必须说人工复核"这类硬指令，它经常只回一句零件描述就收尾，
// 而图纸询盘是最需要转化的一步——这封信宁可写得死一点，也不能漏掉"发原图给工程师"。
function buildDrawingReply(userLang, summary, verbatim) {
  const isZh = userLang === 'zh' || userLang === 'yue';
  const blocks = [];
  if (isZh) {
    blocks.push('图纸已收到，这一单按"人工复核"处理——已转给我们的工程师。');
    if (summary) blocks.push('机器人先帮您过了一遍，初步识别到：' + summary);
    if (verbatim) blocks.push('图中读到的文字：' + verbatim);
    blocks.push('需要说明：照片或截图上的尺寸、公差不能直接作为加工依据（可能看不清、也可能被压缩失真）。请把 STEP / PDF / DXF 原图发到 ' + FAQ_EMAIL + '，或走官网询价表单上传；工程师通常 2 个工作小时内回复可行性、工艺建议与正式报价。');
  } else {
    blocks.push('Drawing received — I have routed it to our engineers for manual review.');
    if (summary) blocks.push('A first automated read found: ' + summary);
    if (verbatim) blocks.push('Text read from the image: ' + verbatim);
    blocks.push('One caveat: dimensions and tolerances on a photo or screenshot cannot be used as a machining basis — they may be unreadable or distorted by compression. Please send the original STEP / PDF / DXF to ' + FAQ_EMAIL + ' (or upload via the RFQ form); engineers usually reply within 2 business hours with feasibility, process advice and a formal quote.');
  }
  return blocks.join('\n\n');
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
    zh: '我们的精密加工公差可达 ±0.005mm（关键特征，5 轴联动 + 精密磨削），角度公差 ±0.01°，表面粗糙度最高 Ra 0.4。具体以零件特征与材料为准——把图纸发来，工程师会给出每个特征的可达精度。',
    yue: '我哋嘅精密加工公差可達 ±0.005mm（關鍵特徵，5 軸聯動 + 精密磨削），角度公差 ±0.01°，表面粗糙度最高 Ra 0.4。具體以零件特徵同材料為準——將圖紙發嚟，工程師會逐個特徵話你知可達精度。',
    en: 'Tolerance: down to ±0.005mm on critical features (5-axis machining + precision grinding), angular ±0.01°, surface finish down to Ra 0.4. Exact capability depends on the feature and material — send your drawing and our engineers will confirm feature by feature.',
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

function createSseStream(fullContent, conversationId, meta) {
  const encoder = new TextEncoder();
  let index = 0;
  const chunkSize = 3;

  const stream = new ReadableStream({
    start(controller) {
      // 图片类型先告诉前端（drawing 要走"转人工"提示），再推正文
      if (meta && meta.vision) {
        const frame = { event: 'vision', kind: meta.vision };
        if (meta.debug) frame.debug = meta.debug;
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(frame)}\n\n`));
      } else if (meta && meta.debug) {
        // 视觉全失败时也回一帧，便于诊断（仅 debug 请求）
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event: 'vision', kind: '', debug: meta.debug })}\n\n`));
      }
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

  // 方案 B：Workers AI 绑定（免密钥，CF 网络内调用）。模型可被环境变量覆盖。
  const ai = env.AI;
  const model = env.AI_MODEL || AI_MODEL_DEFAULT;
  if (!ai) {
    return jsonResponse(500, { code: 500, msg: 'Server configuration error: AI binding missing' }, origin);
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
    history: history,
    image: imageData,
    debug: debugMode,
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
    // 会话轮次计数：用于"高意向未留资"告警的参与度判断
    customerProfile.msg_count = (customerProfile.msg_count || 0) + 1;

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
    } else {
      // 非首条消息：原先只带客户档案，完全没有语言提示，bot 会在多轮对话中切回英文。
      // 这里补一条轻量语言指令（首条消息已由 buildContextPrefix 下发，不重复）。
      finalMessage = buildLanguageDirective(visitorLangRaw, userLang) + (profileContext || '') + message;
    }
  } catch (e) {
    finalMessage = message;
    console.warn('Profile context build failed:', e.message);
  }

  // ===== 看图：访客上传图片 → 视觉模型识别 → 按类型决定话术 =====
  // 工程图纸 → 走"人审"口径（列可见要点 + 明确说明照片读尺不可靠 + 引导发原图，工程师复核）；
  // 其余图片（聊天截图/文件/实物照片）→ 直接依据图中信息回答客户的提问。
  let visionKind = '';
  let visionSummary = '';
  let visionText = '';
  let visionAttempts = null;
  if (imageData && typeof imageData === 'string') {
    const vision = await analyzeImage(ai, imageData, !!debugMode, userLang);
    visionKind = vision.kind;
    visionSummary = vision.summary;
    visionText = vision.verbatim || '';
    visionAttempts = vision.attempts || null;
    const textBlock = visionText ? ('\nVisible text in the image (verbatim, quote it when relevant):\n' + visionText + '\n') : '';
    if (visionSummary) {
      if (visionKind === 'drawing') {
        finalMessage = '[The user uploaded what looks like an ENGINEERING DRAWING. Vision reading: ' + visionSummary + ']' + textBlock + '\n'
          + 'Instruction (highest priority): treat this as a drawing enquiry that needs a human engineer.\n'
          + '1) Confirm the drawing was received.\n'
          + '2) Mention only the features actually present in the reading above (material, size, holes, threads, tolerances, surface finish). NEVER invent or guess dimensions or numbers.\n'
          + '3) Say plainly that a photo or screenshot of a drawing cannot be read reliably for dimensions and tolerances, so an engineer will review it manually.\n'
          + '4) Ask them to send the original STEP / PDF / DXF (or the RFQ form) to ' + FAQ_EMAIL + ' for a formal quote, typically within 2 business hours.\n'
          + '5) Reply in the customer language, under 120 words, plain text with no markdown symbols.\n\n'
          + finalMessage;
      } else {
        finalMessage = '[The user uploaded an image. Vision reading: ' + visionSummary + ']' + textBlock + '\n'
          + 'Instruction: answer the customer directly using the image content above.\n'
          + '- If it contains text (chat screenshot, document, spec sheet), quote the relevant original wording and respond to the question or requirement it raises.\n'
          + '- If it shows a part, say what you can see and what matters for machining and quoting.\n'
          + '- Never claim you cannot see images. Never invent details that are not in the reading.\n'
          + '- Reply in the customer language, plain text, no markdown symbols.\n\n'
          + finalMessage;
      }
    } else {
      finalMessage = '[The user uploaded an image but automated image analysis returned nothing. Do NOT say you cannot see or process images. Thank the user, note that our engineers will review the image, and ask them to also send the original drawing (STEP/PDF/DXF) or the full text to ' + FAQ_EMAIL + ' for a precise answer.]\n\n' + finalMessage;
    }
  }

  // ===== 工程图纸：直接出"已转人工"话术，不交给模型自由发挥 =====
  // 图纸询盘是转化最关键的一步：必须固定出现"人工复核 + 发原图 + 邮箱 + 时效"。
  // 交给 LLM 复述时它常只回一句尺寸描述就结束，漏掉引导（实测）。
  if (imageData && visionKind === 'drawing') {
    const drawingReply = buildDrawingReply(userLang, visionSummary, visionText);
    const drawMeta = { vision: 'drawing', debug: debugMode ? visionAttempts : null };
    console.log('Drawing enquiry → human review, summary len', (visionSummary || '').length);
    return new Response(createSseStream(drawingReply, conversationId || ('draw_' + userId), drawMeta), {
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

  // ===== FAQ 秒答拦截层 =====
  // 高频问题（询价/公差/MOQ/五轴/CMM/ISO…）命中即流式直答，不进 LLM。
  // 0.5s 内响应（对比 LLM 路径 8-15s），且预写口径 100% 准确。
  // NDA 签署请求先手拦截：必须放在 matchFaq **之前** —— matchFaq 只对 zh/en 生效
  // （内部直接 return null），印尼语/西语等语种的"签 NDA"请求会原样漏给 LLM，
  // R17 的违规回复就是这样产生的。语言无关层先接住，命中即正确口径秒答，不进 LLM。
  // ===== 图片请求跳过 FAQ 秒答 =====
  // 带图时必须让模型读图后回答；若文字命中 FAQ 就直接秒答，等于把图丢了。
  const faqHit = imageData
    ? null
    : (matchNdaRequest(message, visitorLangRaw, userLang) || matchFaq(message, userLang, visitorLangRaw));
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
        const touchPromise = saveCustomerProfile(kv, userId, customerProfile)
          .then(() => maybeAlertLead(kv, userId, customerProfile, env.FEEDBACK_WEBHOOK_URL || ''));
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

  // ===== 成长系统：记录 FAQ 未命中的问题（供后续补 FAQ / 知识库）=====
  // 未命中 FAQ 的问题按天聚合到 KV（qa-gap:YYYY-MM-DD），去重，最多 300 条/天。
  // 用途：定期分析高频缺口 → 补进 FAQ 秒答层或博客知识库 → 客服"越用越准"。
  if (kv) {
    const gapKey = 'qa-gap:' + new Date().toISOString().split('T')[0];
    const gapMsg = message.slice(0, 300);
    const gapPromise = (async () => {
      try {
        let list = await kv.get(gapKey, 'json');
        if (!Array.isArray(list)) list = [];
        if (list.length < 300 && !list.includes(gapMsg)) {
          list.push(gapMsg);
          await kv.put(gapKey, JSON.stringify(list), { expirationTtl: 90 * 24 * 60 * 60 });
        }
      } catch (e) {
        console.warn('qa-gap log failed:', e.message);
      }
    })();
    if (context.waitUntil) context.waitUntil(gapPromise);
  }

  // ===== 方案 B：构建系统提示词 + 博客知识库检索（只算一次）=====
  // 知识库检索用原始 message（不含 profile/context 前缀，避免污染检索词）。
  const knowledge = retrieveKnowledge(message, userLang, 3);
  const systemPrompt = buildSystemPrompt({ lang: userLang, knowledge });

  try {
    let result = null;
    let currentMessage = finalMessage;
    let currentConvId = conversationId || undefined;
    let retryCount = 0;
    let lastFailureReason = '';

    const chatStart = Date.now();

    while (retryCount <= MAX_RETRY_COUNT) {
      // 重试调用单独限时：只给"剩余预算"，超时就放弃重试、沿用首轮结果，
      // 避免串行叠加突破 Worker 时长上限。
      const elapsed = Date.now() - chatStart;
      const callTimeout = retryCount === 0
        ? AI_TIMEOUT_MS
        : Math.max(6000, TOTAL_BUDGET_MS - elapsed - 1000);

      let attempt;
      try {
        attempt = await callWorkersAI({
          message: currentMessage,
          userId,
          conversationId: currentConvId,
          ai,
          model,
          systemPrompt,
          history,
          timeoutMs: callTimeout,
        });
      } catch (err) {
        // Workers AI 失败（超时/空内容/绑定缺失）不重试：超时再跑必然突破 Worker 时长上限，
        // 绑定或模型错误重试也无效，首轮失败直接交给外层报 502。
        if (retryCount === 0) throw err;
        // 质量校验后的重试若失败：首轮有结果就沿用；首轮也没有，交给外层报错
        if (!result) throw err;
        console.warn('Retry call failed, keeping first result:', err.message);
        break;
      }

      result = attempt;

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

      // 后置改写：bot 承诺"在聊天里即时签 NDA" → 删掉违规句、补正确口径。
      // 同样走本地改写而非判不合格重试（理由同邮箱护栏：重试 = 再跑一次 LLM，耗时翻倍）。
      const ndaFix = fixNdaOnlineSign(result.content, visitorLangRaw, userLang);
      if (ndaFix.fixed) {
        console.log('NDA online-sign promise rewritten:', visitorLangRaw || userLang);
        result.content = ndaFix.text;
      }

      // 后置硬改：设备台数（模型随机性致偶尔偏 24，重试漏网）→ 确定性替换回 30 台，零延迟
      const cntFix = fixMachineCount(result.content, userLang);
      if (cntFix.fixed) {
        console.log('Machine count corrected to 30:', userLang);
        result.content = cntFix.text;
      }
      // 后置硬改：五轴定位精度过度宣称（R09 真违规）→ 整句替换为正确口径
      const accFix = fixFiveAxisAccuracy(result.content, userLang);
      if (accFix.fixed) {
        console.log('Five-axis accuracy overclaim rewritten:', userLang);
        result.content = accFix.text;
      }

      const validation = validateReply(message, result.content, userLang);

      if (validation.valid) break;

      lastFailureReason = validation.reason;
      retryCount++;

      // 语言类：Coze bot 若生不出某个语种，多试几次通常还是不行（R12 印地语 / R20 希腊
      // 实测连跑均为英文），而每次重试都是一次完整 LLM 调用、串行累加 10s 以上。
      // 默认不再为语言问题重试，改由多语种兜底话术保证语种不失。
      const isLangFail = /^language_mismatch/.test(validation.reason);
      if (isLangFail) {
        // 只有「本不该中文却回中文」这种确定漂移才值得重试一次（retryCount 已自增，==1 表示首次失败）：
        // 重试用 buildRetryMessage 下发目标语种强指令，可能救回真实回答；否则只能落兜底、内容丢失。
        // 其余独有文字错位 / 目标文字缺失（拉丁语系连跑仍错）直接落兜底，不浪费一次 LLM 调用。
        const isZhDrift = /reply=zh\b/.test(validation.reason) && !/expected=zh/.test(validation.reason);
        if (isZhDrift && LANG_RETRY_ENABLED && retryCount === 1) {
          console.log('Language drift (Chinese) — retry once in target language:', validation.reason);
          currentMessage = buildRetryMessage(message, validation.reason, userLang, retryCount, visitorLangRaw);
          currentConvId = undefined; // 重试用新会话，避免历史干扰
          continue;
        }
        result.content = getFallbackReply(userLang, visitorLangRaw);
        console.warn('Language mismatch → fallback reply:', validation.reason);
        break;
      }
      const maxRetry = MAX_RETRY_COUNT;
      if (retryCount > maxRetry) {
        console.warn('Quality check failed after all retries:', validation.reason);
        break;
      }

      // 延迟预算：再跑一次大概率突破 TOTAL_BUDGET_MS 时，直接接受当前结果。
      // 重试耗尽本来也照样返回这份回复（见上），不如省下这 10 秒。
      if (Date.now() - chatStart + RETRY_RESERVE_MS > TOTAL_BUDGET_MS) {
        console.warn('Quality check failed, retry skipped (latency budget):', validation.reason);
        break;
      }

      console.log('Quality check failed (attempt ' + retryCount + '):', validation.reason);

      currentMessage = buildRetryMessage(message, validation.reason, userLang, retryCount, visitorLangRaw);
      currentConvId = undefined; // 重试用新会话，避免历史干扰
    }

    // 兜底：重试耗尽仍没有任何正文时，绝不能给访客一个空气泡。
    // 抛错交给外层 catch → 返回 502 → 前端显示"服务暂时不可用"。
    if (!result || !result.content || !result.content.trim()) {
      throw new Error('Empty reply after retries: ' + (lastFailureReason || 'no_content'));
    }

    const visionMeta = imageData
      ? { vision: visionKind, debug: debugMode ? visionAttempts : null }
      : null;
    const outputStream = createSseStream(result.content, result.conversationId, visionMeta);

    // ===== 异步：信息提取 & 档案更新 =====
    // 使用 waitUntil 确保即使响应已发送，Worker 也会等待这个 Promise 完成
    if (kv && result && result.content) {
      const needExtract = shouldExtractInfo(message, result.content, customerProfile);
      if (needExtract) {
        console.log('Triggering profile extraction for:', userId);
        const extractionPromise = asyncExtractAndSave(
          kv, userId, message, result.content, customerProfile, userLang, ai, model,
          env.FEEDBACK_WEBHOOK_URL || ''
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

        const touchPromise = saveCustomerProfile(kv, userId, customerProfile)
          .then(() => maybeAlertLead(kv, userId, customerProfile, env.FEEDBACK_WEBHOOK_URL || ''));
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
