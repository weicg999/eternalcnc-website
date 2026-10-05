/**
 * BreadcrumbList 结构化数据 —— 由 URL 路径推导层级，全站通用。
 *
 * 设计要点（三条，都是踩过的坑）：
 *
 * 1. 【标签表必须按「完整路径」建，不能按「路径片段」建】
 *    /capabilities/materials 与 /materials 中文都叫"材料"，但站点真实标签是
 *    「材料范围」vs「材料中心」；英文是 Material Range vs Materials。
 *    若按片段 'materials' 建表，两条路径会撞成同一个标签 —— 与站内真实导航不一致。
 *
 * 2. 【标签文案全部取自 Navbar.astro 的 l / lzh / lru 字段】
 *    面包屑是给用户看的导航，搜索引擎会拿它和站内实际导航比对。
 *    另起一套译法会造成「结构化数据说的和页面上写的不一样」，属于自相矛盾。
 *    设备型号则取自各设备详情页真实 <h1>（zh 用中文品牌名，en/ru 用拉丁型号，已实测）。
 *
 * 3. 【首页与 404 不发 BreadcrumbList】
 *    面包屑只有一级 = 没有层级，Google 建议省略；404 更不应发。
 *    同理 noindex 页面（跳板页）由调用方一并跳过。
 *
 * 未收录的路径走 humanize() 兜底（把 slug 转成可读标题），
 * 因此新增页面即使忘记加词表也不会崩，只是标签略逊 —— 宁可略逊，不可报错。
 */

export type Lang = 'en' | 'zh' | 'ru';

const HOME_LABEL: Record<Lang, string> = {
  en: 'Home',
  zh: '首页',
  ru: 'Главная',
};

