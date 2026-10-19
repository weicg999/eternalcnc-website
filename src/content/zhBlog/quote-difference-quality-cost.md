---
title: "同一款零件，报价为什么能差出一截"
description: "8000 件订单，逐箱全检才拦下 140 个过不了通规的件。低价报价没有把检验成本变没，只是把它转移到了客户的产线上。"
category: 加工技巧
pubDate: 2026-10-19
author: 鑫永恒工程团队
readingTime: "9 分钟"
---

## 一、半个月报了几百款，我们看出一个规律

最近这两周，工程团队报了不少价——大大小小加起来，几百款产品。

报得多了，一个规律慢慢浮出来：**合作过的客户，报价过去往往很快就成交；不少新客户，会更倾向于选择那份更低的报价。**

这太能理解了。新客户没见过你、没跟你共过事，面对几份报价单，唯一能直观比较的就是数字。选低的，是理性选择——换作我们站在对面，也会这么看。

但作为一个在车间里泡了多年的人，我们更想聊那个藏在数字背后的问题：

**同样一个产品，报价为什么能差出一截？中间差的，到底是什么？**

今天不写理论，就写一件这两天真实发生的事。答案都在里面。

## 二、先说一件这两天真实发生的事

前段时间接了一批订单，8000 件。赶上我们调整产能，其中一部分交给了家族体系里的一家合作伙伴来加工。

这里得先说句公道话：**这家合作伙伴，水平是真不差。** 常年接国际客户的单子，编程能力强，设备也是好设备，员工素质很高。把这批货的问题归咎于他们，不客观——换成任何一家“只靠信任、不靠检验”的厂，都可能出同样的问题。

货到之后，我们照例开箱检验。500 件货分两箱：**一箱逐件检过，没有问题；另一箱里，140 个通规过不了。**

通规，是通止规（Go / No-Go Gauge）的“通端”——一根按公差边界做死的标准量具。合格的零件，必须过得去通端、过不了止端。连通端都过不去，说明这件零件的尺寸已经掉出了公差带。这是机加工现场最基础、也最不会说谎的一道检验。

按两箱均分估算，那一箱的不良率超过五成。

但真正让我们警觉的，不是这个比例，而是**不良的分布方式**：它不是两箱均匀地摊着坏，而是一整箱成片地坏。

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 462" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="同一批 500 件分两箱：A 箱 250 件全部通过通规；B 箱 140 件通规过不了，且不合格品连成一片" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="135" y="34" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="14" font-weight="700" style="fill:#111827;">A 箱 · 250 件</text>
<text x="545" y="34" text-anchor="end" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12" style="fill:#6B7280;">逐件过通规 · 0 件不良</text>
<rect x="135.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="48.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="64.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="81.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="97.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="114.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="130.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="147.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="163.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="180.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="135.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="333.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="349.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="366.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="382.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="399.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="415.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="432.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="448.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="465.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="481.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="498.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="514.5" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="531.0" y="196.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<text x="135" y="240" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="14" font-weight="700" style="fill:#111827;">B 箱 · 250 件</text>
<text x="545" y="240" text-anchor="end" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="12" font-weight="700" style="fill:#8B0000;">140 件通规过不了 · 56%</text>
<rect x="135.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="254.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="270.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="287.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="303.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="320.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="336.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="353.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="369.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="386.0" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="151.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="168.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="184.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="201.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="217.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="234.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="250.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="267.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="283.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="300.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#E5E7EB;"/>
<rect x="316.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="333.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="349.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="366.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="382.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="399.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="415.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="432.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="448.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="465.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="481.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="498.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="514.5" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="531.0" y="402.5" width="14" height="14" rx="2.5" style="fill:#8B0000;"/>
<rect x="135" y="432" width="12" height="12" rx="2.5" style="fill:#E5E7EB;"/>
<text x="155" y="442" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#6B7280;">通过通规</text>
<rect x="265" y="432" width="12" height="12" rx="2.5" style="fill:#8B0000;"/>
<text x="285" y="442" font-family="system-ui, 'Microsoft YaHei', sans-serif" font-size="11" style="fill:#6B7280;">通规过不了</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">图 1 · 500 件分两箱，一箱全良，一箱 140 件通规不过——坏的那一批是连着的</figcaption>
</figure>

一箱全良，一箱过半不良——这种形态，极有可能说明那一箱货基本出自同一台机床：一把刀磨损到极限、一个夹具松动、一个班次的参数偏差，都足以让某台机器在一段时间里持续吐出不合格品。

这个细节比“整批不良”更值得说，因为它说明两件事：

1. **质量风险从来不是平均分配的**，它按设备、按班次、按刀具批次成片出现；
2. **不逐件全检，就可能连“有问题”都发现不了**——一箱良的和一箱不良的混在一起做抽检，抽到哪一箱全凭运气，更别说把它拦住。

现在换个角度想：如果那一箱没有逐件检，而是抽检，或者干脆没检，直接出给客户，会怎样？

