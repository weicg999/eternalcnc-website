// 行业页深挖内容数据（2026-10-24）
// 铁律约束：报告类承诺一律 on request / per agreement；CMM 只写"集团共享计量中心按需"；
// 不宣称任何认证（ISO 13485 / IATF 16949 / AS9100 均不提）；材料带状态；公差带数字。
// 素材来源：各行业页已发布的 capabilities 卡片与 cases 页已公开的规格，禁止新增未核实数字。

export interface DeepDiveFAQ { q: string; a: string }
export interface DeepDiveLang {
  eyebrow: string;
  heading: string;
  quickAnswer: string;
  partsHeading: string;
  parts: { part: string; material: string; tolerance: string; note: string }[];
  exampleHeading: string;
  exampleTitle: string;
  exampleIntro: string;
  exampleSpecs: string[];
  qaHeading: string;
  qaItems: { label: string; desc: string }[];
  faqHeading: string;
  faq: DeepDiveFAQ[];
}
export interface DeepDiveEntry { en: DeepDiveLang; zh: DeepDiveLang }

export const industryDeepDive: Record<string, DeepDiveEntry> = {
  automotive: {
    en: {
      eyebrow: 'Typical Parts & Tolerances',
      heading: 'What We Machine for Automotive Teams',
      quickAnswer:
        'Eternal CNC machines automotive prototype and low-volume production parts from 1 piece up — gear shafts, sensor housings, valve-body prototypes and chassis brackets — in 6061-T6 / 7075-T6 aluminum and 4140 / 4340 steels, holding ±0.005–0.01 mm on critical features. Quotes within 2 hours.',
      partsHeading: 'Typical parts, materials and tolerances',
      parts: [
        { part: 'Gear shafts & splines', material: 'Steel 4140 / 20CrMnTi', tolerance: '±0.01 mm', note: 'Spline profiles checked with go/no-go gauges' },
        { part: 'Sensor housings', material: 'Aluminum 6061-T6, Brass C360', tolerance: '±0.005 mm', note: 'Sealing surfaces machined flat' },
        { part: 'Valve bodies (prototype)', material: 'Aluminum 6061-T6', tolerance: '±0.01 mm', note: 'Seat depths and cross-drills documented' },
        { part: 'Control-arm brackets', material: 'Steel 1045 / 4340', tolerance: '±0.01 mm', note: 'Batch consistency across repeat orders' },
        { part: 'ECU test fixtures', material: 'Aluminum 6061-T6 + POM', tolerance: '±0.005 mm', note: 'Interface holes matched to harness gauges' },
        { part: 'Steering column parts', material: 'Steel 40Cr / 4140', tolerance: '±0.01 mm', note: 'Keyway-to-bore concentricity controlled' },
      ],
      exampleHeading: 'Example job we quote regularly',
      exampleTitle: 'Transmission mounting bracket — 25-piece prototype lot',
      exampleIntro: 'A representative job that shows how automotive prototype orders typically run through the shop.',
      exampleSpecs: [
        'Part: gearbox mounting bracket',
        'Material: aluminum 6061-T6',
        'Process: 3-axis milling + drilling, single fixture',
        'Critical tolerance: bearing bore ±0.01 mm',
        'Finish: clear anodize',
        'Lot size: 25 pcs, FAI report on request',
      ],
      qaHeading: 'Automotive quality specifics',
      qaItems: [
        { label: 'PPAP-style documentation', desc: 'Dimension reports, FAI and material certificates compiled per agreement — documentation packages follow your design-control requirements.' },
        { label: 'Batch traceability', desc: 'Every regular order ships with a key-dimension inspection report and material certificate; lot records link parts to material batches.' },
        { label: 'Shaft & spline inspection', desc: 'Splines checked with go/no-go gauges; shaft runout measured on centers. CMM verification available at our group shared metrology center on request.' },
        { label: 'Reorder consistency', desc: 'Fixtures and programs are retained for repeat orders, so batch-to-batch variation stays within the original tolerance band.' },
      ],
      faqHeading: 'Automotive machining FAQ',
      faq: [
        { q: 'Do you provide PPAP documentation?', a: 'We are not IATF 16949 certified. We provide PPAP-style documentation packages — dimensional reports, FAI, material certificates and CMM data from our group shared metrology center — compiled per agreement.' },
        { q: 'What is the minimum order quantity?', a: 'MOQ is 1 piece. Prototype lots of 10–50 pieces and low-volume production runs are both routine.' },
        { q: 'Can you machine splines and gear shafts?', a: 'Yes — gear hobbing followed by CNC finishing, with spline profiles verified against go/no-go gauges.' },
        { q: 'How fast can I get a quote?', a: 'Standard drawings are quoted within 2 hours; complex parts within 1 working day. Prototypes ship 3–5 days after drawing confirmation.' },
      ],
    },
    zh: {
      eyebrow: '典型零件与公差',
      heading: '我们为汽车行业加工什么',
      quickAnswer:
        '从 1 件起订的汽车打样与小批量零件：齿轮轴与花键、传感器壳体、阀体样件、底盘支架。材料覆盖 6061-T6 / 7075-T6 铝合金与 4140 / 4340 钢，关键尺寸公差 ±0.005–0.01 mm，2 小时内报价。',
      partsHeading: '典型零件、材料与公差',
      parts: [
        { part: '齿轮轴与花键', material: '4140 / 20CrMnTi', tolerance: '±0.01 mm', note: '花键用通止规检验' },
        { part: '传感器壳体', material: '6061-T6 铝、C360 黄铜', tolerance: '±0.005 mm', note: '密封面精铣平面' },
        { part: '阀体（打样）', material: '6061-T6 铝', tolerance: '±0.01 mm', note: '阀座深度与交叉孔附记录' },
        { part: '控制臂支架', material: '1045 / 4340 钢', tolerance: '±0.01 mm', note: '返单批次一致性好' },
        { part: 'ECU 测试治具', material: '6061-T6 铝 + POM', tolerance: '±0.005 mm', note: '接口孔与线束检具匹配' },
        { part: '转向柱零件', material: '40Cr / 4140 钢', tolerance: '±0.01 mm', note: '键槽与孔同轴度受控' },
      ],
      exampleHeading: '常报价的代表性订单',
      exampleTitle: '变速箱安装支架 — 25 件打样批',
      exampleIntro: '一单典型的汽车打样订单，展示这类件的完整流转过程。',
      exampleSpecs: [
        '零件：变速箱安装支架',
        '材料：6061-T6 铝合金',
        '工艺：三轴铣削 + 钻孔，一次装夹',
        '关键公差：轴承孔 ±0.01 mm',
        '表面处理：本色阳极氧化',
        '批量：25 件，首件（FAI）报告按需提供',
      ],
      qaHeading: '汽车行业质检要点',
      qaItems: [
        { label: 'PPAP 风格文档', desc: '尺寸报告、FAI、材质证书按协议汇编——文档包按你的设计管控要求输出。' },
        { label: '批次追溯', desc: '常规订单随附关键尺寸检验报告与材质证书；批次记录把零件与来料批次对应。' },
        { label: '轴类与花键检验', desc: '花键通止规检验、轴跳动顶尖检测；按需可在集团共享计量中心做 CMM 复核。' },
        { label: '返单一致性', desc: '返单保留原夹具与程序，批次间波动控制在原公差带内。' },
      ],
      faqHeading: '汽车零件加工常见问题',
      faq: [
        { q: '能提供 PPAP 文件吗？', a: '我们未做 IATF 16949 认证，但可按协议提供 PPAP 风格文档包：尺寸报告、FAI、材质证书，以及集团共享计量中心的 CMM 数据。' },
        { q: '起订量是多少？', a: '1 件起订。10–50 件的打样批和低批量生产都是常规业务。' },
        { q: '能加工花键和齿轮轴吗？', a: '可以——滚齿加 CNC 精加工，花键用通止规验证。' },
        { q: '报价要多久？', a: '常规图纸 2 小时内报价，复杂件 1 个工作日内。打样板在图纸确认后 3–5 天发货。' },
      ],
    },
  },

  medical: {
    en: {
      eyebrow: 'Typical Parts & Tolerances',
      heading: 'What We Machine for Medical Device Teams',
      quickAnswer:
        'Surgical instrument components and diagnostic device housings from stainless 316L, titanium Ti-6Al-4V, PEEK and POM — drill guides, endoscope fixtures, analyzer enclosures — at ±0.005–0.025 mm, MOQ 1 piece, with mill certificates and full batch traceability.',
      partsHeading: 'Typical parts, materials and tolerances',
      parts: [
        { part: 'Surgical drill guides', material: 'Titanium Ti-6Al-4V', tolerance: '±0.005 mm', note: 'Guide bores held to drawing datum' },
        { part: 'Endoscope alignment fixtures', material: 'Stainless 316L', tolerance: '±0.005 mm', note: 'Datum faces ground for repeat setups' },
        { part: 'Blood analyzer enclosures', material: 'Aluminum 6061-T6', tolerance: '±0.01 mm', note: 'Interface hole patterns matched' },
        { part: 'Ultrasound probe bodies', material: 'Stainless 316L / 6061-T6', tolerance: '±0.01 mm', note: 'Contoured surfaces 5-axis finished' },
        { part: 'Assembly fixture plates', material: 'Aluminum 6061-T6 + PEEK', tolerance: '±0.01 mm', note: 'Dowel-hole grids positioned ±0.01 mm' },
        { part: 'Calibration jigs', material: 'POM / Stainless 316L', tolerance: '±0.005 mm', note: 'Insulation and stiffness where needed' },
      ],
      exampleHeading: 'Example job we quote regularly',
      exampleTitle: 'Surgical drill guide — titanium, 40-piece lot',
      exampleIntro: 'A representative instrument-component order showing material, tolerance and documentation flow.',
      exampleSpecs: [
        'Part: surgical drill guide',
        'Material: titanium Ti-6Al-4V',
        'Process: 5-axis milling, guide bores finished last',
        'Critical tolerance: guide bore ±0.005 mm',
        'Finish: passivated',
        'Lot size: 40 pcs, FAI + material certificate on request',
      ],
      qaHeading: 'Medical quality specifics',
      qaItems: [
        { label: 'Material traceability', desc: 'Mill certificates for 316L / Ti-6Al-4V stock linked to your lot; heat numbers carried through to the shipping report.' },
        { label: 'FAI & key-dimension reports', desc: 'First-article inspection on request; every regular order includes key-dimension inspection results and material certificates.' },
        { label: 'Packaging per agreement', desc: 'Individual part protection and clean handling requirements can be specified per agreement on the quote.' },
        { label: 'Design-control support', desc: 'We supply the machining records you need for your design history file — final validation and regulatory approval remain with the device maker.' },
      ],
      faqHeading: 'Medical machining FAQ',
      faq: [
        { q: 'Do you machine PEEK and titanium?', a: 'Yes — PEEK, POM, Ti-6Al-4V and 316L are routine materials for instrument components and fixtures.' },
        { q: 'What is the MOQ for instrument prototypes?', a: '1 piece. Single prototypes and 20–50 piece validation lots are both common.' },
        { q: 'Can parts be supplied clean-packaged?', a: 'Individual protective packaging and clean handling can be agreed per order and specified on the quote.' },
        { q: 'Do you hold ISO 13485?', a: 'No. We supply machined components with material certificates, FAI and traceable batch records; device certification and validation stay with our customers.' },
      ],
    },
    zh: {
      eyebrow: '典型零件与公差',
      heading: '我们为医疗器械行业加工什么',
      quickAnswer:
        '手术器械零件与诊断设备壳体：316L 不锈钢、Ti-6Al-4V 钛合金、PEEK、POM——钻导、内窥镜定位件、分析仪外壳——公差 ±0.005–0.025 mm，1 件起订，随附炉号材质证书与完整批次追溯。',
      partsHeading: '典型零件、材料与公差',
      parts: [
        { part: '手术钻导', material: 'Ti-6Al-4V 钛合金', tolerance: '±0.005 mm', note: '导向孔按图纸基准保证' },
        { part: '内窥镜定位夹具', material: '316L 不锈钢', tolerance: '±0.005 mm', note: '基准面磨削，重复装夹稳定' },
        { part: '血液分析仪外壳', material: '6061-T6 铝', tolerance: '±0.01 mm', note: '接口孔位与总成匹配' },
        { part: '超声探头壳体', material: '316L / 6061-T6', tolerance: '±0.01 mm', note: '曲面五轴精加工' },
        { part: '装配夹具板', material: '6061-T6 铝 + PEEK', tolerance: '±0.01 mm', note: '销孔网格定位 ±0.01 mm' },
        { part: '标定检具', material: 'POM / 316L', tolerance: '±0.005 mm', note: '兼顾绝缘与刚性' },
      ],
      exampleHeading: '常报价的代表性订单',
      exampleTitle: '手术钻导 — 钛合金，40 件批',
      exampleIntro: '一单典型的器械零件订单，展示材料、公差与文档流转。',
      exampleSpecs: [
        '零件：手术钻导',
        '材料：Ti-6Al-4V 钛合金',
        '工艺：五轴铣削，导向孔最后精加工',
        '关键公差：导向孔 ±0.005 mm',
        '表面处理：钝化',
        '批量：40 件，FAI + 材质证书按需提供',
      ],
      qaHeading: '医疗行业质检要点',
      qaItems: [
        { label: '材料追溯', desc: '316L / Ti-6Al-4V 原材随附炉号证书并与批次对应，热号一路带到发货报告。' },
        { label: 'FAI 与关键尺寸报告', desc: '首件检验按需提供；常规订单随附关键尺寸检测结果与材质证书。' },
        { label: '包装按协议', desc: '单件防护与洁净操作要求可在报价单上按协议明确。' },
        { label: '设计文档支持', desc: '为你的设计历史档案提供加工记录——最终验证与法规注册由器械制造商负责。' },
      ],
      faqHeading: '医疗零件加工常见问题',
      faq: [
        { q: '能加工 PEEK 和钛合金吗？', a: '可以——PEEK、POM、Ti-6Al-4V、316L 都是器械零件与检具的常规材料。' },
        { q: '器械打样起订量？', a: '1 件起订。单件打样与 20–50 件验证批都常见。' },
        { q: '可以洁净包装交付吗？', a: '单件防护包装与洁净操作可按订单约定，并在报价单上写明。' },
        { q: '你们有 ISO 13485 吗？', a: '没有。我们提供带材质证书、FAI 和可追溯批次记录的零件加工；器械的认证与验证由客户完成。' },
      ],
    },
  },

  electronics: {
    en: {
      eyebrow: 'Typical Parts & Tolerances',
      heading: 'What We Machine for Electronics Teams',
      quickAnswer:
        'RF housings, shield cans, heat sinks and connector bodies in 6061/6063 aluminum, C360 brass, C110 copper and PEEK — ±0.005–0.05 mm depending on feature — from 1 piece. Thin walls, gasket grooves and alignment holes are everyday work.',
      partsHeading: 'Typical parts, materials and tolerances',
      parts: [
        { part: 'RF shield cans', material: 'Brass C360', tolerance: '±0.01 mm', note: 'Edge flatness for gasket seating' },
        { part: 'Filter / RF housings', material: 'Aluminum 6061-T6', tolerance: '±0.01 mm', note: 'Gasket grooves to drawing profile' },
        { part: 'Cold plates', material: 'Aluminum 6061 / 6063', tolerance: '±0.025 mm', note: 'Channel sealing faces machined flat' },
        { part: 'Circular connector bodies', material: 'Brass C360', tolerance: '±0.005 mm', note: 'Thread and seat concentric' },
        { part: 'Fiber-alignment parts', material: 'PEEK', tolerance: '±0.005 mm', note: 'Alignment holes reamed to size' },
        { part: 'Waveguide sections', material: 'Aluminum 6061-T6', tolerance: '±0.05 mm', note: 'Internal corners per drawing radius' },
      ],
      exampleHeading: 'Example job we quote regularly',
      exampleTitle: 'RF filter housing — gasket groove, clear chromate',
      exampleIntro: 'A representative electronics housing showing sealing, finish and tolerance flow.',
      exampleSpecs: [
        'Part: RF filter housing',
        'Material: aluminum 6061-T6',
        'Process: 3-axis milling, gasket groove single-pass',
        'Critical tolerance: groove width ±0.01 mm',
        'Finish: clear chromate per drawing',
        'Lot size: 50 pcs, key-dimension report on request',
      ],
      qaHeading: 'Electronics quality specifics',
      qaItems: [
        { label: 'Flatness on sealing faces', desc: 'Sealing and gasket surfaces machined in one setup; flatness verified on the surface plate for critical parts.' },
        { label: 'Plating-aware machining', desc: 'Masking zones and plating allowances from your drawing are held through machining so finished threads and seats stay in tolerance.' },
        { label: 'Burr control', desc: 'Shield edges and apertures deburred to spec — critical for board-level shield frames and gasket seating.' },
        { label: 'Alignment-hole discipline', desc: 'Pin and fiber alignment holes reamed to size with datum-based positioning; gauge-pin verification on request.' },
      ],
      faqHeading: 'Electronics machining FAQ',
      faq: [
        { q: 'How thin can you machine walls on housings?', a: 'Thin-wall pockets on 6061-T6 are routine; feasibility depends on wall height and clamping — send the drawing and our engineers confirm within 2 hours.' },
        { q: 'Do you machine before or after plating?', a: 'Both arrangements are handled per drawing; where plating thickness matters we hold machining allowances so finished features stay in tolerance.' },
        { q: 'What tolerance can alignment holes hold?', a: '±0.005 mm on reamed alignment holes, positioned from drawing datums.' },
        { q: 'MOQ for connector bodies?', a: '1 piece. Prototype quantities of 20–100 pieces are the most common range.' },
      ],
    },
    zh: {
      eyebrow: '典型零件与公差',
      heading: '我们为电子行业加工什么',
      quickAnswer:
        '射频壳体、屏蔽罩、散热器与连接器壳体：6061/6063 铝、C360 黄铜、C110 紫铜、PEEK——按特征不同公差 ±0.005–0.05 mm，1 件起订。薄壁、密封槽、对位孔都是日常业务。',
      partsHeading: '典型零件、材料与公差',
      parts: [
        { part: '射频屏蔽罩', material: 'C360 黄铜', tolerance: '±0.01 mm', note: '边缘平面度保证密封圈落位' },
        { part: '滤波器 / 射频壳体', material: '6061-T6 铝', tolerance: '±0.01 mm', note: '密封槽按图纸轮廓' },
        { part: '冷板', material: '6061 / 6063 铝', tolerance: '±0.025 mm', note: '流道封面平面精铣' },
        { part: '圆形连接器壳体', material: 'C360 黄铜', tolerance: '±0.005 mm', note: '螺纹与定位面同心' },
        { part: '光纤对位件', material: 'PEEK', tolerance: '±0.005 mm', note: '对位孔铰孔到尺寸' },
        { part: '波导段', material: '6061-T6 铝', tolerance: '±0.05 mm', note: '内圆角按图纸半径' },
      ],
      exampleHeading: '常报价的代表性订单',
      exampleTitle: '射频滤波器壳体 — 密封槽 + 本色铬酸盐处理',
      exampleIntro: '一单典型的电子壳体，展示密封、表面处理与公差流转。',
      exampleSpecs: [
        '零件：射频滤波器壳体',
        '材料：6061-T6 铝合金',
        '工艺：三轴铣削，密封槽一次走刀',
        '关键公差：槽宽 ±0.01 mm',
        '表面处理：按图纸本色铬酸盐',
        '批量：50 件，关键尺寸报告按需提供',
      ],
      qaHeading: '电子行业质检要点',
      qaItems: [
        { label: '封面平面度', desc: '密封与垫圈面一次装夹完成；关键件在平板上验证平面度。' },
        { label: '镀覆感知加工', desc: '图纸规定的遮蔽区和镀层余量全程受控，保证镀后螺纹与定位面仍在公差内。' },
        { label: '毛刺控制', desc: '屏蔽件边与孔口按规范去毛刺——这对板级屏蔽框和密封圈落位是关键项。' },
        { label: '对位孔纪律', desc: '销位/光纤对位孔铰孔到尺寸、基准定位；按需塞规验证。' },
      ],
      faqHeading: '电子零件加工常见问题',
      faq: [
        { q: '壳体薄壁能做多薄？', a: '6061-T6 薄壁腔体是常规业务；可行性取决于壁高与装夹——发图纸来，工程师 2 小时内确认。' },
        { q: '先加工还是先电镀？', a: '按图纸两种都接；镀层厚度敏感的部位我们控制加工余量，保证镀后特征在公差内。' },
        { q: '对位孔公差能到多少？', a: '铰孔对位孔 ±0.005 mm，从图纸基准定位。' },
        { q: '连接器壳体起订量？', a: '1 件起订，20–100 件的打样量最常见。' },
      ],
    },
  },

  robotics: {
    en: {
      eyebrow: 'Typical Parts & Tolerances',
      heading: 'What We Machine for Robotics Teams',
      quickAnswer:
        'Joint module housings, reducer planet carriers and end-effector bases in 7075-T6, 20CrMnTi and 6061-T6 — bearing-seat concentricity ±0.005 mm, batch-to-batch repeatability verified, lots from 1 piece to hundreds.',
      partsHeading: 'Typical parts, materials and tolerances',
      parts: [
        { part: 'Joint module housings', material: 'Aluminum 7075-T6', tolerance: '±0.005 mm', note: 'Bearing-seat concentricity critical' },
        { part: 'Harmonic reducer planet carriers', material: 'Steel 20CrMnTi', tolerance: '±0.01 mm', note: 'Hobbing + CNC finishing, hardness HRC 58–62 documented' },
        { part: 'RV reducer housings', material: 'Steel 40Cr / 6061-T6', tolerance: '±0.01 mm', note: 'Mounting faces machined in one setup' },
        { part: 'Gripper bases', material: 'Aluminum 6061-T6', tolerance: '±0.005 mm', note: 'Lightweight pocketing for high-speed arms' },
        { part: 'Encoder mounts', material: 'Stainless 303', tolerance: '±0.01 mm', note: 'Datum flatness 0.01 mm' },
        { part: 'Cable routing channels', material: 'POM', tolerance: '±0.01 mm', note: 'Deburred edges for cable protection' },
      ],
      exampleHeading: 'Example job we quote regularly',
      exampleTitle: 'Joint module housing — 7075-T6, 5-axis from billet',
      exampleIntro: 'A representative motion-control part showing tolerance and verification flow.',
      exampleSpecs: [
        'Part: joint module housing',
        'Material: aluminum 7075-T6',
        'Process: 5-axis milling from solid billet, single setup',
        'Critical tolerance: bearing seat concentricity ±0.005 mm',
        'Finish: hard anodized',
        'Verification: CMM at our group shared metrology center on request',
      ],
      qaHeading: 'Robotics quality specifics',
      qaItems: [
        { label: 'Repeatability across batches', desc: 'Parts tested across multiple batches for ±0.005 mm repeatability; quality data available for critical dimensions.' },
        { label: 'Bearing surfaces', desc: 'Bearing seats finished to Ra 0.4–0.8; mating surfaces matched for fit and motion.' },
        { label: 'Stress relief before final cuts', desc: 'Stress-relief treatment before final machining keeps critical dimensions stable after heat treatment.' },
        { label: 'Heat-treatment records', desc: 'Gear and shaft heat treatment documented with hardness test results, traceable per batch.' },
      ],
      faqHeading: 'Robotics machining FAQ',
      faq: [
        { q: 'Can you hold ±0.005 mm concentricity on bearing seats?', a: 'Yes, on properly datum-ed drawings — bearing seats are machined in a single setup, and critical features can be CMM-verified at our group shared metrology center on request.' },
        { q: 'Do you support lightweight pocketed designs?', a: 'Yes — pocketed 6061-T6 / 7075-T6 structures for high-speed arms are regular work; DFM feedback flags wall and pocket limits before quoting.' },
        { q: 'Can you supply small reducer-part lots?', a: 'From 1 piece. Planet carriers and housings are quoted from single prototypes to hundreds per batch.' },
        { q: 'How is batch-to-batch consistency kept?', a: 'Fixtures, programs and stress-relief routing are retained per part number so repeat lots land inside the original tolerance band.' },
      ],
    },
    zh: {
      eyebrow: '典型零件与公差',
      heading: '我们为机器人行业加工什么',
      quickAnswer:
        '关节模组壳体、减速器行星架与末端执行器基座：7075-T6、20CrMnTi、6061-T6——轴承位同轴度 ±0.005 mm，批次间重复性有验证，批量从 1 件到数百件。',
      partsHeading: '典型零件、材料与公差',
      parts: [
        { part: '关节模组壳体', material: '7075-T6 铝', tolerance: '±0.005 mm', note: '轴承位同轴度关键' },
        { part: '谐波减速器行星架', material: '20CrMnTi', tolerance: '±0.01 mm', note: '滚齿 + CNC 精车，HRC 58–62 硬度记录随附' },
        { part: 'RV 减速器壳体', material: '40Cr / 6061-T6 铝', tolerance: '±0.01 mm', note: '安装面一次装夹加工' },
        { part: '夹爪基座', material: '6061-T6 铝', tolerance: '±0.005 mm', note: '高速臂轻量化掏腔' },
        { part: '编码器安装座', material: '303 不锈钢', tolerance: '±0.01 mm', note: '基准面平面度 0.01 mm' },
        { part: '走线槽件', material: 'POM', tolerance: '±0.01 mm', note: '边缘去毛刺保护线缆' },
      ],
      exampleHeading: '常报价的代表性订单',
      exampleTitle: '关节模组壳体 — 7075-T6 五轴整体加工',
      exampleIntro: '一单典型的运动控制零件，展示公差与验证流转。',
      exampleSpecs: [
        '零件：关节模组壳体',
        '材料：7075-T6 铝合金',
        '工艺：五轴从坯料整体铣削，一次装夹',
        '关键公差：轴承位同轴度 ±0.005 mm',
        '表面处理：硬质阳极氧化',
        '验证：按需在集团共享计量中心 CMM 检测',
      ],
      qaHeading: '机器人行业质检要点',
      qaItems: [
        { label: '跨批次重复性', desc: '多批次验证 ±0.005 mm 重复性；关键尺寸质量数据可查。' },
        { label: '轴承配合面', desc: '轴承位精加工至 Ra 0.4–0.8；配合面按运动副要求配做。' },
        { label: '精加工前去应力', desc: '最终尺寸前做去应力处理，热处理后关键尺寸保持稳定。' },
        { label: '热处理记录', desc: '齿轮与轴类热处理附硬度检测结果，按批次可追溯。' },
      ],
      faqHeading: '机器人零件加工常见问题',
      faq: [
        { q: '轴承位同轴度 ±0.005 mm 能保证吗？', a: '图纸基准合理即可——轴承位一次装夹加工，关键特征按需在集团共享计量中心做 CMM 验证。' },
        { q: '支持轻量化掏腔设计吗？', a: '支持——6061-T6 / 7075-T6 高速臂轻量化结构是常规业务，报价前 DFM 反馈会指出壁厚与掏腔极限。' },
        { q: '减速器零件小批量接吗？', a: '1 件起接，行星架与壳体从单件打样到数百件一批都报价。' },
        { q: '批次一致性怎么保证？', a: '每个件号保留夹具、程序与去应力路线，返单落在原公差带内。' },
      ],
    },
  },

  'communications-satellite': {
    en: {
      eyebrow: 'Typical Parts & Tolerances',
      heading: 'What We Machine for Communications & Satellite Teams',
      quickAnswer:
        'Low-volume, high-mix structural components for communications ground equipment and satellite-program prototypes — brackets, gimbal parts, waveguide manifolds — in Ti-6Al-4V, 17-4PH, Inconel 718 and aerospace-grade aluminum, ±0.005–0.025 mm.',
      partsHeading: 'Typical parts, materials and tolerances',
      parts: [
        { part: 'Antenna boom fittings', material: 'Titanium Ti-6Al-4V', tolerance: '±0.005 mm', note: 'Datum faces for boom alignment' },
        { part: 'Gimbal brackets', material: 'Steel 4340', tolerance: '±0.01 mm', note: 'Pivot bores concentric in one setup' },
        { part: 'Waveguide manifolds', material: 'Aluminum 6061-T6', tolerance: '±0.01 mm', note: 'Internal channels per drawing' },
        { part: 'Equipment rack brackets', material: 'Aluminum 6061 / 7075-T6', tolerance: '±0.025 mm', note: 'Stiffness-to-weight optimized pockets' },
        { part: 'Sensor integration plates', material: 'Stainless 316', tolerance: '±0.01 mm', note: 'Multi-datum hole patterns matched' },
        { part: 'Structural frame fittings', material: 'Aluminum 2024', tolerance: '±0.01 mm', note: 'Stress-relieved before final machining' },
      ],
      exampleHeading: 'Example job we quote regularly',
      exampleTitle: 'Gimbal bracket — titanium, 5-axis two setups',
      exampleIntro: 'A representative precision bracket for ground-station and program hardware.',
      exampleSpecs: [
        'Part: gimbal bracket',
        'Material: titanium Ti-6Al-4V',
        'Process: 5-axis milling, two setups',
        'Critical tolerance: pivot bore ±0.01 mm, datum faces ±0.005 mm',
        'Finish: per drawing',
        'Documentation: material certificate; CMM verification on request',
      ],
      qaHeading: 'Communications quality specifics',
      qaItems: [
        { label: 'Exotic-material practice', desc: 'Titanium, 17-4PH and Inconel 718 machined with dedicated speeds/feeds and rigid clamping to keep tolerances stable.' },
        { label: 'Stiffness-to-weight review', desc: 'DFM feedback on pocketing and wall limits before quoting — weight targets discussed with the drawing in hand.' },
        { label: 'Stress relief', desc: 'Stress-relief treatment before final machining for frame and bracket parts to stabilize critical dimensions.' },
        { label: 'Documentation per agreement', desc: 'Material certificates on regular orders; FAI, batch records and CMM data from our group shared metrology center per agreement.' },
      ],
      faqHeading: 'Communications & satellite machining FAQ',
      faq: [
        { q: 'Do you machine Inconel 718 and titanium?', a: 'Yes — both are quoted regularly for structural brackets and fittings; feasibility is confirmed per drawing within 2 hours.' },
        { q: 'Do you take 1–10 piece prototype runs?', a: 'Yes — low-volume, high-mix is exactly our model; MOQ is 1 piece.' },
        { q: 'What documentation can you provide?', a: 'Material certificates on regular orders; FAI, batch traceability records and CMM verification at our group shared metrology center per agreement.' },
        { q: 'Lead time for prototype hardware?', a: '3–5 days after drawing confirmation for aluminum parts; exotic materials are confirmed at quoting.' },
      ],
    },
    zh: {
      eyebrow: '典型零件与公差',
      heading: '我们为通信与卫星行业加工什么',
      quickAnswer:
        '通信地面设备与卫星项目打样的低批量多品种结构件——支架、云台件、波导管路——材料 Ti-6Al-4V、17-4PH、Inconel 718 与航空级铝材，公差 ±0.005–0.025 mm。',
      partsHeading: '典型零件、材料与公差',
      parts: [
        { part: '天线帆臂接头', material: 'Ti-6Al-4V 钛合金', tolerance: '±0.005 mm', note: '帆臂对位基准面' },
        { part: '云台支架', material: '4340 钢', tolerance: '±0.01 mm', note: '回转孔一次装夹保证同心' },
        { part: '波导管路', material: '6061-T6 铝', tolerance: '±0.01 mm', note: '内腔通道按图纸' },
        { part: '设备机架支架', material: '6061 / 7075-T6 铝', tolerance: '±0.025 mm', note: '按刚度重量比优化掏腔' },
        { part: '传感器集成板', material: '316 不锈钢', tolerance: '±0.01 mm', note: '多基准孔位配套' },
        { part: '结构框架接头', material: '2024 铝', tolerance: '±0.01 mm', note: '精加工前去应力' },
      ],
      exampleHeading: '常报价的代表性订单',
      exampleTitle: '云台支架 — 钛合金五轴两序加工',
      exampleIntro: '一单地面站与项目硬件的代表性精密支架。',
      exampleSpecs: [
        '零件：云台支架',
        '材料：Ti-6Al-4V 钛合金',
        '工艺：五轴铣削，两次装夹',
        '关键公差：回转孔 ±0.01 mm，基准面 ±0.005 mm',
        '表面处理：按图纸',
        '文档：材质证书随附；CMM 验证按需',
      ],
      qaHeading: '通信行业质检要点',
      qaItems: [
        { label: '难材加工工艺', desc: '钛合金、17-4PH、Inconel 718 用专用切削参数与刚性装夹，公差稳定。' },
        { label: '刚度重量比评审', desc: '报价前对掏腔与壁厚做 DFM 反馈——拿着图纸谈重量指标。' },
        { label: '去应力', desc: '框架与支架类精加工前去应力，稳定关键尺寸。' },
        { label: '文档按协议', desc: '常规订单附材质证书；FAI、批次记录与集团共享计量中心 CMM 数据按协议提供。' },
      ],
      faqHeading: '通信/卫星零件加工常见问题',
      faq: [
        { q: '能加工 Inconel 718 和钛合金吗？', a: '可以——结构支架与接头常报这两种材料；具体图纸 2 小时内确认可行性。' },
        { q: '1–10 件的项目打样接吗？', a: '接——低批量多品种正是我们的模式，1 件起订。' },
        { q: '能提供什么文档？', a: '常规订单附材质证书；FAI、批次追溯与集团共享计量中心的 CMM 验证按协议提供。' },
        { q: '打样交期多久？', a: '铝件图纸确认后 3–5 天；难材在报价时确认。' },
      ],
    },
  },

  energy: {
    en: {
      eyebrow: 'Typical Parts & Tolerances',
      heading: 'What We Machine for Energy Teams',
      quickAnswer:
        'Valve bodies, pump casings and flanges in stainless 316/316L, duplex 2205 and carbon steel — seal surfaces to Ra 0.8, gasket faces ground flat, ±0.01–0.025 mm — from single repair pieces to low-volume batches.',
      partsHeading: 'Typical parts, materials and tolerances',
      parts: [
        { part: 'Valve bodies (prototype / repair)', material: 'Stainless 316 / 316L', tolerance: '±0.01 mm', note: 'Seal surfaces finished to Ra 0.8' },
        { part: 'Pump casings', material: 'Stainless 304/316, Duplex 2205', tolerance: '±0.01 mm', note: 'Impeller chambers to close clearance' },
        { part: 'Flanges (ASME B16.5 pattern)', material: 'Carbon steel / stainless', tolerance: '±0.025 mm', note: 'Gasket faces ground flat' },
        { part: 'Shaft sleeves & wear parts', material: '17-4PH / 4340', tolerance: '±0.01 mm', note: 'Surface hardness per spec' },
        { part: 'Turbine mounting brackets', material: 'Steel 4340 / 7075-T6', tolerance: '±0.05 mm', note: 'Large-format machining' },
        { part: 'Leak-test fixture plates', material: 'Stainless 316', tolerance: '±0.01 mm', note: 'Seal grooves machined to profile' },
      ],
      exampleHeading: 'Example job we quote regularly',
      exampleTitle: 'Ball-valve prototype body — 316L, seat bore Ra 0.8',
      exampleIntro: 'A representative flow-path part showing seal-surface and documentation flow.',
      exampleSpecs: [
        'Part: ball-valve prototype body',
        'Material: stainless 316L',
        'Process: turn-mill, seat bore finished separately',
        'Critical tolerance: seat bore ±0.01 mm',
        'Seal surface: Ra 0.8',
        'Documentation: material certificate; key-dimension report on request',
      ],
      qaHeading: 'Energy quality specifics',
      qaItems: [
        { label: 'Seal-surface finish', desc: 'Seal and seating surfaces finished to Ra 0.8 where specified; profilometer readings for critical surfaces on request.' },
        { label: 'Gasket-face flatness', desc: 'Flange gasket faces ground flat; face finish per drawing callout.' },
        { label: 'Material certificates', desc: 'Mill certificates for 316/316L, duplex and carbon-steel stock supplied with regular orders.' },
        { label: 'Repair & small lots', desc: 'Single repair pieces and small batches quoted with the same 2-hour turnaround; pressure or leak testing arranged per agreement.' },
      ],
      faqHeading: 'Energy machining FAQ',
      faq: [
        { q: 'Can you machine duplex 2205?', a: 'Yes — duplex pump-casing and fitting work is quoted regularly with dedicated tooling parameters.' },
        { q: 'What surface finish can seal faces hold?', a: 'Ra 0.8 on seal surfaces as standard practice; profilometer readings available for critical surfaces on request.' },
        { q: 'Do you take single-piece repair orders?', a: 'Yes — MOQ 1; repair sleeves, bodies and fittings are quoted within 2 hours like any other part.' },
        { q: 'Can pressure testing be arranged?', a: 'Pressure or leak testing is arranged per agreement and stated on the quote where required.' },
      ],
    },
    zh: {
      eyebrow: '典型零件与公差',
      heading: '我们为能源行业加工什么',
      quickAnswer:
        '阀体、泵壳与法兰：316/316L 不锈钢、2205 双相钢、碳钢——密封面 Ra 0.8、垫圈面磨平，公差 ±0.01–0.025 mm，从单件维修件到小批量都接。',
      partsHeading: '典型零件、材料与公差',
      parts: [
        { part: '阀体（打样 / 维修）', material: '316 / 316L 不锈钢', tolerance: '±0.01 mm', note: '密封面精加工至 Ra 0.8' },
        { part: '泵壳', material: '304/316、2205 双相钢', tolerance: '±0.01 mm', note: '叶轮腔小间隙控制' },
        { part: '法兰（ASME B16.5 型式）', material: '碳钢 / 不锈钢', tolerance: '±0.025 mm', note: '垫圈面磨削平整' },
        { part: '轴套与耐磨件', material: '17-4PH / 4340', tolerance: '±0.01 mm', note: '表面硬度按规范' },
        { part: '涡轮机安装支架', material: '4340 钢 / 7075-T6', tolerance: '±0.05 mm', note: '大件加工能力' },
        { part: '试漏治具板', material: '316 不锈钢', tolerance: '±0.01 mm', note: '密封槽按轮廓加工' },
      ],
      exampleHeading: '常报价的代表性订单',
      exampleTitle: '球阀打样阀体 — 316L，阀座孔 Ra 0.8',
      exampleIntro: '一单典型的流道零件，展示密封面与文档流转。',
      exampleSpecs: [
        '零件：球阀打样阀体',
        '材料：316L 不锈钢',
        '工艺：车铣复合，阀座孔单独精加工',
        '关键公差：阀座孔 ±0.01 mm',
        '密封面：Ra 0.8',
        '文档：材质证书随附；关键尺寸报告按需',
      ],
      qaHeading: '能源行业质检要点',
      qaItems: [
        { label: '密封面粗糙度', desc: '密封与阀座面按规范精加工至 Ra 0.8；关键面可按需提供粗糙仪读数。' },
        { label: '垫圈面平面度', desc: '法兰垫圈面磨削平整，面粗糙度按图纸标注执行。' },
        { label: '材质证书', desc: '316/316L、双相钢与碳钢常规订单随附炉号材质证书。' },
        { label: '维修件与小批', desc: '单件维修与小批量同样 2 小时报价；压力/泄漏试验按协议安排。' },
      ],
      faqHeading: '能源零件加工常见问题',
      faq: [
        { q: '能加工 2205 双相钢吗？', a: '能——双相钢泵壳与管件是常报业务，用专用刀具参数。' },
        { q: '密封面粗糙度能到多少？', a: '密封面标准做法 Ra 0.8；关键面可按需提供粗糙仪读数。' },
        { q: '单件维修件接吗？', a: '接——1 件起订，轴套、阀体、接头都按常规 2 小时报价。' },
        { q: '可以安排压力试验吗？', a: '压力或泄漏试验按协议安排，需要时写进报价单。' },
      ],
    },
  },

  'automation-equipment': {
    en: {
      eyebrow: 'Typical Parts & Tolerances',
      heading: 'What We Machine for Automation Equipment Teams',
      quickAnswer:
        'Conveyor and pick-and-place components, CNC fixtures and vision-alignment plates — 6061/7075 aluminum, 4140 steel, POM and UHMW-PE — ±0.005–0.025 mm, from single fixtures to consistent repeat lots.',
      partsHeading: 'Typical parts, materials and tolerances',
      parts: [
        { part: 'Conveyor sprockets & rollers', material: 'Steel 1045 / Stainless 304', tolerance: '±0.025 mm', note: 'Wear-resistant options per spec' },
        { part: 'Guide plates & wear strips', material: 'UHMW-PE / POM', tolerance: '±0.025 mm', note: 'Custom lengths, deburred edges' },
        { part: 'Vacuum grippers', material: 'Aluminum 6061-T6', tolerance: '±0.01 mm', note: 'Sealed channels leak-checked per agreement' },
        { part: 'Zero-point fixture plates', material: 'Steel 4140', tolerance: '±0.01 mm', note: 'Repeatable positioning for quick-change' },
        { part: 'Indexing table components', material: 'Steel / 6061-T6', tolerance: '±0.005 mm', note: 'Dowel patterns positioned from datums' },
        { part: 'Vision-guided alignment plates', material: 'Aluminum 7075-T6', tolerance: '±0.005 mm', note: 'Camera and actuator interfaces matched' },
      ],
      exampleHeading: 'Example job we quote regularly',
      exampleTitle: 'Quick-change end effector — 6061-T6, dowel pattern ±0.005 mm',
      exampleIntro: 'A representative high-speed tooling part showing positioning and repeatability flow.',
      exampleSpecs: [
        'Part: quick-change end effector base',
        'Material: aluminum 6061-T6',
        'Process: 3-axis milling + reaming',
        'Critical tolerance: dowel pattern ±0.005 mm',
        'Finish: clear anodize',
        'Lot size: 15 pcs, key-dimension report on request',
      ],
      qaHeading: 'Automation quality specifics',
      qaItems: [
        { label: 'Reorder consistency', desc: 'Fixtures and programs retained per part number so replacement wear parts match the originals.' },
        { label: 'Positioning discipline', desc: 'Dowel and zero-point patterns machined from datums; repeatability is the controlled characteristic.' },
        { label: 'Wear-material guidance', desc: 'UHMW-PE, POM and coated-steel options recommended per duty — DFM feedback covers material swaps.' },
        { label: 'Lightweight high-speed tooling', desc: 'Pocketed 6061/7075 designs for fast pick-and-place arms with stiffness retained at mounting interfaces.' },
      ],
      faqHeading: 'Automation equipment FAQ',
      faq: [
        { q: 'Do you machine UHMW-PE and POM wear parts?', a: 'Yes — wear strips, guide plates and custom-length conveyor components in UHMW-PE and POM are routine.' },
        { q: 'Will re-ordered spare parts match the first batch?', a: 'Yes — fixtures and programs are retained per part number; replacements land inside the original tolerance band.' },
        { q: 'What tolerance do dowel patterns hold?', a: '±0.005 mm positioned from drawing datums; gauge-pin verification on request.' },
        { q: 'MOQ for fixture components?', a: '1 piece — single fixtures through production lots of identical spares.' },
      ],
    },
    zh: {
      eyebrow: '典型零件与公差',
      heading: '我们为自动化设备行业加工什么',
      quickAnswer:
        '输送线与拾放模组零件、CNC 夹具与视觉对位板——6061/7075 铝、4140 钢、POM 与 UHMW-PE——公差 ±0.005–0.025 mm，从单套夹具到一致性返单批量。',
      partsHeading: '典型零件、材料与公差',
      parts: [
        { part: '输送链轮与辊件', material: '1045 钢 / 304 不锈钢', tolerance: '±0.025 mm', note: '耐磨方案按规范选择' },
        { part: '导板与耐磨条', material: 'UHMW-PE / POM', tolerance: '±0.025 mm', note: '定制长度，边缘去毛刺' },
        { part: '真空吸盘工装', material: '6061-T6 铝', tolerance: '±0.01 mm', note: '气路密封按协议检漏' },
        { part: '零点夹具板', material: '4140 钢', tolerance: '±0.01 mm', note: '快换定位重复性好' },
        { part: '分度台零件', material: '钢 / 6061-T6', tolerance: '±0.005 mm', note: '销位从基准定位' },
        { part: '视觉对位板', material: '7075-T6 铝', tolerance: '±0.005 mm', note: '相机与执行器接口匹配' },
      ],
      exampleHeading: '常报价的代表性订单',
      exampleTitle: '快换末端执行器 — 6061-T6，销位 ±0.005 mm',
      exampleIntro: '一单典型的高速工装件，展示定位与重复性控制。',
      exampleSpecs: [
        '零件：快换末端执行器基座',
        '材料：6061-T6 铝合金',
        '工艺：三轴铣削 + 铰孔',
        '关键公差：销位网格 ±0.005 mm',
        '表面处理：本色阳极氧化',
        '批量：15 件，关键尺寸报告按需',
      ],
      qaHeading: '自动化行业质检要点',
      qaItems: [
        { label: '返单一致性', desc: '每个件号保留夹具与程序，补制的耐磨件与原件一致。' },
        { label: '定位纪律', desc: '销位与零点网格从图纸基准加工，重复性是受控特性。' },
        { label: '耐磨材料建议', desc: '按工况推荐 UHMW-PE、POM 与涂层钢方案，DFM 反馈覆盖材料替换。' },
        { label: '轻量化高速工装', desc: '6061/7075 掏腔设计适配高速拾放臂，安装接口刚性保留。' },
      ],
      faqHeading: '自动化零件加工常见问题',
      faq: [
        { q: '能加工 UHMW-PE 和 POM 耐磨件吗？', a: '能——耐磨条、导板与定制长度输送件是常规业务。' },
        { q: '补件和首批能一致吗？', a: '能——件号保留夹具与程序，补件落在原公差带内。' },
        { q: '销位公差能到多少？', a: '从图纸基准定位 ±0.005 mm，按需塞规验证。' },
        { q: '夹具类起订量？', a: '1 件起——单套夹具到批量同款备件都接。' },
      ],
    },
  },
};
