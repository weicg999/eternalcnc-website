---
title: "植入件和外科器械件：同一台设备上的两条赛道"
description: "医疗零件常被当成一类，其实内部是两条完全不同的赛道——长期承力的植入件，和只与医生之手接触几分钟的外科器械件。从材料选型、机加工打法到表面与验收口径，处处是分水岭。本文把这条线拆开讲，并落到 17-4PH/630 这类实际在做的材料上。"
pubDate: 2026-09-24
category: "行业洞察"
system: "医疗"
tags: ["医疗零件", "植入件", "外科器械", "17-4PH", "630", "ASTM F899", "ISO 5832", "CoCrMo", "可追溯"]
author: "战略顾问团队"
readingTime: "12 分钟"
---

上一篇我们讲了医疗零件“难不在精度，在三件看不见的事”——材质追溯、机加后的表面、以及清洗到包装之间的二次污染。那三道门，对所有医疗件都成立。

但医疗件内部，其实还分成**两条差异极大的赛道**：一条是长期留在人体内的**承力植入件**（骨钉、关节、接骨板），另一条是只和医生之手接触几分钟的**外科器械件**（持针钳、剥离子、牵开器、剪刀）。前者要在体内待十年、还要扛载荷；后者间歇接触、可灭菌重复使用。

风险等级一变，从材料到验收的整条链路都会变。把它们当成同一类零件来报价和排产，最容易低估的，恰恰是这个“变”。

今天把这条分水岭拆开讲。

## 一、先分清：你手里的是哪一类

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="承力植入件与外科器械件的五维对比" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="340" y="26" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">同一个“医疗件”，其实是两条赛道</text>
<rect x="22" y="48" width="636" height="30" rx="7" style="fill:#F3F4F6"/>
<text x="170" y="68" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" font-weight="700" style="fill:#1A1A1A">对比维度</text>
<text x="345" y="68" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">承力植入件</text>
<text x="525" y="68" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">外科器械件</text>
<rect x="22" y="84" width="636" height="52" rx="7" style="fill:#FAFAFA;stroke:#E5E7EB"/>
<text x="170" y="106" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" font-weight="700" style="fill:#1A1A1A">在体 / 接触</text>
<text x="345" y="100" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">永久留存，长期承力</text>
<text x="345" y="120" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#6B7280">骨钉 / 关节 / 接骨板</text>
<text x="525" y="100" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">间歇接触，可灭菌复用</text>
<text x="525" y="120" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#6B7280">钳 / 剪 / 牵开器 / 剥离子</text>
<rect x="22" y="142" width="636" height="52" rx="7" style="fill:#FAFAFA;stroke:#E5E7EB"/>
<text x="170" y="164" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" font-weight="700" style="fill:#1A1A1A">常用材料</text>
<text x="345" y="158" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">Ti-6Al-4V ELI / CoCrMo</text>
<text x="345" y="178" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#6B7280">316LVM（ASTM F138）</text>
<text x="525" y="158" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">420 / 440C / 17-4PH</text>
<text x="525" y="178" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#6B7280">部分 303 易切削</text>
<rect x="22" y="200" width="636" height="52" rx="7" style="fill:#FAFAFA;stroke:#E5E7EB"/>
<text x="170" y="222" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" font-weight="700" style="fill:#1A1A1A">机加打法</text>
<text x="345" y="216" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">五轴多、难切料、小批量</text>
<text x="345" y="236" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#6B7280">刀具全程追溯</text>
<text x="525" y="216" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">已热处理硬度高、批量大</text>
<text x="525" y="236" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#6B7280">刀具磨损快</text>
<rect x="22" y="258" width="636" height="52" rx="7" style="fill:#FAFAFA;stroke:#E5E7EB"/>
<text x="170" y="280" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" font-weight="700" style="fill:#1A1A1A">表面与洁净</text>
<text x="345" y="274" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">电解抛光 + 钝化</text>
<text x="345" y="294" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#6B7280">ISO 19227 洁净度（最严）</text>
<text x="525" y="274" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">钝化 + 常规抛光</text>
<text x="525" y="294" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#6B7280">耐重复灭菌是核心</text>
<rect x="22" y="316" width="636" height="36" rx="7" style="fill:#FAFAFA;stroke:#E5E7EB"/>
<text x="170" y="339" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" font-weight="700" style="fill:#1A1A1A">验收与文件</text>
<text x="345" y="339" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#1A1A1A">3.1 + 3.2 / 批追溯 / CMM 全尺寸</text>
<text x="525" y="339" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#1A1A1A">3.1 / 抽检 + 功能测试</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">图 1 · 两条赛道在五个维度上处处是分水岭</figcaption>
</figure>

