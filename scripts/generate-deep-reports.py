#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate in-depth HTML research reports for knowledge/news page."""

from pathlib import Path

OUT = Path("F:/V7/public/downloads/reports")
OUT.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# 中文报告
# ---------------------------------------------------------------------------
CN_REPORTS = [
    {
        "slug": "2026-precision-manufacturing-trends-cn",
        "title": "2026 中国精密制造趋势深度报告",
        "subtitle": "从规模扩张到结构性升级：智能制造、国产高端装备与新材料驱动的产业变局",
        "date": "2026-08-22",
        "summary": "2026 年中国精密制造行业正经历从“规模红利”向“技术红利”的切换。本报告基于中商产业研究院、中国机械工业联合会、中国信息通信研究院等公开数据，对行业规模、数控装备、智能制造渗透率及下游需求进行定量拆解，并给出面向采购与工程决策的落地建议。",
        "cards": [
            {"label": "2025 年中国精密加工市场规模", "value": "约 4,200 亿元", "note": "2026 年预计达 4,560 亿元，同比 +8.5%"},
            {"label": "2025 年中国数控机床市场规模", "value": "1,224 亿元", "note": "2026 年预计 1,304 亿元，同比 +4.7%"},
            {"label": "规模以上工业企业数字化改造比例", "value": "89.6%", "note": "数字化设备普及率 57.7%（信通院 2025）"},
            {"label": "工业互联网核心产业规模", "value": "超 1.6 万亿元", "note": "带动工业增加值增长约 2.5 万亿元"},
        ],
        "sections": [
            {
                "heading": "一、市场基本面：总量稳增，结构分化",
                "body": """
                <p>据中国精密加工行业市场深度分析报告，2025 年中国精密加工行业市场规模已突破 <strong>4,200 亿元</strong>，预计 2026 年保持约 8.5% 的增速，达到 <strong>4,560 亿元</strong> 左右。行业已从政策驱动型增长转向内生性稳健扩张阶段，CR10（前十大企业市场占有率）从 2020 年的 13.6% 提升至 2025 年的 18.3%，头部集中趋势明显。</p>
                <p>在细分赛道中，CNC 加工领域 2026 年市场规模预计达到 <strong>1,304 亿元</strong>，同比增长 4.7%；高端五轴联动加工设备市场增速达到 <strong>25%</strong>，显著高于整体金属切削机床增速。手板模型加工定制领域 2026 年预计达 <strong>197.1 亿元</strong>，其中 63.2% 的增量来自汽车智能化零部件验证需求，22.8% 来自医疗 AI 硬件落地带来的结构验证频次提升。</p>
                """
            },
            {
                "heading": "二、智能制造：从单点自动化到全要素数字化",
                "body": """
                <p>中国信息通信研究院《制造业数字化转型发展报告（2025 年）》显示，截至 2025 年 12 月，全国规模以上工业企业开展数字化改造比例达 <strong>89.6%</strong>，数字化设备普及率达到 <strong>57.7%</strong>。累计建成 3.5 万余家基础级、8,200 余家先进级、500 余家卓越级、15 家领航级智能工厂，全球“灯塔工厂”85 家，中国占比 45%。</p>
                <p>工业互联网覆盖全部 41 个工业大类，5G 工厂数量突破 <strong>8,000 家</strong>，重点平台设备连接数超 <strong>1 亿台（套）</strong>。百家标杆 5G 工厂平均运营成本降低 <strong>19%</strong>，订单响应速度提升约 40%。工业企业应用大模型及智能体的比例从 2024 年的 9.6% 跃升至 2025 年的 <strong>47.5%</strong>。</p>
                <p>对精密加工车间而言，这意味着：MES 与 WMS 集成、在线检测、刀具寿命预测、基于 SPC 的尺寸闭环控制，正从“可选项”变成“准入项”。</p>
                """
            },
            {
                "heading": "三、下游需求：新能源、半导体、人形机器人三重驱动",
                "body": """
                <p>新能源汽车仍是最大增量。2025 年国内新能源汽车产量突破 <strong>1,300 万辆</strong>，带动电机壳体、电控散热件、轻量化结构件等精密零部件需求激增。国产半导体设备国产化率提升至 <strong>25%</strong>，对高洁净度、高精度的腔体部件、法兰、管路组件需求旺盛。人形机器人产业进入小规模量产前夜，行星滚柱丝杠、减速器壳体、传感器支架等精密零件成为新增量。</p>
                <p>从区域看，长三角、珠三角仍是精密加工产能核心区；中西部地区的汽车、航空航天配套需求正在催生新的产业集群。</p>
                """
            },
            {
                "heading": "四、对采购与工程决策的启示",
                "body": """
                <p>1. <strong>供应商筛选从“设备数量”转向“工艺闭环能力”</strong>：在数字化改造比例接近九成的背景下，单纯拥有设备已不足以保证交付一致性，需重点评估供应商的检测能力（CMM/2.5D）、过程数据追溯、首件/巡检制度。</p>
                <p>2. <strong>五轴加工从“高端选配”变成“效率刚需”</strong>：五轴设备国产化率提升使采购与使用成本下降，复杂壳体、多面结构件应尽量采用一次装夹完成，减少基准转换误差。</p>
                <p>3. <strong>关注材料-工艺-检测的匹配</strong>：铝合金薄壁件、钛合金航空件、碳纤维复合材料等不同材料对夹具、刀具路径、切削参数的要求差异极大，DFM 前置评审可显著降低后期返工成本。</p>
                """
            },
        ],
        "sources": [
            "中商产业研究院《2025-2030 年全球及中国精密制造行业深度分析及发展趋势研究预测报告》",
            "中国机械工业联合会 2025 年统计数据",
            "中国信息通信研究院《制造业数字化转型发展报告（2025 年）》",
            "中国报告大厅《2026-2031 年中国制造业行业市场深度研究与战略咨询分析报告》",
        ],
    },
    {
        "slug": "5-axis-localization-cn",
        "title": "国产五轴机床突围：从进口替代到定义标准",
        "subtitle": "2020-2026 国产化率从 18% 到 59.5% 的跨越，以及航空、汽车模具领域的真实战场",
        "date": "2026-08-22",
        "summary": "五轴联动数控机床被称为“工业母机皇冠上的明珠”。本报告基于中商产业研究院、中国机床工具工业协会、上市公司公告及产业调研，系统梳理国产五轴机床的市场规模、国产化率、核心厂商技术进展与真实差距，并给出零部件制造商的选型建议。",
        "cards": [
            {"label": "2025 年五轴机床国产化率", "value": "59.5%", "note": "2020 年仅 18%，四年翻三倍"},
            {"label": "2026 年中国五轴市场规模", "value": "157 亿元", "note": "2024 年 108 亿 → 2025 年 128 亿"},
            {"label": "2030 年预计市场规模", "value": "320 亿元+", "note": "2025-2030 CAGR 约 20%"},
            {"label": "北京精雕机床保有量", "value": "超 12 万台", "note": "高端精密五轴市占率国内第一"},
        ],
        "sections": [
            {
                "heading": "一、市场规模与国产化率：数字背后的真实跃迁",
                "body": """
                <p>据中国机床工具工业协会及中商产业研究院数据，中国五轴数控机床国产化率从 2020 年的 <strong>18%</strong> 跃升至 2024 年的 <strong>55%</strong>，2025 年进一步达到 <strong>59.5%</strong>，国内市场份额首次超过进口。市场规模同步扩张：2024 年约 <strong>108 亿元</strong>，2025 年约 <strong>128 亿元</strong>，2026 年预计达到 <strong>157 亿元</strong>，2030 年有望突破 <strong>320 亿元</strong>，复合增速约 20%。</p>
                <p>分档次看，中低端市场国产化率已超过 <strong>90%</strong>，中端约 <strong>65%</strong>，高端市场从几年前的个位数突破到 <strong>32%</strong>。航空航天领域国产采购比例已突破 <strong>60%</strong>，C919 约七成钛合金关键结构件已由国产设备加工完成。</p>
                """
            },
            {
                "heading": "二、核心厂商：三种技术路线的分野",
                "body": """
                <p><strong>北京精雕</strong>：国内唯一“系统 + CAM 软件 + 电主轴 + 转台 + 整机”全栈自研的厂商，机床保有量超 12 万台，高端精密五轴市占率国内第一。其 JD60 系统首创基于数字孪生的实时风险预判，SurfMill CAM 与机床深度耦合。</p>
                <p><strong>科德数控</strong>：国内唯一同时自研五轴机床整机和高档数控系统的上市公司，GNC62 系统对标西门子 840D，整机国产化率超 <strong>90%</strong>，核心功能部件自主化率超 <strong>85%</strong>。2026 年航空航天订单占比首次突破 60%，在手订单约 28 亿元。</p>
                <p><strong>拓璞数控</strong>：2025 年中国航空航天五轴数控机床市场份额排名第一，产品已用于 C919、长征系列运载火箭等国家级工程。<strong>海天精工</strong>凭借大型龙门五轴在船舶和能源装备领域打开局面。</p>
                """
            },
            {
                "heading": "三、差距仍在：高端系统、功能部件与精度保持性",
                "body": """
                <p>国产化率数字好看，但“实验室精度”与“量产稳定性”仍是两回事。高端五轴联动数控系统领域，发那科 30i、西门子 840D、海德汉 iTNC640 仍是绝对标杆，国产系统整体份额约 <strong>15%</strong>。高档数控系统国产化率仅约 <strong>30%</strong>，精密轴承国产化率仅 <strong>15%</strong>，高精度滚珠丝杠和直线导轨进口率仍超过 <strong>70%</strong>。</p>
                <p>在实际生产中，国产设备空载精度已不输对手，但连续高速重切削一年后的热稳定性、复杂工况下的故障率仍需打磨。业内资深代理商评价：马扎克良率 90% 以上，国产废品率仍偏高。差距在快速收窄，但远未到“全面替代”阶段。</p>
                """
            },
            {
                "heading": "四、工程选型建议",
                "body": """
                <p>1. <strong>明确工序定位</strong>：航空结构件、半导体腔体、医疗植入体等超高精度场景，进口高端设备仍是首选；汽车模具、3C 结构件、一般复杂壳体，国产五轴已具备显著性价比优势。</p>
                <p>2. <strong>关注“工艺验证”而非仅看参数</strong>：国产设备采购前务必进行典型零件试切，记录热机后的尺寸漂移、表面粗糙度稳定性、刀具寿命。</p>
                <p>3. <strong>供应链安全前置</strong>：在日本高端机床出口管制趋严的背景下，建议对核心工序至少建立 1 套国产备选方案，避免单一来源风险。</p>
                """
            },
        ],
        "sources": [
            "中商产业研究院《2025-2030 年中国工业母机市场调查与投资机会前景专题研究报告》",
            "中国机床工具工业协会 2025-2026 年数据",
            "科德数控（688305）2025 年年报及机构调研纪要",
            "中国工业新闻网《多重利好点燃机床行业增长》2026-08-21",
        ],
    },
    {
        "slug": "ev-parts-demand-cn",
        "title": "新能源汽车精密零件加工需求深度分析",
        "subtitle": "电驱壳体、电池托盘与轻量化结构件的精度门槛、材料选择与产能布局",
        "date": "2026-08-22",
        "summary": "新能源汽车正在重塑精密加工行业的需求结构。本报告结合全球铝合金电池托盘市场数据、中国新能源汽车产量、电机壳体与电池托盘加工精度标准，分析 EV 供应链对 CNC 加工的核心要求，并提出工艺优化方向。",
        "cards": [
            {"label": "2025 年全球铝合金电池托盘市场", "value": "53.4 亿美元", "note": "2026 年预计 59.1 亿美元，2032 年 133.6 亿"},
            {"label": "2025 年中国新能源汽车产量", "value": "超 1,300 万辆", "note": "连续十年全球第一"},
            {"label": "电机壳体轴承孔同轴度", "value": "≤ 0.015 mm", "note": "高端产线可稳定到 0.006 mm"},
            {"label": "电池托盘密封面平面度", "value": "≤ 0.2 mm/1000mm", "note": "超差会导致 IP67/IP68 密封失效"},
        ],
        "sections": [
            {
                "heading": "一、市场规模：轻量化驱动的结构性增长",
                "body": """
                <p>据 PW Consulting 及 Market Reports World 数据，2025 年全球铝合金电池托盘市场规模约 <strong>53.4 亿美元</strong>，2026 年预计达 <strong>59.1 亿美元</strong>，2032 年将增至 <strong>133.6 亿美元</strong>，2025-2032 年复合年增长率约 <strong>14%</strong>。全球电动汽车产量 2025 年超 <strong>1,800 万辆</strong>，2026 年预计超 <strong>2,250 万辆</strong>。</p>
                <p>中国占全球铝合金电池托盘产量 <strong>52%</strong> 以上，2025 年电动汽车产量超 <strong>1,000 万辆</strong>。亚太区域 2025 年占全球市场份额约 52%，北美 24%，欧洲 22%。工艺路线中，挤压型材焊接占 52.7%，压铸铝托盘占 34.4%，冲压焊接占 12.9%。</p>
                """
            },
            {
                "heading": "二、电机壳体：从保护罩到热-结构-密封系统",
                "body": """
                <p>电机壳体不仅是结构支撑件，更是集成水冷流道、电磁屏蔽与密封界面的热-结构系统。典型 EV 驱动电机转速 10,000–18,000 rpm，对轴承孔同轴度、安装面平面度提出严苛要求：</p>
                <ul>
                    <li>轴承孔同轴度：≤ <strong>0.015 mm</strong>（高端可达 0.006 mm）</li>
                    <li>安装面平面度：≤ <strong>0.02 mm</strong></li>
                    <li>表面粗糙度：Ra <strong>0.8–1.6 μm</strong></li>
                    <li>定子止口圆柱度：≤ <strong>0.02 mm</strong></li>
                </ul>
                <p>主流材料为压铸铝合金 ADC12、A380、AlSi10Mg（占比超 70%），以及挤压铝合金 6061-T6、6082-T6。五轴加工中心配合车铣复合工艺，可将电机壳体单件加工节拍从传统四轴的 45 分钟降至 28 分钟，效率提升约 37%。</p>
                """
            },
            {
                "heading": "三、电池托盘：大尺寸、高密封、强结构",
                "body": """
                <p>电池托盘是电池系统安全性的关键保障。铝合金托盘相比钢制可减重约 <strong>35%</strong>，导热率提高约 <strong>45%</strong>。随着电池包容量超过 75 kWh、商用电动皮卡超过 130 kWh，托盘尺寸大型化趋势明显。</p>
                <ul>
                    <li>安装面/密封面平面度：≤ <strong>0.2 mm/1000mm</strong></li>
                    <li>密封槽尺寸公差：± <strong>0.1 mm</strong></li>
                    <li>密封槽表面粗糙度：Ra ≤ <strong>1.6 μm</strong></li>
                    <li>搅拌摩擦焊对准公差：≤ <strong>0.4 mm</strong></li>
                </ul>
                <p>一体化压铸（Giga-casting）技术的发展，使单件铝托盘尺寸可超过 2.2 米，尺寸公差低于 0.5 mm，但模具投入大、工艺窗口窄，对 CNC 后续精加工与尺寸修正能力提出更高要求。</p>
                """
            },
            {
                "heading": "四、工艺落地建议",
                "body": """
                <p>1. <strong>压铸件必须去应力时效</strong>：ADC12 等压铸毛坯在精加工前需 160–180℃ 保温 2–4 小时去应力，否则后续变形率可超 30%。</p>
                <p>2. <strong>薄壁件采用真空吸盘/液压柔性夹具</strong>：避免虎钳装夹导致变形；大型平面加工采用多点支撑，支撑点间距 ≤200 mm。</p>
                <p>3. <strong>密封面必须连续加工、无毛刺</strong>：接刀痕与毛刺是 IP67/IP68 失效的主要诱因，需配合高压水冲洗与内窥镜检测。</p>
                <p>4. <strong>五轴一次装夹优先</strong>：对于多面壳体，五轴联动可减少基准转换误差，将关键尺寸合格率从 82% 提升至 97%。</p>
                """
            },
        ],
        "sources": [
            "PW Consulting《Worldwide Aluminum Alloy Battery Tray Market 2026》",
            "Market Reports World《Aluminum Alloy Battery Tray Market Report 2026-2035》",
            "新思界产业研究中心《中国铝合金电池托盘产业发展及“十五五规划”建议报告》",
            "5-axiscnc.com《Manufacturing and Technical Parameters of NEV Motor Housings》",
            "昆山玖珑沣精密科技《新能源汽车领域产品零件机加工对加工工艺有哪些要求？》",
        ],
    },
    {
        "slug": "iso-9001-update-cn",
        "title": "ISO 9001:2025 新版标准深度解读",
        "subtitle": "气候变化、质量文化、数字化与道德诚信如何改写质量管理体系",
        "date": "2026-08-22",
        "summary": "ISO 9001 正迎来 2015 年以来最重大修订。本报告基于 ISO/DIS 9001:2025 草案原文、Quality Magazine、ISO 认证机构解读，梳理新版标准的时间线、核心变化、对 110 万家获证组织的影响，以及精密制造企业的换证准备清单。",
        "cards": [
            {"label": "预计正式发布时间", "value": "2026 年 9 月", "note": "部分来源预计 2025 年 11 月，目前 DIS 已发布"},
            {"label": "过渡期", "value": "3 年", "note": "获证组织通常需在 2029 年前完成换证"},
            {"label": "全球获证组织数量", "value": "超 110 万家", "note": "分布在 170 多个国家和地区"},
            {"label": "最大新增要求", "value": "气候变化评估", "note": "须纳入组织背景与相关方需求分析"},
        ],
        "sections": [
            {
                "heading": "一、修订背景与时间线",
                "body": """
                <p>自 2015 版发布以来，数字化转型、供应链复杂性、气候变化、AI 广泛应用深刻改变了企业运营环境。ISO 在 2021 年签署《伦敦宣言》，承诺将气候变化纳入所有新制修订标准的核心考量。2023 年 11 月 ISO/TC 176 正式启动修订，2025 年 8 月发布 ISO/DIS 9001:2025 草案，预计 <strong>2026 年下半年</strong>正式发布。</p>
                <p>新版标准将保留高阶架构（HLS）和 PDCA 循环，核心要求基本不变，但新增气候变化、质量文化、道德诚信、数字化等时代性要求。过渡期预计为 <strong>3 年</strong>，即 2015 版证书通常在发布三年后逐步失效。</p>
                """
            },
            {
                "heading": "二、六大核心变化",
                "body": """
                <p>1. <strong>气候变化纳入背景分析（条款 4.1/4.2）</strong>：组织须评估气候变化是否为相关因素，并响应利益相关方的气候相关需求。这不是要求所有企业立即减碳，而是要求将气候风险纳入质量管理体系策划。</p>
                <p>2. <strong>领导力要求质量文化与道德诚信（条款 5.1）</strong>：最高管理者必须推动组织各层级遵守道德原则，并将质量文化与组织使命、愿景、价值观对齐。</p>
                <p>3. <strong>风险与机遇分设管理（条款 6.1）</strong>：从合并表述改为分别设置“应对风险”和“应对机遇”的子条款，强调预防与持续改进的双路径机制。</p>
                <p>4. <strong>变更管理强化（条款 6.3）</strong>：要求对质量管理体系的变更进行目的、后果、完整性、沟通及有效性评估。</p>
                <p>5. <strong>数字化与远程工作（条款 7.1.3/7.1.4）</strong>：基础设施须考虑信息技术、软件及远程/混合工作环境；AI 替代人工时需评估风险、机遇及伦理影响。</p>
                <p>6. <strong>文件信息灵活性</strong>：不再强制要求“保留成文信息”，而是强调“可获得性”，允许企业根据实际需求选择管理方式。</p>
                """
            },
            {
                "heading": "三、对精密制造企业的具体影响",
                "body": """
                <p>对 CNC 加工、精密零部件制造企业而言，新版标准的影响主要体现在：</p>
                <ul>
                    <li><strong>供应链韧性</strong>：需评估关键原材料（铝锭、刀具、进口丝杠导轨）受极端天气、地缘冲突、出口管制中断的风险，并建立备选供应商。</li>
                    <li><strong>数据完整性</strong>：在线检测数据、MES 追溯记录、CMM 报告等电子记录需确保防篡改、可追溯、备份完整。</li>
                    <li><strong>质量文化落地</strong>：从“墙上标语”转化为可量化的部门目标，如生产次品率下降值、客户投诉 24 小时关闭率、首件检验一次通过率。</li>
                    <li><strong>客户沟通</strong>：条款 8.2.1 新增“应急措施信息”沟通要求，包括交付中断时的 contingency actions。</li>
                </ul>
                """
            },
            {
                "heading": "四、换证准备清单",
                "body": """
                <p>1. <strong>差距分析</strong>：对照 DIS 草案，识别气候变化、质量文化、数字化记录、风险/机遇分设等差距。</p>
                <p>2. <strong>更新质量手册与程序文件</strong>：将气候风险、道德诚信、AI 使用伦理纳入质量方针与相关程序。</p>
                <p>3. <strong>培训与意识</strong>：确保各层级员工理解质量文化与道德行为要求，保留培训记录。</p>
                <p>4. <strong>内部审核</strong>：安排针对新版要求的专项内审，重点检查 4.1、4.2、5.1、6.1、6.3、7.1.3、8.2.1 等条款。</p>
                <p>5. <strong>与管理评审衔接</strong>：将气候变化、数字化风险、机遇管理纳入管理评审输入。</p>
                """
            },
        ],
        "sources": [
            "ISO/DIS 9001:2025 Draft International Standard",
            "Quality Magazine《Through a Glass Darkly: A Sneak Peek at ISO/DIS 9001:2025》",
            "FAKT Certification Services《New ISO 9001 revision: Draft International Standard published》",
            "SPC Consulting Group《ISO DIS 9001:2025 – What you need to know about the transition》",
            "卡狄亚标准认证《ISO 9001:2025 改版最新进展》",
        ],
    },
]

