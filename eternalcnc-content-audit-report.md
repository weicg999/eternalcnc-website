# Eternal CNC 英文官网文案审核报告

> 审核依据：`eternalcnc-rules.md`（铁律，优先级高于模型既有知识）
> 审核范围：Capabilities / Quality Standards / Materials / Inspection 板块可见英文文案
> 状态：**报告初版未改源文件**；用户已于 18:30 手动合规化 `quality-inspection.astro`（SPC/GD&T 报告降级为 on request，盯点2 最严重的源头已落地）。其余违规项待明天验收后执行。
> 生成日期：2026-08-23

---

## 一、问题清单（按铁律分类）

### 表 1｜归属误导（CMM 措辞）—— 最高优先级

| 原句 (Original) | 问题类型 | 风险说明 | 修改后英文 (Optimized) | 是否需人工确认 | 位置 |
|---|---|---|---|---|---|
| "...operated by an affiliated family-group company..." (通篇多句) | 归属误导 | 铁律指定统一表述为 "group's shared metrology center"，"affiliated family-group company" 属违规措辞 | "operated as our group's shared metrology center..." | 否 | equipment/hexagon-inspector-classic.astro (行5,13,46,47,202,218) |
| "via our affiliated family-group inspection center" | 归属误导 | 同上 | "via our group's shared metrology center, on request" | 否 | services/quality-inspection.astro (行46,57) |
| "sent to an affiliated family-group company's Hexagon CMM" | 归属误导 | 同上 | "sent to our group's shared metrology center (Hexagon CMM) on request" | 否 | equipment/taikan-tv1270s.astro (行47,135-136) |
| "affiliated family-group company's Hexagon INSPECTOR CLASSIC CMM" | 归属误导 | 同上 | "our group's shared metrology center (Hexagon INSPECTOR CLASSIC CMM)" | 否 | equipment/sunrise-dmu400-5axis.astro (行172) |
| "coordinate measurement arranged at an affiliated family-group inspection center on request" | 归属误导 | 同上 | "arranged at our group's shared metrology center on request" | 否 | capabilities/size-range/index.astro (行40) |
| "CMM-verified via affiliated inspection center angular measurement" | 归属误导 | 措辞不统一 + 机翻腔 | "Angular features CMM-verified at our group's shared metrology center on request" | 否 | capabilities/tolerance/index.astro (行18) |
| "CMM verification (via affiliated group)" / "via affiliated group on request" | 归属误导 | 措辞不统一（affiliated group 非铁律指定词） | "CMM verification (group's shared metrology center)" | 否 | capabilities/tolerance/index.astro (行37,57); capabilities/size-range/index.astro (行31); cases/5-axis/index.astro (行37) |
| "CMM-verified via affiliated inspection center" (标题含残留 "Quality" 笔误) | 归属误导 + 术语错误 | 标题 "CMM-verified via affiliated inspection center Quality" 中 "Quality" 是残留笔误 | 标题改 "CMM Verification via Group Metrology Center"；正文改 "at our group's shared metrology center" | 否 | equipment/taikan-tv1270s.astro (行135-136) |
| "key dimensions verified on our Hexagon Optiv 2.5D CMM" / "cross-checked on Hexagon Optiv CMM" | 术语错误 | 厂内自有仅 2.5D 影像仪，**不是桥式 CMM**，称 "our ... CMM" 混淆设备且暗示厂内自有 CMM | "verified on our in-house 2.5D vision measuring system; full CMM arranged at our group's shared metrology center on request" | 是（确认厂内设备确为 2.5D 影像仪） | equipment/taikan-t700se.astro (行47,131) |

### 表 2｜虚假/过度承诺（报告与精度）

