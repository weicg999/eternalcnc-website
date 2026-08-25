#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate in-depth HTML research reports for the knowledge/news page."""

from pathlib import Path

OUT = Path("F:/V7/public/downloads/reports")
OUT.mkdir(parents=True, exist_ok=True)

BRAND_RED = "#8B0000"
BG = "#F4F3EE"
DARK = "#1A1A1A"
MUTED = "#6B7280"
LINE = "#E5E7EB"

BASE_STYLE = f"""
:root {{ --bg:{BG}; --dark:{DARK}; --red:{BRAND_RED}; --muted:{MUTED}; --line:{LINE}; }}
* {{ box-sizing:border-box; }}
body {{ margin:0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", "Microsoft YaHei", sans-serif; background:var(--bg); color:var(--dark); line-height:1.75; }}
.wrap {{ max-width:840px; margin:0 auto; padding:48px 24px; }}
.brand {{ color:var(--red); font-weight:700; letter-spacing:0.08em; text-transform:uppercase; font-size:13px; margin-bottom:12px; }}
h1 {{ font-size:34px; margin:0 0 12px; line-height:1.25; }}
.subtitle {{ font-size:18px; color:var(--muted); margin-bottom:24px; line-height:1.6; }}
.date {{ color:var(--muted); font-size:14px; margin-bottom:32px; }}
.summary {{ background:#fff; border:1px solid var(--line); border-radius:12px; padding:28px; margin-bottom:36px; }}
.summary strong {{ display:block; margin-bottom:8px; color:var(--red); text-transform:uppercase; font-size:12px; letter-spacing:0.05em; }}
h2 {{ font-size:22px; margin:40px 0 16px; padding-bottom:8px; border-bottom:2px solid var(--line); }}
h3 {{ font-size:17px; margin:28px 0 10px; color:var(--dark); }}
p {{ margin:0 0 16px; }}
ul {{ padding-left:22px; margin:0 0 20px; }}
li {{ margin-bottom:10px; }}
.metric-grid {{ display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin:24px 0; }}
.metric {{ background:#fff; border:1px solid var(--line); border-radius:10px; padding:18px; }}
.metric-value {{ font-size:26px; font-weight:700; color:var(--red); margin-bottom:4px; }}
.metric-label {{ font-size:13px; color:var(--muted); line-height:1.5; }}
.chart {{ background:#fff; border:1px solid var(--line); border-radius:12px; padding:24px; margin:24px 0; }}
.chart h4 {{ margin:0 0 16px; font-size:15px; color:var(--muted); font-weight:600; }}
.bar-row {{ display:flex; align-items:center; margin-bottom:12px; }}
.bar-label {{ width:110px; font-size:13px; color:var(--muted); flex-shrink:0; }}
.bar-track {{ flex:1; height:22px; background:#f3f4f6; border-radius:4px; overflow:hidden; margin:0 10px; }}
.bar-fill {{ height:100%; background:var(--red); border-radius:4px; }}
.bar-value {{ width:70px; text-align:right; font-size:13px; font-weight:600; }}
.insight {{ background:#fff; border-left:4px solid var(--red); padding:18px 22px; margin:24px 0; border-radius:0 10px 10px 0; }}
.insight strong {{ display:block; margin-bottom:6px; }}
.source {{ color:var(--muted); font-size:13px; margin-top:8px; }}
.source a {{ color:var(--muted); }}
.cta {{ margin-top:48px; padding:32px; background:var(--dark); color:#fff; border-radius:12px; text-align:center; }}
.cta a {{ display:inline-block; margin-top:14px; padding:12px 28px; background:var(--red); color:#fff; text-decoration:none; border-radius:6px; font-weight:600; }}
.cta a:hover {{ background:#6B0000; }}
.footer {{ margin-top:48px; padding-top:24px; border-top:1px solid var(--line); color:var(--muted); font-size:13px; text-align:center; }}
.table-wrap {{ overflow-x:auto; margin:20px 0; }}
table {{ width:100%; border-collapse:collapse; background:#fff; border:1px solid var(--line); font-size:14px; }}
th, td {{ padding:12px 14px; text-align:left; border-bottom:1px solid var(--line); }}
th {{ background:#fafafa; font-weight:600; }}
"""


def make_html(lang, title, subtitle, date, date_label, summary, sections, sources, cta_text, cta_btn, cta_href, all_rights):
    body_sections = "\n".join(sections)
    source_items = "\n".join(f'    <li>{s}</li>' for s in sources)
    return f"""<!DOCTYPE html>
<html lang="{lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Eternal CNC</title>
  <style>{BASE_STYLE}</style>
</head>
<body>
  <div class="wrap">
    <div class="brand">Eternal CNC</div>
    <h1>{title}</h1>
    <div class="subtitle">{subtitle}</div>
    <div class="date">{date_label}: {date}</div>

    <div class="summary">
      <strong>Executive Summary</strong>
      {summary}
    </div>

{body_sections}

    <h2>Data Sources & Methodology</h2>
    <p>This report synthesizes publicly available industry statistics, market research, and regulatory documents published through August 2026. All figures are attributed to the original sources below. Eternal CNC does not claim independent verification of third-party market data; the analysis focuses on engineering implications for precision machining procurement and manufacturing strategy.</p>
    <ul>
{source_items}
    </ul>

    <div class="cta">
      {cta_text}<br>
      <a href="{cta_href}">{cta_btn}</a>
    </div>

    <div class="footer">&copy; 2026 Eternal CNC. {all_rights}</div>
  </div>
</body>
</html>
"""


def metric_card(value, label):
    return f"""    <div class="metric">
      <div class="metric-value">{value}</div>
      <div class="metric-label">{label}</div>
    </div>"""


def bar_chart(title, rows):
    """rows: list of (label, value_str, percent 0-100)"""
    bars = "\n".join(
        f"""      <div class="bar-row">
        <div class="bar-label">{label}</div>
        <div class="bar-track"><div class="bar-fill" style="width:{pct}%"></div></div>
        <div class="bar-value">{val}</div>
      </div>"""
        for label, val, pct in rows
    )
    return f"""    <div class="chart">
      <h4>{title}</h4>
{bars}
    </div>"""


CN_REPORTS = []
EN_REPORTS = []

