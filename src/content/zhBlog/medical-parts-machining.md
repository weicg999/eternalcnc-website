---
title: "医疗零件为什么难做：难的不是精度，是三件看不见的事"
description: "医疗零件的图纸第一眼通常不吓人，公差也不是最狠的。真正卡住良率和审核的，是材质能不能追回炉批号、机加之后表面干不干净、以及零件从清洗到包装之间有没有被二次污染。结合 ASTM F136、ASTM F138、ASTM A967、ASTM B912 与 ISO 19227 的实际要求，把这三道门拆开讲。"
pubDate: 2026-09-23
category: "行业洞察"
system: "医疗"
tags: ["医疗器械", "医疗零件", "316L", "Ti-6Al-4V ELI", "ASTM F136", "ASTM F138", "钝化", "电解抛光", "ISO 19227", "可追溯"]
author: "战略顾问团队"
readingTime: "12 分钟"
---

医疗零件的图纸，第一眼通常不吓人。外形不复杂，公差也就 ±0.01 毫米上下——放在我们日常做的机器人件和散热件里，这个精度并不算出格。

可这类零件真正难的地方，大多不在图纸上。

做了二十三年精密结构件，跟医疗类客户打交道下来，最后卡住交付的，很少是“铣得准不准”，而是三件肉眼看不见的事：这批料能不能追回那一炉、机加之后的表面到底干不干净、以及零件从清洗到包装之间有没有被二次污染。

这三件事有个共同点：做对了看不出来，做错了也看不出来——直到客户那边出现点蚀、超标，或者审核要文件的时候。

今天把它们拆开讲。

## 一、先看零件地图：一台医疗设备上，哪些件落在机加工

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 272" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="医疗设备落地到 CNC 机加工的零件分类" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="340" y="28" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">一台医疗设备上，真正落到机加工的零件</text>
<rect x="22" y="54" width="150" height="190" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="22" y="54" width="150" height="32" rx="8" style="fill:#8B0000"/>
<rect x="22" y="70" width="150" height="16" style="fill:#8B0000"/>
<text x="97" y="75" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF">诊断设备外壳</text>
<text x="36" y="116" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">超声探头壳体</text>
<text x="36" y="146" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">分析仪面板</text>
<text x="36" y="176" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">CT 机架件</text>
<text x="36" y="218" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#8B0000">→ 外观与防护</text>
<rect x="184" y="54" width="150" height="190" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="184" y="54" width="150" height="32" rx="8" style="fill:#8B0000"/>
<rect x="184" y="70" width="150" height="16" style="fill:#8B0000"/>
<text x="259" y="75" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF">手术器械零件</text>
<text x="198" y="116" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">手柄壳体</text>
<text x="198" y="146" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">刀头座</text>
<text x="198" y="176" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">钳类关节件</text>
<text x="198" y="218" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#8B0000">→ 耐蚀与清洁</text>
<rect x="346" y="54" width="150" height="190" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="346" y="54" width="150" height="32" rx="8" style="fill:#8B0000"/>
<rect x="346" y="70" width="150" height="16" style="fill:#8B0000"/>
<text x="421" y="75" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF">工装夹具托盘</text>
<text x="360" y="116" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">装配夹具</text>
<text x="360" y="146" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">样品托盘</text>
<text x="360" y="176" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">校准块</text>
<text x="360" y="218" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#8B0000">→ 精度与定位</text>
<rect x="508" y="54" width="150" height="190" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="508" y="54" width="150" height="32" rx="8" style="fill:#8B0000"/>
<rect x="508" y="70" width="150" height="16" style="fill:#8B0000"/>
<text x="583" y="75" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF">支架与运动件</text>
<text x="522" y="116" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">显示器支架</text>
<text x="522" y="146" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">万向节</text>
<text x="522" y="176" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">底座零件</text>
<text x="522" y="218" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#8B0000">→ 刚度与寿命</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">图 1 · 医疗设备落到机加工上的四类零件，各自的“真要求”并不一样</figcaption>
</figure>

一台医疗设备上，能用 CNC 做出来的，大致就这四类。这里有个区分很关键：**只有第二类会接触人体或体液**，另外三类的难点在精度、洁净与一致性上。图纸口径、材料标准、验收方式，这四类彼此都不一样——把它们当成同一类零件来报价，很容易低估。