/** 语言无关的 rest 路径 → 三语标签。key 一律以 / 开头、无尾斜杠。 */
const CRUMB: Record<string, Record<Lang, string>> = {
  // ── 加工服务 ──
  '/services': { en: 'Services', zh: '加工服务', ru: 'Услуги' },
  '/services/cnc-machining': { en: 'CNC Machining', zh: 'CNC 精密加工', ru: 'Фрезерование ЧПУ' },
  '/services/cnc-turning': { en: 'CNC Turning', zh: '数控车削', ru: 'Токарная обработка ЧПУ' },
  '/services/precision-grinding': { en: 'Precision Grinding', zh: '精密磨削', ru: 'Прецизионное шлифование' },
  '/services/wire-edm': { en: 'Wire EDM', zh: '线切割 (EDM)', ru: 'Электроэрозионная резка (EDM)' },
  '/services/dfm-analysis': { en: 'DFM Analysis', zh: 'DFM 分析', ru: 'DFM-анализ' },
  '/services/material-selection': { en: 'Material Selection', zh: '材料选型', ru: 'Подбор материалов' },
  '/services/surface-treatment': { en: 'Surface Treatment', zh: '表面处理', ru: 'Финишная обработка поверхности' },
  '/services/quality-inspection': { en: 'Quality Inspection', zh: '质量检测', ru: 'Контроль качества' },

  // ── 工艺能力 ──
  '/capabilities': { en: 'Capabilities', zh: '工艺能力', ru: 'Возможности' },
  '/capabilities/equipment': { en: 'Equipment List', zh: '设备清单', ru: 'Перечень оборудования' },
  '/capabilities/tolerance': { en: 'Tolerance Standards', zh: '精度标准', ru: 'Допуски и точность' },
  '/capabilities/materials': { en: 'Material Range', zh: '材料范围', ru: 'Номенклатура материалов' },
  '/capabilities/size-range': { en: 'Size Range', zh: '加工尺寸范围', ru: 'Диапазон размеров' },
  '/capabilities/lead-time': { en: 'Lead Time', zh: '交期说明', ru: 'Сроки изготовления' },

  // ── 设备 ──
  '/equipment': { en: 'Equipment', zh: '设备', ru: 'Оборудование' },
  '/equipment-matrix': { en: 'Equipment Matrix', zh: '设备矩阵', ru: 'Матрица оборудования' },

  // ── 材料 ──
  '/materials': { en: 'Materials', zh: '材料中心', ru: 'Материалы' },

  // ── 行业应用 ──
  '/industries': { en: 'Industries', zh: '行业应用', ru: 'Отрасли' },
  '/industries/automotive': { en: 'Automotive', zh: '汽车制造', ru: 'Автомобилестроение' },
  '/industries/medical': { en: 'Medical Devices', zh: '医疗器械', ru: 'Медицинское оборудование' },
  '/industries/electronics': { en: 'Electronics', zh: '电子通信', ru: 'Электроника и связь' },
  '/industries/robotics': { en: 'Robotics', zh: '工业机器人', ru: 'Промышленные роботы' },
  '/industries/communications-satellite': { en: 'Communications & Satellite Equipment', zh: '通信与卫星设备', ru: 'Связь и спутниковое оборудование' },
  '/industries/energy': { en: 'Energy Equipment', zh: '能源装备', ru: 'Энергетическое оборудование' },
  '/industries/automation-equipment': { en: 'Automation Equipment', zh: '自动化设备', ru: 'Оборудование автоматизации' },

  // ── 案例 ──
  '/cases': { en: 'Cases', zh: '案例展示', ru: 'Кейсы' },
  '/cases/automotive': { en: 'Automotive Cases', zh: '汽车零部件案例', ru: 'Кейсы: автомобили' },
  '/cases/medical': { en: 'Medical Cases', zh: '医疗器械案例', ru: 'Кейсы: медицина' },
  '/cases/electronics': { en: 'Electronics Cases', zh: '电子零件案例', ru: 'Кейсы: электроника' },
  '/cases/robotics': { en: 'Robotics Cases', zh: '机器人零件案例', ru: 'Кейсы: робототехника' },
  '/cases/cnc': { en: 'CNC Machining Cases', zh: 'CNC 加工案例', ru: 'Кейсы: фрезерование ЧПУ' },
  '/cases/turning': { en: 'Turning Cases', zh: '车削件案例', ru: 'Кейсы: токарная обработка' },
  '/cases/5-axis': { en: '5-Axis Cases', zh: '五轴加工案例', ru: 'Кейсы: 5-осевая обработка' },
  '/cases/prototype': { en: 'Prototype', zh: '小批量打样', ru: 'Прототипирование' },
  '/cases/mass-production': { en: 'Mass Production', zh: '大批量量产', ru: 'Серийное производство' },

  // ── 知识库 ──
  '/knowledge': { en: 'Knowledge', zh: '知识库', ru: 'База знаний' },
  '/knowledge/tech-blog': { en: 'Tech Blog', zh: '技术博客', ru: 'Технический блог' },
  '/knowledge/faq': { en: 'FAQ', zh: 'FAQ 常见问题', ru: 'Часто задаваемые вопросы' },
  '/knowledge/news': { en: 'Industry & News', zh: '行业与新闻', ru: 'Отрасль и новости' },
  '/knowledge/whitepapers': { en: 'Whitepapers', zh: '白皮书', ru: 'Технические статьи' },
  '/knowledge/case-studies': { en: 'Case Studies', zh: '案例研究', ru: 'Примеры проектов' },
  '/knowledge/material-handbook': { en: 'Material Handbook', zh: '材料手册', ru: 'Справочник материалов' },
  '/knowledge/dfm-guide': { en: 'DFM Design Guide', zh: 'DFM 设计指南', ru: 'Руководство по DFM' },
  '/knowledge/dfm-guides': { en: 'DFM Design Guides', zh: 'DFM 设计指南', ru: 'Руководство по DFM' },
  '/knowledge/choose-cnc-supplier': { en: 'How to Choose a Supplier', zh: '如何选供应商', ru: 'Как выбрать поставщика' },
  // 以下为未进导航的独立落地页
  '/knowledge/tolerance': { en: 'Machining Tolerances', zh: '加工公差', ru: 'Допуски на обработку' },
  '/knowledge/machining-tolerances': { en: 'Machining Tolerances', zh: '加工公差', ru: 'Допуски на обработку' },
  '/knowledge/dfm-analysis': { en: 'DFM Analysis', zh: 'DFM 分析', ru: 'DFM-анализ' },
  '/knowledge/quality': { en: 'Quality', zh: '质量', ru: 'Качество' },
  '/knowledge/quality-certification': { en: 'Quality Certification', zh: '质量认证', ru: 'Сертификация качества' },
  '/knowledge/surface-finishing': { en: 'Surface Finishing', zh: '表面处理', ru: 'Финишная обработка' },
  '/knowledge/design-guidelines': { en: 'Design Guidelines', zh: '设计指南', ru: 'Рекомендации по проектированию' },
  '/knowledge/material-guide': { en: 'Material Guide', zh: '材料指南', ru: 'Справочник материалов' },
  '/knowledge/technical-resources': { en: 'Technical Resources', zh: '技术资源', ru: 'Технические ресурсы' },
  '/knowledge/news/issue-01': { en: 'Issue 01', zh: '第 01 期', ru: 'Выпуск 01' },
  '/knowledge/news/issue-02': { en: 'Issue 02', zh: '第 02 期', ru: 'Выпуск 02' },
  '/knowledge/news/issue-03': { en: 'Issue 03', zh: '第 03 期', ru: 'Выпуск 03' },

  // ── 公司 / 其他 ──
  '/about': { en: 'About', zh: '关于我们', ru: 'О нас' },
  '/contact': { en: 'Contact', zh: '联系我们', ru: 'Контакты' },
  '/contact/get-a-quote': { en: 'Get a Quote', zh: '获取报价', ru: 'Запросить расчёт' },
  '/resources': { en: 'Resources', zh: '资源中心', ru: 'Ресурсы' },
  '/careers': { en: 'Careers', zh: '招聘', ru: 'Карьера' },
  '/news': { en: 'News', zh: '新闻', ru: 'Новости' },
  '/parts-gallery': { en: 'Parts Gallery', zh: '零件图库', ru: 'Галерея деталей' },
  '/rfq': { en: 'Request a Quote', zh: '获取报价', ru: 'Запросить расчёт' },
  '/qr': { en: 'QR Codes', zh: '二维码', ru: 'QR-коды' },
  '/privacy-policy': { en: 'Privacy Policy', zh: '隐私政策', ru: 'Политика конфиденциальности' },
  '/confidentiality': { en: 'Confidentiality', zh: '保密政策', ru: 'Конфиденциальность' },
};

