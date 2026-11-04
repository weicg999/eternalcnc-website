---
title: "The Question on the RFQ Has Changed: Dexterous Hands Are Moving from 'Send Me One' to 'Quote Per Part'"
description: "Sales climb fast, but the earlier signal is in the RFQ: buyers now ask for per-part quotes, not a sample. An inquiry is not an order; service life is the real exam."
pubDate: 2026-11-04
category: "Industry Insights"
tags: ["dexterous hand", "humanoid robot", "precision components", "batch consistency", "industry watch"]
system: "general"
author: "Eternal CNC Engineering Team"
readingTime: "13 min read"
---

> Industry watch · November 2026

## 1. The question on the RFQ has changed

Unit sales are a lagging indicator of where an industry stands. Sales are an outcome; by the time the number is published, the thing has already happened. The earlier signal sits inside the RFQ — how customers ask, how much they ask for, which parts they name. That tells you more, sooner, than the final shipment figure.

And lately, the way the RFQ is phrased has genuinely changed.

For the past year or so, the pattern was: send me one sample first. Specifications discussed in fine detail, price discussed in vague terms, and then, more often than not, silence. Now a different question keeps arriving — not "how much for a whole hand," but a stack of part drawings with material requirements, and a request to quote per part, per batch. What they want to know is capacity, cycle time, and how consistency gets guaranteed.

That is a change of an order of magnitude: from the language of **prototyping** to the language of **volume readiness**. That shift, on its own, is worth reporting as an industry signal.

## 2. Why inquiries are worth more attention than sales

The public sales curve for dexterous hands is steep enough already: roughly 19,200 units sold in China in 2025, up 236.84% year on year; an estimated 70,200 units in 2026, another 265.63% gain; and a projected 430,000 units by 2030, a compound annual growth rate of about 57.79% from 2026 to 2030 (GGII, *H1 2026 China Dexterous Hand Industry Research Report*).

But that curve does not explain one thing: why this year's RFQs are asking "how do you guarantee supply at the thousand-piece level" rather than "send me another unit."

Because gearing up for volume has lead time. A single hand carries over a hundred parts — micro gears, micro lead screws, complex-geometry structural components, flexible tactile elements. For any one of those categories to move from sample to batch, you need tooling, fixtures, gauges, line cycle time, and a second source. None of that lands in a few months. If an OEM intends to ramp next year, then right now is exactly when it has to start pricing components and locking capacity.

The public targets from several players line up with this. InShi Robot is targeting 30,000 to 50,000 units in 2026. Linker Hand is aiming for 50,000 to 100,000 units delivered in 2026, with monthly capacity planned to rise from nearly 5,000 to 10,000 units. Linjiedian reports cumulative deliveries of its OmniHand series above 15,000 units as of the end of September 2026 (company statements, 2026). Once the OEM target lands in the tens of thousands, the component-level inquiry necessarily lands one step earlier, in the thousands.

So my read is this: **an RFQ is a thermometer that runs three to six months ahead of shipment volume.** It does not guarantee the outcome, but it does read the water temperature first.

## 3. Now the cold water: an inquiry is not an order

Having made the positive case, the whole picture needs saying.

**First, conversion is low.** A single RFQ typically goes to three to five suppliers at once. The comparison is not who can do it — it is who is cheaper, faster, steadier. Quoting and never hearing back is the norm. Treating an inquiry as an order, and an order as volume production, is the easiest mistake to make in this cycle — and the most embarrassing one to have made.

**Second, what actually ships is still structurally simple.** The volume moving today is dominated by three-finger, six-active-DoF designs — relatively simple architectures. Demand comes mainly from research, data collection, and model training; the share genuinely installed at production workstations remains low (Junsheng Lingxi, *China Business Journal*, October 2026). In other words, a substantial portion of the inquiry heat is buying a **research tool**, not a **production tool**.

**Third, there is a cheaper answer at the workstation.** Goldman Sachs research indicates that two- and three-finger grippers already cover 70%–90% of industrial application requirements. Customers do this arithmetic first: a hand accounts for 20%–25% of a humanoid robot's total unit cost, higher than the 15%–20% an engine represents in a combustion vehicle. When something has to be cut, the hand is usually the first thing cut.

**Fourth, nobody in the industry has cleared the service-life bar.** A high-DoF tactile dexterous hand can list at several hundred thousand yuan or more, yet under continuous industrial operation its actual service life runs from a few weeks to two or three months (Zhang Zhengtao, founder of Zhongke Huiling, *National Business Daily* / *Securities Times*, 2026). A separate public comparison is blunter still: 2026 dexterous hands offer tactile resolution around 1 mm and force control accuracy of 0.1 N, while a human hand can sense a 0.1 mm slip and a 0.01 N change in force.

Price is the ticket in. Service life is the exam at the workstation. So far, nobody has publicly demonstrated a hand that can run a full year without stopping.

## 4. What the RFQ is actually testing