| 原句 (Original) | 问题类型 | 风险说明 | 修改后英文 (Optimized) | 是否需人工确认 | 位置 |
|---|---|---|---|---|---|
| "Full dimensional reports with color maps, SPC data, and GD&T analysis provided with every order." | 过度承诺 | 铁律2 明确禁止每单全 SPC/GD&T 报告 | "First-article and key-dimension reports with color maps and GD&T analysis available on request; SPC data provided per agreement for critical runs." | 否 | services/quality-inspection.astro (行38) |
| "inspection reports shipped with every order" (两处) | 过度承诺 | 同上 | "inspection reports available on request" | 否 | capabilities/index.astro (行44); components/CapabilitiesSection.astro (行33) |
| "Every order ships with a dimensional inspection report. Key characteristics measured and documented." | 过度承诺 | 同上 | "First-article and key-dimension reports available on request; critical characteristics measured and documented." | 否 | capabilities/tolerance/index.astro (行39) |
| "Full SPC process control with inspection reports shipped with every order." | 过度承诺 | 同上 + 暗示每单全 SPC | "SPC and inspection reports available on request for key characteristics." | 是（ISO 9001 进度确认） | capabilities/index.astro (行44) |
| "±0.001mm" (CMM Measurement 精度字段) | 虚假/精度夸大 | 铁律1 指定对外口径 ±0.002 mm，与 ±0.001 冲突 | "±0.002 mm (group's shared metrology center, on request)" | 是（与计量中心确认实际口径） | services/quality-inspection.astro (行13) |
| "Zero cumulative error achieved" / "Single-setup, zero cumulative error" (两处) | 过度承诺 | 铁律5 禁止绝对化表述 | "Single-setup 5-face machining minimizes cumulative error." | 否 | cases/5-axis/index.astro (行30,46,57) |
| "Every dimension verified." | 过度承诺 | 暗示每单全检全报告 | "key dimensions verified and reported on request" | 否 | cases/5-axis/index.astro (行39) |
| "100% inspection for aerospace parts..." | 过度承诺 | 除非确属航天件且确有流程，否则无依据承诺 | "For qualified aerospace-spec parts, 100% inspection of critical dimensions ... (on request)." | 是（确认是否真实承接航天件） | cases/5-axis/index.astro (行40) |
| "engineered for ... precision aerospace components" / "ideal for ... aerospace structural parts" | 过度承诺 | 若无航空资质属无依据宣传 | 删除 aerospace，改为 "precision components" | 是（确认是否具备航空件能力） | equipment/sunrise-dmu400-5axis.astro (行14,42) |
| "fewer fixtures, tighter tolerances, shorter lead time" | 过度承诺 | 五轴单夹主要减少累计误差，非必然更紧公差 | "fewer fixtures, reduced cumulative error, shorter lead time" | 否 | equipment/sunrise-dmu400-5axis.astro (行165) |
| "Every critical feature gets a signed-off PC-DMIS report - no guesswork" | 过度承诺 | 与报告 on request 冲突 | "Critical features can get a signed-off PC-DMIS report on request" | 否 | equipment/hexagon-inspector-classic.astro (行129) |

### 表 3｜标准写法不规范（ISO 2768 / AQL / 公差符号）

| 原句 (Original) | 问题类型 | 风险说明 | 修改后英文 (Optimized) | 是否需人工确认 | 位置 |
|---|---|---|---|---|---|
| "per AQL standards" (两处) | 标准写法 | AQL 必须带数值 | "per AQL 2.5 sampling standards" | 否 | capabilities/tolerance/index.astro (行37); capabilities/index.astro (行37) |
| "Standard inspection per ISO 2859-1 (AQL)" | 标准写法 | AQL 缺数值 | "per ISO 2859-1 (AQL 2.5)" | 否 | services/quality-inspection.astro (行39) |
| "compliant with ISO 2768 and AQL standards" | 标准写法 | ISO 2768 缺等级；AQL 缺数值 | "compliant with ISO 2768-m and AQL 2.5 sampling standards" | 否 | services/cnc-machining.astro (行50) |
| "compliant with AQL standards" (多处) | 标准写法 | AQL 缺数值 | "compliant with AQL 2.5 standards" | 否 | industries/automotive (行37); industries/automation-equipment (行37); industries/robotics |
| "ISO 2768-f/m ..." (多处双等级混写) | 标准写法 | 双等级混写易让客户困惑默认走哪一级 | 统一为 "ISO 2768-m (fine)" | 是（确认默认等级 m 还是 f） | cases/5-axis (行39); cases/turning (行39); cases/cnc (行39) |
| "+-0.005 mm" / "+-0.008 mm / 300 mm" | 标准写法 | 公差符号应为 ± 而非 +- | "±0.005 mm" / "±0.008 mm / 300 mm" | 否 | equipment/taikan-t700se.astro (行17,27,72,92) |