# ---------------------------------------------------------------------------
# 英文报告
# ---------------------------------------------------------------------------
EN_REPORTS = [
    {
        "slug": "2026-precision-manufacturing-trends-en",
        "title": "2026 Precision Manufacturing Trends: A Data-Driven Analysis",
        "subtitle": "From scale expansion to structural upgrading: smart factories, domestic high-end equipment, and new materials reshape the industry",
        "date": "2026-08-22",
        "summary": "In 2026, China's precision manufacturing sector is shifting from a volume-driven to a technology-driven growth model. This report draws on public data from AskCI Research, China Machinery Industry Federation, and CAICT to quantify market size, CNC equipment trends, smart-factory penetration, and downstream demand, with actionable guidance for procurement and engineering decisions.",
        "cards": [
            {"label": "2025 China Precision Machining Market", "value": "~RMB 4,200 bn", "note": "2026 forecast: RMB 4,560 bn (+8.5% YoY)"},
            {"label": "2025 China CNC Machine Tool Market", "value": "RMB 122.4 bn", "note": "2026 forecast: RMB 130.4 bn (+4.7% YoY)"},
            {"label": "Digital Transformation Rate", "value": "89.6%", "note": "Of industrial enterprises above designated size (CAICT 2025)"},
            {"label": "Industrial Internet Core Industry", "value": ">RMB 1.6 tn", "note": "Driving ~RMB 2.5 tn of industrial value-added growth"},
        ],
        "sections": [
            {
                "heading": "1. Market fundamentals: steady growth with structural divergence",
                "body": """
                <p>China's precision machining market exceeded <strong>RMB 4,200 billion</strong> in 2025 and is expected to reach <strong>RMB 4,560 billion</strong> in 2026, growing around 8.5% YoY. Industry CR10 rose from 13.6% in 2020 to 18.3% in 2025, indicating clear consolidation toward larger, integrated players.</p>
                <p>The CNC machining segment is forecast at <strong>RMB 130.4 billion</strong> in 2026 (+4.7%). High-end 5-axis machining equipment is growing much faster at <strong>25%</strong>. Rapid prototyping is forecast at <strong>RMB 19.71 billion</strong>, with 63.2% of incremental demand coming from automotive intelligent-component validation and 22.8% from medical AI hardware.</p>
                """
            },
            {
                "heading": "2. Smart manufacturing: from point automation to full-factor digitization",
                "body": """
                <p>By end-2025, 89.6% of industrial enterprises above designated size had launched digital transformation, with digital-equipment penetration at 57.7%. China has built more than 35,000 basic-level, 8,200 advanced-level, 500+ excellent-level, and 15 lighthouse-level smart factories, accounting for 45% of the world's "Lighthouse factories".</p>
                <p>Industrial internet now covers all 41 industrial categories; 5G factories exceed <strong>8,000</strong>; key platforms connect more than <strong>100 million</strong> industrial devices. Enterprise adoption of large models and AI agents jumped from 9.6% in 2024 to <strong>47.5%</strong> in 2025. For precision workshops, MES/WMS integration, in-process inspection, tool-life prediction, and SPC-based dimensional closed-loop control are becoming competitive necessities.</p>
                """
            },
            {
                "heading": "3. Downstream demand: EV, semiconductor, and humanoid robots",
                "body": """
                <p>New-energy vehicle output exceeded <strong>13 million units</strong> in 2025, driving demand for motor housings, controller heat sinks, and lightweight structural parts. Domestic semiconductor equipment localization reached <strong>25%</strong>, boosting demand for high-cleanliness chambers, flanges, and piping. Humanoid robots are entering pre-mass-production, creating new demand for planetary roller screws, reducer housings, and sensor brackets.</p>
                <p>Regionally, the Yangtze River Delta and Pearl River Delta remain the core precision-machining clusters, while automotive and aerospace supply chains in central and western China are forming new hubs.</p>
                """
            },
            {
                "heading": "4. Implications for buyers and engineers",
                "body": """
                <p>1. <strong>Supplier selection should focus on process-closure capability, not just machine count.</strong> Evaluate CMM/2.5D inspection, process-data traceability, first-article inspection, and patrol inspection systems.</p>
                <p>2. <strong>5-axis machining is becoming an efficiency necessity.</strong> Falling domestic prices and rising availability make single-setup multi-face machining the default for complex housings.</p>
                <p>3. <strong>Match material, process, and inspection.</strong> Thin-wall aluminum, titanium aerospace parts, and carbon-fiber composites require very different fixtures, tool paths, and cutting parameters. Early DFM review cuts rework costs significantly.</p>
                """
            },
        ],
        "sources": [
            "AskCI Research: 2025-2030 Global & China Precision Manufacturing Industry Forecast",
            "China Machinery Industry Federation 2025 statistics",
            "CAICT: China Manufacturing Digital Transformation Development Report 2025",
            "China Report Hall: 2026-2031 China Manufacturing Market Research & Strategy Report",
        ],
    },
    {
        "slug": "5-axis-localization-en",
        "title": "Domestic 5-Axis Machine Tools: From Import Substitution to Standard Setting",
        "subtitle": "How localization jumped from 18% to 59.5% between 2020 and 2025, and where the real battles are in aerospace and automotive tooling",
        "date": "2026-08-22",
        "summary": "5-axis simultaneous machining centers are the crown jewel of machine tools. This report compiles data from AskCI Research, China Machine Tool & Tool Builders' Association, listed-company filings, and industry research to map market size, localization rates, key vendors, and the real capability gaps that engineers must understand.",
        "cards": [
            {"label": "2025 5-Axis Localization Rate", "value": "59.5%", "note": "Up from 18% in 2020"},
            {"label": "2026 China 5-Axis Market", "value": "RMB 15.7 bn", "note": "RMB 10.8 bn in 2024 → RMB 12.8 bn in 2025"},
            {"label": "2030 Market Forecast", "value": ">RMB 32 bn", "note": "2025-2030 CAGR ~20%"},
            {"label": "Beijing Jingdiao Installed Base", "value": ">120,000 units", "note": "Domestic leader in high-precision 5-axis"},
        ],
        "sections": [
            {
                "heading": "1. Market size and localization: the real jump",
                "body": """
                <p>China's 5-axis CNC machine-tool localization rate rose from <strong>18%</strong> in 2020 to <strong>55%</strong> in 2024 and <strong>59.5%</strong> in 2025, overtaking imports for the first time. The domestic market grew from RMB 10.8 bn in 2024 to RMB 12.8 bn in 2025 and is forecast at <strong>RMB 15.7 bn</strong> in 2026, exceeding <strong>RMB 32 bn</strong> by 2030 (CAGR ~20%).</p>
                <p>By segment, low-/mid-end localization exceeds <strong>90%</strong>, mid-range is about <strong>65%</strong>, and high-end has moved from single digits to <strong>32%</strong>. In aerospace, domestic procurement has surpassed <strong>60%</strong>, and about 70% of C919 titanium-alloy critical structural parts are now machined on domestic equipment.</p>
                """
            },
            {
                "heading": "2. Key players and three technology strategies",
                "body": """
                <p><strong>Beijing Jingdiao</strong> is the only domestic vendor with fully self-developed CNC system, CAM software, motorized spindle, rotary table, and machine body. Its installed base exceeds 120,000 units and it leads the high-precision 5-axis segment.</p>
                <p><strong>Kede CNC (688305)</strong> is the only listed company that simultaneously develops 5-axis machines and high-end CNC systems. Its GNC62 system benchmarks Siemens 840D; machine localization exceeds <strong>90%</strong> and key-component self-sufficiency exceeds <strong>85%</strong>. Aerospace orders exceeded 60% of revenue in 2026, with about RMB 2.8 bn in backlog.</p>
                <p><strong>Toprob</strong> ranked first in China's aerospace 5-axis market in 2025, with products used in C919 and Long March launch vehicles. <strong>Haitian Precision</strong> has carved out a position in large gantry 5-axis machines for shipbuilding and energy equipment.</p>
                """
            },
            {
                "heading": "3. Persistent gaps: systems, components, and stability",
                "body": """
                <p>Despite the headline numbers, the gap remains real. In high-end 5-axis CNC systems, Fanuc 30i, Siemens 840D, and Heidenhain iTNC640 are still the benchmarks; domestic systems hold only about <strong>15%</strong> share overall. High-end CNC-system localization is ~<strong>30%</strong>, precision bearings ~<strong>15%</strong>, and high-precision ball screws/linear guides still depend on imports for over <strong>70%</strong> of demand.</p>
                <p>In real production, domestic machines match imports in no-load accuracy, but thermal stability and reliability under heavy-duty continuous cutting still need time to mature. Industry agents note that while Mazak can sustain >90% first-pass yield, domestic scrap rates remain higher. The gap is narrowing fast, but "complete substitution" is not yet honest.</p>
                """
            },
            {
                "heading": "4. Engineering sourcing recommendations",
                "body": """
                <p>1. <strong>Match the machine to the process.</strong> Aerospace structures, semiconductor chambers, and medical implants still favor imported high-end machines; automotive tooling, 3C structures, and general complex housings are now strong cases for domestic 5-axis.</p>
                <p>2. <strong>Demand process validation, not just specs.</strong> Trial-cut typical parts and record post-warm-up dimensional drift, surface-finish stability, and tool life.</p>
                <p>3. <strong>Build supply-chain redundancy.</strong> With tighter Japanese export controls on high-end machine tools, maintain at least one domestic alternative for critical processes.</p>
                """
            },
        ],
        "sources": [
            "AskCI Research: 2025-2030 China Industrial Mother Machine Market Research",
            "China Machine Tool & Tool Builders' Association 2025-2026 data",
            "Kede CNC (688305) 2025 annual report and institutional research notes",
            "China Industrial News: 'Multiple positives ignite machine-tool industry growth' (2026-08-21)",
        ],
    },
    {
        "slug": "ev-parts-demand-en",
        "title": "EV-Driven Precision Machining Demand: A Technical Deep Dive",
        "subtitle": "Precision thresholds, material choices, and capacity planning for e-drive housings, battery trays, and lightweight structures",
        "date": "2026-08-22",
        "summary": "Electric vehicles are reshaping the structure of precision machining demand. This report combines global aluminum battery-tray market data, China's NEV output, and machining-tolerance standards for motor housings and battery trays to analyze the core requirements EV supply chains place on CNC shops.",
        "cards": [
            {"label": "2025 Global Al Battery Tray Market", "value": "USD 5.34 bn", "note": "2026E USD 5.91 bn; 2032E USD 13.36 bn"},
            {"label": "2025 China NEV Output", "value": ">13 mn units", "note": "Ranked first globally for the 10th consecutive year"},
            {"label": "Motor Housing Bearing-Bore Concentricity", "value": "≤ 0.015 mm", "note": "High-end lines stabilize at 0.006 mm"},
            {"label": "Battery Tray Sealing Face Flatness", "value": "≤ 0.2 mm/1000mm", "note": "Exceeding it risks IP67/IP68 seal failure"},
        ],
        "sections": [
            {
                "heading": "1. Market scale: lightweighting-driven structural growth",
                "body": """
                <p>The global aluminum-alloy battery-tray market reached about <strong>USD 5.34 billion</strong> in 2025, is forecast at <strong>USD 5.91 billion</strong> in 2026, and will grow to <strong>USD 13.36 billion</strong> by 2032 (CAGR ~14%). Global EV production exceeded <strong>18 million</strong> units in 2025 and is expected to surpass <strong>22.5 million</strong> in 2026.</p>
                <p>China accounts for over <strong>52%</strong> of global aluminum battery-tray production, with NEV output exceeding <strong>10 million</strong> units in 2025. Asia-Pacific holds ~52% of global market share, North America ~24%, and Europe ~22%. Process-wise, extruded-and-welded trays account for 52.7%, die-cast trays 34.4%, and stamped-and-welded trays 12.9%.</p>
                """
            },
            {
                "heading": "2. Motor housings: from protective covers to thermal-structural-sealing systems",
                "body": """
                <p>Motor housings are no longer simple enclosures; they integrate water-cooling passages, EMI shielding, and sealing interfaces. Typical EV drive motors spin at 10,000–18,000 rpm, imposing strict requirements:</p>
                <ul>
                    <li>Bearing-bore concentricity: ≤ <strong>0.015 mm</strong> (high-end: 0.006 mm)</li>
                    <li>Mounting-face flatness: ≤ <strong>0.02 mm</strong></li>
                    <li>Surface roughness: Ra <strong>0.8–1.6 μm</strong></li>
                    <li>Stator-bore cylindricity: ≤ <strong>0.02 mm</strong></li>
                </ul>
                <p>Main materials are die-cast aluminum alloys ADC12, A380, AlSi10Mg (over 70% of use) and extruded 6061-T6 / 6082-T6. 5-axis machining with turn-mill compound can cut cycle time from 45 minutes to 28 minutes, a ~37% efficiency gain.</p>
                """
            },
            {
                "heading": "3. Battery trays: large size, high sealing, high structure",
                "body": """
                <p>Battery trays are critical to pack safety. Aluminum trays reduce weight by ~<strong>35%</strong> and improve thermal conductivity by ~<strong>45%</strong> versus steel. As pack capacities exceed 75 kWh and electric pickups exceed 130 kWh, trays are getting larger.</p>
                <ul>
                    <li>Sealing-face flatness: ≤ <strong>0.2 mm/1000mm</strong></li>
                    <li>Seal-groove dimensional tolerance: ± <strong>0.1 mm</strong></li>
                    <li>Seal-groove surface roughness: Ra ≤ <strong>1.6 μm</strong></li>
                    <li>Friction-stir-weld alignment tolerance: ≤ <strong>0.4 mm</strong></li>
                </ul>
                <p>Giga-casting enables single-piece aluminum trays over 2.2 m long with dimensional tolerance below 0.5 mm, but requires strong CNC finishing and dimensional-correction capability due to large tooling investment and narrow process windows.</p>
                """
            },
            {
                "heading": "4. Process recommendations",
                "body": """
                <p>1. <strong>Stress-relieve die-cast blanks before finish machining.</strong> ADC12 blanks need 160–180°C for 2–4 hours; otherwise deformation after machining can exceed 30%.</p>
                <p>2. <strong>Use vacuum chucks or hydraulic flexible fixtures for thin-wall parts</strong> to avoid vise-induced distortion; use multi-point supports spaced ≤200 mm for large faces.</p>
                <p>3. <strong>Machine sealing faces continuously and burr-free.</strong> Tool marks and burrs are major causes of IP67/IP68 failure; combine high-pressure washing with borescope inspection.</p>
                <p>4. <strong>Prefer 5-axis single-setup machining</strong> for multi-face housings to reduce datum-transfer error and raise critical-dimension first-pass yield from 82% to 97%.</p>
                """
            },
        ],
        "sources": [
            "PW Consulting: Worldwide Aluminum Alloy Battery Tray Market 2026",
            "Market Reports World: Aluminum Alloy Battery Tray Market Report 2026-2035",
            "5-axiscnc.com: Manufacturing and Technical Parameters of NEV Motor Housings",
            "Kunshan Jiulongfeng Precision Technology: Machining Process Requirements for NEV Parts",
        ],
    },
    {
        "slug": "iso-9001-update-en",
        "title": "ISO 9001:2025 / 2026 Revision: A Deep-Dive Compliance Guide",
        "subtitle": "How climate change, quality culture, digitalization, and ethical behavior are rewriting quality management systems",
        "date": "2026-08-22",
        "summary": "ISO 9001 is undergoing its most significant revision since 2015. Based on the ISO/DIS 9001:2025 draft, Quality Magazine analysis, and certification-body interpretations, this report summarizes the timeline, key changes, impact on more than 1.1 million certified organizations, and a transition checklist for precision manufacturers.",
        "cards": [
            {"label": "Expected Publication", "value": "Q3/Q4 2026", "note": "ISO/DIS 9001:2025 draft released Aug 2025"},
            {"label": "Transition Period", "value": "3 years", "note": "Certified organizations typically must transition by 2029"},
            {"label": "Certified Organizations Worldwide", "value": ">1.1 million", "note": "Across 170+ countries/regions"},
            {"label": "Biggest New Requirement", "value": "Climate-change assessment", "note": "Must be considered in organizational context and stakeholder needs"},
        ],
        "sections": [
            {
                "heading": "1. Background and timeline",
                "body": """
                <p>Since ISO 9001:2015 was published, digital transformation, supply-chain complexity, climate change, and AI have reshaped how organizations operate. ISO signed the London Declaration in 2021, committing to embed climate change in all new and revised standards. ISO/TC 176 launched the revision in November 2023; the ISO/DIS 9001:2025 draft was published in August 2025, with final publication expected in the <strong>second half of 2026</strong>.</p>
                <p>The new edition keeps the High-Level Structure and PDCA cycle; core requirements remain largely unchanged, but climate, quality culture, ethical behavior, and digitalization are added. A typical <strong>3-year</strong> transition period is expected.</p>
                """
            },
            {
                "heading": "2. Six key changes",
                "body": """
                <p>1. <strong>Climate change in context analysis (Clauses 4.1/4.2)</strong>: Organizations must determine whether climate change is relevant and consider related stakeholder requirements. This does not mandate immediate decarbonization but requires climate risk to be part of QMS planning.</p>
                <p>2. <strong>Leadership must promote quality culture and ethical behavior (Clause 5.1)</strong>: Top management must drive ethical principles and align quality culture with organizational mission, vision, and values.</p>
                <p>3. <strong>Risks and opportunities are separated (Clause 6.1)</strong>: Dedicated sub-clauses for actions to address risks and actions to address opportunities strengthen both prevention and continuous improvement.</p>
                <p>4. <strong>Change management reinforced (Clause 6.3)</strong>: Changes to the QMS must be planned with explicit consideration of purpose, consequences, integrity, communication, and effectiveness review.</p>
                <p>5. <strong>Digitalization and remote/hybrid work (Clauses 7.1.3/7.1.4)</strong>: Infrastructure must consider IT, software, and remote-work environments; AI replacing human tasks requires risk/opportunity/ethical assessment.</p>
                <p>6. <strong>Documented-information flexibility</strong>: The standard now emphasizes "availability" rather than mandating retention, allowing organizations to choose suitable management methods.</p>
                """
            },
            {
                "heading": "3. Impact on precision manufacturers",
                "body": """
                <p>For CNC machining and precision-component suppliers, the revision translates into:</p>
                <ul>
                    <li><strong>Supply-chain resilience</strong>: Assess risks of disruption to key materials (aluminum ingot, cutting tools, imported ball screws/guides) from extreme weather, geopolitics, or export controls; establish alternative sources.</li>
                    <li><strong>Data integrity</strong>: In-process inspection data, MES traceability records, and CMM reports must be tamper-evident, traceable, and backed up.</li>
                    <li><strong>Quality culture as KPIs</strong>: Move slogans to measurable targets such as defect-rate reduction, 24-hour complaint closure, and first-article-inspection pass rate.</li>
                    <li><strong>Customer communication</strong>: Clause 8.2.1 adds communication of contingency actions, including delivery-disruption scenarios.</li>
                </ul>
                """
            },
            {
                "heading": "4. Transition checklist",
                "body": """
                <p>1. <strong>Gap analysis</strong>: Compare your current QMS against the DIS draft, focusing on climate, culture, ethics, digital records, and risk/opportunity separation.</p>
                <p>2. <strong>Update manuals and procedures</strong>: Embed climate risk, ethical behavior, and AI-use ethics into the quality policy and relevant procedures.</p>
                <p>3. <strong>Training and awareness</strong>: Ensure all levels understand quality-culture and ethical-behavior expectations; keep training records.</p>
                <p>4. <strong>Internal audit</strong>: Run a focused internal audit on Clauses 4.1, 4.2, 5.1, 6.1, 6.3, 7.1.3, and 8.2.1.</p>
                <p>5. <strong>Management review</strong>: Include climate change, digitalization risks, and opportunity management as management-review inputs.</p>
                """
            },
        ],
        "sources": [
            "ISO/DIS 9001:2025 Draft International Standard",
            "Quality Magazine: Through a Glass Darkly: A Sneak Peek at ISO/DIS 9001:2025",
            "FAKT Certification Services: New ISO 9001 revision: Draft International Standard published",
            "SPC Consulting Group: ISO DIS 9001:2025 transition guide",
        ],
    },
]