# === Report 1: 2026 Precision Manufacturing Trends ===
CN_REPORTS.append({
    "slug": "2026-precision-manufacturing-trends-cn",
    "title": "2026 中国精密制造趋势深度报告",
    "subtitle": "从政策驱动到内生增长：智能制造、高端装备国产化与新材料应用的工程化落地",
    "date": "2026-08-22",
    "summary": "2026 年中国精密制造行业正处于由“规模扩张”向“质量效益”切换的关键节点。规模以上工业企业数字化改造比例已接近九成，智能工厂建设进入规模化复制阶段；工业互联网核心产业规模突破 1.6 万亿元，带动工业增加值增长约 2.5 万亿元。与此同时，高端五轴数控机床国产化率逼近 60%，新材料与轻量化结构推动加工工艺持续升级。本报告基于国家统计局、工信部、中国信通院及多家行业研究机构数据，分析精密制造行业的真实规模、技术演进路径与工程采购启示。",
    "sections": [
        "    <h2>一、市场规模与增长动能</h2>",
        "    <p>中国精密制造行业的“市场边界”因统计口径不同而差异较大：若按精密加工制造业口径，2025 年市场规模已突破 4,200 亿元人民币，2026 年预计保持 8.5% 增速，达到约 4,560 亿元；若将精密仪器、精密结构件及模组纳入统计，整体规模可达万亿元级别。无论采用哪种口径，一个共同信号是清晰的——行业已从政策补贴驱动转向由内需升级、供应链重构和新兴应用拉动的内生性增长。</p>",
        "    <div class=\"metric-grid\">",
        metric_card("~4,560 亿元", "2026E 中国精密加工市场规模（同比增长 8.5%）"),
        metric_card("1.6 万亿元", "2025 工业互联网核心产业规模"),
        metric_card("89.6%", "2025 年规模以上工业企业数字化改造比例"),
        metric_card("512 台/万人", "2025 年中国工业机器人密度"),
        "    </div>",
        "    <p>从增长结构看，新能源汽车、半导体设备、工业自动化、医疗装备是四大核心拉力。2025 年国内新能源汽车产量突破 1,300 万辆，带动电机壳体、电控散热件、轻量化结构件需求激增；同期国产半导体设备国产化率提升至约 25%，对高洁净度腔体、法兰、管路组件的精密加工需求旺盛。这两个领域共同推动了五轴加工、车铣复合、高精度检测设备的订单增长。</p>",
        "    <h2>二、智能制造：从单点自动化到全要素数字化</h2>",
        "    <p>中国制造业数字化转型已进入“规模化普及”阶段。根据中国信息通信研究院《制造业数字化转型发展报告（2025年）》，截至 2025 年 12 月，全国规模以上工业企业数字化改造比例达 89.6%，数字化设备普及率达到 57.7%。累计建成 3.5 万余家基础级、8,200 余家先进级、500 余家卓越级、15 家领航级智能工厂。</p>",
        "    <div class=\"chart\">",
        "      <h4>2025 年中国智能工厂分级建设情况</h4>",
        "      <div class=\"bar-row\"><div class=\"bar-label\">基础级</div><div class=\"bar-track\"><div class=\"bar-fill\" style=\"width:100%\"></div></div><div class=\"bar-value\">35,000+</div></div>",
        "      <div class=\"bar-row\"><div class=\"bar-label\">先进级</div><div class=\"bar-track\"><div class=\"bar-fill\" style=\"width:23%\"></div></div><div class=\"bar-value\">8,200+</div></div>",
        "      <div class=\"bar-row\"><div class=\"bar-label\">卓越级</div><div class=\"bar-track\"><div class=\"bar-fill\" style=\"width:1.4%\"></div></div><div class=\"bar-value\">500+</div></div>",
        "      <div class=\"bar-row\"><div class=\"bar-label\">领航级</div><div class=\"bar-track\"><div class=\"bar-fill\" style=\"width:0.04%\"></div></div><div class=\"bar-value\">15</div></div>",
        "    </div>",
        "    <p>工业互联网与人工智能的融合正在重塑生产组织方式。2025 年，我国工业企业应用大模型及智能体的比例从 2024 年的 9.6% 跃升至 47.5%。在百家 5G 工厂示范引领下，智能化改造已实现平均 19% 的运营成本下降。对于精密加工企业而言，这意味着客户对“数据可追溯、过程可量化、交付可预测”的要求正在从加分项变为准入项。</p>",
        "    <div class=\"insight\"><strong>工程视角：</strong>单纯的设备自动化已不足以赢得高端客户。具备 MES 全工序追溯、SPC 关键尺寸监控、检测设备数据直连能力的工厂，正在成为汽车、医疗、半导体供应链的优先选择。</div>",
        "    <h2>三、高端装备国产化：五轴机床的拐点</h2>",
        "    <p>五轴联动数控机床被称为“工业母机皇冠上的明珠”。2020 年中国五轴机床国产化率仅 18%，到 2024 年升至 55%，2025 年进一步达到 59.5%。中国机床工具工业协会数据显示，国产品牌合计市占率从 64% 提升至 71%。市场规模同步扩张：2024 年国内五轴数控机床市场规模约 108 亿元，2025 年约 128 亿元，2026 年预计达到 157 亿元。</p>",
        "    <div class=\"metric-grid\">",
        metric_card("59.5%", "2025 年中国五轴机床国产化率（2020 年仅 18%）"),
        metric_card("157 亿元", "2026E 中国五轴数控机床市场规模"),
        metric_card("22.2%", "2025-2030 年五轴市场复合年均增速预测"),
        metric_card("~70%", "高端五轴数控系统仍由外资品牌占据"),
        "    </div>",
        "    <p>国产替代并非没有短板。在高精度滚珠丝杠、直线导轨、精密轴承等功能部件领域，进口依赖度仍然超过 70%；高端数控系统国产化率仅约 30%。这意味着国产五轴机床在“能用”到“好用”之间仍有距离，特别是在连续重切削工况下的热稳定性、精度保持性方面，与德日品牌存在可感知的差距。</p>",
        "    <h2>四、新材料应用重塑加工工艺</h2>",
        "    <p>轻量化、高强度、耐腐蚀的新材料正在改变传统加工参数体系。新能源汽车电池托盘、电驱壳体大量采用 6061-T6、6082-T6 铝合金；航空结构件向钛合金、高温合金延伸；半导体设备零部件则需要不锈钢、工程陶瓷、碳纤维复合材料等难加工材料。这些材料对刀具寿命、切削参数、夹具设计和冷却策略提出了更高要求。</p>",
        "    <div class=\"insight\"><strong>工艺启示：</strong>铝合金薄壁件加工需重点控制变形与振刀；钛合金/高温合金加工则需要优化切削速度（Vc）与每齿进给（fz）的匹配，并配合高压内冷刀具。材质-刀具-参数的闭环设计，是精密加工企业的核心能力壁垒。</div>",
        "    <h2>五、对 Eternal CNC 客户的影响与建议</h2>",
        "    <p>面对上述趋势，精密零部件采购方应从三个维度重新评估供应商：</p>",
        "    <ul>",
        "      <li><strong>工艺深度：</strong>供应商是否具备多轴联动、车铣复合、复杂型腔一次装夹成型的能力？是否拥有 2.5D/3D 检测闭环？</li>",
        "      <li><strong>数字化能力：</strong>能否提供首件报告（FAI）、过程能力指数（Cpk）、全尺寸检测数据，并实现关键尺寸 SPC 监控？</li>",
        "      <li><strong>供应链韧性：</strong>是否过度依赖进口设备/刀具？是否具备国产替代设备的工艺验证能力，以应对潜在的地缘政治风险？</li>",
        "    </ul>",
        "    <p>Eternal CNC 的产能配置正围绕上述趋势持续升级：厂内 24 台数控设备覆盖三轴至五轴加工，2.5D 影像测量仪实现关键尺寸在线检测，全流程厂内闭环确保交付一致性。对于需要深度工程支持的采购方，我们建议从 DFM 评审阶段即介入，以便在材料选择、结构优化和工艺路径上提前规避风险。</p>",
    ],
    "sources": [
        "中国信息通信研究院《制造业数字化转型发展报告（2025年）》",
        "中商产业研究院《2025-2030年全球及中国精密制造行业深度分析及发展趋势研究预测报告》",
        "中国机械工业联合会 2025 年统计数据",
        "中国机床工具工业协会 2025-2026 年行业运行数据",
        "行业研究机构 2025-2026 年五轴数控机床市场分析"
    ],
    "cta_text": "需要针对精密制造趋势进行工艺评估或批量试制？联系 Eternal CNC 工程团队获取报价与技术评审。",
    "cta_btn": "获取报价",
    "cta_href": "/zh/contact/get-a-quote",
    "all_rights": "保留所有权利。"
})