### 表 4｜材料术语（2011 / 6061-7075 状态）

| 原句 (Original) | 问题类型 | 风险说明 | 修改后英文 (Optimized) | 是否需人工确认 | 位置 |
|---|---|---|---|---|---|
| "2011 — free-machining" | 材料术语 | 缺状态 T3，未写完整术语 | "2011-T3 — free-machining (screw machine stock)" | 否 | services/material-selection/index.astro (行15) |
| "Aluminum 2011" (三处) | 材料术语 | 缺 T3 状态 | "Aluminum 2011-T3 (free-machining / screw machine stock)" | 否 | services/cnc-turning.astro (行14,26); services/cnc-machining.astro (行32) |
| "Aluminum 6061 / 7075" (标题) | 材料术语 | 6061/7075 必须带状态 | "Aluminum 6061-T6 / 7075-T6" | 否 | capabilities/materials/index.astro (行11) |
| "e.g. 6061-T6, 7075, 304 SS..." (占位提示) | 材料术语 | 7075 未带 T6 | "e.g. 6061-T6, 7075-T6, 304 SS..." | 否 | components/QuoteForm.astro (行37) |
| "<span>7075</span>" (快选 chip) | 材料术语 | 7075 未带 T6 | "<span>7075-T6</span>" (value 同步) | 否 | components/QuoteForm.astro (行213) |

> 注：全站 C360 的 "free-cutting brass" 是黄铜惯用描述，不违规；全站**未出现** "free processing / 自由加工" 误用。

### 表 5｜中文思维直译 / 弱化表述

| 原句 (Original) | 问题类型 | 风险说明 | 修改后英文 (Optimized) | 是否需人工确认 | 位置 |
|---|---|---|---|---|---|
| "First-Piece Sample" | 弱化表述 | 试样应为 FAI/prototype | "First-Article (FAI) Part" | 否 | cases/prototype/index.astro (行11) |
| "Multi-part sample kits" | 弱化表述 | sample 弱化交付物 | "Multi-part trial-run kits" | 是（档位名 "Standard Samples" 可保留） | capabilities/lead-time/index.astro (行18) |
| "standard samples in 7 days" (meta) | 弱化表述 | meta 弱化交付物 | "standard trial-run parts in 7 days" | 否 | capabilities/lead-time/index.astro (行46) |
| "inspection report samples" | 弱化表述 | samples 指报告样例，建议区分 | "inspection report templates" | 否 | knowledge/quality/index.astro (行126) |

### 表 6｜合规（GA4 / 隐私政策）

| 原句 (Original) | 问题类型 | 风险说明 | 修改后英文 (Optimized) | 是否需人工确认 | 位置 |
|---|---|---|---|---|---|
| `GA4_ID = 'G-XXXXXXXXXX'` | 合规 | GA4 ID 仍为占位符，上线前必须替换，否则流量无法统计 | 替换为真实 ID（如 G-ABC123XYZ） | 是（运营提供） | components/CookieConsent.astro (行8,28) |
| （表单页无 Privacy Policy 链接） | 合规 | 表单收集违反 GDPR/PIPL 告知义务，需有隐私政策指向 | 表单底部加：`By submitting, you agree to our <a href="/privacy-policy">Privacy Policy</a>.` | 是（位置/措辞） | pages/contact/get-a-quote.astro; components/QuoteForm.astro |
| "analytics cookies are loaded only with your consent" | 合规 ✓ | 文案已说清 consent 后加载，合规；建议补 "Google Analytics 4 loads only after you accept" 与隐私政策一致 | 保持/微调 | 否 | components/CookieConsent.astro (行16) |

---

## 二、整体风格一致性建议（5 条）

