---
title: "图纸上那句“去毛刺”，其实什么也没规定"
description: "几乎所有图纸都写着去毛刺，可这三个字没有尺寸、没有方向、没有验收方法。ISO 13715 给的不是一道工序，是一句可检验的话。"
pubDate: 2026-11-12
category: "加工技巧"
tags: ["去毛刺", "图纸标注", "ISO 13715", "DFM", "公差", "验收"]
system: "通用"
author: "鑫永恒工程团队"
readingTime: "9 分钟"
---

你把图纸发出去之前，多半会在技术要求里添一句：去毛刺，锐边倒钝。

这句话看起来挺负责。但在车间和检验台上，它其实是整张图纸里**最没有约束力的一句**。

## 一 · 一句话，四个人读出四种意思

同一句话，落到四个人手里是四件事：

- **编程的**看到它：刀路走完顺手带一刀。
- **操作的**看到它：手摸着不刮手就行。
- **检验的**看到它：只能目视，没有判据可以量。
- **你**收到货：装配时发现配合面被一小片翻边垫住，或者密封面怎么拧都渗。

这时候谁都没做错。工厂确实去了毛刺，检验也确实看了。争不出来，是因为“**去毛刺**”根本不是一条要求，是一个愿望。

它缺四样东西：缺尺寸（去掉多少算够），缺方向（哪一面的毛刺不许有），缺范围（哪几条边适用），缺例外（配合面和普通外露边是不是一个标准）。

这里得把问题的层级摆正：**不是工人去得干不干净，是这句话没有验收条件**。定义错了，后面加多少道检验、怎么罚供应商都补不回来。

## 二 · 标准早就给了写法

ISO 13715:2017 管的就是这件事——技术产品文件里，形状没被定义的边该怎么表示和标注。它的思路很巧：不逼你把每条边都画成倒角，只要求你说清楚**实际边缘允许偏离理论尖角多少**。

三个符号就够了：

| 符号 | 意思 | 用在什么时候 |
|---|---|---|
| `+` | 允许材料多出来 | 毛刺、飞边可以留，但高度有上限 |
| `−` | 要求去掉材料 | 必须破边，但不规定倒圆还是倒角 |
| `±` | 多出来或去掉都允许 | 要同时给上下限 |

数值是**最大偏差量**，不是倒角尺寸。反过来，如果你真要一个 `1 × 45°` 的倒角，那属于几何定义的边。这类边按 ISO 129-1 正常标尺寸，不归 13715 管。

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 306" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ISO 13715 的三种边缘状态：允许材料超出、要求去除材料、以及几何定义的倒角" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">同一条边，三种写法</text>
<rect x="12" y="46" width="150" height="242" rx="9" style="fill:#FAEEDA;stroke:#EF9F27;stroke-width:1"/>
<rect x="185" y="46" width="150" height="242" rx="9" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<rect x="358" y="46" width="150" height="242" rx="9" style="fill:#E1F5EE;stroke:#5DCAA5;stroke-width:1"/>
<text x="87" y="76" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#633806">允许超出</text>
<text x="260" y="76" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">要求去除</text>
<text x="433" y="76" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#085041">几何定义</text>
<text x="87" y="104" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" style="fill:#BA7517">+</text>
<text x="260" y="104" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" style="fill:#185FA5">−</text>
<text x="433" y="104" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#0F6E56">1 × 45°</text>
<path d="M77 150 L127 150" style="fill:none;stroke:#B4B2A9;stroke-width:1;stroke-dasharray:4 3"/>
<path d="M107 150 L107 128" style="fill:none;stroke:#B4B2A9;stroke-width:1;stroke-dasharray:4 3"/>
<path d="M37 150 L107 150 L107 212 L37 212 Z" style="fill:#F1EFE8;stroke:#5F5E5A;stroke-width:2.5;stroke-linejoin:round"/>
<path d="M107 150 L124 134 L107 141 Z" style="fill:#D85A30;stroke:#993C1D;stroke-width:1.5"/>
<path d="M250 150 L300 150" style="fill:none;stroke:#B4B2A9;stroke-width:1;stroke-dasharray:4 3"/>
<path d="M280 150 L280 128" style="fill:none;stroke:#B4B2A9;stroke-width:1;stroke-dasharray:4 3"/>
<path d="M210 150 L266 150 Q280 150 280 164 L280 212 L210 212 Z" style="fill:#F1EFE8;stroke:#185FA5;stroke-width:2.5;stroke-linejoin:round"/>
<path d="M423 150 L473 150" style="fill:none;stroke:#B4B2A9;stroke-width:1;stroke-dasharray:4 3"/>
<path d="M453 150 L453 128" style="fill:none;stroke:#B4B2A9;stroke-width:1;stroke-dasharray:4 3"/>
<path d="M383 150 L439 150 L453 164 L453 212 L383 212 Z" style="fill:#F1EFE8;stroke:#0F6E56;stroke-width:2.5;stroke-linejoin:round"/>
<text x="87" y="244" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">毛刺可留多少</text>
<text x="87" y="268" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">靠数值限定</text>
<text x="260" y="244" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">只限定去掉量</text>
<text x="260" y="268" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">不限定形状</text>
<text x="433" y="244" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">有形状有尺寸</text>
<text x="433" y="268" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">按 129-1 标</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">图 1 · 虚线是理论尖角，实线是实际边缘。前两种只管偏离量，第三种才定义形状</figcaption>
</figure>

