---
title: "电力设备的零件，为什么难做：三个“面”决定了温升和泄漏率"
description: "近几个月，发到我们车间的图纸里，电力设备的零件明显多了。这类零件看着不复杂，真正卡良率的却是三个“面”：铜排的平直度、壳体的密封面、以及镀层做完之后的尺寸。结合 GB/T 5585.1-2018 与 GB/T 7674-2020 的原文要求，把这三个面拆开讲清楚。"
pubDate: 2026-09-22
category: "行业洞察"
system: "电力设备"
tags: ["电力设备", "铜排", "母排", "GIS 壳体", "密封面", "镀锡镀银", "GB/T 5585.1", "GB/T 7674"]
author: "战略顾问团队"
readingTime: "11 分钟"
---

先说一个我们自己车间里看到的变化：最近几个月，发到我们手上的图纸里，电力设备的零件明显多了起来——开关柜里的铜排、GIS（气体绝缘金属封闭开关设备）的铝合金壳体、法兰和盖板、还有各种导体连接件。

这类零件，第一眼看上去都不算难：形状简单，精度标注也不夸张。但真做起来，卡住良率的往往不是形状，而是三个“面”——铜排的平直度、壳体的密封面、以及镀层做完之后的尺寸。这三个面，一个管温升，一个管泄漏率，一个管装不装得上。

今天把它们拆开讲。

## 一、先看零件地图：电力设备里，哪些件落在机加工上

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="电力设备机加工零件地图" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="340" y="28" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">电力设备整机：开关柜 · GIS · 变压器 · 储能变流器</text>
<rect x="30" y="52" width="190" height="220" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="30" y="52" width="190" height="36" rx="8" style="fill:#8B0000"/>
<rect x="30" y="74" width="190" height="14" style="fill:#8B0000"/>
<text x="125" y="76" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF">导电回路</text>
<text x="48" y="122" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" style="fill:#1A1A1A">铜排 / 母排</text>
<text x="48" y="152" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" style="fill:#1A1A1A">搭接面 · 镀锡镀银</text>
<text x="48" y="182" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" style="fill:#1A1A1A">软连接 · 接头夹件</text>
<text x="48" y="228" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#8B0000">→ 决定：接触电阻</text>
<rect x="245" y="52" width="190" height="220" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="245" y="52" width="190" height="36" rx="8" style="fill:#8B0000"/>
<rect x="245" y="74" width="190" height="14" style="fill:#8B0000"/>
<text x="340" y="76" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF">密封与壳体</text>
<text x="263" y="122" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" style="fill:#1A1A1A">GIS / 开关柜壳体</text>
<text x="263" y="152" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" style="fill:#1A1A1A">法兰 · 密封槽</text>
<text x="263" y="182" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" style="fill:#1A1A1A">盖板 · O 圈配合面</text>
<text x="263" y="228" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#8B0000">→ 决定：泄漏率</text>
<rect x="460" y="52" width="190" height="220" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="460" y="52" width="190" height="36" rx="8" style="fill:#8B0000"/>
<rect x="460" y="74" width="190" height="14" style="fill:#8B0000"/>
<text x="555" y="76" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF">承载与绝缘</text>
<text x="478" y="122" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" style="fill:#1A1A1A">绝缘支撑件</text>
<text x="478" y="152" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" style="fill:#1A1A1A">母线夹 · 支架</text>
<text x="478" y="182" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" style="fill:#1A1A1A">散热 / 液冷板</text>
<text x="478" y="228" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#8B0000">→ 决定：装配与寿命</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">图 1 · 电力设备落到机加工上的零件，按“功能面”分成三类</figcaption>
</figure>

电力设备整机（开关柜、GIS、变压器、储能变流器）里头，真正落到 CNC 机加工上的，大致就这三类：

- 做导电的：铜排、母排、软连接、接头与夹件。它们不承担载荷，只承担电流，所以决定它们好坏的，是接触面的状态。
- 做密封的：GIS 和开关柜的壳体、法兰、密封槽、盖板。它们要长期封住一定压力的介质。
- 做承载与绝缘的：绝缘支撑件、母线夹、支架，以及越来越常见的散热冷板与液冷管路件。

一句话：形状是次要的，这三类“功能面”才是图纸背后的真要求。