## 二、第一道门：材质不是“316L 就行”，是能不能追回那一炉

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="同一个牌号名字背后的两份不同标准" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="340" y="28" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">同一个牌号名字，背后可能不是同一份标准</text>
<rect x="24" y="48" width="306" height="200" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="24" y="48" width="306" height="34" rx="8" style="fill:#8B0000"/>
<rect x="24" y="66" width="306" height="16" style="fill:#8B0000"/>
<text x="177" y="70" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF">图纸上写着“316L”</text>
<text x="40" y="108" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">通用 316L：走普通不锈钢标准</text>
<text x="40" y="134" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">医疗 / 植入级：ASTM F138</text>
<text x="40" y="160" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">UNS S31673 · 18Cr-14Ni-2.5Mo</text>
<text x="40" y="186" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">Cr 17–19 · Ni 13–15 · Mo 2.25–3.00</text>
<text x="40" y="212" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">C ≤0.030 · S ≤0.010 · P ≤0.025</text>
<rect x="350" y="48" width="306" height="200" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="350" y="48" width="306" height="34" rx="8" style="fill:#8B0000"/>
<rect x="350" y="66" width="306" height="16" style="fill:#8B0000"/>
<text x="503" y="70" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF">图纸上写着“Ti-6Al-4V”</text>
<text x="366" y="108" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">工业级：ASTM B348 Grade 5</text>
<text x="366" y="134" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">氧上限 0.20%</text>
<text x="366" y="160" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">植入级：ASTM F136 Grade 23 ELI</text>
<text x="366" y="186" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">氧 ≤ 0.13% · 铁 ≤ 0.25% · 碳 ≤ 0.08%</text>
<text x="366" y="212" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">氧从 0.20 压到 0.13，换的是韧性</text>
<rect x="24" y="262" width="632" height="44" rx="8" style="fill:#FAF0F0;stroke:#8B0000"/>
<text x="340" y="289" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">这两个问题答不上来，后面的表面处理和清洁度都是空谈</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">图 2 · “316L”和“Ti-6Al-4V”都不是精确写法，各自对应至少两份标准</figcaption>
</figure>

图纸上写 316L 和 Ti-6Al-4V，是最常见的两种写法，但这两个名字都不够精确——它们各自至少对应两份不同的标准。

**不锈钢这边。** 通用 316L 走的是普通不锈钢标准；用于医疗器械与植入件的，通常是 ASTM F138《外科植入物用锻造 18Cr-14Ni-2.5Mo 不锈钢棒材与线材》（UNS S31673）。F138 给出的成分窗口是：铬 17.00–19.00、镍 13.00–15.00、钼 2.25–3.00、碳 ≤0.030、硫 ≤0.010、磷 ≤0.025、铜 ≤0.50、氮 ≤0.10。硫、磷这些杂质的允许上限卡得比通用料紧，因为它们直接影响耐蚀性。

**钛合金这边更典型。** 同样是 Ti-6Al-4V，工业级是 ASTM B348 Grade 5，氧含量上限 0.20%；植入级的 ASTM F136 Grade 23（也叫 ELI，Extra Low Interstitial，超低间隙元素）把氧压到 0.13%、铁压到 0.25%、碳压到 0.08%。差别只有零点零几个百分点，肉眼和卡尺都看不出来——但氧是钛里最强的固溶强化元素，降氧换来的是韧性和抗疲劳裂纹扩展的能力。这正是承力植入件要的东西，也是为什么 Grade 23 的抗拉强度门槛（≥860 MPa）反而比 Grade 5 略低。

这里要提醒一句：**工业级的 ASTM B348 与植入级的 ASTM F136 不是一回事，不能互相顶替。** 前者可以合法用在受力要求不高的场合（器械、外固定支架等），但用在长期承力植入件上就是选错了料。

**而真正让采购头疼的，是“追”这个动作。**

医疗件的追溯，不是“我给你一份材质证”就完了。它是一条不能断的链：原料的炉批号 → 材质证 → 我们下料时留在件上和流转卡上的标识 → 检验记录 → 最终成品。上游那一环，是 EN 10204 3.1 材质证——列实测化学成分、力学性能与炉批号，并且由生产厂**独立于商务部门**的机构签发，不是经销商自己给自己开的那张。