EN_REPORTS.append({
    "slug": "2026-precision-manufacturing-trends-en",
    "title": "2026 China Precision Manufacturing Trends: In-Depth Report",
    "subtitle": "From policy-driven expansion to endogenous growth: smart manufacturing, localization of high-end machine tools, and new materials",
    "date": "2026-08-22",
    "summary": "In 2026, China's precision manufacturing sector is shifting from scale expansion to quality-driven growth. The digital transformation rate among large-scale industrial enterprises has reached 89.6%, smart-factory construction has entered a replication phase, and the core industrial internet market has exceeded RMB 1.6 trillion. At the same time, domestic 5-axis CNC machine-tool localization has climbed to nearly 60%, while new materials and lightweight structures continue to push process boundaries. This report draws on data from the Ministry of Industry and Information Technology (MIIT), China Academy of Information and Communications Technology (CAICT), and industry research institutes to analyze market size, technology evolution, and engineering procurement implications.",
    "sections": [
        "    <h2>1. Market Size and Growth Drivers</h2>",
        "    <p>Depending on the statistical scope, China's precision manufacturing market ranges from RMB 4.56 trillion (precision machining) to over RMB 10 trillion when precision instruments and structural components are included. The common signal is unambiguous: the industry is transitioning from policy subsidy dependence to endogenous growth driven by domestic upgrading, supply-chain restructuring, and emerging applications.</p>",
        "    <div class=\"metric-grid\">",
        metric_card("~RMB 4.56T", "2026E precision machining market (YoY +8.5%)"),
        metric_card("RMB 1.6T", "2025 core industrial internet market size"),
        metric_card("89.6%", "Large-scale industrial enterprises with digital transformation, 2025"),
        metric_card("512 units/10k", "China industrial robot density, 2025"),
        "    </div>",
        "    <p>New energy vehicles (NEVs), semiconductor equipment, industrial automation, and medical devices are the four main demand engines. In 2025, domestic NEV output exceeded 13 million units, driving demand for motor housings, electronic-control heat sinks, and lightweight structural parts. Domestic semiconductor equipment localization reached about 25%, fueling demand for high-cleanliness chambers, flanges, and piping components.</p>",
        "    <h2>2. Smart Manufacturing: From Automation to Full-Factor Digitization</h2>",
        "    <p>China's manufacturing digital transformation has entered a mass-adoption phase. According to CAICT's 2025 report, 89.6% of large-scale industrial enterprises had launched digital transformation by end-2025, with digital-equipment penetration at 57.7%. Cumulative smart-factory construction includes over 35,000 basic-level, 8,200 advanced-level, 500 excellence-level, and 15 lighthouse-level factories.</p>",
        "    <div class=\"chart\">",
        "      <h4>China Smart-Factory Construction by Tier, 2025</h4>",
        "      <div class=\"bar-row\"><div class=\"bar-label\">Basic</div><div class=\"bar-track\"><div class=\"bar-fill\" style=\"width:100%\"></div></div><div class=\"bar-value\">35,000+</div></div>",
        "      <div class=\"bar-row\"><div class=\"bar-label\">Advanced</div><div class=\"bar-track\"><div class=\"bar-fill\" style=\"width:23%\"></div></div><div class=\"bar-value\">8,200+</div></div>",
        "      <div class=\"bar-row\"><div class=\"bar-label\">Excellence</div><div class=\"bar-track\"><div class=\"bar-fill\" style=\"width:1.4%\"></div></div><div class=\"bar-value\">500+</div></div>",
        "      <div class=\"bar-row\"><div class=\"bar-label\">Lighthouse</div><div class=\"bar-track\"><div class=\"bar-fill\" style=\"width:0.04%\"></div></div><div class=\"bar-value\">15</div></div>",
        "    </div>",
        "    <p>The integration of industrial internet and AI is reshaping production organization. In 2025, the share of Chinese industrial enterprises using large AI models and agents jumped from 9.6% to 47.5%. Benchmark 5G factories have cut operating costs by an average of 19%. For precision-machining suppliers, end-to-end traceability, quantified processes, and predictable delivery are becoming prerequisites rather than differentiators.</p>",
        "    <div class=\"insight\"><strong>Engineering takeaway:</strong> Equipment automation alone is no longer enough to win high-end customers. Shops with MES traceability, SPC on critical dimensions, and direct data links to inspection equipment are becoming the preferred choice for automotive, medical, and semiconductor supply chains.</div>",
        "    <h2>3. Localization of High-End Machine Tools</h2>",
        "    <p>5-axis CNC machine tools are the crown jewel of the machine-tool industry. China's localization rate for 5-axis machines rose from 18% in 2020 to 55% in 2024 and 59.5% in 2025; domestic brands' combined market share increased from 64% to 71%. Market size grew from RMB 10.8 billion in 2024 to an estimated RMB 12.8 billion in 2025 and is projected to reach RMB 15.7 billion in 2026.</p>",
        "    <div class=\"metric-grid\">",
        metric_card("59.5%", "2025 5-axis localization rate (vs. 18% in 2020)"),
        metric_card("RMB 15.7B", "2026E China 5-axis CNC machine market"),
        metric_card("22.2%", "Projected 2025-2030 CAGR for 5-axis market"),
        metric_card("~70%", "High-end CNC systems still held by foreign brands"),
        "    </div>",
        "    <p>Shortages remain in high-precision ball screws, linear guides, and bearings, where import dependence exceeds 70%. Localization of high-end CNC systems is only around 30%. Domestic 5-axis machines are competitive under no-load conditions, but thermal stability and accuracy retention under continuous heavy cutting still lag behind German and Japanese benchmarks.</p>",
        "    <h2>4. New Materials Reshape Machining Processes</h2>",
        "    <p>Lightweight, high-strength, and corrosion-resistant materials are changing cutting-parameter systems. NEV battery trays and e-drive housings widely use 6061-T6 and 6082-T6 aluminum; aerospace parts increasingly use titanium and high-temperature alloys; semiconductor equipment requires stainless steel, engineering ceramics, and carbon-fiber composites. These materials demand higher performance from tooling, fixtures, and cooling strategies.</p>",
        "    <div class=\"insight\"><strong>Process implication:</strong> Aluminum thin-wall parts require deformation and chatter control; titanium and high-temperature alloys need optimized Vc/fz matching with high-pressure internal-cooling tools. The closed loop of material-tool-parameter is the core capability moat for precision-machining suppliers.</div>",
        "    <h2>5. Implications for Procurement</h2>",
        "    <p>Buyers of precision components should reassess suppliers on three dimensions:</p>",
        "    <ul>",
        "      <li><strong>Process depth:</strong> Can the supplier perform multi-axis simultaneous, mill-turn, and complex-cavity machining in one setup? Is there a 2.5D/3D inspection closed loop?</li>",
        "      <li><strong>Digital capability:</strong> Can the supplier deliver FAI reports, Cpk indices, full-dimension inspection data, and SPC monitoring on critical dimensions?</li>",
        "      <li><strong>Supply-chain resilience:</strong> Is the supplier over-reliant on imported machines or tools? Can it validate domestic-alternative processes?</li>",
        "    </ul>",
        "    <p>Eternal CNC is continuously upgrading around these trends: 24 CNC machines covering 3-axis to 5-axis, in-house 2.5D vision measurement, and a fully in-house workflow for delivery consistency. We recommend involving the supplier at the DFM stage to mitigate risks in material selection, structural optimization, and process routing.</p>",
    ],
    "sources": [
        "China Academy of Information and Communications Technology (CAICT), 'Manufacturing Digital Transformation Development Report (2025)'",
        "China Market Intelligence / AskCI, '2025-2030 Global and China Precision Manufacturing Industry Deep Analysis and Development Trend Forecast Report'",
        "China Machinery Industry Federation, 2025 industry statistics",
        "China Machine Tool & Tool Builders' Association, 2025-2026 industry data",
        "Industry research reports on 5-axis CNC machine market, 2025-2026"
    ],
    "cta_text": "Need a process review or prototype run aligned with these trends? Contact the Eternal CNC engineering team for a quote and technical review.",
    "cta_btn": "Request a Quote",
    "cta_href": "/contact/get-a-quote",
    "all_rights": "All rights reserved."
})