## 二、铜排：平直度不是外观指标，它直接决定温升

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="铜排搭接面三个参数" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<defs>
<marker id="pf2arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" style="fill:#8B0000"/></marker>
</defs>
<text x="340" y="28" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">搭接面：三个参数，最后都换算成同一个数</text>
<text x="40" y="98" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12" style="fill:#8B0000">① 平面度 · 贴合率</text>
<line x1="150" y1="104" x2="205" y2="120" stroke-width="1.2" style="stroke:#8B0000"/>
<text x="470" y="98" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12" style="fill:#8B0000">② 镀层：镀锡 / 镀银</text>
<line x1="470" y1="104" x2="400" y2="120" stroke-width="1.2" style="stroke:#8B0000"/>
<text x="64" y="114" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#6B7280">铜排 A</text>
<text x="470" y="114" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#6B7280">铜排 B</text>
<rect x="50" y="124" width="300" height="34" stroke-width="1.2" style="fill:#C77B3A;stroke:#8A5324"/>
<rect x="230" y="124" width="310" height="34" stroke-width="1.2" style="fill:#D89A5C;stroke:#8A5324"/>
<rect x="230" y="124" width="120" height="34" stroke-width="1.5" stroke-dasharray="5 3" style="fill:#E8C09A;stroke:#8A5324"/>
<line x1="290" y1="116" x2="290" y2="166" stroke-width="2" style="stroke:#222222"/>
<circle cx="290" cy="141" r="9" stroke-width="1.5" style="fill:#4A4A4A;stroke:#222222"/>
<text x="40" y="204" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12" style="fill:#8B0000">③ 去毛刺 · 倒圆角</text>
<line x1="150" y1="196" x2="190" y2="160" stroke-width="1.2" style="stroke:#8B0000"/>
<line x1="290" y1="172" x2="290" y2="198" stroke-width="2" marker-end="url(#pf2arrow)" style="stroke:#8B0000"/>
<rect x="80" y="204" width="520" height="56" rx="8" style="fill:#FAF0F0;stroke:#8B0000"/>
<text x="340" y="228" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="13" font-weight="700" style="fill:#8B0000">接触电阻 ↑ → 局部发热 ↑ → 氧化加剧 → 接触电阻再 ↑</text>
<text x="340" y="248" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#6B7280">1000 A 下，20 微欧对应约 20 W；100 微欧就是 100 W</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">图 2 · 平直度、镀层、毛刺，最终都换算成搭接面的接触电阻</figcaption>
</figure>

很多人以为铜排的平直度是个“外观项”，其实它是温升的第一道闸。

两块铜排搭接在一起、靠螺栓压紧导电，电流只从真正贴合的那部分微小凸点通过。平直度差一点，实际接触面积就掉一大截，接触电阻立刻上去。接触电阻上去，电流经过的地方就发热；温度又让铜面加速氧化，氧化层导电更差，接触电阻再往上走——这是一个会自己加速的循环。

国标把这件事写得很实在。GB/T 5585.1-2018《电工用铜、铝及其合金母线 第 1 部分：铜和铜合金母线》里：

- **平直度**：硬态铜母线在 1 米长度内，宽边平直度不超过 5 毫米，窄边不超过 2 毫米（较厚规格为 4 毫米）。
- **尺寸偏差**：以常见的 TMY 30×4 为例，厚度 ±0.05 毫米、宽度 ±0.15 毫米；规格越大，偏差带越宽。
- **表面质量**：不许有飞边、毛刺及裂口，圆角、圆边处尤其不能有毛刺。
- **导电率**：不低于 97% IACS，20 摄氏度时直流电阻率不大于 0.017772 Ω·mm²/m。

而搭接装配那一侧，GB/T 7251.1《低压成套开关设备和控制设备 第 1 部分：总则》的要求是：连接处的电阻不应超过同等长度、同截面导体电阻的一定倍数。行业验收里常用的口径是：镀银搭接面不大于 10 微欧，镀锡搭接面不大于 20 微欧。

把这头尾对上就明白了：铜排的平直度、镀层质量、去毛刺，最后都会换算成同一个数字——接触电阻。而接触电阻换算成发热是平方关系：1000 安培下，20 微欧对应约 20 瓦；升到 100 微欧就是 100 瓦。多出来的那八十瓦，全堆在那个巴掌大的搭接面上。

所以车间里真正要控制的是三件事：铣削之后的平面度、镀锡镀银之前把毛刺去干净（毛刺会被镀层盖住，变成局部尖点和热点）、以及搭接面按图纸要求做倒圆角。