一句话区分：**要不要在体内长期承力**。这一句话，会顺着往下决定你选什么料、怎么加工、验到什么程度。

## 二、材料选型的分叉

材料是分叉的起点，也是最容易“写错名字”的地方。

**承力植入件**——走的是“植入级”材料体系，成分、夹杂物、晶粒度都有上限，而且每一炉都可追溯：

- **钛合金 Ti-6Al-4V**：工业级是 ASTM B348 Grade 5；植入级是 **ASTM F136 Grade 23（ELI，超低间隙）**，对应 **ISO 5832-3《外科植入物 金属材料 第 3 部分 锻造钛 6 铝 4 钒合金》**。ISO 5832-3 的成分窗口是：铝 5.5–6.75、钒 3.5–4.5、铁 ≤0.30、氧 ≤0.20、碳 ≤0.08。ELI 版本把氧再压到 0.13% 以下，换的是韧性与抗疲劳能力（上一篇已讲过）。
- **钴铬钼合金 CoCrMo**：铸造态走 **ASTM F75**（≈ ISO 5832-4 铸造 Co-Cr-Mo），铬 26.5–30、钼 4.5–7、碳 ≤0.35；锻造态走 **ASTM F1537 低碳锻造 CoCrMo**（≈ **ISO 5832-12 锻造 Co-Cr-Mo**，铬 26–30、钼 5–7、碳 ≤0.14 低炭级或 0.15–0.35 高炭级）。**铸造 F75 和锻造 F1537 不是一回事，不能互相顶替**——力学性能与疲劳行为差一截。
- **316LVM**：即 **ASTM F138**（UNS S31673），上一篇已展开。

**外科器械件**——走的是另一套标准。外科器械不锈钢的统一标准是美国 **ASTM F899-20《外科器械用锻造不锈钢》**。它把材料分成几类：Class 3 奥氏体（301/302/304/316）、Class 4 马氏体（410/420/440，硬度做到 HRC 50–60）、Class 5 沉淀硬化（630，也就是 **17-4PH**、以及 XM-16）、Class 6 铁素体（430）。

这里有个关键差异要说清：**ASTM F899 只规定“化学成分”，力学性能（硬度、强度）是引用 A276、A564 等另一批标准去给的。** 马氏体类还额外要求硫 ≤0.030%。它和 ISO 7153-1《外科器械 金属材料》是协调对应的。也就是说，写“420 不锈钢”不够，得写清是 F899 的 Class 4、要的硬度档，后面的热处理才有据可依。

**落到我们自己身上：** 17-4PH / 630 是鑫永恒实际在做的材料，它既能出现在器械件（剪刀柄、钳体、持针器），也可用于某些非承力植入附件。但沉淀硬化件的机加有个铁律，下面单独讲。

## 三、机加工打法的差异

两条赛道的机加工，难点方向相反。

**承力植入件**——往往是小批量、高复杂度：关节面、解剖曲面、薄壁、异形孔，五轴联动一次装夹很常见。材料还难切——钛和 CoCrMo 导热差、粘刀、加工硬化明显，刀具寿命短，而且从备料到成品刀具要能全程追溯。这类件的价值在“把难的形状做出来、做稳定”，而不是“做快”。

