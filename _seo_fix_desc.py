# -*- coding: utf-8 -*-
"""批量把 desc 过短(<50) 的源文件 description 替换为合规文案(50-160)。直接写入。"""
import os, re

SRC = r'F:\V7'
FIX = {
 'src/pages/about/index.astro': "Our own CNC factory in Bao'an, Shenzhen — 20+ years in precision machining, 5-axis milling, turning and quality control under one roof.",
 'src/pages/404.astro': "The page you're looking for doesn't exist. Browse Eternal CNC precision machining services, engineering capabilities and knowledge resources.",
 'src/pages/services/quality-inspection.astro': "CMM measurement available on request via our group metrology center, with full dimensional reports delivered per agreement for critical parts.",
 'src/pages/zh/cases/5-axis/index.astro': "五轴加工案例库，涵盖叶轮、涡轮壳体、异形支架等复杂曲面精密零件，展示五轴联动加工能力与真实交付实例。",
 'src/pages/zh/cases/turning/index.astro': "车削件CNC加工案例，涵盖轴类、套类、盘类等回转体零件的精密车削，展示高精度批量加工工艺与真实交付实例。",
 'src/pages/zh/cases/cnc/index.astro': "CNC加工案例库，涵盖铣削、钻孔、攻牙及复杂曲面加工的典型案例，为您的精密零件提供可靠、可溯源的加工参考。",
 'src/pages/zh/cases/automotive/index.astro': "汽车行业CNC加工案例，涵盖发动机、底盘、传感器、仪表板等车身与动力系统精密零件，满足车规级质量管控。",
 'src/pages/zh/cases/medical/index.astro': "医疗器械CNC加工案例，涵盖监护仪外壳、手术夹具、诊断探头等洁净级精密零件，满足医疗行业合规与生物相容要求。",
 'src/pages/zh/cases/electronics/index.astro': "电子行业CNC加工案例，涵盖射频外壳、散热片、连接器壳体等精密零件，支撑高频、散热与微型化的加工需求。",
 'src/pages/zh/cases/robotics/index.astro': "机器人行业CNC加工案例，涵盖关节模组、减速器、末端执行器等精密零件，支撑人形与协作机器人的稳定量产。",
 'src/pages/zh/cases/mass-production/index.astro': "大批量量产案例，50件以上稳定量产，全程过程质量管控，CPK≥1.67，满足规模化交付的一致性要求。",
 'src/pages/zh/cases/prototype/index.astro': "小批量打样案例，1-50件快速响应、3-7天交付，助力产品设计验证、原型迭代与功能测试尽早落地、加速上市。",
 'src/pages/zh/knowledge/index.astro': "CNC加工知识库：DFM指南、设计最佳实践、材料选型、公差标准与表面处理工艺，帮助工程师把图纸变成可靠零件。",
 'src/pages/zh/knowledge/technical-resources.astro': "工程参考资料、换算表、可下载资源与CNC加工项目实用工具，助您从设计、报价到制造全流程高效落地、缩短转产周期。",
 'src/pages/zh/knowledge/machining-tolerances.astro': "CNC加工公差标准指南：ISO 2768-m公差表、GD&T能力与公差指定建议，帮助您在图纸上标注合理可行的公差。",
 'src/pages/zh/knowledge/dfm-guides.astro': "面向CNC加工的可制造性设计（DFM）指南，帮助工程师优化结构设计、降低成本、提高一次性通过率，让复杂图纸更好制造。",
 'src/pages/zh/knowledge/quality-certification.astro': "鑫永恒质量认证体系：ISO 9001:2015认证状态、材料证书与合规流程，为您每一批零件提供可追溯的品质保障。",
 'src/pages/zh/knowledge/choose-cnc-supplier/index.astro': "海外买家选择CNC供应商的尽调指南：核实真厂铭牌、首件合格率、材料可追溯、商务红线与常见失败陷阱，帮您避坑。",
 'src/pages/zh/knowledge/material-guide.astro': "CNC加工材料选择指南：铝合金、钢、不锈钢、钛合金、铜/黄铜及工程塑料的性能对比、工艺适配与选用建议。",
 'src/pages/zh/materials/index.astro': "CNC加工材料全面指南：铝合金、不锈钢、钛合金、铜合金、碳钢和工程塑料的性能参数、适用工艺与选材建议。",
 'src/pages/zh/industries/index.astro': "为汽车、机器人、医疗器械、通信卫星、电子与能源装备等行业提供精密CNC加工与可制造性支持，覆盖原型到量产。",
 'src/pages/zh/industries/electronics/index.astro': "为电子通信行业提供精密CNC加工——射频外壳、散热片、连接器壳体、屏蔽罩，兼顾精度、散热与电磁兼容。",
 'src/pages/zh/industries/energy/index.astro': "为能源装备行业提供精密CNC加工——阀门阀体、泵壳、法兰连接件、涡轮夹具，满足耐高压、耐腐蚀与高洁净的要求。",
 'src/pages/zh/industries/robotics/index.astro': "为工业机器人及协作机器人提供精密CNC加工零件——关节模组、减速器壳体、末端执行器，支撑稳定批量交付。",
 'src/pages/zh/services/cnc-machining.astro': "专业CNC精密加工服务，支持三轴、四轴、五轴与高速铣削，从原型到量产提供一站式高精度加工与质量保证方案。",
 'src/pages/zh/services/cnc-turning.astro': "专业数控车削服务，支持精密车削、车铣复合与自动车床加工，为高精度回转体零件提供一站式可靠交付与质量保障。",
 'src/pages/zh/services/dfm-analysis/index.astro': "专业DFM可制造性分析服务，上传图纸2小时内获取详细报告，帮您优化设计、降低成本并规避潜在的制造风险。",
 'src/pages/zh/services/material-selection/index.astro': "专业材料选型指导，覆盖铝合金、钢材、不锈钢、工程塑料与特种合金，帮您选择最适合工艺与成本的优化材料。",
 'src/pages/zh/services/precision-grinding.astro': "专业精密磨削服务，支持平面、外圆、内圆与无心磨削加工，以亚微米级精度满足严苛的表面质量与公差要求，并配套完善检测。",
 'src/pages/zh/services/wire-edm.astro': "专业线切割EDM加工，慢走丝/中走丝精密切割，适合复杂轮廓、微细结构及超硬材料的高精度、高一致性加工。",
 'src/pages/zh/services/surface-treatment/index.astro': "专业表面处理服务，支持阳极氧化、电镀、喷涂、喷砂抛光等多种工艺，同时满足外观质感与功能防腐的双重需求。",
 'src/pages/zh/equipment/taikan-t700se.astro': "重型BT40立式加工中心，集铣削、钻孔、攻丝于一体，刚性强、切削效率高，专为中大型铝件与钢件的稳定批量生产而设计。",
 'src/pages/zh/equipment/wanghui-xh540.astro': "配备高速电主轴的五轴雕铣加工中心，适用于模具雕铣、治具加工及铝件批量攻钻，兼具高精度、高效率与良好表面质量。",
 'src/pages/zh/equipment/cato-ct80.astro': "巨冈CT紧凑型高速立式加工中心，专为中小型工件的高效钻孔、攻丝及轻铣削加工设计，结构紧凑、占地小、响应快。",
 'src/pages/zh/equipment/taikan-t-v856s.astro': "高精度立式加工中心，配备BT40直联主轴与臂式刀库，刚性强、定位准，专为中大型精密零件的稳定批量加工而设计。",
 'src/pages/zh/careers/index.astro': "加入我们的精密加工团队，20多年行业经验、前沿CNC技术，与一家以手艺为本、把零件做对的工厂共同成长。",
 'src/pages/zh/contact/get-a-quote.astro': "上传您的图纸，我们将在2小时内为您提供详细的CNC加工报价与DFM可制造性分析，快速获得专业工程师反馈。",
 'src/content/zhBlog/why-lead-times-slip.md': "交期不是产品之外的事，它本身就是服务里最硬的那一项。交期不准的根子在上游——供应商、表面处理与排产节奏，而不在排产表本身。",
 'src/content/zhBlog/mecha-dream-first-step.md': "一台机甲拆到底只有四样东西：关节、骨架、脑子、皮肤。而关节里真正要切削的只有壳体和法兰——这就是普通人做机甲的入门起点。",
 'src/content/zhBlog/power-equipment-machining.md': "电力设备的零件看着不复杂，卡良率的却是三个“面”：铜排平直度、壳体密封面、镀层做完之后的尺寸。本文拆解这三个难点。",
 'src/content/zhBlog/lead-time-and-price.md': "同一张图纸，三家报价能差三倍。客户常常不选最便宜那家——采购真正买的不是工时，而是“不用操心”的确定性。",
 'src/content/zhBlog/liquid-cooling-compute-and-robots.md': "AI 芯片六年功耗涨了近 5 倍，人形机器人关节在马拉松里因过热退赛。风冷到顶了，液冷凭什么接班？本文从工程视角拆解液冷散热。",
 'src/content/zhBlog/which-dimensions-deserve-tight-tolerance.md': "把公差当精度指标，是一张图最贵的误会。标准自己就建议金属件优先用 m 档——紧一档，钱到底花在哪？本文讲清关键尺寸与公差的关系。",
}

pat = re.compile(r'(description\s*[:=]\s*")[^"\n]*(")')
applied = 0
for rel, new in FIX.items():
    fp = os.path.join(SRC, rel)
    if not os.path.exists(fp):
        print(f'[MISS] {rel}'); continue
    txt = open(fp, encoding='utf-8').read()
    newtxt = pat.sub(lambda m: m.group(1) + new + m.group(2), txt)
    if newtxt != txt:
        open(fp, 'w', encoding='utf-8').write(newtxt)
        applied += 1
        print(f'[ok] {rel}  -> {len(new)}字')
    else:
        print(f'[nochange] {rel}')
print(f'\n共写入 {applied} 个文件')