## 三、GIS 壳体：0.5% 的年泄漏率，是一道一道密封面攒出来的

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="壳体密封面与泄漏率" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="340" y="26" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">壳体的密封：泄漏率不是一个数，是每道密封面累加出来的</text>
<text x="28" y="70" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12" style="fill:#8B0000">① 密封槽平面度 / 深度</text>
<line x1="150" y1="76" x2="306" y2="122" stroke-width="1.2" style="stroke:#8B0000"/>
<text x="470" y="70" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12" style="fill:#8B0000">② O 圈压缩率</text>
<line x1="500" y1="76" x2="364" y2="124" stroke-width="1.2" style="stroke:#8B0000"/>
<rect x="110" y="86" width="460" height="50" stroke-width="1.2" style="fill:#DCDCDC;stroke:#B0B0B0"/>
<rect x="110" y="136" width="460" height="50" stroke-width="1.2" style="fill:#DCDCDC;stroke:#B0B0B0"/>
<rect x="308" y="122" width="64" height="28" rx="4" stroke-width="1.2" style="fill:#FFFFFF;stroke:#B0B0B0"/>
<ellipse cx="340" cy="136" rx="20" ry="11" stroke-width="3" style="fill:none;stroke:#8B0000"/>
<circle cx="150" cy="136" r="8" stroke-width="1.2" style="fill:#9A9A9A;stroke:#777777"/>
<circle cx="530" cy="136" r="8" stroke-width="1.2" style="fill:#9A9A9A;stroke:#777777"/>
<text x="28" y="208" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12" style="fill:#8B0000">③ 密封面粗糙度 · 焊后变形</text>
<line x1="160" y1="200" x2="250" y2="186" stroke-width="1.2" style="stroke:#8B0000"/>
<rect x="80" y="226" width="520" height="76" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="100" y="250" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" style="fill:#1A1A1A">GB/T 7674-2020：每个隔室年泄漏率 ≤ 0.5%</text>
<text x="100" y="271" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" style="fill:#1A1A1A">25 年寿命内，所有隔室气体损耗平均宜 &lt; 15%</text>
<text x="100" y="292" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" style="fill:#1A1A1A">现场包扎法：24 小时内每个包扎腔 SF₆ ≤ 30 ppm</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">图 3 · 密封面的平面度与粗糙度，最终累加成整机的年泄漏率</figcaption>
</figure>

第二类零件，管的是“封得住”。

GIS 把断路器、隔离开关、母线和互感器全部封闭在金属壳体内，充一定压力的 SF₆ 做绝缘和灭弧介质。SF₆ 的绝缘强度跟它的密度直接挂钩：漏了，压力就掉，绝缘水平就降，轻则局部放电，重则闪络甚至爆裂。所以泄漏率是 GIS 的硬指标，也是国标写死的一条线。

GB/T 7674-2020《额定电压 72.5kV 及以上气体绝缘金属封闭开关设备》规定：GIS 应做成封闭压力系统或密封压力系统；对封闭压力系统，**从任何单独隔室到大气的泄漏率，以及隔室之间的泄漏率，都不应超过每年 0.5%**。标准同时给了一个更长期的视角：在最短 25 年运行寿命里，所有气体隔室损耗的平均值宜小于 15%。

0.5% 这个数看着宽松，换到现场就不宽松了。交接验收普遍采用局部包扎法：在法兰、密封圈等接缝处包上薄膜，24 小时后腔内 SF₆ 浓度不大于 30 ppm 才算合格。也就是说，整机能不能达标，是被几十上百道法兰和密封面一道一道累加出来的，任何一道平面度不到位，整台设备的年泄漏率就被拉高。

对我们做机加的来说，这意味着 GIS 铝合金壳体（常见 5 系、6 系铝）的活，重点从来不是外形，而是：密封槽的平面度与深度、密封面粗糙度、焊接后的变形控制，以及机加余量够不够把焊后变形吃下去。

## 四、镀层之后，尺寸往哪边走

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="表面处理对尺寸的影响方向" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<defs>
<marker id="pf4arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" style="fill:#8B0000"/></marker>
</defs>
<text x="340" y="26" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">表面处理之后，尺寸往哪边走</text>
<line x1="340" y1="48" x2="340" y2="264" stroke-width="1.2" stroke-dasharray="4 4" style="stroke:#8B0000"/>
<text x="340" y="44" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#8B0000">图纸名义尺寸</text>
<text x="40" y="76" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="13" style="fill:#1A1A1A">阳极氧化</text>
<rect x="300" y="62" width="80" height="16" stroke-width="1.2" style="fill:#EDEDED;stroke:#C0C0C0"/>
<line x1="300" y1="70" x2="278" y2="70" stroke-width="2" marker-end="url(#pf4arrow)" style="stroke:#8B0000"/>
<line x1="380" y1="70" x2="402" y2="70" stroke-width="2" marker-end="url(#pf4arrow)" style="stroke:#8B0000"/>
<text x="424" y="76" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12" style="fill:#6B7280">直径变化 ≈ 1× 膜厚，按膜厚预留</text>
<text x="40" y="136" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="13" style="fill:#1A1A1A">电镀 镀锡 / 镀银</text>
<rect x="300" y="122" width="80" height="16" stroke-width="1.2" style="fill:#EDEDED;stroke:#C0C0C0"/>
<line x1="300" y1="130" x2="264" y2="130" stroke-width="2" marker-end="url(#pf4arrow)" style="stroke:#8B0000"/>
<line x1="380" y1="130" x2="416" y2="130" stroke-width="2" marker-end="url(#pf4arrow)" style="stroke:#8B0000"/>
<text x="424" y="136" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12" style="fill:#6B7280">每面加一个膜厚，双向共 +2×</text>
<text x="40" y="196" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="13" style="fill:#1A1A1A">电解抛光</text>
<rect x="300" y="182" width="80" height="16" stroke-width="1.2" style="fill:#EDEDED;stroke:#C0C0C0"/>
<line x1="264" y1="190" x2="300" y2="190" stroke-width="2" marker-end="url(#pf4arrow)" style="stroke:#8B0000"/>
<line x1="416" y1="190" x2="380" y2="190" stroke-width="2" marker-end="url(#pf4arrow)" style="stroke:#8B0000"/>
<text x="424" y="196" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12" style="fill:#6B7280">减材料，尺寸变小</text>
<text x="40" y="256" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="13" style="fill:#1A1A1A">热处理</text>
<rect x="300" y="242" width="80" height="16" stroke-width="1.2" style="fill:#EDEDED;stroke:#C0C0C0"/>
<path d="M300 250 q10 -9 20 0 q10 9 20 0 q10 -9 20 0 q10 9 20 0" stroke-width="1.6" style="fill:none;stroke:#8B0000"/>
<text x="424" y="256" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12" style="fill:#6B7280">变形方向与量不可预测，只能靠余量兜</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">图 4 · 不同表面处理对尺寸的作用方向不一样，图纸要写清镀前还是镀后</figcaption>
</figure>

