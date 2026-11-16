---
title: "全检也检不出来：那些只能靠过程保证的质量"
description: "有一类质量，全检也检不出来，标准里叫特殊过程。ISO 9001 从 2000 版起就要求确认这类过程，2026 版仍保留。该问供应商的是过程怎么确认。"
pubDate: 2026-11-16
category: "加工技巧"
tags: ["特殊过程", "过程确认", "ISO 9001", "质量体系", "检验与验收", "表面处理"]
system: "通用"
author: "鑫永恒工程团队"
readingTime: "9 分钟"
---

你加钱要求全检，供应商答应了。尺寸报告一页不缺，每个数都落在公差带里。

可有几样东西，检一百遍也检不出来。

不是检得不认真。是这类结果的合格与否，事后没法经济地验证。检验台上没有那一栏。

## 一 · 一条分界线，把质量分成两半

先把能测的摆清楚。尺寸、膜厚、外观、螺纹通止，做完能量，能量具判定，报告能写数字。加大检验比例确实有用，站上[检验与验收](/zh/knowledge/tech-blog/inspection-and-acceptance/)那篇讲的就是这一半。

另一半长这样：

- 焊接的熔深、接头强度和热影响区组织
- 热处理后的内部组织、韧性与强度
- 膜层的结合力、耐蚀性、封孔质量
- 胶接强度、复合材料成型后的内部质量

它们的共同点不是“难做”。是**要么得把件切开，要么得等上很久，要么只能在试片上做，没法逐件验**。切开了，这件也就没了。

所以这条分界线只有一句话：**结果能不能由后续的监视或测量加以验证**。能，交给检验；不能，只能交给过程。

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 316" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="质量特性按结果能否事后验证分成两半：左边靠检验放行，右边靠过程确认与定期再确认" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">同一张图纸，两种保证方式</text>
<rect x="16" y="46" width="236" height="248" rx="9" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<rect x="268" y="46" width="236" height="248" rx="9" style="fill:#FAEEDA;stroke:#EF9F27;stroke-width:1"/>
<text x="134" y="78" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" font-weight="700" style="fill:#0C447C">事后能验</text>
<text x="386" y="78" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="18" font-weight="700" style="fill:#633806">事后验不了</text>
<text x="134" y="112" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">尺寸 · 膜厚 · 外观</text>
<text x="386" y="112" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">结合力 · 组织 · 耐蚀</text>
<path d="M134 128 L134 152 M128 146 L134 152 L140 146" style="fill:none;stroke:#85B7EB;stroke-width:2"/>
<path d="M386 128 L386 152 M380 146 L386 152 L392 146" style="fill:none;stroke:#EF9F27;stroke-width:2"/>
<text x="134" y="182" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">量 → 判合格</text>
<text x="386" y="182" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">定参数 → 试片</text>
<text x="134" y="216" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">全检有用</text>
<text x="386" y="216" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" font-weight="700" style="fill:#633806">定期再确认</text>
<text x="134" y="258" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">检验管结果</text>
<text x="386" y="258" text-anchor="middle" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="17" style="fill:#2C2C2A">确认管过程</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">图 1 · 分界线只有一条：结果能不能事后验证。左边交给检验，右边只能交给过程确认</figcaption>
</figure>

## 二 · 标准里早写好了，只是路标换过两次

ISO 9001 里有一句话，四版都在。**8.5.1 f)** 管的是这样一件事。输出结果若不能由后续的监视或测量加以验证，就得确认这个过程实现策划结果的能力。而且不是确认一次就完，还要定期再确认。

它的位置变过两回：

| 版本 | 落在哪 | 长什么样 |
|---|---|---|
| 2000 / 2008 | **7.5.2** | 独立条款，标题就写着过程确认 |
| 2015 | **8.5.1 f)** | 并进八个受控条件，成了一个字母项 |
| 2026 | **8.5.1** | 要求保留，条款结构未变 |

要求一步没挪，路标换了两次。所以不少厂的质量手册还留着 7.5.2 那一节，对着新版条款号反而找不到自己写过的东西。

给它起名字的是 **GB/T 19000-2016**（等同采用 ISO 9000:2015）。3.4.1 的注 5 说：不易或不能经济地确认其输出是否合格的过程，通常称之为“特殊过程”。

注意定义里的判据只有一个：**验不验得出来**。跟这道工序难不难、贵不贵、要不要老师傅，都没关系。

## 三 · 换版正在发生，别拿版本号当判据

这一节容易被误读，先说清楚：证书上写着旧版，不等于过期。

- ISO 9001:2026 于 **2026-09-16** 发布，ISO 官方同日发新闻稿。
- 2015 版随之退出，但已认证组织有 **3 年过渡期**。ISO 官方明确说不必赶，按认证机构的节奏安排转换即可。
- 现行国标 **GB/T 19001-2016** 等同采用的是 2015 版。截至 2026-11-11 在国家标准信息公共服务平台检索，它仍标为现行，2023 年底的复审结论是继续有效。

于是同一时间会出现三种写法：质量手册里的 7.5.2、证书上的 2015、审核依据里的 2026。看着乱，其实是同一件事的三个路标。