/**
 * 设备型号显示名。取自各设备详情页真实 <h1>：
 * 英文/俄文页沿用拉丁型号（已实测俄文页同英文），中文页用中文品牌名。
 */
const EQUIPMENT_MODEL: Record<string, { en: string; ru: string; zh: string }> = {
  'cato-ct80': { en: 'CATO CT-80', ru: 'CATO CT-80', zh: '巨冈 CT-80' },
  'hexagon-inspector-classic': { en: 'Hexagon INSPECTOR CLASSIC', ru: 'Hexagon INSPECTOR CLASSIC', zh: '海克斯康 INSPECTOR CLASSIC' },
  'jiafu-jf500': { en: 'Jiafu JF-500', ru: 'Jiafu JF-500', zh: '佳富 JF-500' },
  'jiafu-jf600': { en: 'Jiafu JF-600', ru: 'Jiafu JF-600', zh: '佳富 JF-600' },
  'qiaohong-qh-t6': { en: 'Qiaohong QH-T6', ru: 'Qiaohong QH-T6', zh: '乔鸿 QH-T6' },
  'sunrise-dmu400-5axis': { en: 'SUNRISE DMU-400 5-Axis', ru: 'SUNRISE DMU-400 5-Axis', zh: 'SUNRISE DMU-400' },
  'taikan-t-v856s': { en: 'Taikan T-V856S', ru: 'Taikan T-V856S', zh: '台群 T-V856S' },
  'taikan-t500s': { en: 'Taikan T-500S', ru: 'Taikan T-500S', zh: '台群 T-500S' },
  'taikan-t700se': { en: 'Taikan T-700SE', ru: 'Taikan T-700SE', zh: '台群 T-700SE' },
  'taikan-tv1270s': { en: 'Taikan T-V1270S', ru: 'Taikan T-V1270S', zh: '台群 T-V1270S' },
  'wanghui-xh540': { en: 'WANGHUI XH-540', ru: 'WANGHUI XH-540', zh: '望辉机械 XH-540' },
  'xintenghui-xth-t540': { en: 'XINTENGHUI XTH-T540', ru: 'XINTENGHUI XTH-T540', zh: '鑫腾辉数控 XTH-T540' },
};

/** 词表未收录时把 slug 转成可读标题（cato-ct80 → Cato Ct80）。 */
const humanize = (seg: string) =>
  seg
    .replace(/\.html$/, '')
    .split('-')
    .filter(Boolean)
    .map((w) => (/^\d/.test(w) ? w : w[0].toUpperCase() + w.slice(1)))
    .join(' ');

export interface Crumb {
  name: string;
  /** 末级（当前页）不带 href —— Google 建议最后一级省略 item */
  href?: string;
}

/** 去掉尾斜杠（根路径保留 '/'） */
const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : '/');

/** 取语言前缀剥掉后的 rest 路径，如 /zh/capabilities/tolerance → /capabilities/tolerance */
function restPath(pathname: string): string {
  const p = norm(pathname);
  if (p === '/') return '/';
  const m = p.match(/^\/(zh|ru)(\/.*)?$/);
  if (m) return norm(m[2] || '/');
  return p;
}