**外科器械件**——几何通常相对简单、批量更大，但因为很多已经是热处理后硬度很高的状态（马氏体 HRC 50–60，或 17-4PH 时效后 HRC 38–44），刀具磨损快、对刀尖和冷却的要求更高；不过它允许用更常规的设备、更经济的节拍去排。

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="17-4PH 沉淀硬化不锈钢的机加工时序" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<defs>
<marker id="med2arrow" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" style="fill:#8B0000"/></marker>
</defs>
<text x="340" y="26" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">17-4PH / 630：精加工必须赶在时效之前</text>
<rect x="22" y="52" width="180" height="120" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="112" y="80" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">① 固溶态</text>
<text x="112" y="104" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#1A1A1A">Condition A，较软</text>
<text x="112" y="126" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#1A1A1A">好加工、好成型</text>
<text x="112" y="148" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#6B7280">尺寸尚未最终定型</text>
<rect x="250" y="52" width="180" height="120" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="340" y="80" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">② 软态精加工</text>
<text x="340" y="104" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#1A1A1A">把尺寸做到位</text>
<text x="340" y="126" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#1A1A1A">留足时效余量</text>
<text x="340" y="148" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#6B7280">这是关键一步</text>
<rect x="478" y="52" width="180" height="120" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="568" y="80" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">③ 时效硬化</text>
<text x="568" y="104" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#1A1A1A">HRC 38–44</text>
<text x="568" y="126" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#1A1A1A">略有尺寸增长 / 变形</text>
<text x="568" y="148" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#6B7280">只做极轻修整</text>
<line x1="204" y1="112" x2="246" y2="112" stroke-width="1.8" marker-end="url(#med2arrow)" style="stroke:#8B0000"/>
<line x1="432" y1="112" x2="474" y2="112" stroke-width="1.8" marker-end="url(#med2arrow)" style="stroke:#8B0000"/>
<rect x="22" y="188" width="636" height="92" rx="8" style="fill:#FAF0F0;stroke:#8B0000"/>
<text x="340" y="216" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">铁律：精加工必须在时效之前完成</text>
<text x="340" y="242" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">时效后材料变硬、且会涨尺寸 / 起变形，硬态再精加工既费刀又难保证</text>
<text x="340" y="264" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11.5" style="fill:#1A1A1A">所以图纸标的是“时效前尺寸”还是“时效后尺寸”，决定了工艺怎么排</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">图 2 · 17-4PH/630 的排产顺序：软态精加工，时效留到最后</figcaption>
</figure>

上面这张图说的是 17-4PH / 630 的排产逻辑：**在固溶态（Condition A，较软）把精加工做完，最后才走时效硬化。** 时效后材料升到 HRC 38–44，而且会略有尺寸增长与变形——硬态再精加工既费刀又难保证一致性。所以图纸上标的尺寸是“时效前”还是“时效后”，直接决定工艺怎么排。这件事不问清，前面做得再准也可能白做。

## 四、表面与洁净的分水岭

上一篇讲的三道门在这里继续生效，只是严格程度不同。

**承力植入件**——对表面和洁净的要求最高：通常是电解抛光（ASTM B912，电化学减料、降粗糙度）+ 钝化（ASTM A967/A967M，只溶游离铁、不改尺寸），而且洁净度要符合 **ISO 19227:2018《外科植入物 矫形外科植入物的清洁度》**——把残留分成无机、有机、颗粒、内毒素、生物负载、细胞毒性、目视七类，且要求在 ISO 13485 体系下运行、按最差条件样品做验证。这是医疗件里最严的一档。

**外科器械件**——则更看重“可重复灭菌下的耐腐蚀”：钝化 + 常规抛光通常就够了，外观一致性和手感也很重要。但别因此放松——器械的腐蚀评价对应的是 **ASTM F1089**，氯离子（生理盐水、含氯消毒剂）、异种金属接触（和镀铬或碳钢件混放）都是常见翻车点。

两类的共同底线是：**钝化必须在最终抛光之后**（抛光会把刚钝化好的膜磨掉，顺序反了等于白做），而且“我们钝化了”这句话必须能说出用的是 A967 里哪一组处理。

## 五、验收与文件的分水岭

最后一道分水岭在验收和文件。

**承力植入件**：材质证通常是 **EN 10204 3.1（独立机构签发，含实测成分、力学与炉批号）**，关键件还会要 **3.2（增加第三方见证）**；要求炉批号→件号的全链路追溯；关键尺寸上三坐标（CMM）全检；还要和生物学评价（ISO 10993 系列）的文件链接上。审核要的是“链”，不是“一张合格证”。

**外科器械件**：3.1 材质证一般即可；以抽检为主，配合功能测试（开合、剪切、锁定）和硬度抽检。文件量小得多，但功能合格是硬指标——一把钳子夹不住，比尺寸差 0.02 更让客户生气。

下面这张清单，发图之前先自问一遍，报价和交期都会稳得多：