对采购和工程师只有一句有用：**别拿版本号判断供应商，问那条要求怎么落地**。这条要求四版都有，谁也绕不过去。

## 四 · 在 CNC 件上，哪几样最容易落在线外

机械加工里常落在这一边的，公开资料反复举的是这几类：

- **焊接、钎焊** —— 强度与熔深不能逐件验，靠工艺评定、人员资格和参数记录。
- **热处理** —— 组织、硬度、强度常要切开或取样，靠炉温、保温时间、随炉试棒。
- **阳极氧化、化学转化膜、钝化、电镀、涂装** —— 膜厚能测，结合力与耐蚀通常只在试片上定期做，不是逐件。
- **胶接、复合材料成型** —— 强度靠破坏性试片。

膜厚这件事最容易混。它是**能测的那一半**，所以图纸上该写清楚尺寸标在处理前还是处理后。站上[镀前还是镀后](/zh/knowledge/tech-blog/before-or-after-finishing/)和[机器人零件阳极氧化尺寸控制](/zh/knowledge/tech-blog/robotics-anodizing-dimension-control/)算过这笔账。结合力测不了每一件，这两件事别搅在一起。

反过来提醒一句：清洁度常被顺手划到这一类，其实它站在**能验的那一边**。难的是把验证方法写清楚，不是验不了。[医疗零件加工](/zh/knowledge/tech-blog/medical-parts-machining/)那篇讲的就是这个。划错边，会把本该做的检测也省掉。

## 五 · 那该问供应商哪几句

问“检了没”，只能覆盖一半。另一半要换个问法。四句话可以直接抄进询价邮件：

- 这张图上，哪几道工序的结果事后验不了？先要清单，别接受“我们都检”。
- 这几道的过程参数是谁定的、依据什么？要的是工艺评定或试片记录，不是手感。
- 什么情况下重新确认？换料、换槽液、换外协、设备大修、参数漂移，都该算。
- 随箱能给我什么记录？试片报告、炉批、参数曲线，别接受“证书邮件后补”。

第三句最常被跳过。**过程确认不是一次性的合格证，条件变了就得再做一遍。**

## 六 · 打样厂为什么更该早问

件少，破坏性试片摊到每一件上就特别贵；外协那一站排期又长。于是很容易冒出一句“这批先算了”。

可特殊过程出问题的形状，和尺寸超差完全不同。尺寸超差是一件或几件；过程没确认住，是**这一批的可信度整体没了**——错的是过程，不是某一件。

站上[交期为什么会滑](/zh/knowledge/tech-blog/why-lead-times-slip/)把质量体系那一节的缺口写成一行：缺过程控制，只剩终检。它最后不是炸在检验报告上，是炸在退货、返工和重新排产上。

## 常见问题

**全检是不是就没用了？**
不是。能测的那一半，加大检验比例仍然值。问题是它覆盖不了另一半，别把全检当成全部答案。

**供应商有 ISO 9001 证书，是不是就说明这些做了？**
证书说明体系里有这条要求，不说明这几道确认到位。要看的是记录：工艺评定、试片报告、再确认的触发条件。

**特殊过程是不是就是难做的工序？**
不是。判据只有“输出能不能事后经济地验证”。一道很简单的工序也可能落在这边，一道很难的工序未必。

## 主要参考

- ISO 官方新闻稿，2026-09-16，ISO 9001:2026 发布公告（新版发布日与修订范围）——iso.org/news/2026/09/ISO9001-2026
- ISO 官方《ISO 9001:2026: What businesses need to know》FAQ（2015 版被取代、3 年过渡期、Harmonized Structure 条款结构保留）——iso.org/quality-management/iso-9001-2026
- 全国标准信息公共服务平台：GB/T 19001-2016《质量管理体系　要求》详情页（现行，等同采用 ISO 9001:2015，2023-12-28 复审结论“继续有效”）；GB/T 19000-2016《质量管理体系　基础和术语》检索结果（现行，采标）——std.samr.gov.cn / openstd.samr.gov.cn，2026-11-11 查阅
- GB/T 19000-2016（等同采用 ISO 9000:2015）3.4.1 过程条目注 5，特殊过程术语中译——中国标准化研究院公开 PDF；ISO 9001 8.5.1 f 条款沿革及表面处理试片、AS9100 8.5.1.2 举例见公开条款解读与技术资料（Quality Magazine、Dataplate、文思特，2026-11-11 查阅，均非标准原文影印）

## 我们在这件事上站在哪

能帮上的地方很具体：

- 报价前把哪些工序会落在“验不了”那一边先标出来，跟你对齐。
- 外协的表面处理和热处理要带回哪些记录，先说清楚，不等出货再补。
- 随箱文件按[检验与验收](/zh/knowledge/tech-blog/inspection-and-acceptance/)里的口径一次给齐。

如果你的件卡在镀后结合力、热处理硬度，或者供应商说不清过程怎么确认，把图纸发来——先把这条分界线画清楚。

[免费 DFM 审查和报价](/zh/contact/get-a-quote/)
