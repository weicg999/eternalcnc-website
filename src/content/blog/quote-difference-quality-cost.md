---
title: "Same Part, Same Drawing — So Why Can Two Quotes Differ So Much?"
description: "An 8,000-piece order. Inspecting box by box caught 140 parts that would not pass the Go gauge. A cheap quote never removes inspection cost — it moves it."
category: "Machining Tips"
pubDate: 2026-10-19
system: "general"
tags: ["CNC machining", "quoting", "Go/No-Go gauge", "inspection", "quality cost", "full inspection", "supplier selection", "batch consistency"]
author: "Eternal CNC Engineering Team"
readingTime: "9 min read"
---

## 1. A few hundred quotes in two weeks, and one pattern

Our engineering team has quoted a lot of work in the past two weeks — a few hundred parts, large and small, all told.

Quote enough of them and a pattern surfaces: **customers we have worked with before tend to close quickly. Many new customers lean toward whichever quote is lower.**

That is entirely understandable. A new customer has never met you and never worked with you. Facing several quotes, the only thing they can compare directly is the number. Picking the low one is a rational choice — put us on the other side of the table and we would look at it the same way.

But having spent years on the shop floor, what we want to talk about is the question hiding behind the number:

**Why can two quotes for the same part differ by that much? What exactly is the difference made of?**

No theory today. Just something that happened in the last few days. The answer is in it.

## 2. Something that happened this week

We took an order a while back: 8,000 pieces. We were adjusting capacity at the time, so part of it went to a partner in our extended family network for machining.

Let us say this fairly first: **that partner is genuinely good.** They run work for international customers year-round, their programming is strong, their machines are good machines, and their people are capable. Blaming them for what happened would not be objective — in fact, any shop that runs on **trust instead of inspection** could have produced the same result.

When the goods arrived, we opened the boxes and inspected as usual. 500 pieces in two boxes: **one box checked piece by piece, no problems; in the other box, 140 pieces would not pass the Go gauge.**

The Go gauge is the "go" end of a Go/No-Go gauge — a fixed gauge cut to the tolerance boundary. A conforming part must pass the go end and must not pass the no-go end. If a part will not even pass the go end, its dimension has already fallen outside the tolerance band. It is the most basic check on a machining floor, and the one that lies least.

Splitting the 500 evenly, the reject rate in that box was over fifty percent.

What alarmed us was not the rate. It was **how the failures were distributed**: not spread evenly across both boxes, but concentrated in one box, in one contiguous block.

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 462" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="500 parts in two boxes: all 250 in Box A passed the Go gauge; 140 in Box B failed, and the failures form one solid block" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="135" y="34" font-family="'Segoe UI', system-ui, sans-serif" font-size="14" font-weight="700" style="fill:#111827;">Box A · 250 pcs</text>
<text x="545" y="34" text-anchor="end" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" style="fill:#6B7280;">Go gauge on every piece · 0 rejects</text>
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
<text x="135" y="240" font-family="'Segoe UI', system-ui, sans-serif" font-size="14" font-weight="700" style="fill:#111827;">Box B · 250 pcs</text>
<text x="545" y="240" text-anchor="end" font-family="'Segoe UI', system-ui, sans-serif" font-size="12" font-weight="700" style="fill:#8B0000;">140 rejected by the Go gauge · 56%</text>
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
<text x="155" y="442" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280;">Passed the Go gauge</text>
<rect x="265" y="432" width="12" height="12" rx="2.5" style="fill:#8B0000;"/>
<text x="285" y="442" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280;">Failed the Go gauge</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 1 · 500 parts in two boxes — one clean, one with 140 Go-gauge failures, clustered rather than scattered</figcaption>
</figure>

One box entirely good, one box more than half bad — that pattern very likely means the bad box came off a single machine: a tool worn to its limit, a fixture that worked loose, one shift running off-parameter. Any one of those is enough to make a machine keep producing nonconforming parts for a stretch of time.

That detail is worth more than "the batch was bad," because it says two things:

1. **Quality risk is never evenly distributed.** It shows up in blocks, by machine, by shift, by tool lot.
2. **Without piece-by-piece inspection you may not even discover the problem** — mix a good box with a bad box and sample them together, and whether you catch it comes down to which box you happened to draw from. Stopping it is out of the question.

Now turn it around. Suppose that box had been sampled instead of fully inspected — or not inspected at all — and shipped to the customer.

The customer receives it into the warehouse, feeds it onto the line, assembles it. By the time the problem surfaces, several hundred out-of-tolerance parts may already be mixed into good stock and sent onward. What follows is a stopped line, sorting and rework, returns and replacements, a missed delivery date.