A per-part RFQ looks like it is asking about price. It is really asking four questions.

**One: batch-to-batch consistency.** One good part does not mean a good assembly; one good lead screw does not mean the hundredth one is good. Consistency comes from locked process parameters, tool wear management, and a closed loop of in-process inspection — not from screening at final inspection. The brutal part is that this is a probability problem. One bad batch takes the credibility of the previous nine down with it.

**Two: whether assembly can be replicated.** Industrial volume production needs a standardized assembly process that does not depend on a veteran machinist's feel. That forces the line toward precision fixtures, automation, and a high-accuracy measurement and calibration system (ITES Shenzhen Industrial Fair supply-chain observation, 2026). Capacity built by throwing people at it shows its true face in month two.

**Three: whether cost actually falls with scale.** The industry price band is moving down fast: linkage designs mainstream at 20,000 to 50,000 yuan per hand, tendon-driven and direct-drive designs generally above 100,000 yuan (GGII, October 2026). Whoever cannot bend their marginal cost curve down gets cleared out in the next round.

**Four: whether you dare to commit to a service life.** This is the item most easily glossed over at quoting time, and the one most easily dug up by the customer six months later.

## 5. Back to the word "experience"

The technical difficulty is not actually mysterious; it is discussed openly. Inside a space the size of a human hand, you have to achieve high degrees of freedom, high precision, high reliability, and low cost at the same time — four conditions that pull against each other. On the shop floor it looks like this. Micro gears with module often at or below 1 mm, sometimes under 0.3 mm, where profile deviation affects mesh stiffness and cumulative pitch deviation directly drives backlash, and nitriding heat treatment adds dimensional distortion. Micro lead screws down to 1.4 mm shaft diameter, with three walls to climb: insufficient rigidity, easy deflection, hard to machine — and when internal thread grinding meets titanium alloy, heat buildup, chatter, and wheel loading all arrive together. Complex-geometry structural parts with wall thickness often under 1 mm, where a little too much cutting heat means distortion, and PEEK parts need clamping distortion controlled on top of that (ITES, 2026).

Written down, all of this is understandable to anyone. But between understanding it and making it, there are ten thousand rounds of prototyping.

My own experience is plain. When a complex part lands, I do not touch the machine first. I take it apart in my head — how this shape grew, which face is the datum, after which cut the part will start to give. Only when every cut has a reason do I start the spindle.

That method is not talent. It is repetition count. I have been running prototype work for the relevant industries for years, and prototypes have a signature: small batches, high difficulty, an impatient customer, and nobody handing you the answer. Do enough of them and a kind of feel develops — show me a drawing and I can predict where it will chatter, where it will get hot, where it will distort, and which operation will lose its tolerance the moment you change the workholding.

The industry calls this process know-how, which makes it sound mystical. My reading is simpler: **know-how is beaten out of prototypes, not planned into existence.** Which is exactly why I do not believe in the "skip prototyping, go straight to volume" route. The time saved in the prototype stage comes back doubled, in the form of yield, during production.

## 6. So what does this round of inquiries mean

It means the dexterous hand industry is switching from "can it be built" to "can it be built steadily, cheaply, and at volume — and can the customer make the numbers work."

The first half is a technical question. The second half is a manufacturing question. And starting from the RFQ, the second half is what is being graded.

For a component maker, this is a window and a filter at the same time. Those who can quote per part, deliver per batch, and commit to a service life by the year will stay at the table. Those who can only build samples, only tell stories, and only get there through one pair of skilled hands will be squeezed out gradually in this round.

As for whether that RFQ turns into an order — honestly, nobody can guarantee that right now. There is only one thing to do: take the process apart, nail the parameters down, and hold the yield.

Put another way: turn everything accumulated through prototyping into process windows that can be copied. A sample is tuned by feel; volume production is held by a window. Between "I can take it apart in my head" and "it holds steady on the line," this step is the whole distance.

The rest, leave to the line.

## References

- GGII, *H1 2026 China Dexterous Hand Industry Research Report* (cited via National Business Daily, Securities Times, and China Business Journal, 2026)
- China Business Journal, "From Lab to Line: Dexterous Hand Sales Surge, the Industry's 'ChatGPT Moment' Has Not Arrived," 2026-10-31
- ITES Shenzhen Industrial Fair supply-chain observation, "Dexterous Hands With 70,000 Units of Annual Demand — Why Are Volume Parts Under 20,000?", 2026
- National Business Daily / Securities Times, "A Hand Worth Hundreds of Thousands of Yuan, With a Service Life of a Few Months at Most," 2026
- Caitong Securities public price compilation (SCHUNK SVH, Shadow Hand, InShi RH56, and others), 2026
- Publicly disclosed delivery and capacity targets from InShi, Linker Hand, and Linjiedian, 2026

*Note on scope: all industry figures in this article are public-report figures and may differ in statistical scope from any single company's internal data. No customer identity, purchase volume, pricing, or lead-time information is included.*