# === Report 2: 5-Axis Localization ===
CN_REPORTS.append({
    "slug": "5-axis-localization-cn",
    "title": "国产五轴机床国产化进程深度研究报告",
    "subtitle": "从 18% 到 59.5%：自主可控拐点已至，但“好用”仍是下半场核心命题",
    "date": "2026-08-22",
    "summary": "2020 年至 2025 年，中国五轴数控机床国产化率从 18% 跃升至 59.5%，市场规模从约 60 亿元增长至 128 亿元，2026 年预计突破 157 亿元。这一跃迁由政策、需求、技术三重力量驱动：国产厂商在数控系统、伺服驱动、电主轴、转台等关键部件上取得突破，科德数控、北京精雕、拓璞数控等企业逐步从“跟随”走向“并跑”。然而，在航空发动机、大飞机等终极考场，国产渗透率仍不足四成，高端数控系统、精密丝杠导轨、轴承等功能部件仍是短板。本报告结合市场规模、企业案例与技术瓶颈，评估国产五轴机床在精密加工项目中的真实可用性。",
    "sections": [
        "    <h2>一、市场规模与国产化率：四年翻三倍</h2>",
        "    <p>五轴联动数控机床是衡量一个国家高端制造能力的关键指标。根据中商产业研究院及观研报告网数据，2024 年中国五轴数控机床市场规模达 108 亿元，2025 年约 128 亿元，2026 年预计达到 157 亿元；2025-2030 年复合年均增速预计高达 22.2%，2030 年市场空间有望达到 320 亿元以上。</p>",
        "    <div class=\"metric-grid\">",
        metric_card("59.5%", "2025 年中国五轴机床国产化率"),
        metric_card("157 亿元", "2026E 中国五轴数控机床市场规模"),
        metric_card("22.2%", "2025-2030 年 CAGR"),
        metric_card("35%", "C919 量产阶段国产机床参与度"),
        "    </div>",
        "    <p>国产化率的变化更为剧烈：2020 年仅 18%，2024 年升至 55%，2025 年达到 59.5%。中国品牌合计市占率从 64% 提升至 71%，首次在销售额层面超过进口品牌。这意味着，在中端及中低端应用场景，国产五轴机床已经具备批量替代进口的经济性与技术可行性。</p>",
        bar_chart("中国五轴机床国产化率演进", [("2020", "18%", 18), ("2022", "约 35%", 35), ("2024", "55%", 55), ("2025", "59.5%", 59.5)]),
        "    <h2>二、主要玩家与技术路线</h2>",
        "    <p>国产五轴机床的竞争格局呈现“技术流派”分化：</p>",
        "    <ul>",
        "      <li><strong>科德数控：</strong>国内唯一同时自研五轴机床整机、高档数控系统（GNC62）及关键功能部件的上市公司。整机国产化率超 90%，核心部件自主化率 85% 以上，GNC62 对标西门子 840D 总体通过率约 95%。2024 年国产五轴机床国内销售收入排名第二，航空航天军工领域国产市占率第一。</li>",
        "      <li><strong>北京精雕：</strong>专注精密五轴在 3C 电子、精密模具领域的深耕，数控系统、CAM 软件、电主轴、转台、整机全栈自研。按销量统计，2023 年占国产品牌份额 16.3%，连续多年稳居销量与营收第一。</li>",
        "      <li><strong>拓璞数控：</strong>2024 年国产五轴销售收入排名第三，2025 年在航空航天五轴数控机床市场份额排名第一，产品已用于 C919、长征系列运载火箭等国家级工程。</li>",
        "      <li><strong>华中数控：</strong>2025 年 4 月发布全球首款嵌入 AI 芯片的华中 10 型智能数控系统，支持大模型部署、智能编程与故障自诊断，动态精度误差控制在 1 微米以内。</li>",
        "    </ul>",
        "    <h2>三、真实应用场景验证</h2>",
        "    <p>国产五轴机床已从“能卖”进入“能跑产线”的阶段。科德数控为中国航天科工集团三院 31 所搭建了行业首条以国产高端装备为主的发动机关重件生产线，采用 6 类 22 台五轴数控机床，配备 AGV、桁架机器人、在线检测系统。投产结果：设备综合利用率达 70%，生产效率提升 30%，人员缩减 50% 以上。</p>",
        "    <p>在汽车模具领域，五轴卧式加工中心对汽车桥架、变速箱壳体、发动机缸体缸盖等箱体类零件的高效加工，国产设备已经能覆盖主流工艺需求。新能源汽车一体化压铸带来的大型模具加工增量，更是给了国产五轴弯道超车的机会。</p>",
        "    <h2>四、未跨过的坎：精度保持性与生态</h2>",
        "    <p>国产化率数字好看，但高端市场的真实份额仍然有限。在航空发动机、大飞机等超精密加工领域，欧美日企业仍占据约 80% 的市场份额。关键瓶颈包括：</p>",
        "    <div class=\"metric-grid\">",
        metric_card("~70%", "高端数控系统仍由发那科、西门子、海德汉占据"),
        metric_card(">70%", "高精度滚珠丝杠、直线导轨进口率"),
        metric_card("15%", "精密轴承国产化率"),
        metric_card("<40%", "航空制造领域国产五轴渗透率"),
        "    </div>",
        "    <p>更隐蔽的差距在于“精度保持性”：进口高端机床精度可稳定保持三到五年，国产设备空载状态下精度已不输对手，但进入高速重切削的真实工况后，一年后精度衰减是常见反馈。此外，CAM 后处理、培训体系、工艺数据库等软件生态仍是德日品牌的护城河。</p>",
        "    <div class=\"insight\"><strong>采购建议：</strong>对于公差要求 ±0.01 mm 以内、表面粗糙度 Ra 0.8 以下、批量稳定性要求高的项目，建议将国产五轴用于粗加工、半精加工或非关键特征加工；精加工及关键尺寸仍可保留进口设备或进行充分的工艺验证。国产替代应分阶段、分工序推进，而不是一刀切。</div>",
        "    <h2>五、Eternal CNC 的立场与实践</h2>",
        "    <p>Eternal CNC 的设备配置以三轴、四轴及五轴立式加工中心为主，覆盖铝合金、不锈钢、钛合金等常见精密材料的加工需求。对于超出厂内设备能力或精度要求的特殊项目，我们通过家族关联企业检测中心的三坐标测量资源进行按需送检，确保关键尺寸的可追溯性。</p>",
        "    <p>我们认为，国产五轴机床的崛起为精密加工行业提供了“降本+保供”的双重红利，但工程采购的核心仍应是“按工序匹配设备能力”，而非盲目追求国产化率。真正的竞争力来自于：工艺 Know-how + 设备能力 + 检测闭环的稳定组合。</p>",
    ],
    "sources": [
        "中商产业研究院《2025-2030年中国工业母机市场调查与投资机会前景专题研究报告》",
        "观研报告网 2025 年五轴数控机床市场分析",
        "中国机床工具工业协会 2025-2026 年行业数据",
        "科德数控公告及机构调研纪要",
        "北京精雕、华中数控、拓璞数控公开技术资料"
    ],
    "cta_text": "正在评估国产五轴替代方案？Eternal CNC 可提供工艺可行性评审、试切验证与批量生产支持。",
    "cta_btn": "获取报价",
    "cta_href": "/zh/contact/get-a-quote",
    "all_rights": "保留所有权利。"
})

EN_REPORTS.append({
    "slug": "5-axis-localization-en",
    "title": "China 5-Axis Machine Tool Localization: In-Depth Report",
    "subtitle": "From 18% to 59.5% localization: the inflection point has arrived, but "good enough" remains the battleground",
    "date": "2026-08-22",
    "summary": "Between 2020 and 2025, China's 5-axis CNC machine-tool localization rate jumped from 18% to 59.5%, while market size grew from roughly RMB 6 billion to RMB 12.8 billion and is expected to reach RMB 15.7 billion in 2026. This shift is driven by policy, demand, and technology: domestic vendors have made breakthroughs in CNC systems, servo drives, motorized spindles, and rotary tables. Yet in the ultimate proving grounds of aero-engines and large aircraft, domestic penetration remains below 40%. This report examines market size, vendor cases, and technical bottlenecks to assess the real applicability of domestic 5-axis machines in precision-machining projects.",
    "sections": [
        "    <h2>1. Market Size and Localization Rate</h2>",
        "    <p>According to China Market Intelligence and market-research sources, China's 5-axis CNC machine market reached RMB 10.8 billion in 2024, grew to about RMB 12.8 billion in 2025, and is projected to hit RMB 15.7 billion in 2026. The 2025-2030 CAGR is forecast at 22.2%, with the market potentially exceeding RMB 32 billion by 2030.</p>",
        "    <div class=\"metric-grid\">",
        metric_card("59.5%", "2025 5-axis localization rate in China"),
        metric_card("RMB 15.7B", "2026E China 5-axis CNC market size"),
        metric_card("22.2%", "Projected 2025-2030 CAGR"),
        metric_card("35%", "Domestic machine participation in C919 mass production"),
        "    </div>",
        "    <p>The localization rate climbed from 18% in 2020 to 55% in 2024 and 59.5% in 2025. Domestic brands' combined market share rose from 64% to 71%, overtaking imports in sales value for the first time.</p>",
        bar_chart("China 5-Axis Machine Tool Localization Rate", [("2020", "18%", 18), ("2022", "~35%", 35), ("2024", "55%", 55), ("2025", "59.5%", 59.5)]),
        "    <h2>2. Key Players and Technology Strategies</h2>",
        "    <ul>",
        "      <li><strong>Kede CNC:</strong> The only listed Chinese company that independently develops 5-axis machines, high-end CNC systems (GNC62), and key functional components. Whole-machine localization exceeds 90%; core-component autonomy exceeds 85%. GNC62 benchmarks at ~95% overall alignment with Siemens 840D. Ranked second in domestic 5-axis sales revenue in 2024 and first in aerospace/military domestic share.</li>",
        "      <li><strong>Beijing Jingdiao:</strong> Focuses on precision 5-axis machining for 3C electronics and precision molds. Full-stack self-reliance across CNC system, CAM software, spindles, rotary tables, and machine bodies. By unit sales, held 16.3% of domestic-brand share in 2023.</li>",
        "      <li><strong>Toprom CNC:</strong> Ranked third in domestic 5-axis sales revenue in 2024 and first in aerospace 5-axis market share in 2025. Machines are used in C919 and Long March rocket programs.</li>",
        "      <li><strong>HNC:</strong> Released the HNC-10 intelligent CNC system with embedded AI chip in April 2025, supporting large-model deployment and fault self-diagnosis with dynamic accuracy error within 1 µm.</li>",
        "    </ul>",
        "    <h2>3. Real-World Application Validation</h2>",
        "    <p>Domestic 5-axis machines have moved from "sellable" to "production-line proven." Kede CNC built an engine critical-parts line for a CASIC institute using 22 machines across six categories, with AGVs, gantry robots, and in-line inspection. Results: 70% equipment utilization, 30% productivity gain, and over 50% headcount reduction.</p>",
        "    <p>In automotive die and mold, domestic 5-axis horizontal machining centers already cover mainstream processes for bridge frames, transmission cases, and engine blocks. The large-die machining demand created by NEV integrated die-casting gives domestic 5-axis vendors an opportunity to leapfrog.</p>",
        "    <h2>4. Remaining Gaps: Accuracy Retention and Ecosystem</h2>",
        "    <p>Despite impressive localization figures, high-end market share remains limited. Western, Japanese, and Taiwanese vendors still hold about 80% of the ultra-precision aerospace segment. Key bottlenecks:</p>",
        "    <div class=\"metric-grid\">",
        metric_card("~70%", "High-end CNC systems held by Fanuc, Siemens, Heidenhain"),
        metric_card(">70%", "Import dependence for high-precision ball screws and guides"),
        metric_card("15%", "Domestic localization rate for precision bearings"),
        metric_card("<40%", "Domestic 5-axis penetration in aerospace manufacturing"),
        "    </div>",
        "    <p>A less visible gap is accuracy retention: imported high-end machines maintain precision stably for three to five years, while domestic machines may show thermal drift and wear after one year of heavy cutting. CAM post-processors, training systems, and process databases remain part of the German/Japanese moat.</p>",
        "    <div class=\"insight\"><strong>Procurement recommendation:</strong> For projects requiring tolerances tighter than ±0.01 mm, surface roughness below Ra 0.8, and high batch consistency, use domestic 5-axis for roughing and semi-finishing while retaining imported machines or extensive process validation for finishing. Localization should be phased by operation, not applied indiscriminately.</div>",
        "    <h2>5. Eternal CNC Position</h2>",
        "    <p>Eternal CNC operates 3-axis, 4-axis, and 5-axis vertical machining centers covering aluminum, stainless steel, and titanium alloys. For projects beyond in-house capability or precision requirements, we leverage our affiliated family-group inspection center for on-request CMM verification, ensuring traceability of critical dimensions.</p>",
        "    <p>We view the rise of domestic 5-axis machines as a cost-and-supply-resilience opportunity, but the core of engineering procurement remains matching machine capability to operation requirements. Sustainable competitiveness comes from the stable combination of process know-how, equipment capability, and inspection closed loop.</p>",
    ],
    "sources": [
        "China Market Intelligence, '2025-2030 China Machine Tool Market Survey and Investment Outlook Report'",
        "Industry research reports on 5-axis CNC machine market, 2025",
        "China Machine Tool & Tool Builders' Association, 2025-2026 industry data",
        "Kede CNC announcements and institutional research notes",
        "Public technical materials from Beijing Jingdiao, HNC, and Toprom CNC"
    ],
    "cta_text": "Evaluating a domestic 5-axis substitution? Eternal CNC provides process feasibility review, test-cut validation, and volume production support.",
    "cta_btn": "Request a Quote",
    "cta_href": "/contact/get-a-quote",
    "all_rights": "All rights reserved."
})