客户的仓库收货、产线上料、组装，等发现问题的时候，可能已经是几百个超差零件混在良品里发出去了。接下来是产线停摆、挑选返工、来回退换、交期违约。

这些损失，哪一项是省下的那点加工费能覆盖的？**便宜买进来的货，最后变成了客户手里最贵的一笔账。**

## 三、这笔账，其实可以算得很清楚

把这个案例的账摊开算：

| 这笔账怎么算 | 全检拦住（我们的选择） | 没检直接出货 |
|---|---|---|
| 加工费 | 高一些（含检验成本） | 低一截 |
| 到达客户的不良品 | 0 件 | 未知数量 |
| 客户产线风险 | 无 | 停摆 + 返工 + 退换 |
| 信任 | 建立 | 消耗 |

一张报价单上，你能看到的只有“加工费”这一行。看不到的那些——首件检验、过程巡检、出货全检、量具投入、不良返工——每一项都是真金白银的成本。

**低价报价不是把这些成本变没了，而是把它们转移了**：转移到客户的产线上、客户的时间精力里、客户的信誉里。

报价差异的本质，是“谁为质量兜底”的差异。

## 四、报价的差价，差在你看不见的几个环节

具体说，一份负责任的报价里，至少包含这几样东西：

1. **首件检验**——量产前第一件全尺寸确认，从源头拦住系统性偏差；
2. **过程巡检**——按频次抽测，捕捉刀具磨损的曲线，而不是一检到底；
3. **出货全检**——像这次一样，按箱逐件过，通规、关键尺寸，一件不落；
4. **量具与设备投入**——通止规、千分尺、各类量具的购置和定期校准，都是钱。这一项没有终点，我们自己也还在补强：自有车间里没有常驻的三坐标，需要出 CMM 数据的件，按需送集团共享计量中心排期测量。承认自己还缺什么不丢人，装作不缺才丢人；
5. **不良处理成本**——挑出来的不良品，返工或报废，都是损失。

这些环节，报价单上一样都看不见。但货到了客户手里，手感是不一样的。

客户最终买到的不是“价格”，是**确定性**——这批货我能不能直接上产线。这个确定性，才是报价差异背后真正在卖的东西。

说到这儿得补一句：九月我们写过一篇[《交期为什么值钱》](/zh/knowledge/tech-blog/lead-time-and-price/)，讲的是报价单上另一栏看不见的成本——“我要不要操心进度”。这一篇讲的是同一张单子上的另一项：“我要不要操心质量”。两件事不一样，但算的是同一笔账：**真正便宜的，从来不是报价最低的那家，是总成本最低的那家。** 想知道收货该量哪几个尺寸，可以接着看[《检验与验收》](/zh/knowledge/tech-blog/inspection-and-acceptance/)。

## 五、我们的原则：宁可自己花钱，不把麻烦留给客户

这批 8000 件的货，我们最终的选择是：**按箱逐件全检，通规不过的一件不留。**

挑出来的不良品，能返工的返工，不能返工的报废，损失我们自己认。多花了人工和时间，我们认。

说句心里话，这不是什么高尚，这是做生意本来该做的事。客户把订单交给你，是把自己的身家和信誉押上了一部分。你对得起这份信任的唯一方式，就是：**别让问题流到你够不着的地方。**

我们内部有句很朴素的话：**不良品，必须扼杀在出货前。** 出货之前，它是我们的成本；出货之后，它是客户的灾难，也是合作关系的裂缝。

## 六、为什么合作过的客户会回头

回到开头那个规律。

老客户报价过去成交快，不是因为我们便宜——很多时候，我们的报价并不低。是因为他们算得清这笔账：在我们这儿买的，不只是零件，是“不用为售后操心”的确定性。一批货到了直接上产线，不用挑、不用担心、不用花时间跟厂家扯皮。对他们来说，省下来的时间和精力，比那点差价贵得多。

所以我们相信一件事：**信任不是省出来的，是一次一次“不出事”攒出来的。** 相互信任，相互成就，合作才能长久。

这也是我们最不愿意看到的事——客户拿到货，还要为售后问题劳碌奔波。真不愿意。

如果你正在几份报价之间犹豫，希望这篇文章能帮你多一个判断的角度。欢迎带着图纸来找我们聊——**我们不承诺最低价，但我们承诺：交到你手里的每一件货，都经过了该过的检验。**

## 给你的一句话

**报价单上省下来的每一分钱，最后都要有一个人替它承担风险。区别只在于——是你，还是把货交给你的人。**

## 关于鑫永恒

我们做精密结构件二十三年，三十台 CNC 里含真正的五轴，常接的是机器人关节模组壳体、减速器行星架、末端执行器基座这类“差一点就不行”的件。

我们不敢说自己把每个环节都做到了满分——自有车间没有常驻三坐标，要用 CMM 数据的件，按需送集团共享计量中心。这些我们写在明面上。

如果你手上的件输不起一次退货，把图纸发来，我们先把该检的地方跟你对一遍。

[免费 DFM 审查和报价](/zh/contact/get-a-quote/)