为什么这条链这么要紧？因为一个炉批号错了，客户要追回的不是这一个零件，而是同一炉料做出来的**全部**零件，可能是几个月、几百件。这就是我们收医疗件的料，按炉批号分区放、下料留标识、并且留样的原因。

国内标准里还有一条硬要求值得注意：GB/T 13810-2017《外科植入物用钛及钛合金加工材》（2017-10-14 发布，2018-05-01 实施）相比 2007 版，**明确增加了“不准许使用再生料作为生产铸锭和加工材原料”的要求**。也就是说，“这个料是回炉的钛”在植入件语境里本身就是不合格——而这件事从外观和成分上未必看得出来，只能靠证明文件。

## 三、第二道门：机加完的那一刻，不锈钢表面是最“脏”的

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 368" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="机加工后不锈钢表面的钝化与电解抛光流程" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<defs>
<marker id="med3arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" style="fill:#8B0000"/></marker>
</defs>
<text x="340" y="28" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">机加完的那一刻，不锈钢表面是最“脏”的</text>
<rect x="24" y="52" width="188" height="104" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="38" y="78" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">① 机加</text>
<text x="38" y="106" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#1A1A1A">刀具与夹具把游离铁</text>
<text x="38" y="128" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#1A1A1A">嵌进零件表面</text>
<text x="38" y="150" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#6B7280">不管它，几周内出锈点</text>
<rect x="246" y="52" width="188" height="104" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="260" y="78" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">② 钝化</text>
<text x="260" y="98" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#8B0000">ASTM A967</text>
<text x="260" y="122" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#1A1A1A">硝酸系列 / 柠檬酸系列</text>
<text x="260" y="144" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#1A1A1A">只溶游离铁，不改尺寸</text>
<rect x="468" y="52" width="188" height="104" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="482" y="78" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">③ 电解抛光</text>
<text x="482" y="98" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#8B0000">ASTM B912</text>
<text x="482" y="122" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#1A1A1A">电化学减料，尺寸会变</text>
<text x="482" y="144" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#1A1A1A">图纸要写清基准在哪侧</text>
<line x1="214" y1="104" x2="241" y2="104" stroke-width="1.6" marker-end="url(#med3arrow)" style="stroke:#8B0000"/>
<line x1="436" y1="104" x2="463" y2="104" stroke-width="1.6" marker-end="url(#med3arrow)" style="stroke:#8B0000"/>
<rect x="24" y="172" width="632" height="44" rx="8" style="fill:#FAF0F0;stroke:#8B0000"/>
<text x="340" y="190" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">顺序铁律：钝化必须在最终抛光之后</text>
<text x="340" y="208" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#6B7280">抛光会把刚钝化好的膜磨掉——先钝化后抛光，等于白做</text>
<rect x="24" y="232" width="632" height="112" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="44" y="256" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" font-weight="700" style="fill:#1A1A1A">那怎么证明做到了</text>
<text x="44" y="282" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">钝化膜只有 3–5 nm 厚，透明，肉眼看不出来</text>
<text x="44" y="306" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">铜硫酸盐试验（ASTM F1089）：出现铜色即判不合格</text>
<text x="44" y="330" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">铁氰化钾法：游离铁在 30 秒内显蓝斑</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">图 3 · 钝化与电解抛光是两件不同的事，顺序做反了等于白做</figcaption>
</figure>

第二道门是表面。这里最反直觉的一点是：**不锈钢“不生锈”这件事，在机加工之后其实是不成立的。**

铣削、车削、钻孔、磨削的过程中，刀具、夹具和砂轮会把微小的游离铁嵌进零件表面。这些铁不是零件本身的成分，是外来的污染。你不处理它，它会在几周内氧化，长出锈点——零件明明是 316L，却锈了。而对医疗件来说，麻烦不止是难看：锈点和它下面的点蚀坑，既是藏污纳垢的地方，也是清洗洗不透的地方。

所以不锈钢件机加完之后，通常要走两道工序，而且是两个不同的标准：

- **钝化，ASTM A967/A967M。** 化学浸泡，分硝酸系列（Nitric 1–5）和柠檬酸系列（Citric 1–4）。它只溶解表面的游离铁和其他污染物，不啃基材，所以**不改变尺寸**。对尺寸紧的零件，这是首选。
- **电解抛光，ASTM B912。** 电化学方法，零件做阳极，表面微凸起优先溶解。它能把表面粗糙度降下来，把微观毛刺和微小凹坑抹平，耐蚀性与可清洁性都更好。但它是**减法**——会减料，尺寸会变。