把“去毛刺”换成一句带数值的边缘要求，检验台就有东西可量了。这一步不增加加工难度，改的是图纸上的一行字。

国内图纸还有个版本坑要留意。对应国标 **GB/T 19096-2003** 现行，但它等同采用的是 ISO 13715 的 **2000 版**。ISO 已经在 2017 年改版，国标 2023 年复审的结论是修订，全名与出处见文末“主要参考”。

所以国内图纸和国际图纸混着走的时候，图上最好写清依据哪一版。别让供应商和来料检验各按一套读。

## 三 · 为什么在打样厂更麻烦

大批量厂好办：同一条边重复几千次，做一套工装、定一个手法，成本摊得几乎看不见。

打样厂不行。件少、边多，每条边的功能还不一样。定位面、密封面、人手会摸到的外露边、内流道和交叉孔的出口，要求各不相同。毛刺偏偏最爱长在刀具够不着的地方——孔钻穿的那一侧、两条内腔相交的地方。

更麻烦的是**顺序**。镀层或阳极氧化之前没清干净的毛刺，会被膜层盖在里面，变成搭接面上的一个小尖点。这类问题我们在[电力设备零件加工](/zh/knowledge/tech-blog/power-equipment-machining/)和[铜排加工](/zh/knowledge/tech-blog/busbar-fabrication-process/)里都单独讲过，最后都会换算成接触电阻或者贴合不良。

表面处理本身还会改尺寸，倒角倒多了也可能把功能面吃掉。这一层的账在[尺寸该标在处理前还是处理后](/zh/knowledge/tech-blog/before-or-after-finishing/)里算过。

所以去毛刺从来不是最后一道工序，是**排产时就得定下来的顺序问题**。

## 四 · 一张能直接抄进图纸的清单

**第一步，写一条通用要求。** 放在标题栏附近，覆盖所有未定义形状的边，给出一个带符号的数值。示意写法：

> 未定义边按 ISO 13715 标注，一般要求 -0.3；除图中局部标注外适用。

这里的 `-0.3` 取自标准解读里的示例，表示最多允许去掉 0.3 mm，**不是推荐值**。数值要按你自己的功能面定，标准不替你选。

**第二步，把关键边单独拎出来。** 以下几类不要交给通用要求，局部标注优先于通用标注：

- 配合面、定位面 —— 一小片翻边就足以让装配不到位
- 密封面 —— 划伤和毛刺都是渗漏的起点
- 电接触、搭接面 —— 尖点会顶开接触，还会成为热点
- 人手会摸到的外露边 —— 安全与手感
- 内流道、交叉孔出口 —— 该写的是“不许有突出物”，不是“去毛刺”

**第三步，真需要特定角度或圆角的，直接给几何尺寸。** 该画 `1 × 45°` 就画出来，别拿边缘符号绕。

还有个容易踩的坑。ASME Y14.5 体系里没有专门的破边符号，靠的是文字注释，且要带最大值才好检验。如果你的图纸整体按 ASME 走，却单独插了 ISO 13715 的符号，得在图上写清楚以哪套为准。否则供应商和来料检验可能各读各的。

## 五 · 还有一半，在工艺顺序里

最便宜的毛刺，是**从来没长出来的那个**。

图纸之外，有四件事在报价和编程阶段就能定：

- 钻孔时，让出口落在够得着、或者本来就不重要的那一面。
- 尽量避免刀具进不去的交叉腔。
- 排工序时，别让后一道把前一道刚清干净的边又翻出毛刺。
- 镀前清理设成硬卡点，不靠“看着干净”。