export function langOf(pathname: string): Lang {
  const p = norm(pathname);
  if (p === '/zh' || p.startsWith('/zh')) return 'zh';
  if (p === '/ru' || p.startsWith('/ru')) return 'ru';
  return 'en';
}

/** 该语言下的首页地址（en 无前缀） */
const homeHref = (lang: Lang) => (lang === 'en' ? '/' : `/${lang}/`);

/** 拼回带尾斜杠的绝对地址，与站内 canonical 形式一致 */
const abs = (lang: Lang, rest: string, site: URL | undefined) => {
  const path = rest === '/' ? homeHref(lang) : `${homeHref(lang)}${rest.replace(/^\//, '')}/`;
  return site ? new URL(path, site).href : path;
};

/**
 * 由路径生成面包屑层级。
 * @param pathname Astro.url.pathname
 * @param lastNameOverride 末级自定义名（页面可用 breadcrumbTitle 覆盖，例如博客文章标题）
 * @returns 至少两项；首页 / 404 返回空数组（调用方据此不发 schema）
 */
export function buildBreadcrumbs(
  pathname: string,
  site?: URL,
  lastNameOverride?: string
): Crumb[] {
  const lang = langOf(pathname);
  const rest = restPath(pathname);
  const segs = rest.split('/').filter(Boolean);

  // 首页无层级可言，不发面包屑
  if (segs.length === 0) return [];
  // 404 页同理
  if (segs[segs.length - 1].toLowerCase() === '404') return [];

  const crumbs: Crumb[] = [{ name: HOME_LABEL[lang], href: abs(lang, '/', site) }];

  let acc = '';
  segs.forEach((seg, i) => {
    acc += `/${seg}`;
    const isLast = i === segs.length - 1;
    // 末级优先用调用方传入的标题（如博客文章名），其次查词表，最后 humanize 兜底
    const label =
      isLast && lastNameOverride
        ? lastNameOverride
        : EQUIPMENT_MODEL[seg]?.[lang] ??
          CRUMB[acc]?.[lang] ??
          humanize(seg);
    crumbs.push({ name: label, href: isLast ? undefined : abs(lang, acc, site) });
  });

  return crumbs;
}

/** 包成 schema.org BreadcrumbList。首页/无层级时返回 null，调用方跳过输出。 */
export function breadcrumbSchema(crumbs: Crumb[]) {
  if (crumbs.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: c.href } : {}),
    })),
  };
}

/**
 * 由页面自带的可见面包屑（PageLayout 的 breadcrumbs 属性）生成 schema。
 *
 * ★ 为什么优先用它、而不是一律从 URL 推导：
 *   站点早已有权威的可见面包屑数据（PageLayout → Breadcrumb.astro 渲染给用户看）。
 *   若 schema 另起一套从路径推导，两边一旦不一致，就成了「结构化数据说的和页面上
 *   写的不一样」——正是 Google 判定结构化数据不可信、进而忽略它的典型原因。
 *   所以：**有可见面包屑就以它为准，没有才回落到 URL 推导。**
 *
 * 可见面包屑通常不含「首页」层级（如 Capabilities > Tolerance Standards），
 * 而 schema 里补上 Home 更符合 Google 示例，且 Home 确实是真实层级根；
 * 可见轨迹是 schema 轨迹的后缀，标签逐字一致，不构成矛盾。
 */
export function schemaFromPageBreadcrumbs(
  items: { label: string; href?: string }[] | undefined,
  pathname: string,
  site?: URL
) {
  if (!items || items.length === 0) return null;
  const lang = langOf(pathname);
  const toAbs = (href?: string) => {
    if (!href) return undefined;
    // 允许页面传站内相对路径（'/capabilities'）或已是绝对 URL
    if (/^https?:\/\//i.test(href)) return href;
    const path = href.startsWith('/') ? href : `/${href}`;
    // 去掉 hash（锚点不是独立页面）
    const [p0] = path.split('#');
    // ★ 必须补尾斜杠：页面里常写 href='/capabilities'，但站内 canonical 形式是
    //   '/capabilities/'，而 Cloudflare Pages 对无尾斜杠会 308 跳转。
    //   面包屑 item 指向重定向地址 = 无效标注（与 hreflang 同一原理）。
    const p = p0 === '/' ? '/' : p0.replace(/\/+$/, '') + '/';
    return site ? new URL(p, site).href : p;
  };

  const crumbs: Crumb[] = [{ name: HOME_LABEL[lang], href: abs(lang, '/', site) }];
  items.forEach((it, i) => {
    const isLast = i === items.length - 1;
    crumbs.push({ name: it.label, href: isLast ? undefined : toAbs(it.href) });
  });
  return breadcrumbSchema(crumbs);
}