Which of those losses does the machining cost you saved come anywhere near covering? **Cheap parts bought in become the most expensive line item the customer owns.**

## 3. The arithmetic is not hard

Lay the account out for this case:

| | Caught by full inspection (what we chose) | Shipped without inspection |
|---|---|---|
| Machining cost | Higher (inspection included) | Notably lower |
| Defects reaching the customer | 0 | Unknown quantity |
| Risk to the customer's line | None | Stoppage + rework + returns |
| Trust | Built | Spent |

On a quote, the only line you can see is "machining cost." The lines you cannot see — first-article inspection, in-process patrol checks, outgoing full inspection, gauge investment, rework of rejects — are all real, paid-for costs.

**A low quote does not delete those costs. It relocates them** — onto the customer's production line, into the customer's time and attention, into the customer's reputation.

The difference between quotes is, at bottom, a difference in **who carries the quality risk.**

## 4. Where the gap actually sits

Concretely, a quote that will hold up contains at least these:

1. **First-article inspection** — the first part confirmed on every dimension before the run starts, so a systematic offset is caught at the source.
2. **In-process patrol checks** — measured at a set frequency, which traces the tool-wear curve instead of checking once and hoping.
3. **Outgoing full inspection** — as in this case: every piece, box by box, Go gauge and critical dimensions, nothing skipped.
4. **Gauges and equipment** — Go/No-Go gauges, micrometers, the purchase and periodic calibration of every gauge. This line has no end point, and we are still adding to it ourselves: **our own shop does not have a resident CMM.** Parts that need CMM data go to our group's shared metrology center on request and are scheduled there. Admitting what you still lack is not shameful; pretending you lack nothing is.
5. **Cost of handling rejects** — the bad parts you sort out get reworked or scrapped either way, and either way it costs money.

None of this appears on the quote. But it changes how the goods feel in the customer's hands.

What the customer is really buying is not a price. It is **certainty** — whether this batch can go straight onto the line. That certainty is the actual product behind the price difference.

One note before moving on. In September we published [Why Lead Time Is Worth Paying For](/knowledge/tech-blog/lead-time-and-price/), about a different invisible line on the same quote — *"will I have to chase the schedule?"* This piece is about another one: *"will I have to worry about quality?"* Different items, same arithmetic: **the cheapest supplier is never the one with the lowest quote; it is the one with the lowest total cost.** If what you want is the receiving end — which dimensions to measure — read [Inspection and Acceptance](/knowledge/tech-blog/inspection-and-acceptance/).

## 5. Our rule: we would rather pay than hand you the problem

For this 8,000-piece order, what we chose was: **inspect every piece, box by box, and not let a single Go-gauge failure through.**

The rejects we pulled out were reworked where rework was possible and scrapped where it was not. We absorbed the loss. We spent extra labor and extra time. We absorbed that too.

Honestly, none of this is noble. It is what doing business is supposed to look like. A customer who places an order is putting part of their own standing and reputation on the line with you. The only way to be worthy of that trust is: **do not let the problem travel somewhere you cannot reach it.**

We have a very plain saying inside the company: **defects must be killed before they ship.** Before the goods leave, a defect is our cost. After they leave, it is the customer's disaster — and a crack in the relationship.

## 6. Why customers come back

Back to the pattern from the start.

Returning customers close fast not because we are cheap — often our quotes are not low at all. It is because they can do the arithmetic: what they buy here is not just parts, it is the certainty of not having to worry about after-sales. A batch arrives and goes straight to the line — no sorting, no anxiety, no days spent arguing with a supplier. For them, the time and attention saved are worth far more than the price gap.

So we believe one thing: **trust is not saved up by cutting corners; it is accumulated one "nothing went wrong" at a time.** Trust each other, build each other up, and a working relationship lasts.

And the thing we least want to see is a customer who receives goods and then has to run around fighting after-sales problems. Genuinely, we do not want that.

If you are currently weighing several quotes, we hope this gives you one more angle to judge them by. Bring us a drawing and let's talk — **we do not promise the lowest price. We promise that every piece that reaches you passed the inspection it was supposed to pass.**

## One line for you

**Every dollar saved on a quote has to be absorbed by someone as risk. The only question is whether that someone is you — or the shop that sold you the parts.**

## About Eternal CNC

We have made precision structural parts for twenty-three years. Among our thirty CNC machines we run a genuine five-axis, and we often take robot joint-module housings, reducer planet carriers and end-effector bases — the kind where "a little off and it fails."

We will not claim every step is at full marks — our own shop has no resident CMM; parts that need CMM data go to our group's shared metrology center on request. We would rather put that on the table.

If a return on your part is not an option, send us the drawing and we will walk through what needs checking before anything else.

[Free DFM review and quote](/contact/get-a-quote/)