# === Report 3: EV Parts Demand ===
CN_REPORTS.append({
    "slug": "ev-parts-demand-cn",
    "title": "新能源汽车精密零件加工需求深度研究报告",
    "subtitle": "电驱壳体、电池托盘与轻量化结构件如何重塑 CNC 加工工艺标准",
    "date": "2026-08-22",
    "summary": "2025 年全球电动汽车产量超过 1,800 万辆，2026 年全球 EV 销量预计突破 2,250 万辆。新能源汽车的爆发式增长正在重塑精密加工行业：电驱系统壳体、电池托盘、减速器壳体等关键零件对尺寸精度、密封性和轻量化的要求远超传统燃油车。铝合金 6061-T6、ADC12 成为主流材料，电机壳体同轴度需控制在 0.006 mm 以内，电池托盘安装面平面度要求 ≤0.2 mm/1000 mm。本报告结合全球与中国市场数据、典型零件工艺参数，分析新能源汽车供应链对精密加工的真实需求与采购策略。",
    "sections": [
        "    <h2>一、市场规模：从整车到零部件的传导</h2>",
        "    <p>新能源汽车是过去五年拉动精密加工需求最核心的增量市场之一。2025 年全球电动汽车产量超过 1,800 万辆，中国产量超过 1,000 万辆；2026 年全球 EV 销量预计突破 2,250 万辆。单辆电动汽车的铝制电池托盘可减少约 28 kg 整车质量，全球 EV 销量的增长预计将带来超过 400 万吨的增量铝需求。</p>",
        "    <div class=\"metric-grid\">",
        metric_card(">1,800 万辆", "2025 年全球电动汽车产量"),
        metric_card(">1,000 万辆", "2025 年中国电动汽车产量"),
        metric_card("59.1 亿美元", "2026E 全球铝合金电池托盘市场规模"),
        metric_card("52%", "中国铝合金电池托盘产量占全球份额"),
        "    </div>",
        "    <p>铝合金电池托盘市场 2025 年全球规模约 53.4 亿美元，2026 年预计达到 59.1 亿美元，2032 年有望增长至 133.6 亿美元，2025-2032 年复合年均增速约 14%。从工艺路线看，挤压型材焊接占比约 53%，高压压铸占比约 34%，冲压焊接占比约 13%。中国凭借完整的铝加工产业链，占据了全球约 52% 的产量份额。</p>",
        "    <h2>二、电驱壳体：精度决定 NVH 与效率</h2>",
        "    <p>电机壳体是电驱系统的核心结构件，兼具结构支撑、散热、密封和振动阻尼功能。典型 EV 驱动电机转速为 10,000-18,000 rpm，微小的不对中都会导致振动、噪声和效率损失。因此，电机壳体对轴承孔同轴度、安装面平面度、密封面粗糙度提出了严苛要求：</p>",
        "    <div class=\"table-wrap\"><table>",
        "      <tr><th>参数</th><th>典型要求</th><th>工程意义</th></tr>",
        "      <tr><td>轴承孔同轴度</td><td>≤ 0.015 mm（五轴加工可达 0.006 mm）</td><td>防止转子不平衡、降低 NVH</td></tr>",
        "      <tr><td>安装面平面度</td><td>≤ 0.02 mm</td><td>保证密封可靠、避免泄漏</td></tr>",
        "      <tr><td>定子止口圆柱度</td><td>≤ 0.02 mm</td><td>维持气隙一致性、保障效率</td></tr>",
        "      <tr><td>表面粗糙度</td><td>Ra 0.8-1.6 µm</td><td>改善密封与配合性能</td></tr>",
        "    </table></div>",
        "    <p>在批量生产中，压铸铝合金 ADC12、A380 占比超过 70%，但压铸件存在气孔、缩松等缺陷，加工前必须进行 160-180℃、2-4 小时的去应力时效处理。对于高性能需求，越来越多供应商选择 6061-T6 铝坯料直接 CNC 加工，以消除孔隙风险、实现更稳定的公差控制。</p>",
        "    <h2>三、电池托盘：大型化与一体化压铸</h2>",
        "    <p>电池托盘正从“边框+底板”的焊接结构向一体化压铸方向发展。2025 年，全球超过 39% 的新推出 EV 平台采用巨型铸铝结构，可生产长度超过 2 米、尺寸公差低于 0.5 mm 的单件托盘。这一趋势对加工设备、夹具和检测能力提出新挑战：</p>",
        "    <ul>",
        "      <li><strong>设备：</strong>大型结构件需龙门加工中心，定位精度 ≤ ±0.008 mm，重复定位 ≤ ±0.004 mm；</li>",
        "      <li><strong>平面度：</strong>液冷板安装面、密封面平面度 ≤ 0.2 mm/1000 mm，超差会导致硅胶垫片压缩不均、冷却液泄漏；</li>",
        "      <li><strong>密封槽：</strong>槽深/槽宽公差 ±0.1 mm，Ra ≤ 1.6 µm，槽底无接刀痕、无毛刺；</li>",
        "      <li><strong>清洁度：</strong>交叉孔口必须倒角去毛刺，采用高压水冲洗 + 内窥镜检测，禁止毛刺残留。</li>",
        "    </ul>",
        "    <div class=\"insight\"><strong>加工风险点：</strong>压铸毛坯未做去应力直接精加工，后续变形率可超 30%；焊接后未做去应力处理再精铣，焊接变形会导致尺寸超差。对于要求 IP67/IP68 的电池托盘，密封面连续加工、无毛刺是质量控制的核心。</div>",
        "    <h2>四、减速器壳体与轻量化结构件</h2>",
        "    <p>新能源汽车减速器壳体多为 ADC12 压铸件，外形尺寸约 400×300×200 mm，轴承孔间距公差 ±0.02 mm，轴承孔同轴度 φ0.01 mm，油封孔 Ra 0.8 µm。采用五轴联动加工中心配合车铣复合工艺，可在一次装夹内完成铣面、镗孔、钻孔、攻丝全部工序，尺寸公差 ±0.01 mm 合格率可从 82% 提升至 97%。</p>",
        "    <p>轻量化结构件方面，副车架、控制臂、转向节等零件大量采用 6061-T6、6082-T6 铝合金。五轴加工可将转向节曲面精度提升 50%，单件加工节拍从传统四轴工艺的 45 分钟降至 28 分钟，效率提升 37%。</p>",
        "    <h2>五、采购策略建议</h2>",
        "    <p>新能源汽车零部件采购应重点关注供应商的以下能力：</p>",
        "    <ul>",
        "      <li><strong>材料工艺匹配：</strong>是否熟悉 ADC12 去应力、6061-T6 薄壁变形控制、搅拌摩擦焊后加工等关键工艺？</li>",
        "      <li><strong>设备能力：</strong>是否具备 4/5 轴加工中心、龙门加工中心、枪钻/深孔钻系统？</li>",
        "      <li><strong>检测闭环：</strong>是否配备 2.5D/3D 测量设备，能够实现密封面平面度、孔系位置度、清洁度的全检？</li>",
        "    </ul>",
        "    <p>Eternal CNC 在新能源汽车精密零件领域已形成成熟工艺方案：从电机壳体、电控壳体到结构件支架，均可提供 DFM 评审、试切打样到批量交付的全流程服务。我们建议客户在早期设计阶段即引入加工可行性分析，以避免后期因变形、密封失效或清洁度问题导致的返工。</p>",
    ],
    "sources": [
        "PW Consulting / Market Research, 'Worldwide Aluminum Alloy Battery Tray Market 2026'",
        "新思界产业研究中心《中国铝合金电池托盘产业发展及“十五五规划”建议报告》",
        "Market Reports World, 'Aluminum Alloy Battery Tray Market Report 2026-2035'",
        "5-Axis CNC industry technical articles on NEV motor housing tolerances",
        "昆山玖珑沣精密科技《新能源汽车领域产品零件机加工工艺要求》"
    ],
    "cta_text": "有新能源汽车精密零件加工需求？联系 Eternal CNC 工程团队进行 DFM 评审与批量试制。",
    "cta_btn": "获取报价",
    "cta_href": "/zh/contact/get-a-quote",
    "all_rights": "保留所有权利。"
})

