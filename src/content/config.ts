// Content Collections 配置——文章流水线的"入库校验"层
// 每篇 .md 都按此 schema 校验，缺字段会构建报错，防止坏文章混进站
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content', // markdown/mdx 文件集合
  schema: z.object({
    title: z.string(),
    description: z.string(), // 摘要，用于列表卡片 + SEO meta
    pubDate: z.coerce.date(), // 发布日期
    updatedDate: z.coerce.date().optional(), // 更新日期（可选）
    category: z.enum([
      'Machining Tips', // 加工技巧
      'Material Selection', // 选材指南
      'Process Optimization', // 工艺案例
      'Industry Insights', // 行业洞察
    ]),
    tags: z.array(z.string()).default([]), // 标签
    // 内容体系归属：general = 通用链（所有行业共用），其余对应 /industries/<slug> 行业页
    system: z
      .enum([
        'general',
        'robotics',
        'computing',
        'energy',
        'medical',
        'automotive',
        'electronics',
        'automation-equipment',
        'communications-satellite',
      ])
      .optional(),
    cover: z.string().optional(), // 封面图路径（可选）
    draft: z.boolean().default(false), // true = 草稿不上线
    author: z.string().default('Eternal CNC Engineering Team'),
    readingTime: z.string().optional(),
  }),
});

// 中文文章库——与英文库同构，路由挂在 /zh/knowledge/tech-blog/ 下
const zhBlog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum([
      '加工技巧',
      '选材指南',
      '工艺案例',
      '行业洞察',
    ]),
    tags: z.array(z.string()).default([]),
    // 内容体系归属：通用 = 通用链，其余对应 /zh/industries/<slug> 行业页
    system: z
      .enum([
        '通用',
        '机器人',
        '算力与散热',
        '电力设备',
        '医疗',
        '汽车',
        '电子',
        '自动化设备',
        '通信卫星',
      ])
      .optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    author: z.string().default('鑫永恒工程团队'),
    readingTime: z.string().optional(),
  }),
});

export const collections = { blog, zhBlog };
