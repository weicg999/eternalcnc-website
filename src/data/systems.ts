// 内容体系（system）→ 显示名 + 体系首页
// 用于文章页顶部的体系徽章，让读者能从文章跳回所属体系
// href 为空串表示该体系还没有落地页，此时只渲染标签、不渲染链接

export interface SystemMeta {
  label: string;
  href: string;
}

export const SYSTEMS_EN: Record<string, SystemMeta> = {
  general: { label: 'General chain', href: '/knowledge/tech-blog' },
  robotics: { label: 'Robotics', href: '/industries/robotics/' },
  computing: { label: 'Computing & thermal', href: '' },
  energy: { label: 'Energy', href: '/industries/energy/' },
  medical: { label: 'Medical', href: '/industries/medical/' },
  automotive: { label: 'Automotive', href: '/industries/automotive/' },
  electronics: { label: 'Electronics', href: '/industries/electronics/' },
  'automation-equipment': { label: 'Automation equipment', href: '/industries/automation-equipment/' },
  'communications-satellite': { label: 'Comms & satellite', href: '/industries/communications-satellite/' },
};

export const SYSTEMS_ZH: Record<string, SystemMeta> = {
  通用: { label: '通用链', href: '/zh/knowledge/tech-blog' },
  机器人: { label: '机器人', href: '/zh/industries/robotics/' },
  算力与散热: { label: '算力与散热', href: '' },
  电力设备: { label: '电力设备', href: '/zh/industries/energy/' },
  医疗: { label: '医疗', href: '/zh/industries/medical/' },
  汽车: { label: '汽车', href: '/zh/industries/automotive/' },
  电子: { label: '电子', href: '/zh/industries/electronics/' },
  自动化设备: { label: '自动化设备', href: '/zh/industries/automation-equipment/' },
  通信卫星: { label: '通信卫星', href: '/zh/industries/communications-satellite/' },
};