EN_REPORTS.append({
    "slug": "ev-parts-demand-en",
    "title": "EV Precision Parts Machining Demand: In-Depth Report",
    "subtitle": "How e-drive housings, battery trays, and lightweight structural parts are reshaping CNC process standards",
    "date": "2026-08-22",
    "summary": "Global EV production exceeded 18 million units in 2025, with sales projected to surpass 22.5 million in 2026. This explosive growth is reshaping precision machining: e-drive housings, battery trays, and reducer housings demand tighter dimensional tolerances, sealing performance, and lightweighting than conventional ICE parts. Aluminum 6061-T6 and ADC12 have become mainstream materials; motor-housing bearing-bore concentricity must be held within 0.006 mm, and battery-tray mounting-face flatness must be ≤0.2 mm/1000 mm. This report combines global and China market data with typical component process parameters to analyze real demand and procurement strategy in the EV supply chain.",
    "sections": [
        "    <h2>1. Market Size: From Vehicles to Components</h2>",
        "    <p>NEVs are one of the most important incremental drivers for precision machining over the past five years. Global EV production exceeded 18 million units in 2025, with China contributing over 10 million. Global EV sales are expected to surpass 22.5 million in 2026. A single EV's aluminum battery tray can cut roughly 28 kg of vehicle weight, and EV sales growth is expected to drive over 4 million tonnes of incremental aluminum demand.</p>",
        "    <div class=\"metric-grid\">",
        metric_card(">18M units", "Global EV production, 2025"),
        metric_card(">10M units", "China EV production, 2025"),
        metric_card("USD 5.91B", "2026E global aluminum alloy battery tray market"),
        metric_card("52%", "China's share of global aluminum battery tray output"),
        "    </div>",
        "    <p>The global aluminum alloy battery tray market was about USD 5.34 billion in 2025 and is projected to reach USD 5.91 billion in 2026 and USD 13.36 billion by 2032, representing a 2025-2032 CAGR of about 14%. By process, extruded-and-welded trays account for ~53%, high-pressure die-casting ~34%, and stamped-and-welded ~13%. China holds about 52% of global output thanks to its integrated aluminum-processing supply chain.</p>",
        "    <h2>2. E-Drive Housings: Precision Drives NVH and Efficiency</h2>",
        "    <p>The motor housing is the core structural part of an e-drive system, providing structural support, heat dissipation, sealing, and vibration damping. Typical EV drive motors spin at 10,000-18,000 rpm, so even tiny misalignment causes vibration, noise, and efficiency loss. This imposes strict requirements:</p>",
        "    <div class=\"table-wrap\"><table>",
        "      <tr><th>Parameter</th><th>Typical Requirement</th><th>Engineering Significance</th></tr>",
        "      <tr><td>Bearing-bore concentricity</td><td>≤ 0.015 mm (0.006 mm achievable with 5-axis)</td><td>Prevents rotor imbalance, reduces NVH</td></tr>",
        "      <tr><td>Mounting-face flatness</td><td>≤ 0.02 mm</td><td>Ensures reliable sealing, prevents leaks</td></tr>",
        "      <tr><td>Stator-bore cylindricity</td><td>≤ 0.02 mm</td><td>Maintains consistent air gap, efficiency</td></tr>",
        "      <tr><td>Surface roughness</td><td>Ra 0.8-1.6 µm</td><td>Improves sealing and fit</td></tr>",
        "    </table></div>",
        "    <p>In volume production, die-cast aluminum ADC12 and A380 account for over 70% of motor housings, but castings contain porosity and shrinkage defects and must undergo 160-180°C stress-relief aging for 2-4 hours before machining. For high-performance requirements, an increasing number of suppliers machine from 6061-T6 billet to eliminate porosity and achieve tighter, more stable tolerances.</p>",
        "    <h2>3. Battery Trays: Larger Formats and Gigacasting</h2>",
        "    <p>Battery trays are evolving from welded frame-and-base structures toward single-piece gigacasting. In 2025, over 39% of newly launched EV platforms adopted giant cast-aluminum structures, enabling single trays longer than 2 meters with dimensional tolerances below 0.5 mm. This creates new challenges for machine tools, fixtures, and inspection:</p>",
        "    <ul>",
        "      <li><strong>Equipment:</strong> Large structural parts require gantry machining centers with positioning accuracy ≤ ±0.008 mm and repeatability ≤ ±0.004 mm.</li>",
        "      <li><strong>Flatness:</strong> Liquid-cooling plate and sealing faces require flatness ≤ 0.2 mm/1000 mm; excess deviation causes uneven gasket compression and coolant leakage.</li>",
        "      <li><strong>Sealing grooves:</strong> Groove depth/width tolerance ±0.1 mm, Ra ≤ 1.6 µm, no tool marks or burrs.</li>",
        "      <li><strong>Cleanliness:</strong> Cross-holes must be deburred and inspected by high-pressure washing + borescope; burr residue is not acceptable.</li>",
        "    </ul>",
        "    <div class=\"insight\"><strong>Key machining risks:</strong> Machining die-cast blanks without stress relief can cause deformation exceeding 30%; welding without subsequent stress relief and finish milling leads to dimensional out-of-tolerance. For IP67/IP68 battery trays, continuous sealing-face machining and burr-free edges are central to quality control.</div>",
        "    <h2>4. Reducer Housings and Lightweight Structural Parts</h2>",
        "    <p>NEV reducer housings are mostly ADC12 die castings with dimensions around 400×300×200 mm, bearing-bore spacing tolerance ±0.02 mm, bearing-bore concentricity φ0.01 mm, and oil-seal bore Ra 0.8 µm. Using 5-axis machining centers with mill-turn processes, all operations—facing, boring, drilling, tapping—can be completed in one setup, raising the ±0.01 mm pass rate from 82% to 97%.</p>",
        "    <p>For lightweight structural parts such as subframes, control arms, and steering knuckles, 6061-T6 and 6082-T6 aluminum are widely used. 5-axis machining can improve steering-knuckle surface accuracy by 50% and cut cycle time from 45 minutes to 28 minutes per part, a 37% efficiency gain.</p>",
        "    <h2>5. Procurement Recommendations</h2>",
        "    <p>EV-component buyers should focus on the following supplier capabilities:</p>",
        "    <ul>",
        "      <li><strong>Material-process matching:</strong> Is the supplier experienced in ADC12 stress relief, 6061-T6 thin-wall deformation control, and post-friction-stir-welding machining?</li>",
        "      <li><strong>Equipment:</strong> Does the supplier have 4/5-axis machining centers, gantry machines, and gun-drilling/deep-hole systems?</li>",
        "      <li><strong>Inspection closed loop:</strong> Are 2.5D/3D measurement devices available for full inspection of sealing-face flatness, hole pattern position, and cleanliness?</li>",
        "    </ul>",
        "    <p>Eternal CNC has developed mature process solutions for EV precision parts, from motor housings and electronic-control enclosures to structural brackets. We provide DFM review, prototype test cuts, and volume delivery in a fully in-house workflow. We recommend involving machining feasibility analysis at the early design stage to avoid rework caused by deformation, sealing failure, or cleanliness issues.</p>",
    ],
    "sources": [
        "PW Consulting, 'Worldwide Aluminum Alloy Battery Tray Market 2026'",
        "Xinsi Industry Research Center, 'China Aluminum Alloy Battery Tray Industry Development and 15th Five-Year Plan Recommendation Report'",
        "Market Reports World, 'Aluminum Alloy Battery Tray Market Report 2026-2035'",
        "5-Axis CNC technical articles on NEV motor housing tolerances",
        "Kunshan Jiulongfeng Precision Technology, 'NEV Product Part Machining Process Requirements'"
    ],
    "cta_text": "Have an EV precision-part machining project? Contact the Eternal CNC engineering team for DFM review and prototype-to-volume support.",
    "cta_btn": "Request a Quote",
    "cta_href": "/contact/get-a-quote",
    "all_rights": "All rights reserved."
})