这两道的差别，最后都会落回图纸上：**电解抛光的零件，图纸上标的尺寸是抛光前还是抛光后？公差留给哪一侧？** 这个问题不问清楚，前面加工做得再准也可能白做。

**一条顺序铁律：钝化必须在最终抛光之后。** 抛光会把刚钝化好的膜磨掉——先钝化后抛光，等于白做。这件事在审核里常被问到，也常被做错。

**那怎么证明做到了？** 钝化膜只有 3–5 纳米厚，是透明的，看不出来。所以行业不验膜，验的是“有没有游离铁”：铜硫酸盐试验（ASTM F1089 里的方法之一）在表面保持湿润几分钟，出现铜色沉积即判不合格；也可以用铁氰化钾法，游离铁在 30 秒内显蓝斑。

顺便说一个很实用的辨别方法：如果一个供应商只说“我们钝化了”，却说不出用的是 A967 里的哪一组处理（硝酸几号、柠檬酸几号），那这句话基本等于没说。**钝化的工艺条件差一档，结果可以差很多。**

最后一个容易被忽略的点：**交付之后生锈，往往不是钢的问题。** 氯离子（生理盐水、含氯消毒剂）、蒸汽与冲洗水的水质、洗涤剂残留，以及把 316L 件和镀铬或碳钢件放在同一个托盘里（异种金属接触形成电偶腐蚀）——这些都能让一筐器械一起出问题。器械类的腐蚀评价，对应的就是 ASTM F1089。

## 四、第三道门：清洁度不是“擦干净”，是洗得出来，也验得出来

第三道门是清洁度，也是最容易被低估的一道。

“擦干净”是外观，“清洁度”是一组可测的指标。国际标准 ISO 19227:2018《外科植入物 矫形外科植入物的清洁度 一般要求》，把残留分成七类来看：

| 残留类别 | 通俗说法 |
|---|---|
| 无机残留 | 金属屑、盐类、离子 |
| 有机残留 | 切削液、油脂（常看 TOC / THC） |
| 颗粒残留 | 看得见或看不见的固体颗粒 |
| 内毒素 | 细菌残骸（公开资料常见的量级是每件 ≤20 EU） |
| 生物负载 | 微生物总数 |
| 细胞毒性 | 是否会引起细胞毒性反应 |
| 目视残留 | 肉眼可见的污渍 |

这个标准的几条结构性要求，比具体数值更值得我们记住：

- 它要求在 **ISO 13485** 质量体系框架下运行，而不是“我们注意清洁”；
- 清洁工艺要**做验证**，至少 3 批数据，而且要用**最差条件样品**（结构最复杂、最难洗的那个）去做，不能只挑好洗的；
- 它和生物相容性评价（ISO 10993 系列）是连在一起的——洗不干净，生物相容性做得再全也站不住。

（表里括注的那类具体限值，在公开的技术解读资料里很常见，但口径并不完全统一；实际验收还是要以客户指定的标准版本和图纸要求为准。这一点我建议直接写进合同。）

落到车间里，能控的其实是三件很朴素的事：

1. **工序之间不落地、不敞放。** 精加工到清洗之间，是残留最容易生成的一段——油膜干了会变成难洗的碳化残留。
2. **清洗要有节拍，不能靠“多洗一会儿”。** 常规路径是：碱洗 → 超声波除油 → 多级去离子水漂洗 → 异丙醇（IPA）脱水 → 热风干燥。漂洗水的水质本身就是一项要管的指标。
3. **洗完之后到包装之间，不能敞着放。** 洗干净的零件在空气里放半小时，前面那几步的意义就打了折。清洗之后的取放、包装材料，甚至开袋环境，都是这条链的一部分。

第三道门的难点在于：它不像尺寸那样能量出一个数，它靠的是流程和记录。

## 五、发图之前，先把这几件事写清楚

医疗件的图纸评审，我建议在发出去之前先自问一遍下面这份清单。写清楚了，报价和交期都会稳得多：

