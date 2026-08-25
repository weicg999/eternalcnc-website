#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate in-depth HTML research reports for the knowledge/news page."""

from pathlib import Path

OUT = Path("F:/V7/public/downloads/reports")
OUT.mkdir(parents=True, exist_ok=True)

CN_REPORTS = [
    {
        "slug": "2026-precision-manufacturing-trends-cn",
        "title": "2026 精密制造趋势报告",
        "date": "2026-08-22",
        "html": """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>2026 精密制造趋势报告 | Eternal CNC</title>
  <meta name="description" content="2026 全球与中国精密制造趋势深度分析：智能制造、国产高端装备与新材料驱动产业结构性升级，附关键数据与 Eternal CNC 工程解读。">
  <style>
    :root { --bg:#F4F3EE; --dark:#1A1A1A; --red:#8B0000; --muted:#6B7280; --line:#E5E7EB; --card:#fff; }
    * { box-sizing:border-box; }
    body { margin:0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", "Microsoft YaHei", sans-serif; background:var(--bg); color:var(--dark); line-height:1.75; }
    .wrap { max-width:860px; margin:0 auto; padding:56px 24px; }
    .brand { color:var(--red); font-weight:700; letter-spacing:0.05em; text-transform:uppercase; font-size:13px; margin-bottom:12px; }
    h1 { font-size:34px; margin:0 0 14px; line-height:1.25; }
    .date { color:var(--muted); font-size:14px; margin-bottom:36px; }
    .summary { background:var(--card); border:1px solid var(--line); border-radius:12px; padding:26px; margin-bottom:36px; }
    h2 { font-size:22px; margin:40px 0 16px; border-bottom:2px solid var(--red); padding-bottom:8px; display:inline-block; }
    h3 { font-size:17px; margin:28px 0 10px; color:var(--dark); }
    p { margin:0 0 14px; }
    ul { padding-left:22px; margin:0 0 16px; }
    li { margin-bottom:9px; }
    .metric-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin:24px 0; }
    .metric { background:var(--card); border:1px solid var(--line); border-radius:10px; padding:18px; }
    .metric-value { font-size:24px; font-weight:700; color:var(--red); margin-bottom:4px; }
    .metric-label { font-size:13px; color:var(--muted); line-height:1.5; }
    .source { font-size:12px; color:var(--muted); margin-top:6px; }
    .insight { background:#fff; border-left:4px solid var(--red); padding:18px 22px; margin:26px 0; border-radius:0 10px 10px 0; }
    .insight strong { display:block; margin-bottom:6px; }
    .cta { margin-top:48px; padding:28px; background:var(--dark); color:#fff; border-radius:12px; text-align:center; }
    .cta a { display:inline-block; margin-top:14px; padding:12px 26px; background:var(--red); color:#fff; text-decoration:none; border-radius:6px; font-weight:600; }
    .cta a:hover { background:#6B0000; }
    .footer { margin-top:48px; padding-top:24px; border-top:1px solid var(--line); color:var(--muted); font-size:13px; text-align:center; }
    table { width:100%; border-collapse:collapse; margin:18px 0; background:var(--card); border:1px solid var(--line); }
    th, td { padding:12px; text-align:left; border-bottom:1px solid var(--line); font-size:14px; }
    th { background:#fafafa; font-weight:600; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="brand">Eternal CNC Research</div>
    <h1>2026 精密制造趋势报告</h1>
    <div class="date">发布日期：2026-08-22</div>

    <div class="summary">
      <strong>执行摘要</strong><br>
      2026 年中国精密制造行业正从“政策驱动”转向“内生稳健扩张”。下游新能源汽车、半导体设备、人形机器人与医疗 AI 硬件的持续放量，推动 CNC 加工向高精度、高一致性与全链路服务升级；同时工业互联网与 AI 深度融合，使数字化车间从标杆试点进入规模化复制阶段。本报告基于中商产业研究院、中国信息通信研究院、中国机床工具工业协会等公开数据，拆解市场规模、技术渗透率与结构性机会，为采购与工程决策提供定量参考。
    </div>

    <h2>一、市场规模与增长动能</h2>
    <div class="metric-grid">
      <div class="metric">
        <div class="metric-value">~4,560 亿元</div>
        <div class="metric-label">2026 年中国精密加工行业市场规模预估，同比增长约 8.5%<div class="source">来源：行业研究机构 2025 年末报告</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">1,304 亿元</div>
        <div class="metric-label">2026 年中国数控机床市场规模预估，2025 年为 1,224 亿元，同比 +4.7%<div class="source">来源：中商产业研究院</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">157 亿元</div>
        <div class="metric-label">2026 年中国五轴数控机床市场规模预估，2024 年为 108 亿元<div class="source">来源：中商产业研究院</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">~1.6 万亿元</div>
        <div class="metric-label">2025 年工业互联网核心产业规模预估，带动工业增加值约 2.5 万亿元<div class="source">来源：中国报告大厅 2026</div></div>
      </div>
    </div>

    <h2>二、智能制造与数字化车间：从标杆到规模化</h2>
    <p>根据中国信息通信研究院《制造业数字化转型发展报告（2025 年）》，截至 2025 年 12 月：</p>
    <ul>
      <li>全国规模以上工业企业开展数字化改造比例达 <strong>89.6%</strong>，数字化设备普及率 <strong>57.7%</strong>。</li>
      <li>累计建成 <strong>3.5 万余家</strong>基础级、<strong>8,200 余家</strong>先进级、<strong>500 余家</strong>卓越级、<strong>15 家</strong>领航级智能工厂。</li>
      <li>汽车、船舶、电子信息制造业数字化改造比例最高，分别为 <strong>94.4%</strong>、<strong>94.2%</strong>、<strong>93.9%</strong>。</li>
    </ul>
    <p>同时，5G 工厂数量已突破 <strong>8,000 家</strong>，重点工业互联网平台连接工业设备超 <strong>1 亿台（套）</strong>。AI 与工业互联网融合带来质变：2025 年中国工业企业应用大模型及智能体的比例从 2024 年的 9.6% 跃升至 <strong>47.5%</strong>。</p>

    <div class="insight">
      <strong>工程视角：数字化的真实价值在生产现场</strong>
      对精密加工厂而言，数字化不是“看板炫技”，而是把设备 OEE、刀具寿命、首件尺寸、巡检记录变成可追溯的数据链。标杆 5G 工厂平均运营成本下降 19%，其降本逻辑核心在于减少返工、压缩换线时间与提前识别刀具磨损——这正是小批量、多品种精密零件加工最敏感的成本节点。
    </div>

    <h2>三、结构性增长赛道</h2>
    <table>
      <tr><th>下游领域</th><th>关键驱动</th><th>对加工的影响</th></tr>
      <tr><td>新能源汽车</td><td>2025 年国内产量突破 1,300 万辆</td><td>电机壳体、电控散热件、电池托盘大型化，铝壳体高精度加工需求激增</td></tr>
      <tr><td>半导体设备</td><td>国产半导体设备国产化率提升至 25%</td><td>高洁净腔体、法兰、管路组件需要高表面质量与低颗粒污染工艺</td></tr>
      <tr><td>人形机器人</td><td>行星滚柱丝杠、谐波减速器精密零件放量</td><td>小模数齿轮、壳体、关节件对五轴联动与精密磨削提出新要求</td></tr>
      <tr><td>医疗 AI 硬件</td><td>结构验证频次提升，手板模型增量 22.8%</td><td>小批量铝合金、钛合金、PEEK 零件快速打样需求增长</td></tr>
    </table>

    <h2>四、新材料与新工艺</h2>
    <p>铝合金仍是主流，但应用场景细分明显：6061-T6/6082-T6 用于电池托盘横梁与水冷板，ADC12/A380 用于电机与电控壳体压铸件，7000 系高强铝在碰撞结构件中占比提升。复合材料（碳纤维增强）与镁合金（AZ91D、AM60）在超轻量化结构中逐步渗透，但加工设备、刀具与夹具需针对性调整。</p>

    <h2>五、Eternal CNC 工程结论</h2>
    <ol>
      <li><strong>柔性产能是护城河：</strong>下游迭代周期缩短，单一工序外协难以满足客户“样件—小批—量产”的快速爬坡需求，具备 CNC、车铣、表面处理与检测全流程闭环的工厂将拿到更高份额。</li>
      <li><strong>五轴加工从“可选项”变“必选项”：</strong>电机壳体同轴度 0.006 mm、减速器壳体一次装夹 ±0.01 mm 已成为头部供应商的合格线，二次装夹的累计误差已无法满足电驱平台要求。</li>
      <li><strong>数字化质量追溯是客户准入门槛：</strong>汽车与医疗客户要求的不只是最终尺寸合格，而是每道工序参数、刀具编号、检测数据的可追溯，MES 与检测设备的互联互通将在 2026 年成为标配。</li>
    </ol>

    <div class="cta">
      需要针对 2026 年精密制造趋势制定加工方案？联系 Eternal CNC 工程团队获取报价与技术评审。<br>
      <a href="https://www.eternalcnc.com/zh/contact/get-a-quote">获取报价</a>
    </div>

    <div class="footer">
      &copy; 2026 Eternal CNC. 保留所有权利。<br>
      数据来源：中商产业研究院、中国信息通信研究院、中国机床工具工业协会、行业研究机构公开报告。本报告仅供行业参考，具体投资决策请以官方数据为准。
    </div>
  </div>
</body>
</html>"""
    },
    {
        "slug": "5-axis-localization-cn",
        "title": "五轴机床国产化进程分析",
        "date": "2026-08-22",
        "html": """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>五轴机床国产化进程分析 | Eternal CNC</title>
  <meta name="description" content="2020-2026 中国五轴机床国产化率从 18% 跃升至 59.5%，航空与汽车模具领域成主战场。本报告解析国产替代的真实进展与瓶颈。">
  <style>
    :root { --bg:#F4F3EE; --dark:#1A1A1A; --red:#8B0000; --muted:#6B7280; --line:#E5E7EB; --card:#fff; }
    * { box-sizing:border-box; }
    body { margin:0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", "Microsoft YaHei", sans-serif; background:var(--bg); color:var(--dark); line-height:1.75; }
    .wrap { max-width:860px; margin:0 auto; padding:56px 24px; }
    .brand { color:var(--red); font-weight:700; letter-spacing:0.05em; text-transform:uppercase; font-size:13px; margin-bottom:12px; }
    h1 { font-size:34px; margin:0 0 14px; line-height:1.25; }
    .date { color:var(--muted); font-size:14px; margin-bottom:36px; }
    .summary { background:var(--card); border:1px solid var(--line); border-radius:12px; padding:26px; margin-bottom:36px; }
    h2 { font-size:22px; margin:40px 0 16px; border-bottom:2px solid var(--red); padding-bottom:8px; display:inline-block; }
    h3 { font-size:17px; margin:28px 0 10px; color:var(--dark); }
    p { margin:0 0 14px; }
    ul { padding-left:22px; margin:0 0 16px; }
    li { margin-bottom:9px; }
    .metric-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin:24px 0; }
    .metric { background:var(--card); border:1px solid var(--line); border-radius:10px; padding:18px; }
    .metric-value { font-size:24px; font-weight:700; color:var(--red); margin-bottom:4px; }
    .metric-label { font-size:13px; color:var(--muted); line-height:1.5; }
    .source { font-size:12px; color:var(--muted); margin-top:6px; }
    .insight { background:#fff; border-left:4px solid var(--red); padding:18px 22px; margin:26px 0; border-radius:0 10px 10px 0; }
    .insight strong { display:block; margin-bottom:6px; }
    .cta { margin-top:48px; padding:28px; background:var(--dark); color:#fff; border-radius:12px; text-align:center; }
    .cta a { display:inline-block; margin-top:14px; padding:12px 26px; background:var(--red); color:#fff; text-decoration:none; border-radius:6px; font-weight:600; }
    .cta a:hover { background:#6B0000; }
    .footer { margin-top:48px; padding-top:24px; border-top:1px solid var(--line); color:var(--muted); font-size:13px; text-align:center; }
    table { width:100%; border-collapse:collapse; margin:18px 0; background:var(--card); border:1px solid var(--line); }
    th, td { padding:12px; text-align:left; border-bottom:1px solid var(--line); font-size:14px; }
    th { background:#fafafa; font-weight:600; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="brand">Eternal CNC Research</div>
    <h1>五轴机床国产化进程分析</h1>
    <div class="date">发布日期：2026-08-22</div>

    <div class="summary">
      <strong>执行摘要</strong><br>
      五轴联动数控机床被誉为“工业母机皇冠上的明珠”。2020 年至 2025 年，中国五轴机床国产化率从 18% 跃升至 59.5%，国内市场首次出现国产品牌份额超过进口的局面。北京精雕、科德数控、拓璞数控、海天精工等企业在销量、航空航天配套与核心技术自主化方面取得突破。本报告基于中商产业研究院、中国机床工具工业协会与企业公开数据，评估国产五轴的技术成熟度、剩余瓶颈与工程应用窗口。
    </div>

    <h2>一、市场规模与国产化率</h2>
    <div class="metric-grid">
      <div class="metric">
        <div class="metric-value">59.5%</div>
        <div class="metric-label">2025 年中国五轴数控机床国产化率，2020 年仅为 18%<div class="source">来源：中国机床工具工业协会 / 观研报告网</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">157 亿元</div>
        <div class="metric-label">2026 年中国五轴数控机床市场规模预估，2030 年预计超 320 亿元<div class="source">来源：中商产业研究院</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">~20%</div>
        <div class="metric-label">2025—2030 年中国五轴机床市场复合年均增长率（CAGR）<div class="source">来源：行业测算</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">90%+</div>
        <div class="metric-label">科德数控五轴机床整机国产化率，核心功能部件自主化率 85% 以上<div class="source">来源：科德数控公告 / 机构调研纪要</div></div>
      </div>
    </div>

    <h2>二、竞争格局：从“能用”到“好用”的分化</h2>
    <table>
      <tr><th>厂商</th><th>核心定位</th><th>关键数据</th></tr>
      <tr><td>北京精雕</td><td>3C 电子、精密模具五轴高速加工</td><td>连续多年国内销量与营收第一，机床保有量超 12 万台，高端精密五轴市占率第一</td></tr>
      <tr><td>科德数控</td><td>航空航天、航发、大飞机结构件</td><td>GNC62 数控系统对标西门子 840D，2026 年航空航天订单占比首次突破 60%，在手订单约 28 亿元</td></tr>
      <tr><td>拓璞数控</td><td>航空航天五轴</td><td>2025 年中国航空航天五轴数控机床市场份额排名第一，产品用于 C919、长征系列运载火箭</td></tr>
      <tr><td>华中数控</td><td>数控系统与智能数控系统</td><td>“华中 10 型”集成 AI 芯片与大模型，累计销售数控系统近 15 万台套</td></tr>
      <tr><td>海天精工 / 纽威数控</td><td>大型龙门、船舶能源装备</td><td>凭借大型龙门五轴在船舶和能源装备领域打开局面</td></tr>
    </table>

    <h2>三、技术突破与典型验证</h2>
    <p>国产五轴的突围不只是“整机装配”，而是底层技术栈的突破：</p>
    <ul>
      <li><strong>数控系统：</strong>科德 GNC62 为国内仅有的全源码自主开发高档数控系统，对标西门子 840D 的总体通过率约 95%；华中 10 型智能系统支持大模型部署，动态精度误差控制在 1 微米以内。</li>
      <li><strong>关键功能部件：</strong>科德核心部件自制化率推到 85% 以上，覆盖伺服驱动、力矩电机、转台、摆头、电主轴、角度传感等。</li>
      <li><strong>工艺验证：</strong>科德为中国航天科工三院 31 所搭建行业首条以国产高端装备为主的发动机关重件生产线，采用 6 类 22 台五轴数控机床，设备综合利用率达 70%，生产效率提升 30%，人员缩减 50% 以上。</li>
    </ul>

    <h2>四、尚未跨越的瓶颈</h2>
    <p>国产化率数字好看，但高端场景仍有明显差距：</p>
    <ul>
      <li><strong>高档数控系统：</strong>整体国产化率仅约 30%，在航发级精度场景（五轴联动精度 < 1 μm、最高转速 > 20,000 rpm）渗透率更低。</li>
      <li><strong>精密传动部件：</strong>高精度滚珠丝杠、直线导轨进口率超过 70%，高端滚珠丝杠外资占比约九成，精密轴承国产化率仅 15%。</li>
      <li><strong>精度保持性：</strong>进口高端机床精度可稳定保持 3—5 年，国产设备在空载状态下精度已不输对手，但连续高速重切削一年后的热稳定性与故障率仍是客户顾虑点。</li>
    </ul>

    <div class="insight">
      <strong>工程视角：国产替代的“可用”不等于“可盲用”</strong>
      对精密加工厂而言，国产五轴在航空结构件、汽车模具、3C 精密件领域已经具备实战价值，但在超高一致性量产（如医疗植入物、光刻机部件）场景中，仍建议做充分的首件验证与过程能力研究（Cp/Cpk）。正确做法是按零件精度等级、批量大小与交期要求分级选型，而不是简单“国产替代一切”。
    </div>

    <h2>五、Eternal CNC 应用建议</h2>
    <ol>
      <li><strong>中小批量复杂件优先评估国产五轴：</strong>在交期紧、成本敏感的铝壳体、结构件项目中，国产五轴的性价比优势明显，交期通常比进口缩短 30%—50%。</li>
      <li><strong>关键工序保留进口冗余：</strong>对精度保持性要求极高的核心工序，可采取“进口主机 + 国产主机”双轨并行，逐步验证国产设备的过程能力。</li>
      <li><strong>关注 CAM 与后处理生态：</strong>五轴加工的效率不只取决于机床，更取决于 CAM 刀具路径、RTCP 后处理与机床仿真匹配。国产系统的 CAM 生态仍在完善，工程团队需投入更多验证。</li>
    </ol>

    <div class="cta">
      需要评估五轴加工工艺方案或国产设备适配性？联系 Eternal CNC 工程团队获取报价与技术评审。<br>
      <a href="https://www.eternalcnc.com/zh/contact/get-a-quote">获取报价</a>
    </div>

    <div class="footer">
      &copy; 2026 Eternal CNC. 保留所有权利。<br>
      数据来源：中商产业研究院、中国机床工具工业协会、观研报告网、科德数控公告、雪球机构调研纪要、中国工业新闻网。本报告仅供行业参考。
    </div>
  </div>
</body>
</html>"""
    },
    {
        "slug": "ev-parts-demand-cn",
        "title": "新能源汽车精密零件加工需求分析",
        "date": "2026-08-22",
        "html": """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>新能源汽车精密零件加工需求分析 | Eternal CNC</title>
  <meta name="description" content="电驱壳体、电池托盘与轻量化结构件的精度门槛、材料选择与产能布局分析，揭示新能源车对 CNC 加工的真实需求结构。">
  <style>
    :root { --bg:#F4F3EE; --dark:#1A1A1A; --red:#8B0000; --muted:#6B7280; --line:#E5E7EB; --card:#fff; }
    * { box-sizing:border-box; }
    body { margin:0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", "Microsoft YaHei", sans-serif; background:var(--bg); color:var(--dark); line-height:1.75; }
    .wrap { max-width:860px; margin:0 auto; padding:56px 24px; }
    .brand { color:var(--red); font-weight:700; letter-spacing:0.05em; text-transform:uppercase; font-size:13px; margin-bottom:12px; }
    h1 { font-size:34px; margin:0 0 14px; line-height:1.25; }
    .date { color:var(--muted); font-size:14px; margin-bottom:36px; }
    .summary { background:var(--card); border:1px solid var(--line); border-radius:12px; padding:26px; margin-bottom:36px; }
    h2 { font-size:22px; margin:40px 0 16px; border-bottom:2px solid var(--red); padding-bottom:8px; display:inline-block; }
    h3 { font-size:17px; margin:28px 0 10px; color:var(--dark); }
    p { margin:0 0 14px; }
    ul { padding-left:22px; margin:0 0 16px; }
    li { margin-bottom:9px; }
    .metric-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin:24px 0; }
    .metric { background:var(--card); border:1px solid var(--line); border-radius:10px; padding:18px; }
    .metric-value { font-size:24px; font-weight:700; color:var(--red); margin-bottom:4px; }
    .metric-label { font-size:13px; color:var(--muted); line-height:1.5; }
    .source { font-size:12px; color:var(--muted); margin-top:6px; }
    .insight { background:#fff; border-left:4px solid var(--red); padding:18px 22px; margin:26px 0; border-radius:0 10px 10px 0; }
    .insight strong { display:block; margin-bottom:6px; }
    .cta { margin-top:48px; padding:28px; background:var(--dark); color:#fff; border-radius:12px; text-align:center; }
    .cta a { display:inline-block; margin-top:14px; padding:12px 26px; background:var(--red); color:#fff; text-decoration:none; border-radius:6px; font-weight:600; }
    .cta a:hover { background:#6B0000; }
    .footer { margin-top:48px; padding-top:24px; border-top:1px solid var(--line); color:var(--muted); font-size:13px; text-align:center; }
    table { width:100%; border-collapse:collapse; margin:18px 0; background:var(--card); border:1px solid var(--line); }
    th, td { padding:12px; text-align:left; border-bottom:1px solid var(--line); font-size:14px; }
    th { background:#fafafa; font-weight:600; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="brand">Eternal CNC Research</div>
    <h1>新能源汽车精密零件加工需求分析</h1>
    <div class="date">发布日期：2026-08-22</div>

    <div class="summary">
      <strong>执行摘要</strong><br>
      2025 年中国新能源汽车产量突破 1,300 万辆，带动电机壳体、电控壳体、电池托盘等精密铝制结构件需求快速放量。与传统燃油车相比，新能源车零件更强调轻量化、高集成、高密封与高可靠性，对铝合金壳体的平面度、同轴度、冷却流道密封性及批量一致性提出更高要求。本报告基于中汽协、新思界、PW Consulting 及工程实践数据，解析电驱系统与电池托盘的关键加工指标、工艺路径与供应链机会。
    </div>

    <h2>一、市场体量：铝合金电池托盘与电驱壳体</h2>
    <div class="metric-grid">
      <div class="metric">
        <div class="metric-value">1,300 万+</div>
        <div class="metric-label">2025 年中国新能源汽车产量，直接拉动电机壳体、电控壳体与电池托盘需求<div class="source">来源：中汽协 / 行业研究机构</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">59.1 亿美元</div>
        <div class="metric-label">2026 年全球铝合金电池托盘市场规模预估，2032 年预计达 133.6 亿美元，CAGR 14.0%<div class="source">来源：PW Consulting / Market Reports World</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">52%+</div>
        <div class="metric-label">中国铝合金电池托盘产量占全球比重，2025 年全球电动汽车产量超 1,800 万辆<div class="source">来源：Market Reports World 2026</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">77.9%</div>
        <div class="metric-label">2025 年纯电动汽车（BEV）占铝合金电池托盘市场需求份额<div class="source">来源：PW Consulting</div></div>
      </div>
    </div>

    <h2>二、电驱壳体：精度决定 NVH 与散热效率</h2>
    <p>电机壳体既是结构件也是热管理件，典型材料为 6061-T6、6082-T6 或压铸铝合金 ADC12/A380。典型技术规格如下：</p>
    <table>
      <tr><th>指标</th><th>典型要求</th><th>工程意义</th></tr>
      <tr><td>尺寸公差</td><td>±0.01—0.05 mm</td><td>保证轴承、定子与转子的装配关系</td></tr>
      <tr><td>轴承孔同轴度</td><td>≤ 0.015 mm</td><td>防止转子不平衡，降低高速旋转振动与噪声</td></tr>
      <tr><td>安装面平面度</td><td>≤ 0.02 mm</td><td>确保减速器/变速箱安装面密封可靠</td></tr>
      <tr><td>表面粗糙度</td><td>Ra 0.8—1.6 μm</td><td>改善密封面贴合与轴承配合</td></tr>
      <tr><td>冷却流道密封</td><td>气密测试 2 bar / 10 min 无泄漏</td><td>防止冷却液渗漏导致绝缘失效</td></tr>
    </table>

    <h2>三、五轴加工对电驱零件的效率革命</h2>
    <p>新能源汽车电机壳体与减速器壳体年产量超过 2,000 万件。传统四轴或摇篮式加工一次装夹完成率不到 70%，多次装夹导致累计误差 ≥ 0.05 mm。采用五轴联动加工中心后：</p>
    <ul>
      <li>电机壳体同轴度可稳定控制在 <strong>0.006 mm</strong> 以内；</li>
      <li>减速器壳体一次装夹完成铣面/镗孔/钻孔/攻丝，尺寸公差 <strong>±0.01 mm</strong>；</li>
      <li>合格率从 82% 提升至 <strong>97%</strong>；</li>
      <li>单件加工节拍从传统工艺的 45 分钟降至 28 分钟，效率提升约 <strong>37%</strong>。</li>
    </ul>

    <h2>四、电池托盘：从结构件到安全件</h2>
    <p>电池托盘工艺路线分为挤压型材焊接（主流，2025 年占全球 52.7%）与一体压铸+蒙皮焊接（占 34.4%）。核心加工难点包括：</p>
    <ul>
      <li><strong>平面度控制：</strong>液冷板安装面/密封面平面度 ≤ 0.2 mm/1000 mm，超差会导致硅胶垫片压缩不均，出现冷却液泄漏与 IP67/IP68 失效。</li>
      <li><strong>密封槽加工：</strong>槽深/槽宽公差 ±0.1 mm，表面粗糙度 Ra ≤ 1.6 μm，槽底无接刀痕、无毛刺。</li>
      <li><strong>焊接后精加工：</strong>搅拌摩擦焊/激光焊后先做去应力处理，再对焊接区域精铣，避免焊接变形导致尺寸超差。</li>
    </ul>

    <div class="insight">
      <strong>工程视角：新能源车零件不是“尺寸合格”就够了</strong>
      电驱壳体与电池托盘同时承担结构、密封、散热、安全功能。图纸上的 ±0.01 mm 只是入门要求，真正考验加工厂的是：压铸件去应力时效是否到位、五轴一次装夹是否能覆盖所有关键特征、冷却流道是否经过 100% 气密测试、批量生产时 Cpk 是否稳定 ≥ 1.33。任何一环失控，都会在整车 NVH、热管理或安全测试中被放大。
    </div>

    <h2>五、Eternal CNC 应用建议</h2>
    <ol>
      <li><strong>材料预处理必须纳入工艺：</strong>压铸铝合金毛坯需做 160—180 ℃、2—4 h 去应力时效，否则精加工后变形率可能超过 30%。</li>
      <li><strong>优先采用五轴一次装夹：</strong>对轴承孔、安装面、冷却流道等关键特征，尽量在一次装夹内完成，避免多次定位带来的同轴度与位置度累积误差。</li>
      <li><strong>建立 100% 气密与尺寸追溯：</strong>电池托盘与电驱壳体必须逐件气密测试；同时把 CMM/2.5D 检测数据与零件序列号绑定，满足汽车客户 PPAP 与追溯要求。</li>
    </ol>

    <div class="cta">
      有新能源汽车电机壳体、电池托盘或电控壳体加工需求？联系 Eternal CNC 工程团队获取 DFM 评审与报价。<br>
      <a href="https://www.eternalcnc.com/zh/contact/get-a-quote">获取报价</a>
    </div>

    <div class="footer">
      &copy; 2026 Eternal CNC. 保留所有权利。<br>
      数据来源：中汽协、新思界产业研究中心、PW Consulting、Market Reports World、5-axiscnc.com、思米乐、昆山玖珑沣精密科技。本报告仅供行业参考。
    </div>
  </div>
</body>
</html>"""
    },
    {
        "slug": "iso-9001-update-cn",
        "title": "ISO 9001:2025 新版解读",
        "date": "2026-08-22",
        "html": """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ISO 9001:2025 新版解读 | Eternal CNC</title>
  <meta name="description" content="ISO 9001:2025 修订要点：气候变化、质量文化、数字化与道德诚信如何重塑质量管理体系，附 Eternal CNC 合规建议。">
  <style>
    :root { --bg:#F4F3EE; --dark:#1A1A1A; --red:#8B0000; --muted:#6B7280; --line:#E5E7EB; --card:#fff; }
    * { box-sizing:border-box; }
    body { margin:0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans SC", "Microsoft YaHei", sans-serif; background:var(--bg); color:var(--dark); line-height:1.75; }
    .wrap { max-width:860px; margin:0 auto; padding:56px 24px; }
    .brand { color:var(--red); font-weight:700; letter-spacing:0.05em; text-transform:uppercase; font-size:13px; margin-bottom:12px; }
    h1 { font-size:34px; margin:0 0 14px; line-height:1.25; }
    .date { color:var(--muted); font-size:14px; margin-bottom:36px; }
    .summary { background:var(--card); border:1px solid var(--line); border-radius:12px; padding:26px; margin-bottom:36px; }
    h2 { font-size:22px; margin:40px 0 16px; border-bottom:2px solid var(--red); padding-bottom:8px; display:inline-block; }
    h3 { font-size:17px; margin:28px 0 10px; color:var(--dark); }
    p { margin:0 0 14px; }
    ul { padding-left:22px; margin:0 0 16px; }
    li { margin-bottom:9px; }
    .metric-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin:24px 0; }
    .metric { background:var(--card); border:1px solid var(--line); border-radius:10px; padding:18px; }
    .metric-value { font-size:24px; font-weight:700; color:var(--red); margin-bottom:4px; }
    .metric-label { font-size:13px; color:var(--muted); line-height:1.5; }
    .source { font-size:12px; color:var(--muted); margin-top:6px; }
    .insight { background:#fff; border-left:4px solid var(--red); padding:18px 22px; margin:26px 0; border-radius:0 10px 10px 0; }
    .insight strong { display:block; margin-bottom:6px; }
    .cta { margin-top:48px; padding:28px; background:var(--dark); color:#fff; border-radius:12px; text-align:center; }
    .cta a { display:inline-block; margin-top:14px; padding:12px 26px; background:var(--red); color:#fff; text-decoration:none; border-radius:6px; font-weight:600; }
    .cta a:hover { background:#6B0000; }
    .footer { margin-top:48px; padding-top:24px; border-top:1px solid var(--line); color:var(--muted); font-size:13px; text-align:center; }
    table { width:100%; border-collapse:collapse; margin:18px 0; background:var(--card); border:1px solid var(--line); }
    th, td { padding:12px; text-align:left; border-bottom:1px solid var(--line); font-size:14px; }
    th { background:#fafafa; font-weight:600; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="brand">Eternal CNC Research</div>
    <h1>ISO 9001:2025 新版解读</h1>
    <div class="date">发布日期：2026-08-22</div>

    <div class="summary">
      <strong>执行摘要</strong><br>
      ISO 9001:2015 发布十年后，ISO 于 2025 年 8 月发布 ISO/DIS 9001:2025 国际标准草案，预计最终版将在 2025 年 11 月至 2026 年下半年正式发布，并设置约 3 年过渡期。此次修订并非推倒重来，而是在保留高阶架构（HLS）与 PDCA 循环的基础上，将气候变化、质量文化、道德诚信、数字化与 AI 风险、机会驱动思维等议题正式纳入质量管理体系。全球超过 110 万家获证组织将受到影响。本报告基于 ISO/DIS 9001:2025 公开草案与 Quality Magazine、ISO/TC 176 相关解读，梳理核心变化与企业应对路径。
    </div>

    <h2>一、时间线与过渡期</h2>
    <div class="metric-grid">
      <div class="metric">
        <div class="metric-value">2025.08</div>
        <div class="metric-label">ISO/DIS 9001:2025 国际标准草案发布，开放成员国评议<div class="source">来源：ISO / ISS.rs</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">2025.11—2026H2</div>
        <div class="metric-label">最终版预计正式发布（不同来源存在时间差异）<div class="来源">来源：ISO / Pillar Management</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">3 年</div>
        <div class="metric-label">标准过渡期，已获 ISO 9001:2015 认证组织需在此期间完成换证<div class="source">来源：ISO / KDM Associates</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">110 万+</div>
        <div class="metric-label">全球获 ISO 9001 认证组织数量，均受影响<div class="source">来源：Pillar Management</div></div>
      </div>
    </div>

    <h2>二、六大核心变化</h2>
    <table>
      <tr><th>条款</th><th>2025 新增/强化要求</th><th>对精密制造企业的实际影响</th></tr>
      <tr><td>4.1 / 4.2 组织环境</td><td>强制评估气候变化是否为相关因素，并纳入相关方需求</td><td>需识别极端天气、能源供应、碳足迹数据对供应链与交付能力的影响</td></tr>
      <tr><td>5.1 领导作用</td><td>最高管理者必须推动质量文化与道德行为</td><td>诚信、合规、反商业贿赂需从口号变成可审核的制度与记录</td></tr>
      <tr><td>6.1 风险与机遇</td><td>风险与机遇分设子条款（6.1.2 / 6.1.3），强调机会驱动思维</td><td>不能只做风险清单，还要主动识别技术、市场、客户升级带来的机会</td></tr>
      <tr><td>6.3 变更管理</td><td>变更需监控有效性、沟通并评审结果</td><td>工艺变更、软件升级、供应商切换都需留下效果验证记录</td></tr>
      <tr><td>7.1.3 基础设施</td><td>明确包含软硬件、IT、远程/混合办公环境</td><td>数字化系统、MES、CMM 数据管理、网络安全纳入基础设施管理</td></tr>
      <tr><td>8.2 / 8.4 运行</td><td>客户沟通增加应急措施信息；外部供方交互需受控</td><td>供应链中断预案、客户投诉处理时效、外包加工质量追溯要求更高</td></tr>
    </table>

    <h2>三、从“成文信息保留”到“可获得”</h2>
    <p>新版标准在多处将“保持成文信息（retain documented information）”调整为“可获得成文信息（make documented information available）”。这并不意味着放松文件要求，而是强调：文件的价值在于需要时能快速调取，而不是机械存档。对数字化程度较高的企业，电子记录、云端文档、MES 数据链都可以作为合规证据；但前提是权限、版本控制、防篡改与备份机制要到位。</p>

    <h2>四、气候变化：从边缘议题到审核刚需</h2>
    <p>ISO 在 2021 年签署《伦敦宣言》，承诺将气候变化纳入所有新制修订标准的核心考量。2024 年 ISO 已对高阶架构（Annex SL）进行修订，要求在组织环境与相关方分析中考虑气候变化。2025 版草案将这一要求固化到 ISO 9001 正文中。企业需要回答：</p>
    <ul>
      <li>极端天气是否可能中断关键原材料或能源供应？</li>
      <li>客户是否要求提供碳足迹数据或低碳工艺证明？</li>
      <li>物流与生产路线优化是否体现减碳逻辑？</li>
    </ul>

    <div class="insight">
      <strong>工程视角：质量体系不是文件墙，而是风险防火墙</strong>
      对精密加工厂而言，ISO 9001:2025 的修订方向与汽车、医疗、航空客户已有的 IATF 16949、AS9100、ISO 13485 要求高度一致。提前把气候变化风险、数字化记录、供应链质量整合纳入体系，不仅能平滑换证，还能在客户二方审核中占据主动。真正的问题是：你的质量手册是否能在现场快速找到对应记录？当客户问“这颗螺丝是哪台机床、哪把刀具、哪位操作员、哪份检测报告”时，能否在 5 分钟内给出完整追溯链？
    </div>

    <h2>五、Eternal CNC 应对建议</h2>
    <ol>
      <li><strong>立即做差距分析：</strong>对照 ISO/DIS 9001:2025 草案，重点检查气候变化、质量文化、道德行为、机会管理、变更有效性评审等新增要求。</li>
      <li><strong>数字化质量记录先行：</strong>把首件检验、巡检、CMM/2.5D 报告、客户投诉处理电子化，并建立版本控制与备份机制。</li>
      <li><strong>供应链质量整合：</strong>在供应商准入、年度审核与绩效评价中增加气候风险、交期韧性、数据可追溯性评估维度。</li>
      <li><strong>培训与意识落地：</strong>最高管理者需通过具体案例（而非口号）向全员传达质量文化与道德诚信要求，并保留培训记录。</li>
    </ol>

    <div class="cta">
      需要 ISO 9001:2025 换证准备或质量管理体系升级支持？联系 Eternal CNC 工程与质量团队。<br>
      <a href="https://www.eternalcnc.com/zh/contact/get-a-quote">联系团队</a>
    </div>

    <div class="footer">
      &copy; 2026 Eternal CNC. 保留所有权利。<br>
      数据来源：ISO/DIS 9001:2025 公开草案、Quality Magazine、ISS.rs、KDM Associates、Pillar Management、SPC Consulting Group、卡狄亚标准认证。本报告仅供行业参考，具体认证安排请以认证机构与官方发布为准。
    </div>
  </div>
</body>
</html>"""
    },
]