# ---------------------------------------------------------------------------
# HTML 模板
# ---------------------------------------------------------------------------
TEMPLATE = """<!DOCTYPE html>
<html lang="{lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Eternal CNC</title>
  <meta name="description" content="{description}">
  <style>
    :root {{ --bg:#F4F3EE; --dark:#1A1A1A; --red:#8B0000; --muted:#6B7280; --line:#E5E7EB; --card:#fff; }}
    * {{ box-sizing:border-box; }}
    body {{ margin:0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", "Microsoft YaHei", sans-serif; background:var(--bg); color:var(--dark); line-height:1.75; }}
    .wrap {{ max-width:880px; margin:0 auto; padding:56px 24px; }}
    .brand {{ color:var(--red); font-weight:700; letter-spacing:0.06em; text-transform:uppercase; font-size:13px; margin-bottom:14px; }}
    h1 {{ font-size:34px; margin:0 0 12px; line-height:1.25; }}
    .subtitle {{ color:var(--muted); font-size:18px; margin-bottom:24px; line-height:1.5; }}
    .date {{ color:var(--muted); font-size:14px; margin-bottom:36px; }}
    .summary {{ background:var(--card); border:1px solid var(--line); border-radius:12px; padding:28px; margin-bottom:36px; }}
    .summary strong {{ display:block; margin-bottom:10px; color:var(--red); }}
    .cards {{ display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:16px; margin-bottom:40px; }}
    .card {{ background:var(--card); border:1px solid var(--line); border-radius:10px; padding:20px; }}
    .card-label {{ color:var(--muted); font-size:12px; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:8px; }}
    .card-value {{ font-weight:700; font-size:22px; color:var(--dark); margin-bottom:6px; }}
    .card-note {{ color:var(--muted); font-size:13px; line-height:1.5; }}
    h2 {{ font-size:22px; margin:42px 0 16px; padding-bottom:8px; border-bottom:2px solid var(--red); display:inline-block; }}
    h3 {{ font-size:17px; margin:26px 0 10px; color:var(--dark); }}
    p {{ margin:0 0 14px; }}
    ul {{ padding-left:22px; margin:0 0 18px; }}
    li {{ margin-bottom:8px; }}
    .sources {{ background:var(--card); border:1px solid var(--line); border-radius:12px; padding:24px; margin-top:40px; }}
    .sources h2 {{ margin-top:0; }}
    .sources ol {{ padding-left:20px; margin:0; color:var(--muted); font-size:14px; }}
    .sources li {{ margin-bottom:8px; }}
    .cta {{ margin-top:48px; padding:28px; background:var(--dark); color:#fff; border-radius:12px; text-align:center; }}
    .cta a {{ display:inline-block; margin-top:14px; padding:12px 28px; background:var(--red); color:#fff; text-decoration:none; border-radius:6px; font-weight:600; }}
    .cta a:hover {{ background:#6B0000; }}
    .footer {{ margin-top:48px; padding-top:24px; border-top:1px solid var(--line); color:var(--muted); font-size:13px; text-align:center; }}
    .disclaimer {{ color:var(--muted); font-size:13px; margin-top:24px; font-style:italic; }}
    @media (max-width: 640px) {{
      h1 {{ font-size:26px; }}
      .subtitle {{ font-size:16px; }}
      .cards {{ grid-template-columns:1fr; }}
    }}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="brand">Eternal CNC</div>
    <h1>{title}</h1>
    <div class="subtitle">{subtitle}</div>
    <div class="date">{date_label}: {date}</div>

    <div class="summary">
      <strong>{summary_label}</strong>
      {summary}
    </div>

    <div class="cards">
      {cards}
    </div>

    {sections}

    <div class="sources">
      <h2>{sources_label}</h2>
      <ol>
        {sources}
      </ol>
    </div>

    <p class="disclaimer">{disclaimer}</p>

    <div class="cta">
      {cta_text}<br>
      <a href="{cta_href}">{cta_btn}</a>
    </div>

    <div class="footer">&copy; 2026 Eternal CNC. {all_rights}</div>
  </div>
</body>
</html>
"""