把这几件事按工序排开，就看得出代价是在哪一步翻上去的：

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 346" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="毛刺随工序推进被锁死：报价编程、钻孔、去毛刺、镀前清理、表面处理五个阶段，改动代价逐级升高" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">同一片毛刺，走过五道工序</text>
<rect x="16" y="44" width="488" height="54" rx="9" style="fill:#E1F5EE;stroke:#5DCAA5;stroke-width:1"/>
<rect x="16" y="44" width="5" height="54" rx="2" style="fill:#1D9E75"/>
<text x="34" y="77" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#085041">报价／编程</text>
<text x="160" y="77" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">出口选在够得着的一面</text>
<rect x="16" y="104" width="488" height="54" rx="9" style="fill:#E1F5EE;stroke:#5DCAA5;stroke-width:1"/>
<rect x="16" y="104" width="5" height="54" rx="2" style="fill:#1D9E75"/>
<text x="34" y="137" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#085041">钻孔</text>
<text x="160" y="137" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">翻边刚好长在出口那一侧</text>
<rect x="16" y="164" width="488" height="54" rx="9" style="fill:#E1F5EE;stroke:#5DCAA5;stroke-width:1"/>
<rect x="16" y="164" width="5" height="54" rx="2" style="fill:#1D9E75"/>
<text x="34" y="197" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#085041">去毛刺</text>
<text x="160" y="197" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">还看得见，代价最低</text>
<rect x="16" y="224" width="488" height="54" rx="9" style="fill:#FAEEDA;stroke:#EF9F27;stroke-width:1"/>
<rect x="16" y="224" width="5" height="54" rx="2" style="fill:#BA7517"/>
<text x="34" y="257" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#633806">镀前清理</text>
<text x="160" y="257" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">最后一次机会，设成硬卡点</text>
<rect x="16" y="284" width="488" height="54" rx="9" style="fill:#FCEBEB;stroke:#F09595;stroke-width:1"/>
<rect x="16" y="284" width="5" height="54" rx="2" style="fill:#E24B4A"/>
<text x="34" y="317" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#791F1F">表面处理</text>
<text x="160" y="317" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">被膜层盖住，终检看不见</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">图 2 · 前三步还改得动，镀前清理是最后一次机会。过了这一道，终检也看不出里面藏了毛刺</figcaption>
</figure>

还有一条常被忽略的：同一批活里毛刺逐渐变大，往往不是师傅手懒，而是刀具磨了、参数漂了。把边缘状态当成过程信号看，比只在终检挑毛病有用得多。

## 六 · 什么时候不必较真

不是每条边都值得局部标注。全标一遍，加工成本上去了，检验也抓不住重点。

判断只要问一句：**这条边会不会影响装配、密封、导电、安全，或者客户看得见？** 都不会，就交给那条通用要求。

有意思的是，把“去毛刺”删掉、换成一句带数值的通用要求加几条局部标注，图纸通常反而更短了。少的是含糊，不是信息。

## 常见问题

**写了“去毛刺”，供应商交的件还有毛刺，能判不合格吗？**
很难。因为图纸上没有一个可量的判据，双方只能靠“手摸着刮不刮”这种主观感受争。这正是要改那句话的原因，不是检验不够严。

**倒角和破边是一回事吗？**
不是。倒角是几何定义的边，有角度有尺寸，按 ISO 129-1 标。破边只限定允许偏离理论尖角多少，不规定倒圆还是倒角，归 ISO 13715。

**所有边都要求“无毛刺”，是不是最保险？**
不是。“无”本身不可检验，写上去等于把定义权交出去。给一个可测量的上限，比写一个绝对词稳。

## 主要参考

- ISO 13715:2017, Technical product documentation — Edges of undefined shape — Indication and dimensioning（现行版，替代 ISO 13715:2000；EN ISO 13715:2019 等同采用）——ISO 官方标准页及 SIST EN ISO 13715:2019 标准概览
- GB/T 19096-2003《技术制图　图样画法　未定义形状边的术语和注法》（现行，等同采用 ISO 13715:2000；2023-12-28 复审结论为修订）——全国标准信息公共服务平台
- ISO 129-1, Technical drawings — Indication of dimensions and tolerances — Part 1: General principles（几何定义边缘的尺寸标注）——ISO 129-1 标准概览
- ASME Y14.5 体系下的边缘文字注释惯例，以及边缘偏差正负号的应用说明：公开技术资料 Jiga，《Deburring specified: how to call out, verify, and control edge condition in production》（2026-11-09 查阅，非标准原文）

## 我们在这件事上站在哪

我们能帮上的地方很具体，是四件小事：

- 报价之前，把图纸里没有验收条件的边挑出来问你一句。
- 按功能面区分通用要求和局部标注。
- 把去毛刺排进工序顺序，而不是留到最后一道。
- 镀前清理和来料检验的口径先对齐。

如果你的件卡在装配垫毛刺、密封面渗漏，或者镀后尺寸不对，把图纸发来——哪怕只是先把那句“去毛刺”改清楚。

[免费 DFM 审查和报价](/zh/contact/get-a-quote/)
