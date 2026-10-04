/**
 * Service 结构化数据 —— 能力页（公差 / 材料 / 尺寸范围 / 交期）专用。
 *
 * 为什么是 Service 而不是 Product：
 *   能力页卖的是「加工服务」，不是某个可寄售的实物商品。设备详情页已经用 Product
 *   （那是真机器，语义正确），若能力页也用 Product，两类完全不同的东西共用同一类型，
 *   搜索引擎会拿到互相矛盾的「产品」实体，稀释语义。Service 才是正确选择。
 *
 * 为什么用 "@id" 引用 provider 而不是内嵌一份 Organization：
 *   BaseLayout 已为全站输出 Organization（带 '@id': eternalcnc.com/#organization）。
 *   引用它即可让「公司」与「它提供的服务」连成同一实体，避免重复描述机构信息。
 *
 * 刻意不加的东西（都是有意为之，不是漏了）：
 *   - 不加 aggregateRating：站内没有真实评分数据，编造会被判为垃圾数据。
 *   - 不加 offers / price：能力页是「按图报价」，无标准价，写价格必假。
 *   - 不加 hasOfferCatalog：需要一组带 price 的 Offer 才成立，无真实价则语义空转。
 *   宁可少写，不可造假 —— 结构化数据一旦被抓到编造，整站标记都会被降权。
 */

export type Lang = 'en' | 'zh' | 'ru';

const LANG_NAME: Record<Lang, string> = { en: 'English', zh: 'Chinese', ru: 'Russian' };

/** 全站统一的机构实体 id，必须与 BaseLayout 的 orgSchema['@id'] 一致 */
export const ORG_ID = 'https://eternalcnc.com/#organization';

export interface ServiceOpts {
  /** 页面规范地址（带尾斜杠的绝对 URL） */
  url: string;
  /** 服务名，不含品牌后缀 */
  name: string;
  /** 与页面 description 保持一致 */
  description: string;
  /** 服务类型，如「Precision CNC Machining」 */
  serviceType: string;
  lang: Lang;
}

export function serviceSchema({ url, name, description, serviceType, lang }: ServiceOpts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType,
    description,
    provider: { '@id': ORG_ID },
    areaServed: 'Worldwide',
    url,
    availableLanguage: LANG_NAME[lang],
  };
}