# === Report 4: ISO 9001 Update ===
CN_REPORTS.append({
    "slug": "iso-9001-update-cn",
    "title": "ISO 9001:2025/2026 新版质量管理体系深度解读",
    "subtitle": "气候变化、质量文化、数字化与风险机遇拆分：超过 110 万家认证组织面临的合规重构",
    "date": "2026-08-22",
    "summary": "ISO 9001 正在经历自 2015 年以来最重大的一次修订。ISO/DIS 9001:2025（国际标准草案）已于 2025 年发布，最终版本预计于 2026 年下半年发布（可能成为 ISO 9001:2026），影响全球超过 110 万家认证组织。新版标准在保留高阶架构（HLS）和 PDCA 循环的基础上，明确引入气候变化因素、质量文化与道德诚信、数字化与远程工作、风险与机遇拆分管理等新要求。过渡期为三年，已获 ISO 9001:2015 认证的企业需要在 2028-2029 年前完成换证。本报告从条款变化、实施难点、精密制造企业应对策略三个维度进行深度解读。",
    "sections": [
        "    <h2>一、修订背景与时间表</h2>",
        "    <p>自 2015 版发布以来，全球经济格局、技术环境和利益相关方期望发生了深刻变化：数字化转型加速、供应链复杂性增加、气候变化议题凸显、人工智能广泛应用。2021 年 ISO 签署《伦敦宣言》，承诺将气候变化纳入所有新制修订标准的核心考量，这成为推动 ISO 9001 改版的重要动因。</p>",
        "    <div class=\"metric-grid\">",
        metric_card("2023.11", "ISO/TC 176 正式启动修订计划"),
        metric_card("2025.08", "ISO/DIS 9001:2025 国际标准草案发布"),
        metric_card("2026H2", "最终版本预计正式发布"),
        metric_card("3 年", "过渡期（预计至 2028/2029）"),
        "    </div>",
        "    <p>目前处于 DIS（国际标准草案）征求意见与完善阶段，最终版预计 2026 年下半年发布。已获 ISO 9001:2015 认证的企业无需立即行动，但需在过渡期内完成差距分析、文件更新、人员培训和换证审核。</p>",
        "    <h2>二、核心条款变化详解</h2>",
        "    <h3>1. 气候变化纳入组织环境分析（条款 4.1 / 4.2）</h3>",
        "    <p>新版要求企业在理解组织及其环境、确定相关方需求时，评估气候变化是否为相关因素，并回应利益相关方的气候相关需求。这不是要求所有企业都建立碳管理体系，而是要求将气候风险纳入质量管理体系的语境分析。例如：极端天气是否可能导致供应链中断？客户是否要求提供碳足迹数据？</p>",
        "    <h3>2. 领导作用：质量文化与道德诚信（条款 5.1）</h3>",
        "    <p>最高管理者必须“促进质量文化”和“道德行为”，并将其融入质量方针。这标志着 ISO 9001 从“流程合规”向“价值观驱动”延伸。对于精密制造企业，这意味着：数据造假、隐瞒不合格品、供应商行贿等行为将直接构成不符合项。</p>",
        "    <h3>3. 风险与机遇拆分管理（条款 6.1）</h3>",
        "    <p>2015 版将风险与机遇合并表述，新版将其拆分为独立的子条款：6.1.2 应对风险的措施、6.1.3 应对机遇的措施。企业需要分别识别风险（如供应链中断、设备故障、客户投诉）和机遇（如新技术应用、新市场进入），并制定成比例的措施。</p>",
        "    <h3>4. 变更管理的有效性评估（条款 6.3）</h3>",
        "    <p>新版强化了变更策划要求，明确要求评估变更的目的、后果、完整性、资源分配、沟通方式以及有效性。对于频繁更换材料、工艺、设备的精密加工企业，这意味着变更控制程序需要更严谨的闭环。</p>",
        "    <h3>5. 数字化、远程工作与 AI（条款 7.1.3 / 7.2 / 7.3）</h3>",
        "    <p>基础设施需考虑信息技术、软件和远程工作环境；人员能力培训需覆盖数字化工具；意识培训需包含质量文化和道德行为。AI 替代人工决策时，需评估风险、机遇及伦理影响。数据完整性、网络安全成为支持过程的新关注点。</p>",
        "    <h3>6. 顾客沟通与生命周期视角（条款 8.2 / 8.3 / 8.5）</h3>",
        "    <p>顾客沟通需包含应急措施信息；设计和开发需考虑可持续性、道德及顾客体验；文件化信息强调“可获得性”而非强制“保留”。这要求企业更关注产品全生命周期，包括售后、回收和再利用阶段。</p>",
        "    <h2>三、对精密制造企业的具体影响</h2>",
        "    <div class=\"table-wrap\"><table>",
        "      <tr><th>新增要求</th><th>精密制造企业的典型落地动作</th></tr>",
        "      <tr><td>气候变化因素</td><td>评估极端天气对原材料运输、交付周期的影响；准备客户碳足迹问卷</td></tr>",
        "      <tr><td>质量文化与道德诚信</td><td>建立员工举报渠道；将数据真实性纳入绩效考核；签署供应商廉洁协议</td></tr>",
        "      <tr><td>风险与机遇拆分</td><td>更新风险管理程序，分别登记风险台账和机遇台账，明确责任人与时限</td></tr>",
        "      <tr><td>变更管理闭环</td><td>工艺变更、材料变更、设备变更需经过验证、评审和效果跟踪</td></tr>",
        "      <tr><td>数字化与数据完整性</td><td>确保 CMM/SPC 数据不可篡改；建立检测数据备份与权限管理</td></tr>",
        "      <tr><td>顾客沟通扩展</td><td>在报价、合同、交付异常时主动沟通应急方案与替代计划</td></tr>",
        "    </table></div>",
        "    <h2>四、换证路线图建议</h2>",
        "    <p>对于已获 ISO 9001:2015 认证的企业，建议按以下节奏推进：</p>",
        "    <ul>",
        "      <li><strong>2026 Q3-Q4：</strong>组织新版标准培训，成立换证项目组，开展差距分析；</li>",
        "      <li><strong>2027：</strong>修订质量手册、程序文件和记录模板，更新风险与机遇管理流程，导入气候因素评估；</li>",
        "      <li><strong>2028：</strong>实施内部审核和管理评审，验证变更有效性，安排认证机构换证审核；</li>",
        "      <li><strong>2029：</strong>完成过渡期内的所有整改与监督审核，确保证书持续有效。</li>",
        "    </ul>",
        "    <div class=\"insight\"><strong>Eternal CNC 观点：</strong>ISO 9001 新版不是增加负担，而是推动企业从“文件合规”走向“运营韧性”。对于精密加工这种高度依赖数据真实性和过程稳定的行业，气候风险、数字化工具、质量文化的早期落地，恰恰是赢得高端客户信任的机会。</div>",
    ],
    "sources": [
        "ISO/DIS 9001:2025 Draft International Standard",
        "Institute for Standardization of Serbia, 'Revision of ISO 9001 – Draft International Standard ISO/DIS 9001:2025 published'",
        "KDM & Associates, 'ISO 9001:2025 Draft Released - Key Changes Ahead'",
        "Quality Magazine, 'Through a Glass Darkly: A Sneak Peek at ISO/DIS 9001:2025'",
        "SPC Consulting Group, 'ISO DIS 9001:2025 – What you need to know about the transition'"
    ],
    "cta_text": "需要为新标换证做准备？Eternal CNC 可分享精密制造企业质量管理体系落地经验，并提供加工过程的可追溯数据支持。",
    "cta_btn": "获取报价",
    "cta_href": "/zh/contact/get-a-quote",
    "all_rights": "保留所有权利。"
})