| 要确认的事 | 为什么两条赛道不一样 |
|---|---|
| 牌号**加标准号** | 写“420”还是“ASTM F899 Class 4”、写“Ti-6Al-4V”还是“ASTM F136 Grade 23 ELI”，选料与价格完全不同 |
| 哪一类医疗件 | 承力植入件 vs 外科器械件，决定追溯深度、洁净档、验收比例 |
| 时效状态 | 17-4PH/630 是“时效前尺寸”还是“时效后尺寸”，决定排产顺序 |
| 表面处理写清“哪一道” | 钝化（A967）/ 电解抛光（B912）/ 两者都要；顺序与基准要标清 |
| 材质证类型 | 3.1、3.2，还是只要 CoC——取证成本与交期不同 |
| 清洁度要求 | 植入件常指定 ISO 19227；器械件看 ASTM F1089 耐蚀评价 |
| 检验比例 | 植入件关键尺寸偏全检，器械件偏抽检 + 功能测试 |

## 主要参考

1. ASTM F899-20《Standard Specification for Wrought Stainless Steels for Surgical Instruments》——外科器械用锻造不锈钢；分 Class 3 奥氏体（301/302/304/316）、Class 4 马氏体（410/420/440，硬度 HRC 50–60）、Class 5 沉淀硬化（630/17-4PH、XM-16）、Class 6 铁素体（430）；**只规定化学成分**，力学性能引用 A276/A564 等，马氏体硫 ≤0.030%；与 ISO 7153-1 协调对应。
2. ISO 5832-3:1996《Implants for surgery — Metallic materials — Part 3: Wrought titanium 6-aluminium 4-vanadium alloy》——铝 5.5–6.75、钒 3.5–4.5、铁 ≤0.30、氧 ≤0.20、碳 ≤0.08；ASTM F136 Grade 23 ELI 是更严的超低间隙版本（氧 ≤0.13%）。
3. ISO 5832-12:2016《Implants for surgery — Metallic materials — Part 12: Wrought cobalt-chromium-molybdenum alloy》——铬 26–30、钼 5–7、碳 ≤0.14（低炭级）或 0.15–0.35（高炭级）、镍 ≤1、铁 ≤0.75；≈ ASTM F1537 锻造低碳 CoCrMo。
4. ASTM F75《Cast Cobalt-Chromium-Molybdenum Alloy for Surgical Implant Applications》——铸造 CoCrMo（≈ ISO 5832-4），铬 26.5–30、钼 4.5–7、碳 ≤0.35；与锻造 F1537 不得互相顶替。
5. ASTM F138《Wrought 18Cr-14Ni-2.5Mo Stainless Steel Bar and Wire for Surgical Implants（UNS S31673）》——316LVM，成分窗口铬 17.00–19.00、镍 13.00–15.00、钼 2.25–3.00、碳 ≤0.030、硫 ≤0.010。
6. ASTM A967/A967M《Chemical Passivation Treatments for Stainless Steel Parts》、ASTM B912《Passivation of Stainless Steels Using Electropolishing》、ASTM F1089《Corrosion of Surgical Instruments》——分别为化学钝化（硝酸 1–5 / 柠檬酸 1–4）、电解抛光、器械耐蚀评价（沸水 + 铜硫酸盐试验）。
7. ISO 19227:2018《Implants for surgery — Cleanliness of orthopedic implants — General requirements》——在 ISO 13485 框架下运行，残留分无机、有机、颗粒、内毒素、生物负载、细胞毒性、目视七类；EN 10204 规定 3.1 / 3.2 材质证类型。

## 关于鑫永恒

我们做精密结构件二十三年，三十台 CNC 里含真正的五轴。医疗这一类零件，我们两条赛道都能接，但打法不同：

- **外科器械件（17-4PH/630、420/440C、303 等）**：小批量快速打样是我们的强项，2 小时内出报价；17-4PH 这类沉淀硬化材料的“软态精加工 + 最后时效”排产，我们按上面的铁律走。
- **承力植入件**：我们做精密机加能力范围内的承力附件与非核心结构件；核心植入件建议与具备 ISO 13485 体系认证的伙伴联合开发——我们提供机加与可追溯能力，不越界承担医疗合规的主体责任方。

如果你的医疗件卡在材料选型、时效排产、表面处理基准或者清洁度上，把图纸和要求一起发来，我们先做一遍 DFM 评审——该问的问题，我们会在报价之前就问清楚。

[免费 DFM 审查和报价](/zh/contact/get-a-quote/)
