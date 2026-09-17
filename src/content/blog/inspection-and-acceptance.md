---
title: "Inspection and Acceptance: What to Check When Parts Arrive"
description: "The report came back green, then assembly failed. Good inspection is not fault-finding — it is answering “will it work” with data before you build. A practical read on which dimensions to measure, which reports to demand, and how to read a tolerance."
category: Machining Tips
system: general
pubDate: 2026-09-17
author: Eternal CNC Engineering Team
readingTime: 10 min read
---

You have probably been here: the supplier sends a beautiful inspection report, CMM all green, material cert attached. You build with confidence, and then a hole will not take the screw, a shaft noises at speed, or the whole batch comes back from the customer.

The report is not fake. It is that “knowing how to inspect” matters as much as “knowing how to make.” This article stands on your side — once parts reach your hands, what to look at, how to look, and what to ask for, so the risk is blocked before assembly.

## 1. Before you build: check the paperwork, not the part

When goods arrive, the first move is not to fit them. Check three things first:

- **Is the drawing revision correct?** Too many reworks trace back to gauges and parts made against an old revision. Confirm the drawing in your hand is the one the shop cut to.
- **Quantity and lot number.** One heat lot, one production batch per shipment — that is what later traceability rides on.
- **Are the accompanying documents complete?** Material cert, dimensional report, special-process records (heat treat, anodize) should be in the box, not “sent later by email.”

Reconcile the papers before you touch the parts. Ten minutes here blocks ten days of argument later.

## 2. Which dimensions to actually measure: the critical few

Not every dimension carries equal weight. Our piece “[Which Dimensions Deserve a Tight Tolerance](/knowledge/tech-blog/which-dimensions-deserve-tight-tolerance/)” covers which ones to tighten; inspection is the mirror — measure first the dimensions that decide “will it fit, will it fail”:

- Locating holes and faces (the features that carry the assembly datum).
- Mating surfaces (hole-shaft fits, sealing faces).
- Load-bearing features where failure costs something.

The rest you check against the report by sampling. A critical dimension out of spec puts the whole batch at risk — you cannot “accept because this one piece measured fine.” A non-critical deviation can be evaluated and received under a **deviation permit**, as long as it touches neither function nor fit.

Smart inspection spends its force on the critical few, not on reading every micron of the report top to bottom.

## 3. Which reports to demand: material cert and CMM report

**Material certificate EN 10204 3.1.** This is the “ID card” issued by the manufacturer’s quality department: it lists the grade (6061-T6? 316L? 17-4PH?), the heat lot, and the measured chemistry and mechanical properties, proving the material matches what you ordered. 3.2 adds independent third-party witness on top of 3.1; aerospace and medical usually start at 3.1, critical parts at 3.2. Read it for four things: is the grade right, is the heat lot there, do the measured values fall in the standard range, is it signed.

**Dimensional report (CMM report).** Do not just read green or red. Someone who inspects well reads three columns: nominal, measured, upper/lower deviation. The point is not “pass or fail” but **which side of the tolerance band the measured value sits on, and how far from the edge** — that is process margin. A dimension cut against the upper limit passes on one piece, but the batch’s process margin is thin and the next run may drift out. Margin matters more than color.

## 4. First Article vs batch sampling

- **First Article Inspection (FAI).** The first piece of every batch, or of any drawing change, measured in full. Aerospace has the AS9102 FAI standard; ordinary CNC does not mandate it, but the logic is the same: catch the systematic error before volume copying — a wrong tool-offset, a reversed program, a shifted fixture all show up in the first article.
- **Batch sampling.** Stable production uses sampling under AQL (ISO 2859-1 acceptance quality limit). AQL 1.0, roughly, is the allowed nonconforming count per hundred. It is not “pick a few at random” — it is scientific sampling with defined accept and reject criteria.
- **When to inspect 100%:** safety parts, low-volume high-value parts, batches with a suspect first article. **When to sample:** stable high volume, non-critical parts.

Our habit is “FAI mandatory + in-process sampling + 100% outgoing visual” — every batch leaves a first-article record and sampling record in the box for you.

## 5. Surface and threads: go-no-go gauges and visual

**Threads use go-no-go gauges**, not the feel of your hand. Hand feel bends with oil, temperature, and force; the gauge gives an objective verdict:

- External threads use a ring gauge — the go ring must thread on fully, the no-go ring must not. Go will not pass: the thread is undersized, scrap. No-go also passes: oversized, scrap.
- Internal threads use a plug gauge — same rule, go passes, no-go does not.

**Coating thickness** from anodize or plating is measured with an eddy-current gauge, not judged by color. **Roughness Ra** uses a profilometer, not a “feels smooth” thumb. **Visual** (scratches, burrs, dents, color shift) is eye plus a **limit sample** — both sides agree up front on a “worst acceptable sample” so “acceptable” is nailed down and nobody relitigates later.

## 6. How to read a tolerance: the band and the verdict

The basic size plus the tolerance code sets the band’s upper and lower limits. Take Ø30 H7: upper +0.021, lower 0, so the good range is 30.000 to 30.021 mm.

- **Pass = measured value inside the band**; it does not have to sit “dead center.” Center earns no bonus, but riding the edge means thin process margin (back to section 3).
- **Unilateral tolerances** (only +0.05/0 or 0/-0.05) and **geometric tolerances** (coaxiality, runout, position) read separately. A position callout out of spec while the diameter is in band can still fail to assemble — exactly the datum and accumulation problem from our piece “[Why Your Parts Won’t Assemble](/knowledge/tech-blog/why-parts-wont-assemble/)”.

So when you read a drawing, do not stare only at diameters. Mating faces, position, runout — the “invisible numbers” — are often the real culprits behind assembly failure.

## 7. Gauge datum must match the assembly datum

The assembly article warned of a trap: “gauge says pass, assembly says no.” The root is inspecting on a different datum — the face you squared the part on is not the face assembly locates from.

The cure: when you send inspection requirements to the supplier, write in “which face to locate inspection from,” not just a drawing. The gauge’s zero must match assembly’s zero. Otherwise the report is green only “in another coordinate system.”

## 8. How a shop supports your inspection

At Eternal CNC we issue an inspection plan with the drawing: which dimensions are critical, what method, what report — straight into quality with the drawing. The material heat lot is tied to every batch, so you can trace back to which melt, which machine, which day.

When goods reach you, check the critical dimensions against our report; if anything is doubtful, we respond within 2 hours (our standard quote turnaround). Inspection should not be yours alone — it is us answering “will it work” with data first.

## 9. One line for you

**Inspection is not fault-finding — it is answering “will it work” with data before you build.**

## Where we stand on this

We have seen plenty of work where “the report is green, assembly fails.” The root is rarely in the making; it is that no one looked back from the inspection end. So the day your drawing arrives, we issue a DFM review plus an inspection plan: critical dimensions, gauge datum, and required reports are fixed up front, so acceptance has a basis the moment goods arrive — not a blame game after assembly jams.

If you have a batch to accept right now, or want “how to inspect” written into the next drawing, send us the drawing. **Free DFM review and quote** — we help you answer “will it work” with data before production, not after.

[Free DFM review and quote](/contact/get-a-quote)