EN_REPORTS = [
    {
        "slug": "2026-precision-manufacturing-trends-en",
        "title": "2026 Precision Manufacturing Trends Report",
        "date": "2026-08-22",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>2026 Precision Manufacturing Trends Report | Eternal CNC</title>
  <style>
    :root { --bg:#F4F3EE; --dark:#1A1A1A; --red:#8B0000; --muted:#6B7280; --line:#E5E7EB; --card:#fff; }
    * { box-sizing:border-box; }
    body { margin:0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background:var(--bg); color:var(--dark); line-height:1.75; }
    .wrap { max-width:860px; margin:0 auto; padding:56px 24px; }
    .brand { color:var(--red); font-weight:700; letter-spacing:0.05em; text-transform:uppercase; font-size:13px; margin-bottom:12px; }
    h1 { font-size:34px; margin:0 0 14px; line-height:1.25; }
    .date { color:var(--muted); font-size:14px; margin-bottom:36px; }
    .summary { background:var(--card); border:1px solid var(--line); border-radius:12px; padding:26px; margin-bottom:36px; }
    h2 { font-size:22px; margin:40px 0 16px; border-bottom:2px solid var(--red); padding-bottom:8px; display:inline-block; }
    h3 { font-size:17px; margin:28px 0 10px; color:var(--dark); }
    p { margin:0 0 14px; }
    ul { padding-left:22px; margin:0 0 16px; }
    li { margin-bottom:9px; }
    .metric-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin:24px 0; }
    .metric { background:var(--card); border:1px solid var(--line); border-radius:10px; padding:18px; }
    .metric-value { font-size:24px; font-weight:700; color:var(--red); margin-bottom:4px; }
    .metric-label { font-size:13px; color:var(--muted); line-height:1.5; }
    .source { font-size:12px; color:var(--muted); margin-top:6px; }
    .insight { background:#fff; border-left:4px solid var(--red); padding:18px 22px; margin:26px 0; border-radius:0 10px 10px 0; }
    .insight strong { display:block; margin-bottom:6px; }
    .cta { margin-top:48px; padding:28px; background:var(--dark); color:#fff; border-radius:12px; text-align:center; }
    .cta a { display:inline-block; margin-top:14px; padding:12px 26px; background:var(--red); color:#fff; text-decoration:none; border-radius:6px; font-weight:600; }
    .cta a:hover { background:#6B0000; }
    .footer { margin-top:48px; padding-top:24px; border-top:1px solid var(--line); color:var(--muted); font-size:13px; text-align:center; }
    table { width:100%; border-collapse:collapse; margin:18px 0; background:var(--card); border:1px solid var(--line); }
    th, td { padding:12px; text-align:left; border-bottom:1px solid var(--line); font-size:14px; }
    th { background:#fafafa; font-weight:600; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="brand">Eternal CNC Research</div>
    <h1>2026 Precision Manufacturing Trends Report</h1>
    <div class="date">Published: 2026-08-22</div>

    <div class="summary">
      <strong>Executive Summary</strong><br>
      In 2026, China's precision manufacturing sector is shifting from policy-driven expansion to endogenous, steady growth. Demand from new-energy vehicles, semiconductor equipment, humanoid robots, and medical AI hardware is pushing CNC machining toward higher accuracy, tighter consistency, and full-lifecycle service. At the same time, the deep integration of industrial internet and AI is moving smart factories from pilot projects to large-scale replication. This report draws on public data from AskCI, the China Academy of Information and Communications Technology (CAICT), and the China Machine Tool & Tool Builders' Association (CMTBA) to break down market size, technology penetration, and structural opportunities for procurement and engineering decisions.
    </div>

    <h2>1. Market Size and Growth Drivers</h2>
    <div class="metric-grid">
      <div class="metric">
        <div class="metric-value">~RMB 4,560 bn</div>
        <div class="metric-label">Estimated 2026 China precision manufacturing market size, up ~8.5% YoY<div class="source">Source: Industry research reports, late 2025</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">RMB 1,304 bn</div>
        <div class="metric-label">Estimated 2026 China CNC machine tool market size; 2025 reached RMB 1,224 bn (+4.7% YoY)<div class="source">Source: AskCI</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">RMB 157 bn</div>
        <div class="metric-label">Estimated 2026 China 5-axis CNC machine tool market size; 2024 was RMB 108 bn<div class="source">Source: AskCI</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">~RMB 1.6 tn</div>
        <div class="metric-label">Estimated 2025 China industrial internet core industry size, driving ~RMB 2.5 tn of industrial value-added<div class="source">Source: China Report Hall, 2026</div></div>
      </div>
    </div>

    <h2>2. Smart Manufacturing and Digital Workshops: From Pilot to Scale</h2>
    <p>According to CAICT's <em>Manufacturing Digital Transformation Development Report (2025)</em>, as of December 2025:</p>
    <ul>
      <li><strong>89.6%</strong> of national industrial enterprises above designated size had launched digital transformation initiatives; digital equipment penetration reached <strong>57.7%</strong>.</li>
      <li>China had built more than <strong>35,000</strong> entry-level, <strong>8,200+</strong> advanced-level, <strong>500+</strong> excellence-level, and <strong>15</strong> leading-level smart factories.</li>
      <li>The automotive, shipbuilding, and electronics sectors led digital adoption at <strong>94.4%</strong>, <strong>94.2%</strong>, and <strong>93.9%</strong> respectively.</li>
    </ul>
    <p>Meanwhile, the number of 5G-enabled factories exceeded <strong>8,000</strong>, and major industrial internet platforms connected more than <strong>100 million</strong> industrial devices. The fusion of AI and industrial internet is reaching an inflection point: the share of Chinese industrial enterprises using large models and AI agents jumped from 9.6% in 2024 to <strong>47.5%</strong> in 2025.</p>

    <div class="insight">
      <strong>Engineering perspective: Digitalization's real value is on the shop floor</strong>
      For precision machining shops, digitalization is not about dashboards—it is about turning OEE, tool life, first-article dimensions, and inspection records into a traceable data chain. Benchmark 5G factories have cut operating costs by an average of 19%, mainly by reducing rework, shortening changeover times, and predicting tool wear. These are exactly the cost drivers most sensitive to low-volume, high-mix precision part production.
    </div>

    <h2>3. Structural Growth Segments</h2>
    <table>
      <tr><th>Downstream Sector</th><th>Key Driver</th><th>Impact on Machining</th></tr>
      <tr><td>New-Energy Vehicles</td><td>China NEV output exceeded 13 million units in 2025</td><td>Surging demand for motor housings, inverter housings, and large battery trays; tight aluminum-shell precision requirements</td></tr>
      <tr><td>Semiconductor Equipment</td><td>Domestic semiconductor equipment localization rate rose to 25%</td><td>High cleanliness chambers, flanges, and piping require superior surface quality and low particle contamination</td></tr>
      <tr><td>Humanoid Robots</td><td>Planetary roller screws and harmonic reducers ramping up</td><td>Small-module gears, housings, and joint parts demand 5-axis and precision grinding capabilities</td></tr>
      <tr><td>Medical AI Hardware</td><td>Structural validation frequency up; prototyping added 22.8% growth</td><td>Growing quick-turn demand for aluminum, titanium, and PEEK parts in small batches</td></tr>
    </table>

    <h2>4. New Materials and Processes</h2>
    <p>Aluminum remains dominant but applications are segmenting: 6061-T6/6082-T6 for battery-tray crossbeams and cold plates; ADC12/A380 die-cast for motor and inverter housings; 7000-series high-strength aluminum for crash structures. Composites and magnesium alloys (AZ91D, AM60) are penetrating ultra-lightweight designs, but require adapted tooling, fixtures, and cutting strategies.</p>

    <h2>5. Eternal CNC Engineering Conclusions</h2>
    <ol>
      <li><strong>Flexible capacity is the moat:</strong> As downstream product cycles shorten, single-process outsourcing struggles to meet customers' rapid ramp from prototype to low-volume to mass production. Shops with closed-loop CNC, mill-turn, surface finishing, and inspection capabilities will capture a disproportionate share.</li>
      <li><strong>5-axis machining is becoming mandatory:</strong> Motor-housing concentricity of 0.006 mm and gearbox-housing single-setup tolerances of ±0.01 mm are already qualification standards among leading suppliers. Re-fixturing errors are no longer acceptable for modern e-drive platforms.</li>
      <li><strong>Digital quality traceability is a customer threshold:</strong> Automotive and medical customers demand not only final dimensional compliance but also traceability of every process parameter, tool ID, and inspection record. MES-to-CMM integration will become standard in 2026.</li>
    </ol>

    <div class="cta">
      Need a machining strategy aligned with 2026 precision manufacturing trends? Contact the Eternal CNC engineering team for a quote and technical review.<br>
      <a href="https://www.eternalcnc.com/contact/get-a-quote">Request a Quote</a>
    </div>

    <div class="footer">
      &copy; 2026 Eternal CNC. All rights reserved.<br>
      Data sources: AskCI, China Academy of Information and Communications Technology (CAICT), China Machine Tool & Tool Builders' Association (CMTBA), public industry research reports. This report is for industry reference only.
    </div>
  </div>
</body>
</html>"""
    },
    {
        "slug": "5-axis-localization-en",
        "title": "5-Axis Machine Tool Localization Analysis",
        "date": "2026-08-22",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>5-Axis Machine Tool Localization Analysis | Eternal CNC</title>
  <style>
    :root { --bg:#F4F3EE; --dark:#1A1A1A; --red:#8B0000; --muted:#6B7280; --line:#E5E7EB; --card:#fff; }
    * { box-sizing:border-box; }
    body { margin:0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background:var(--bg); color:var(--dark); line-height:1.75; }
    .wrap { max-width:860px; margin:0 auto; padding:56px 24px; }
    .brand { color:var(--red); font-weight:700; letter-spacing:0.05em; text-transform:uppercase; font-size:13px; margin-bottom:12px; }
    h1 { font-size:34px; margin:0 0 14px; line-height:1.25; }
    .date { color:var(--muted); font-size:14px; margin-bottom:36px; }
    .summary { background:var(--card); border:1px solid var(--line); border-radius:12px; padding:26px; margin-bottom:36px; }
    h2 { font-size:22px; margin:40px 0 16px; border-bottom:2px solid var(--red); padding-bottom:8px; display:inline-block; }
    h3 { font-size:17px; margin:28px 0 10px; color:var(--dark); }
    p { margin:0 0 14px; }
    ul { padding-left:22px; margin:0 0 16px; }
    li { margin-bottom:9px; }
    .metric-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin:24px 0; }
    .metric { background:var(--card); border:1px solid var(--line); border-radius:10px; padding:18px; }
    .metric-value { font-size:24px; font-weight:700; color:var(--red); margin-bottom:4px; }
    .metric-label { font-size:13px; color:var(--muted); line-height:1.5; }
    .source { font-size:12px; color:var(--muted); margin-top:6px; }
    .insight { background:#fff; border-left:4px solid var(--red); padding:18px 22px; margin:26px 0; border-radius:0 10px 10px 0; }
    .insight strong { display:block; margin-bottom:6px; }
    .cta { margin-top:48px; padding:28px; background:var(--dark); color:#fff; border-radius:12px; text-align:center; }
    .cta a { display:inline-block; margin-top:14px; padding:12px 26px; background:var(--red); color:#fff; text-decoration:none; border-radius:6px; font-weight:600; }
    .cta a:hover { background:#6B0000; }
    .footer { margin-top:48px; padding-top:24px; border-top:1px solid var(--line); color:var(--muted); font-size:13px; text-align:center; }
    table { width:100%; border-collapse:collapse; margin:18px 0; background:var(--card); border:1px solid var(--line); }
    th, td { padding:12px; text-align:left; border-bottom:1px solid var(--line); font-size:14px; }
    th { background:#fafafa; font-weight:600; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="brand">Eternal CNC Research</div>
    <h1>5-Axis Machine Tool Localization Analysis</h1>
    <div class="date">Published: 2026-08-22</div>

    <div class="summary">
      <strong>Executive Summary</strong><br>
      5-axis CNC machine tools have long been called the "crown jewel" of machine-tool manufacturing. From 2020 to 2025, China's 5-axis machine tool localization rate jumped from 18% to 59.5%, with domestic brands capturing the majority of the domestic market for the first time. Beijing Jingdiao, Kede CNC, Topmada, and Haitian Precision have made breakthroughs in sales volume, aerospace supply chains, and core-technology autonomy. This report evaluates the technical maturity, remaining bottlenecks, and engineering application windows for domestic 5-axis machines, based on data from AskCI, CMTBA, and company disclosures.
    </div>

    <h2>1. Market Size and Localization Rate</h2>
    <div class="metric-grid">
      <div class="metric">
        <div class="metric-value">59.5%</div>
        <div class="metric-label">China 5-axis CNC machine tool localization rate in 2025, up from 18% in 2020<div class="source">Source: CMTBA / Guanyan Report Network</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">RMB 157 bn</div>
        <div class="metric-label">Estimated 2026 China 5-axis CNC market size; projected to exceed RMB 320 bn by 2030<div class="source">Source: AskCI</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">~20%</div>
        <div class="metric-label">Projected CAGR of China 5-axis machine tool market, 2025—2030<div class="source">Source: Industry estimates</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">90%+</div>
        <div class="metric-label">Kede CNC machine tool localization rate; core functional-component autonomy >85%<div class="source">Source: Kede CNC disclosures / institutional research notes</div></div>
      </div>
    </div>

    <h2>2. Competitive Landscape: From "Usable" to "Reliable"</h2>
    <table>
      <tr><th>Company</th><th>Core Positioning</th><th>Key Data</th></tr>
      <tr><td>Beijing Jingdiao</td><td>3C electronics and precision-mold 5-axis high-speed machining</td><td>Domestic sales and revenue leader for multiple years; installed base >120,000 units; top share in high-end precision 5-axis</td></tr>
      <tr><td>Kede CNC</td><td>Aerospace, aero-engines, large-aircraft structural parts</td><td>GNC62 CNC system benchmarked against Siemens 840D; aerospace order share exceeded 60% in 2026; order backlog ~RMB 2.8 bn</td></tr>
      <tr><td>Topmada</td><td>Aerospace 5-axis</td><td>Ranked first in China aerospace 5-axis CNC market share in 2025; products used in C919 and Long March launch vehicles</td></tr>
      <tr><td>HNC</td><td>CNC systems and intelligent CNC</td><td>"HNC-10" integrates AI chip and large model; cumulative CNC system sales ~150,000 sets</td></tr>
      <tr><td>Haitian Precision / Neway</td><td>Large gantry, marine and energy equipment</td><td>Gained traction in large gantry 5-axis for ships and energy equipment</td></tr>
    </table>

    <h2>3. Technology Breakthroughs and Validation Cases</h2>
    <p>Domestic 5-axis progress is not just final assembly; it is a bottom-up technology stack breakthrough:</p>
    <ul>
      <li><strong>CNC systems:</strong> Kede's GNC62 is the only domestically developed high-end CNC system with full source-code autonomy, with overall pass-rate against Siemens 840D of ~95%. HNC's HNC-10 supports large-model deployment and controls dynamic accuracy errors within 1 μm.</li>
      <li><strong>Key functional components:</strong> Kede's in-house component ratio exceeds 85%, covering servo drives, torque motors, rotary tables, swiveling heads, motorized spindles, and angle sensors.</li>
      <li><strong>Process validation:</strong> Kede built the industry's first aero-engine critical-parts line dominated by domestic high-end 5-axis machines for CASIC 31st Institute, using 6 categories and 22 units. Equipment utilization reached 70%, productivity rose 30%, and headcount was reduced by over 50%.</li>
    </ul>

    <h2>4. Remaining Bottlenecks</h2>
    <p>The localization rate looks strong, but high-end applications still show clear gaps:</p>
    <ul>
      <li><strong>High-end CNC systems:</strong> Overall localization is only ~30%; in true aero-engine-grade precision scenarios (5-axis accuracy <1 μm, max speed >20,000 rpm), penetration is even lower.</li>
      <li><strong>Precision transmission components:</strong> High-precision ball screws and linear guides still rely on imports for over 70% of demand; high-end ball screws are ~90% foreign; precision bearing localization is only ~15%.</li>
      <li><strong>Accuracy retention:</strong> Imported high-end machines maintain precision for 3–5 years. Domestic machines match imports under no-load conditions, but thermal stability and failure rates after months of heavy-duty cutting remain customer concerns.</li>
    </ul>

    <div class="insight">
      <strong>Engineering perspective: "Usable" does not mean "blindly replaceable"</strong>
      For precision machining shops, domestic 5-axis machines already deliver combat-proven value in aerospace structural parts, automotive molds, and 3C precision components. But for ultra-consistent mass production (e.g., medical implants, lithography-machine parts), thorough first-article validation and process-capability studies (Cp/Cpk) remain essential. The right approach is tiered selection by part precision, batch size, and delivery constraints—not blanket substitution.
    </div>

    <h2>5. Eternal CNC Application Recommendations</h2>
    <ol>
      <li><strong>Prioritize domestic 5-axis for small-to-medium batch complex parts:</strong> In cost-sensitive aluminum housings and structural parts with tight delivery windows, domestic 5-axis machines offer clear cost-performance advantages, often cutting lead times by 30–50% versus imports.</li>
      <li><strong>Keep imported capacity for critical processes:</strong> For processes demanding extreme accuracy retention, a dual-track strategy of imported plus domestic machines allows gradual validation of domestic process capability.</li>
      <li><strong>Invest in CAM and post-processor ecosystems:</strong> 5-axis efficiency depends as much on CAM toolpaths, RTCP post-processing, and machine simulation as on the machine itself. Domestic-system CAM ecosystems are still maturing, so engineering validation is critical.</li>
    </ol>

    <div class="cta">
      Need help evaluating 5-axis machining solutions or domestic-machine suitability? Contact the Eternal CNC engineering team.<br>
      <a href="https://www.eternalcnc.com/contact/get-a-quote">Request a Quote</a>
    </div>

    <div class="footer">
      &copy; 2026 Eternal CNC. All rights reserved.<br>
      Data sources: AskCI, CMTBA, Guanyan Report Network, Kede CNC disclosures, Xueqiu institutional research notes, China Industrial News Network. This report is for industry reference only.
    </div>
  </div>
</body>
</html>"""
    },
    {
        "slug": "ev-parts-demand-en",
        "title": "EV Parts Demand & Precision Machining Report",
        "date": "2026-08-22",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EV Parts Demand & Precision Machining Report | Eternal CNC</title>
  <style>
    :root { --bg:#F4F3EE; --dark:#1A1A1A; --red:#8B0000; --muted:#6B7280; --line:#E5E7EB; --card:#fff; }
    * { box-sizing:border-box; }
    body { margin:0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background:var(--bg); color:var(--dark); line-height:1.75; }
    .wrap { max-width:860px; margin:0 auto; padding:56px 24px; }
    .brand { color:var(--red); font-weight:700; letter-spacing:0.05em; text-transform:uppercase; font-size:13px; margin-bottom:12px; }
    h1 { font-size:34px; margin:0 0 14px; line-height:1.25; }
    .date { color:var(--muted); font-size:14px; margin-bottom:36px; }
    .summary { background:var(--card); border:1px solid var(--line); border-radius:12px; padding:26px; margin-bottom:36px; }
    h2 { font-size:22px; margin:40px 0 16px; border-bottom:2px solid var(--red); padding-bottom:8px; display:inline-block; }
    h3 { font-size:17px; margin:28px 0 10px; color:var(--dark); }
    p { margin:0 0 14px; }
    ul { padding-left:22px; margin:0 0 16px; }
    li { margin-bottom:9px; }
    .metric-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin:24px 0; }
    .metric { background:var(--card); border:1px solid var(--line); border-radius:10px; padding:18px; }
    .metric-value { font-size:24px; font-weight:700; color:var(--red); margin-bottom:4px; }
    .metric-label { font-size:13px; color:var(--muted); line-height:1.5; }
    .source { font-size:12px; color:var(--muted); margin-top:6px; }
    .insight { background:#fff; border-left:4px solid var(--red); padding:18px 22px; margin:26px 0; border-radius:0 10px 10px 0; }
    .insight strong { display:block; margin-bottom:6px; }
    .cta { margin-top:48px; padding:28px; background:var(--dark); color:#fff; border-radius:12px; text-align:center; }
    .cta a { display:inline-block; margin-top:14px; padding:12px 26px; background:var(--red); color:#fff; text-decoration:none; border-radius:6px; font-weight:600; }
    .cta a:hover { background:#6B0000; }
    .footer { margin-top:48px; padding-top:24px; border-top:1px solid var(--line); color:var(--muted); font-size:13px; text-align:center; }
    table { width:100%; border-collapse:collapse; margin:18px 0; background:var(--card); border:1px solid var(--line); }
    th, td { padding:12px; text-align:left; border-bottom:1px solid var(--line); font-size:14px; }
    th { background:#fafafa; font-weight:600; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="brand">Eternal CNC Research</div>
    <h1>EV Parts Demand & Precision Machining Report</h1>
    <div class="date">Published: 2026-08-22</div>

    <div class="summary">
      <strong>Executive Summary</strong><br>
      In 2025, China's new-energy vehicle (NEV) output exceeded 13 million units, driving rapid demand for precision aluminum structural parts such as motor housings, inverter housings, and battery trays. Compared with conventional vehicles, NEV components emphasize light weighting, high integration, sealing, and reliability, placing stricter requirements on aluminum housing flatness, concentricity, coolant-channel sealing, and batch consistency. This report analyzes critical machining metrics, process routes, and supply-chain opportunities for e-drive systems and battery trays, drawing on CAAM, CINNO Research, PW Consulting, Market Reports World, and engineering practice data.
    </div>

    <h2>1. Market Scale: Aluminum Battery Trays and E-Drive Housings</h2>
    <div class="metric-grid">
      <div class="metric">
        <div class="metric-value">13 million+</div>
        <div class="metric-label">China NEV output in 2025, directly driving demand for motor housings, inverter housings, and battery trays<div class="source">Source: CAAM / industry research</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">$5.91 bn</div>
        <div class="metric-label">Estimated 2026 global aluminum alloy battery tray market; projected to reach $13.36 bn by 2032 at 14.0% CAGR<div class="source">Source: PW Consulting / Market Reports World</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">52%+</div>
        <div class="metric-label">China's share of global aluminum battery tray output; global EV output exceeded 18 million units in 2025<div class="source">Source: Market Reports World 2026</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">77.9%</div>
        <div class="metric-label">Share of battery-electric vehicles (BEVs) in aluminum battery tray demand in 2025<div class="source">Source: PW Consulting</div></div>
      </div>
    </div>

    <h2>2. E-Drive Housings: Precision Drives NVH and Thermal Efficiency</h2>
    <p>The motor housing is both a structural and thermal-management component. Typical materials are 6061-T6, 6082-T6, or die-cast aluminum ADC12/A380. Typical specifications are as follows:</p>
    <table>
      <tr><th>Parameter</th><th>Typical Requirement</th><th>Engineering Significance</th></tr>
      <tr><td>Dimensional tolerance</td><td>±0.01–0.05 mm</td><td>Ensures correct assembly of bearings, stator, and rotor</td></tr>
      <tr><td>Bearing-bore concentricity</td><td>≤ 0.015 mm</td><td>Prevents rotor imbalance and reduces high-speed vibration/noise</td></tr>
      <tr><td>Mounting-face flatness</td><td>≤ 0.02 mm</td><td>Ensures reliable sealing of gearbox/transmission mounting face</td></tr>
      <tr><td>Surface roughness</td><td>Ra 0.8–1.6 μm</td><td>Improves sealing-surface fit and bearing compatibility</td></tr>
      <tr><td>Coolant-channel sealing</td><td>2 bar / 10 min leak-free</td><td>Prevents coolant leakage and electrical insulation failure</td></tr>
    </table>

    <h2>3. How 5-Axis Machining Transforms E-Drive Part Efficiency</h2>
    <p>Annual output of NEV motor and gearbox housings exceeds 20 million pieces. Traditional 4-axis or trunnion machining completes less than 70% of features in one setup, accumulating errors ≥0.05 mm across multiple setups. With 5-axis machining centers:</p>
    <ul>
      <li>Motor-housing concentricity can be stably controlled within <strong>0.006 mm</strong>;</li>
      <li>Gearbox housings complete milling, boring, drilling, and tapping in one setup with dimensional tolerance <strong>±0.01 mm</strong>;</li>
      <li>Pass rates rise from 82% to <strong>97%</strong>;</li>
      <li>Single-piece cycle time drops from 45 minutes to 28 minutes, a productivity gain of ~<strong>37%</strong>.</li>
    </ul>

    <h2>4. Battery Trays: From Structural Part to Safety-Critical Component</h2>
    <p>Battery tray process routes are split between extruded-aluminum welding (mainstream, 52.7% of global share in 2025) and one-piece die-cast plus skin welding (34.4%). Core machining challenges include:</p>
    <ul>
      <li><strong>Flatness control:</strong> Cold-plate mounting/sealing surfaces must hold ≤0.2 mm/1000 mm; excess deviation causes uneven silicone gasket compression, coolant leakage, and IP67/IP68 failure.</li>
      <li><strong>Seal-groove machining:</strong> Groove depth/width tolerance ±0.1 mm, surface roughness Ra ≤1.6 μm, with no tool marks or burrs at the groove bottom.</li>
      <li><strong>Post-weld finishing:</strong> After friction-stir or laser welding, stress-relief treatment followed by finish milling of welded zones is needed to prevent dimensional drift from welding distortion.</li>
    </ul>

    <div class="insight">
      <strong>Engineering perspective: NEV parts need more than dimensional compliance</strong>
      E-drive housings and battery trays simultaneously carry structural, sealing, thermal-management, and safety functions. A ±0.01 mm tolerance on the drawing is only the entry ticket. The real test for a machining supplier is whether stress-relief aging is performed on die-cast blanks, whether critical features are machined in one setup, whether every coolant channel is 100% leak-tested, and whether Cpk stays stable ≥1.33 in mass production. Any weak link will be magnified in vehicle NVH, thermal-management, or safety testing.
    </div>

    <h2>5. Eternal CNC Application Recommendations</h2>
    <ol>
      <li><strong>Embed material preprocessing in the process:</strong> Die-cast aluminum blanks require 160–180 °C stress-relief aging for 2–4 hours; otherwise post-machining distortion can exceed 30%.</li>
      <li><strong>Prioritize single-setup 5-axis machining:</strong> For bearing bores, mounting faces, and coolant channels, complete as many critical features as possible in one setup to avoid accumulated concentricity and positional errors from multiple fixturing operations.</li>
      <li><strong>Implement 100% leak testing and dimensional traceability:</strong> Battery trays and e-drive housings must be leak-tested piece by piece, and CMM/2.5D inspection data must be bound to part serial numbers to meet automotive customer PPAP and traceability requirements.</li>
    </ol>

    <div class="cta">
      Have NEV motor housings, battery trays, or inverter housings to machine? Contact the Eternal CNC engineering team for DFM review and quotation.<br>
      <a href="https://www.eternalcnc.com/contact/get-a-quote">Request a Quote</a>
    </div>

    <div class="footer">
      &copy; 2026 Eternal CNC. All rights reserved.<br>
      Data sources: CAAM, CINNO Research, PW Consulting, Market Reports World, 5-axiscnc.com, Similar.ltd, Kunshan Jiulongfeng Precision Technology. This report is for industry reference only.
    </div>
  </div>
</body>
</html>"""
    },
    {
        "slug": "iso-9001-update-en",
        "title": "ISO 9001:2025 Update & Compliance Guide",
        "date": "2026-08-22",
        "html": """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ISO 9001:2025 Update & Compliance Guide | Eternal CNC</title>
  <style>
    :root { --bg:#F4F3EE; --dark:#1A1A1A; --red:#8B0000; --muted:#6B7280; --line:#E5E7EB; --card:#fff; }
    * { box-sizing:border-box; }
    body { margin:0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background:var(--bg); color:var(--dark); line-height:1.75; }
    .wrap { max-width:860px; margin:0 auto; padding:56px 24px; }
    .brand { color:var(--red); font-weight:700; letter-spacing:0.05em; text-transform:uppercase; font-size:13px; margin-bottom:12px; }
    h1 { font-size:34px; margin:0 0 14px; line-height:1.25; }
    .date { color:var(--muted); font-size:14px; margin-bottom:36px; }
    .summary { background:var(--card); border:1px solid var(--line); border-radius:12px; padding:26px; margin-bottom:36px; }
    h2 { font-size:22px; margin:40px 0 16px; border-bottom:2px solid var(--red); padding-bottom:8px; display:inline-block; }
    h3 { font-size:17px; margin:28px 0 10px; color:var(--dark); }
    p { margin:0 0 14px; }
    ul { padding-left:22px; margin:0 0 16px; }
    li { margin-bottom:9px; }
    .metric-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin:24px 0; }
    .metric { background:var(--card); border:1px solid var(--line); border-radius:10px; padding:18px; }
    .metric-value { font-size:24px; font-weight:700; color:var(--red); margin-bottom:4px; }
    .metric-label { font-size:13px; color:var(--muted); line-height:1.5; }
    .source { font-size:12px; color:var(--muted); margin-top:6px; }
    .insight { background:#fff; border-left:4px solid var(--red); padding:18px 22px; margin:26px 0; border-radius:0 10px 10px 0; }
    .insight strong { display:block; margin-bottom:6px; }
    .cta { margin-top:48px; padding:28px; background:var(--dark); color:#fff; border-radius:12px; text-align:center; }
    .cta a { display:inline-block; margin-top:14px; padding:12px 26px; background:var(--red); color:#fff; text-decoration:none; border-radius:6px; font-weight:600; }
    .cta a:hover { background:#6B0000; }
    .footer { margin-top:48px; padding-top:24px; border-top:1px solid var(--line); color:var(--muted); font-size:13px; text-align:center; }
    table { width:100%; border-collapse:collapse; margin:18px 0; background:var(--card); border:1px solid var(--line); }
    th, td { padding:12px; text-align:left; border-bottom:1px solid var(--line); font-size:14px; }
    th { background:#fafafa; font-weight:600; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="brand">Eternal CNC Research</div>
    <h1>ISO 9001:2025 Update & Compliance Guide</h1>
    <div class="date">Published: 2026-08-22</div>

    <div class="summary">
      <strong>Executive Summary</strong><br>
      Ten years after ISO 9001:2015, ISO released the ISO/DIS 9001:2025 Draft International Standard in August 2025. The final version is expected between November 2025 and the second half of 2026, with an approximately three-year transition period. The revision is not a wholesale rewrite; it preserves the High-Level Structure (HLS) and PDCA cycle while formally embedding climate change, quality culture, ethical behavior, digitalization and AI risk, and opportunity-based thinking into the quality management system. More than 1.1 million certified organizations worldwide will be affected. This report summarizes the key changes and enterprise transition paths based on the ISO/DIS 9001:2025 draft and interpretations from Quality Magazine, ISO/TC 176, and leading certification consultancies.
    </div>

    <h2>1. Timeline and Transition Period</h2>
    <div class="metric-grid">
      <div class="metric">
        <div class="metric-value">Aug 2025</div>
        <div class="metric-label">ISO/DIS 9001:2025 Draft International Standard published for member-body comment<div class="source">Source: ISO / ISS.rs</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">Nov 2025 – H2 2026</div>
        <div class="metric-label">Final publication expected (sources vary on exact date)<div class="source">Source: ISO / Pillar Management</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">3 years</div>
        <div class="metric-label">Standard transition period; ISO 9001:2015-certified organizations must complete migration<div class="source">Source: ISO / KDM Associates</div></div>
      </div>
      <div class="metric">
        <div class="metric-value">1.1 million+</div>
        <div class="metric-label">ISO 9001-certified organizations worldwide affected by the revision<div class="source">Source: Pillar Management</div></div>
      </div>
    </div>

    <h2>2. Six Major Changes</h2>
    <table>
      <tr><th>Clause</th><th>New / Strengthened Requirement in 2025</th><th>Practical Impact on Precision Manufacturers</th></tr>
      <tr><td>4.1 / 4.2 Context</td><td>Must assess whether climate change is a relevant factor and include it in interested-party needs</td><td>Identify impacts of extreme weather, energy supply, and carbon-footprint data on supply chains and delivery capability</td></tr>
      <tr><td>5.1 Leadership</td><td>Top management must promote a quality culture and ethical behavior</td><td>Integrity, compliance, and anti-bribery must move from slogans to auditable systems and records</td></tr>
      <tr><td>6.1 Risks and opportunities</td><td>Risks and opportunities separated into sub-clauses (6.1.2 / 6.1.3), emphasizing opportunity-based thinking</td><td>Don't just maintain risk registers; actively identify opportunities from technology, market, and customer upgrades</td></tr>
      <tr><td>6.3 Planning of changes</td><td>Changes must be monitored for effectiveness, communicated, and reviewed</td><td>Process changes, software upgrades, and supplier switches need documented effectiveness verification</td></tr>
      <tr><td>7.1.3 Infrastructure</td><td>Explicitly includes hardware, software, IT, and remote/hybrid work environments</td><td>Digital systems, MES, CMM data management, and cybersecurity become part of infrastructure management</td></tr>
      <tr><td>8.2 / 8.4 Operations</td><td>Customer communication adds contingency-action information; external-provider interactions must be controlled</td><td>Higher requirements for supply-chain disruption plans, complaint-response timeliness, and outsourced-process traceability</td></tr>
    </table>

    <h2>3. From "Retain" to "Make Available" Documented Information</h2>
    <p>The draft replaces "retain documented information" with "make documented information available" in several clauses. This does not relax documentation requirements; it stresses that documentation's value lies in being retrievable when needed, not in mechanical archiving. For digitally mature organizations, electronic records, cloud documents, and MES data chains can serve as compliance evidence—but access control, version control, tamper-proofing, and backup must be in place.</p>

    <h2>4. Climate Change: From Peripheral Issue to Audit Requirement</h2>
    <p>ISO signed the London Declaration in 2021, committing to embed climate change into all new and revised standards. In 2024 ISO amended Annex SL to require consideration of climate change in organizational context and interested-party analysis; the 2025 draft cements this requirement in ISO 9001 itself. Organizations must answer:</p>
    <ul>
      <li>Could extreme weather disrupt critical raw-material or energy supplies?</li>
      <li>Do customers require carbon-footprint data or low-carbon-process evidence?</li>
      <li>Does logistics and production routing optimization reflect carbon-reduction logic?</li>
    </ul>

    <div class="insight">
      <strong>Engineering perspective: The QMS is a risk firewall, not a paperwork wall</strong>
      For precision machining shops, the direction of ISO 9001:2025 aligns closely with customer requirements already embedded in IATF 16949, AS9100, and ISO 13485. Embedding climate-risk, digital records, and supply-chain quality integration early not only smooths recertification but also puts you ahead in second-party customer audits. The real question is: can your quality manual produce the corresponding records within five minutes when a customer asks, "Which machine, which tool, which operator, and which inspection report produced this screw?"
    </div>

    <h2>5. Eternal CNC Transition Recommendations</h2>
    <ol>
      <li><strong>Conduct a gap analysis now:</strong> Compare your current QMS against the ISO/DIS 9001:2025 draft, focusing on climate change, quality culture, ethical behavior, opportunity management, and change-effectiveness review.</li>
      <li><strong>Digitalize quality records first:</strong> Electronify first-article inspection, patrol inspection, CMM/2.5D reports, and customer complaint handling, with version control and backup.</li>
      <li><strong>Integrate supply-chain quality:</strong> Add climate risk, delivery resilience, and data traceability dimensions to supplier onboarding, annual audits, and performance reviews.</li>
      <li><strong>Train and embed awareness:</strong> Top management must communicate quality-culture and integrity requirements through concrete cases, not slogans, and retain training records.</li>
    </ol>

    <div class="cta">
      Need support preparing for ISO 9001:2025 transition or upgrading your quality management system? Contact the Eternal CNC engineering and quality team.<br>
      <a href="https://www.eternalcnc.com/contact/get-a-quote">Contact the Team</a>
    </div>

    <div class="footer">
      &copy; 2026 Eternal CNC. All rights reserved.<br>
      Data sources: ISO/DIS 9001:2025 public draft, Quality Magazine, ISS.rs, KDM Associates, Pillar Management, SPC Consulting Group, GICG Certification. This report is for industry reference only; please confirm certification arrangements with your certification body and official ISO publications.
    </div>
  </div>
</body>
</html>"""
    },
]

def build(reports):
    for r in reports:
        (OUT / f"{r['slug']}.html").write_text(r["html"], encoding="utf-8")
        print(f"written: {r['slug']}.html")

if __name__ == "__main__":
    build(CN_REPORTS)
    build(EN_REPORTS)
    print("done")