上面两类零件都有个共同的坑：图纸上标的是成品尺寸，可导电面要镀锡镀银、铝壳体要阳极氧化，**表面处理会把尺寸改掉，而且方向不一样**。

- **阳极氧化**：膜一半向外长、一半向内吃基材，直径方向的变化量约等于一个膜厚。要做配合的孔或轴，得按膜厚预留加工量。
- **电镀**（镀锡 / 镀银）：是往基材上加材料，两个面都镀，所以双向各加约一个膜厚，轴会变粗、孔会变小。
- **电解抛光**：是减法，会减料，尺寸变小。
- **热处理**：变形方向和量都不可预测，只能靠工艺和余量兜住。

这就带来一个报价和 DFM 阶段必须问清的问题：图纸标的尺寸，是镀前还是镀后？公差带给的是哪一侧？以电气上常见的镀锡铜排为例，镀层厚度往往只有十几微米甚至更薄，看起来可以忽略；但当下游是紧配合，或者同一个尺寸被两个面都镀到，这点厚度乘二，就不再是可以忽略的数了。

一句话：电力设备的零件，尺寸不是被机床单方面决定的，是被“机加 + 表面处理”共同决定的。

## 主要参考

1. 国家市场监督管理总局、国家标准化管理委员会：GB/T 5585.1-2018《电工用铜、铝及其合金母线 第 1 部分：铜和铜合金母线》——平直度（宽边 ≤5 mm/m、窄边 ≤2 mm/m）、尺寸偏差、导电率（≥97% IACS）、硬度（≥65 HB）及表面质量要求。
2. 国家市场监督管理总局、国家标准化管理委员会：GB/T 7674-2020《额定电压 72.5kV 及以上气体绝缘金属封闭开关设备》——第 6.16 条气体密封性：封闭压力系统下，从任何单独隔室到大气的泄漏率、以及隔室之间的泄漏率，均不应超过每年 0.5%；最短 25 年寿命内所有隔室气体损耗平均值宜小于 15%。
3. GB/T 7251.1《低压成套开关设备和控制设备 第 1 部分：总则》——母线搭接面连接电阻要求（不超过同等长度、同截面导体电阻的规定倍数）；工程验收常用口径：镀银 ≤10 μΩ、镀锡 ≤20 μΩ。
4. 电力行业 GIS 现场交接检漏规程（局部包扎法）：包扎 24 小时后每个包扎腔内 SF₆ 含量不大于 30 ppm（体积比）为合格；厂商技术资料中，单个隔室的年泄漏率指标常做到 0.3% 及以下。

## 关于鑫永恒

我们做精密结构件二十三年，三十台 CNC 里含真正的五轴。电力设备这一类零件——铜排与母排、GIS 与开关柜的铝合金壳体、法兰与盖板、导电连接件——正好落在我们日常的活里。

我们能帮上的地方很具体：平面度与平直度的稳定控制、镀前去毛刺、密封槽与密封面的加工、焊后变形的余量控制，以及小批量快速打样。如果你的电力设备零件卡在接触电阻、泄漏率或者镀后尺寸上，那大概率不是设计的问题，是这几个“面”没做到位。把图纸发来，我们一起把它做对。

[免费 DFM 审查和报价](/zh/contact/get-a-quote)