EN_REPORTS.append({
    "slug": "iso-9001-update-en",
    "title": "ISO 9001:2025/2026 Revision: In-Depth Compliance Guide",
    "subtitle": "Climate change, quality culture, digitalization, and separated risk/opportunity management: what 1.1 million certified organizations must address",
    "date": "2026-08-22",
    "summary": "ISO 9001 is undergoing its most significant revision since 2015. ISO/DIS 9001:2025 was published in 2025, with the final standard expected in the second half of 2026 (likely ISO 9001:2026), impacting over 1.1 million certified organizations worldwide. While retaining the High-Level Structure (HLS) and PDCA cycle, the new version explicitly introduces climate change considerations, quality culture and ethical behavior, digitalization and remote work, and separated risk and opportunity management. The transition period is three years, meaning currently certified organizations must complete transition by 2028-2029. This report provides an in-depth interpretation from clause changes to implementation strategy for precision manufacturers.",
    "sections": [
        "    <h2>1. Background and Timeline</h2>",
        "    <p>Since the 2015 edition, the global economic landscape, technology environment, and stakeholder expectations have changed profoundly: digital transformation has accelerated, supply chains have become more complex, climate change has risen in prominence, and AI has become widely used. In 2021 ISO signed the London Declaration, committing to integrate climate change into all new and revised standards. This became a key driver for the ISO 9001 revision.</p>",
        "    <div class=\"metric-grid\">",
        metric_card("Nov 2023", "ISO/TC 176 launched the revision"),
        metric_card("Aug 2025", "ISO/DIS 9001:2025 draft published"),
        metric_card("H2 2026", "Final version expected"),
        metric_card("3 years", "Transition period (to 2028/2029)"),
        "    </div>",
        "    <p>The standard is currently at the DIS (Draft International Standard) stage. Organizations certified to ISO 9001:2015 do not need to act immediately, but should plan gap analysis, documentation updates, training, and transition audits within the transition window.</p>",
        "    <h2>2. Key Clause Changes</h2>",
        "    <h3>Climate change in context analysis (Clauses 4.1 / 4.2)</h3>",
        "    <p>The new version requires organizations to determine whether climate change is a relevant issue in their context and to consider any related requirements from interested parties. This does not mandate a carbon-management system for everyone, but it does require climate risk to be considered within the QMS context. For example: could extreme weather disrupt raw-material transport or delivery? Do customers request carbon-footprint data?</p>",
        "    <h3>Leadership: quality culture and ethical behavior (Clause 5.1)</h3>",
        "    <p>Top management must now "promote a culture of quality" and "ethical behavior" and embed these in the quality policy. This extends ISO 9001 from process compliance toward values-driven management. For precision manufacturers, data falsification, concealing nonconformities, and supplier bribery would directly constitute nonconformities.</p>",
        "    <h3>Separated risk and opportunity management (Clause 6.1)</h3>",
        "    <p>While ISO 9001:2015 combined risks and opportunities, the new draft separates them into distinct sub-clauses: 6.1.2 actions to address risks and 6.1.3 actions to address opportunities. Organizations must identify risks (e.g., supply disruption, equipment failure, customer complaints) and opportunities (e.g., new technology, new markets) and define proportionate actions for each.</p>",
        "    <h3>Change management effectiveness (Clause 6.3)</h3>",
        "    <p>The new version strengthens change planning, explicitly requiring evaluation of purpose, consequences, integrity, resource allocation, communication, and effectiveness of changes. For precision-machining shops that frequently change materials, processes, and equipment, this means change-control procedures need a more rigorous closed loop.</p>",
        "    <h3>Digitalization, remote work, and AI (Clauses 7.1.3 / 7.2 / 7.3)</h3>",
        "    <p>Infrastructure must now consider information technology, software, and remote-work environments; competence and awareness training must cover digital tools, quality culture, and ethical behavior. Where AI replaces human decision-making, organizations must assess risks, opportunities, and ethical implications. Data integrity and cybersecurity become new focal points in support processes.</p>",
        "    <h3>Customer communication and lifecycle perspective (Clauses 8.2 / 8.3 / 8.5)</h3>",
        "    <p>Customer communication must include information on contingency actions; design and development must consider sustainability, ethics, and customer experience; documented information emphasizes "availability" rather than mandatory retention. Organizations must pay more attention to the full product lifecycle, including after-sales, recycling, and reuse.</p>",
        "    <h2>3. Specific Impact on Precision Manufacturers</h2>",
        "    <div class=\"table-wrap\"><table>",
        "      <tr><th>New Requirement</th><th>Typical Action for Precision Manufacturers</th></tr>",
        "      <tr><td>Climate change factors</td><td>Assess extreme-weather impact on material transport and delivery; prepare carbon-footprint questionnaires</td></tr>",
        "      <tr><td>Quality culture and ethics</td><td>Establish employee whistle-blowing channels; tie data integrity to performance; require supplier integrity agreements</td></tr>",
        "      <tr><td>Separated risk/opportunity</td><td>Update risk-management procedure with separate risk and opportunity registers, owners, and deadlines</td></tr>",
        "      <tr><td>Change-management closed loop</td><td>Process, material, and equipment changes require validation, review, and effectiveness tracking</td></tr>",
        "      <tr><td>Digitalization and data integrity</td><td>Ensure CMM/SPC data cannot be tampered with; implement inspection-data backup and access control</td></tr>",
        "      <tr><td>Expanded customer communication</td><td>Proactively communicate contingency plans during quotation, contracting, and delivery exceptions</td></tr>",
        "    </table></div>",
        "    <h2>4. Recommended Transition Roadmap</h2>",
        "    <ul>",
        "      <li><strong>2026 Q3-Q4:</strong> Train the team on the new standard, establish a transition project, and conduct a gap analysis.</li>",
        "      <li><strong>2027:</strong> Revise the quality manual, procedures, and records templates; update risk/opportunity management; introduce climate-factor assessment.</li>",
        "      <li><strong>2028:</strong> Conduct internal audits and management review, validate change effectiveness, and schedule the certification-body transition audit.</li>",
        "      <li><strong>2029:</strong> Complete all corrective actions and surveillance audits before the transition period ends.</li>",
        "    </ul>",
        "    <div class=\"insight\"><strong>Eternal CNC view:</strong> The ISO 9001 revision is not simply an added burden; it pushes organizations from document compliance toward operational resilience. For precision machining—a sector heavily dependent on data integrity and process stability—early adoption of climate-risk assessment, digital tools, and quality culture is an opportunity to earn high-end customer trust.</div>",
    ],
    "sources": [
        "ISO/DIS 9001:2025 Draft International Standard",
        "Institute for Standardization of Serbia, 'Revision of ISO 9001 – Draft International Standard ISO/DIS 9001:2025 published'",
        "KDM & Associates, 'ISO 9001:2025 Draft Released - Key Changes Ahead'",
        "Quality Magazine, 'Through a Glass Darkly: A Sneak Peek at ISO/DIS 9001:2025'",
        "SPC Consulting Group, 'ISO DIS 9001:2025 – What you need to know about the transition'"
    ],
    "cta_text": "Preparing for the ISO 9001 transition? Eternal CNC can share QMS implementation experience for precision manufacturers and provide traceable process data to support your audits.",
    "cta_btn": "Request a Quote",
    "cta_href": "/contact/get-a-quote",
    "all_rights": "All rights reserved."
})


def build(reports):
    for r in reports:
        html = make_html(
            lang="zh-CN" if "-cn" in r["slug"] else "en",
            title=r["title"],
            subtitle=r["subtitle"],
            date=r["date"],
            date_label="发布日期" if "-cn" in r["slug"] else "Published",
            summary=r["summary"],
            sections=r["sections"],
            sources=r["sources"],
            cta_text=r["cta_text"],
            cta_btn=r["cta_btn"],
            cta_href=r["cta_href"],
            all_rights=r["all_rights"]
        )
        (OUT / f"{r['slug']}.html").write_text(html, encoding="utf-8")
        print(f"written: {r['slug']}.html")


if __name__ == "__main__":
    build(CN_REPORTS)
    build(EN_REPORTS)
    print("done")