| 要确认的事 | 为什么 |
|---|---|
| 牌号**加标准号** | 写“316L”还是“ASTM F138”、写“Ti-6Al-4V”还是“ASTM F136 Grade 23 ELI”，选料和价格完全不同 |
| 材质证类型 | EN 10204 3.1、3.2，还是只要 CoC——三种的取证成本和交期不一样 |
| 炉批号要不要跟件走 | 要不要在零件上打标、要不要随件附追溯卡 |
| 表面处理写清“哪一道” | 钝化（A967）、电解抛光（B912），还是两者都要；钛件阳极氧化另有要求 |
| 尺寸基准在处理前还是处理后 | 电解抛光会减料，阳极氧化会加膜厚；基准不写清就可能超差 |
| 清洁度要求 | 有没有指定标准、验收方法是什么、由谁验、验几件 |
| 检验比例 | 关键尺寸是全检还是抽检——这个由客户定，我们照做 |
| 包装 | 普通包装、无尘袋、真空，以及要不要在洁净环境里开袋 |

这份清单里，最容易漏的是**第五行**。它不是精度问题，是“顺序和基准”问题，而它恰恰是返工最多的一项。

## 主要参考

1. ASTM F136《Standard Specification for Wrought Titanium-6Aluminum-4Vanadium ELI (Extra Low Interstitial) Alloy for Surgical Implant Applications》——Grade 23（UNS R56401 / R56407）：氧 ≤0.13%、铁 ≤0.25%、碳 ≤0.08%、铝 5.50–6.50%、钒 3.50–4.50%；对应 ISO 5832-3；抗拉强度最低 860 MPa、屈服强度最低 795 MPa。
2. ASTM F138《Standard Specification for Wrought 18Chromium-14Nickel-2.5Molybdenum Stainless Steel Bar and Wire for Surgical Implants（UNS S31673）》——铬 17.00–19.00%、镍 13.00–15.00%、钼 2.25–3.00%、碳 ≤0.030%、硫 ≤0.010%、磷 ≤0.025%、铜 ≤0.50%、氮 ≤0.10%。
3. GB/T 13810-2017《外科植入物用钛及钛合金加工材》（2017-10-14 发布，2018-05-01 实施，现行）——相对 GB/T 13810-2007，明确增加了“不准许使用再生料作为生产铸锭和加工材原料”以及表面污染等要求。
4. ASTM A967/A967M《Standard Specification for Chemical Passivation Treatments for Stainless Steel Parts》与 ASTM B912《Standard Specification for Passivation of Stainless Steels Using Electropolishing》——分别为化学钝化（硝酸 1–5、柠檬酸 1–4 系列）与电解抛光钝化；ASTM A380 为清洗、除氧化皮与钝化的配套实践标准。
5. ASTM F1089《Standard Test Method for Corrosion of Surgical Instruments》——沸水试验与铜硫酸盐试验；铜硫酸盐法用于检测表面游离铁，标准明确指出：评价耐蚀性之前，宜先按 A967/A967M 钝化、或按 B912 电解抛光（或两者都做）。
6. ISO 19227:2018《Implants for surgery — Cleanliness of orthopedic implants — General requirements》——在 ISO 13485 框架下运行，按 ISO 14971 做风险控制，清洁工艺验证至少 3 批并使用最差条件样品；残留分无机、有机、颗粒、内毒素、生物负载、细胞毒性、目视七类。
7. EN 10204《Metallic products — Types of inspection documents》——3.1 证书含实测化学成分、力学性能与炉批号，由生产厂独立于商务部门的机构签发；3.2 在此基础上增加独立第三方见证。

## 关于鑫永恒

我们做精密结构件二十三年，三十台 CNC 里含真正的五轴。医疗这一类零件——诊断设备外壳、手术器械零件、工装夹具与样品托盘、支架与运动件——正好落在我们日常的活里。

能帮上的地方很具体：按指定标准号取料并保留炉批号追溯、316L 与钛合金的稳定加工、机加后的去毛刺与钝化安排、清洗与包装的流程控制，以及小批量快速打样。如果你的医疗件卡在材质追溯、表面处理基准或者清洁度上，把图纸和要求一起发来，我们先做一遍 DFM 评审——该问的问题，我们会在报价之前就问清楚。

[免费 DFM 审查和报价](/zh/contact/get-a-quote)