1. **CMM 归因全局统一为 "our group's shared metrology center"**：全站存在 "affiliated family-group company / affiliated inspection center / affiliated group" 三种变体，必须在执行时一次性替换为铁律指定表述，避免口径不一被识破。
2. **报告承诺统一降级为 "available on request"**：凡 "shipped/provided with every order / every dimension verified" 一律改为 on request；SPC/GD&T 全报告仅按协议提供，不默认承诺。
3. **标准写法强制带参数**：ISO 2768 必带等级（建议统一默认 ISO 2768-m）、AQL 必带数值（AQL 2.5）、公差必用 ± 符号并带具体数字。
4. **精度口径统一**：对外 CMM 精度统一 "±0.002 mm on request"，厂内 2.5D 影像仪不称 CMM，避免 "our CMM" 与 "group's shared metrology center" 自相矛盾。
5. **去除绝对化表述**：删除 "zero cumulative error / 100% inspection / tighter tolerances / precision aerospace" 等无依据或需资质背书的绝对化用词，改用 "minimizes / on request / qualified" 等审慎表述。

---

## 三、执行前需人工确认清单（共 8 项）

1. ISO 9001 进度是否仍 "in progress (2026)" —— capabilities/index.astro
2. 桥式 CMM 对外精度口径是否确认 ±0.002 mm —— services/quality-inspection.astro
3. 是否真实承接航空航天件并确有 100% 关键尺寸流程 —— cases/5-axis/index.astro
4. 是否真实具备航空结构件加工与质检能力（否则删 aerospace）—— sunrise-dmu400-5axis.astro
5. 厂内设备是否确为 2.5D 影像仪（非桥式 CMM）—— taikan-t700se.astro
6. ISO 2768 默认等级 m 还是 f（统一双等级写法）—— cases/* 三处
7. GA4 真实 Measurement ID —— CookieConsent.astro
8. 表单页 Privacy Policy 链接位置/措辞 —— get-a-quote.astro / QuoteForm.astro
9. "Standard Samples" 档位名对外是否保留 —— lead-time/index.astro

---

## 四、中文页面同步排查（待办）

中文页面（src/pages/zh/**）存在与英文对应的同类问题：2011 缺 T3、6061/7075 缺状态、CMM 称 "关联检测中心/家族企业" 需统一为 "集团共享计量中心"、GA4 占位符、表单缺隐私政策链接等。建议明天验收英文整改时，同步按相同铁律过一遍中文页面。关键中文文件：zh/capabilities/*、zh/services/quality-inspection、zh/services/material-selection、zh/pages 下的表单与 CookieConsent 对应文案。

---

## 附录 A｜明天验收 · 三盯检查表（中文版）

> 在 WorkBuddy "变更" 标签页（Diff 视图）逐条过，**先别直接点执行**。

### 盯点 1：CMM 归属句
| ✅ 放行 | ❌ 打回 |
|---|---|
| our group's shared metrology center | in-house CMM / our own CMM |
| backed by our group's metrology resources | family-group company / affiliated inspection center |
| CMM-verified on request | family-group（任何变体）|

重点文件：`hexagon-inspector-classic.astro`（通篇 family-group company，全站最严重，逐行过）。

### 盯点 2：SPC/GD&T 报告承诺
| ✅ 放行 | ❌ 打回 |
|---|---|
| available on request | provided with every order |
| FAI reports on request | shipped with every order |
| upon customer request | every order includes |

重点文件：`quality-inspection.astro:38`、`capabilities/index.astro:44`、`CapabilitiesSection.astro:33`（首页组件，影响面最大）。

### 盯点 3：2011 材料写法
| ✅ 放行 | ❌ 打回 |
|---|---|
| 2011-T3 — free-machining | 2011 — free-machining（缺 T3）|
| 2011-T3 — free-machining (screw machine stock) | Aluminum 2011（缺 T3）|
| 2011-T3 出现在所有引用 2011 的地方 | 任何不带 T3 的 2011 |

重点文件：`material-selection/index.astro:15`、`cnc-turning.astro`、`cnc-machining.astro`。

### 其他问题验收标准（快速过）
| 问题 | 你要看到的修改结果 | 涉及文件 |
|---|---|---|
| AQL 缺数值 | 全部补上 AQL 2.5 | 全站搜 AQL |
| ISO 2768 双等级 | 统一为 ISO 2768-m（除非特定场景需 f）| 全站搜 ISO 2768 |
| taikan 设备误称 CMM | our Hexagon Optiv 2.5D CMM → 2.5D vision measuring system / 2.5D optical inspection system | taikan-t700se.astro |
| 精度夸大 ±0.001 | 改为 ±0.002 mm | 全站搜 ±0.001 |
| "zero cumulative error" | 删除或改为 minimized cumulative error | 全站搜 |
| "100% inspection"（无限定）| 改为 critical dimensions inspected / 100% visual inspection | 全站搜 |
| "precision aerospace" | 改为 high-precision machining 或具体公差描述 | 全站搜 |
| GA4_ID 占位 | 确认是否已替换为真实 ID（G-XXXXXXXXXX → 真实值）| 全局搜 G-XXXXXXXXXX |
| 表单缺 Privacy Policy 链接 | 表单底部应有 `<a href="/privacy-policy">Privacy Policy</a>` | 所有表单组件 |

### 执行步骤
1. 打开 WorkBuddy → 找到本次任务的 Plan → 先看"变更"标签页（Diff），不要直接点执行。
2. 按三盯表逐条过：CMM 搜 `CMM / metrology / family / affiliated / in-house`；SPC/GD&T 搜 `SPC / every order / shipped with`；2011 搜 `2011`。
3. 确认没问题 → 点执行 → 执行完再 diff 一遍（防 Plan 与实际执行不一致）。

### 兜底搜索（执行后全局确认无残留）
`family-group` `affiliated`（英文页违规变体）`in-house CMM` `our own CMM` `every order includes` `shipped with every order` `Aluminum 2011`（缺T3）`±0.001mm` `zero cumulative` `100% inspection`（无限定）`precision aerospace` `G-XXXXXXXXXX`

---

## 附录 B｜执行前基线计数（2026-08-23 实测）

> 明天执行完再跑同一组命令，对比是否清零。

| 关键词 | 当前命中数 | 处置 |
|---|---|---|
| `family-group` | 26 | 必须清零（集中在英文设备页）|
| `in-house CMM` / `our own CMM` | 0 | 已合规 ✓ |
| `every order includes` / `shipped with every order` | 3（现剩 2：CapabilitiesSection:33、capabilities/index:44；quality-inspection:38 已被用户18:30手动改，+ industries/index:57 的 `every order includes` 报告原漏列）| 必须清零 |
| `Aluminum 2011`（缺 T3）| 3 | 必须补 T3 → `Aluminum 2011-T3` |
| `grade: '2011'`（缺 T3）| 1 | 必须补 T3 → `2011-T3` |
| `±0.001` | 3 | 改 ±0.002（注意：实际 `+-0.001` 形式未现，但见下条）|
| `+-0.005` / `+-0.008`（符号错误）| 16（t700se 11 + t-v856s 7）| 改 `±0.005` / `±0.008`（**t-v856s 是报告漏列的页面，已补**）|
| `zero cumulative` | 3 | 改 minimized cumulative error |
| `100% inspection` | 4 | 其中 3 处已带 "available for critical" 限定（合规）；仅 `cases/5-axis:40`、`industries/aerospace:40` 的 "every shipment / for aerospace parts" 需改 |
| `precision aerospace` | 1 | 改 high-precision machining |
| `G-XXXXXXXXXX` | 2 | 上线前替换真实 ID |
| `affiliated`（含中文页）| 37 | 英文页违规变体改 `group's shared metrology center`；中文页"家族关联企业"建议同步统一但非硬阻断 |

### ⚠️ 指南修正提示（对你原指南的两处盲区）
1. **2011 搜 `2011 — free` 搜不到**：真实写法是 `Aluminum 2011`（cnc-turning/cnc-machining）与 `grade: '2011'`（material-selection，对象字段）。明天应搜 `Aluminum 2011` 和 `'2011'`。
2. **`+-` 符号残留比预期多**：除已报告的 `taikan-t700se.astro`，还有 **`taikan-t-v856s.astro`（7 处，中英各半）** 也用了 `+-0.005 mm`。该页未出现在原审核报告中，已补入验收表。
