/**
 * 三语技术博客的 hreflang 对页解析。
 *
 * 背景：博客详情页是动态路由 /knowledge/tech-blog/[...slug]/，
 * SEOHead 靠 import.meta.glob 枚举出的键是模板而非具体路径，
 * routes.has() 恒为 false → 自动推断永远落空、一条 hreflang 都不输出。
 * 因此这里直接读三个集合（blog / zhBlog / ruBlog）的可用 slug，
 * 按「同 slug 即同篇」约定给出三语对页路径。
 *
 * 约定：三套集合的文件名（= slug）一一对应；draft 不参与。
 */
import { getCollection } from 'astro:content';

type Lang = 'en' | 'zh' | 'ru';

const COLLECTION: Record<Lang, 'blog' | 'zhBlog' | 'ruBlog'> = {
  en: 'blog',
  zh: 'zhBlog',
  ru: 'ruBlog',
};

const PREFIX: Record<Lang, string> = {
  en: '/knowledge/tech-blog',
  zh: '/zh/knowledge/tech-blog',
  ru: '/ru/knowledge/tech-blog',
};

/** 各语言「已上线（非草稿）」的文章 slug 集合 */
export async function getBlogSlugSets(): Promise<Record<Lang, Set<string>>> {
  const pairs = await Promise.all(
    (Object.keys(COLLECTION) as Lang[]).map(async (l) => {
      const posts = await getCollection(COLLECTION[l], ({ data }) => !data.draft);
      return [l, new Set(posts.map((p) => p.slug))] as [Lang, Set<string>];
    })
  );
  return Object.fromEntries(pairs) as Record<Lang, Set<string>>;
}

/**
 * 给定一篇文章的 slug，返回实际存在的三语对页（带尾斜杠的站内路径）。
 * 某语言缺该篇时对应键直接省略 —— SEOHead 只对存在的键发 hreflang，
 * 绝不产生悬空标注。
 */
export function blogAlternates(
  slug: string,
  sets: Record<Lang, Set<string>>
): { en?: string; zh?: string; ru?: string } {
  const out: { en?: string; zh?: string; ru?: string } = {};
  for (const l of Object.keys(PREFIX) as Lang[]) {
    if (sets[l].has(slug)) out[l] = `${PREFIX[l]}/${slug}/`;
  }
  return out;
}