CN_LABELS = {
    "date_label": "发布日期",
    "summary_label": "报告摘要",
    "sources_label": "数据来源与参考文献",
    "disclaimer": "说明：本报告基于公开行业数据、研究机构报告及企业公告整理，仅供工程决策参考，不构成投资或商业建议。",
    "cta_text": "需要针对上述趋势进行工艺讨论或获取精密加工支持？联系 Eternal CNC 工程团队。",
    "cta_btn": "获取报价",
    "cta_href": "/zh/contact/get-a-quote",
    "all_rights": "保留所有权利。",
}

EN_LABELS = {
    "date_label": "Published",
    "summary_label": "Executive Summary",
    "sources_label": "Data Sources and References",
    "disclaimer": "Note: This report is compiled from publicly available industry data, research reports, and company disclosures. It is for engineering decision-making reference only and does not constitute investment or business advice.",
    "cta_text": "Need process discussion or precision machining support for these trends? Contact the Eternal CNC engineering team.",
    "cta_btn": "Request a Quote",
    "cta_href": "/contact/get-a-quote",
    "all_rights": "All rights reserved.",
}

def build_card(card):
    return f"""<div class="card">
        <div class="card-label">{card['label']}</div>
        <div class="card-value">{card['value']}</div>
        <div class="card-note">{card['note']}</div>
      </div>"""

def build_sections(sections):
    return "\n".join(
        f"<h2>{s['heading']}</h2>\n{s['body']}" for s in sections
    )

def build_sources(sources):
    return "\n".join(f"<li>{s}</li>" for s in sources)

def build(reports, labels, lang):
    for r in reports:
        html = TEMPLATE.format(
            lang=lang,
            title=r["title"],
            description=r.get("subtitle", ""),
            subtitle=r["subtitle"],
            date=r["date"],
            date_label=labels["date_label"],
            summary=r["summary"],
            summary_label=labels["summary_label"],
            cards="\n".join(build_card(c) for c in r["cards"]),
            sections=build_sections(r["sections"]),
            sources_label=labels["sources_label"],
            sources=build_sources(r["sources"]),
            disclaimer=labels["disclaimer"],
            cta_text=labels["cta_text"],
            cta_btn=labels["cta_btn"],
            cta_href=labels["cta_href"],
            all_rights=labels["all_rights"],
        )
        (OUT / f"{r['slug']}.html").write_text(html, encoding="utf-8")
        print(f"written: {r['slug']}.html")

if __name__ == "__main__":
    build(CN_REPORTS, CN_LABELS, "zh-CN")
    build(EN_REPORTS, EN_LABELS, "en")
    print("done")
