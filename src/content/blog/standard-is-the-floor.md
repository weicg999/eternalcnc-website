---
title: "The Standard Is the Floor. The Margin Is Yours."
description: "Something is being argued about right now. Skip it, and ask the real question: is compliant actually safe? On brake standards and the margin nobody mandates."
pubDate: 2026-10-13
category: "Industry Insights"
tags: ["engineering standards", "safety margin", "brake systems", "design verification", "first article inspection", "quality management", "redundancy"]
author: "Strategy Advisory Team"
readingTime: "11 min read"
---

Something came up recently that a lot of people are arguing about.

What it was, and who was right, I'm not going to get into here. Not because I have no opinion, but because the merits of that argument shouldn't be settled by a shop that makes parts. What I want to talk about is the older, more general question it dragged back into the open:

**Our product passes. So what?**

That question doesn't belong to the auto industry alone. It hangs over every shop that makes a safety-relevant part, including the ones like ours that cut precision structural components. So let me take it apart from a machine shop's point of view.

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The standard draws one line: below it you may not ship, above it nobody is required to hold any margin for you" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="340" y="28" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="14" font-weight="700" style="fill:#111827;">The standard draws one line</text>
<line x1="60" y1="150" x2="620" y2="150" stroke="#8B0000" stroke-width="2" stroke-dasharray="7 5"/>
<text x="60" y="140" text-anchor="start" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12" font-weight="700" style="fill:#8B0000;">Compliance line</text>
<rect x="60" y="162" width="560" height="56" rx="9" style="fill:#FAFAFA;stroke:#D9D9D9;"/>
<text x="340" y="186" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="13" style="fill:#6B7280;">Below the line</text>
<text x="340" y="205" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#9CA3AF;">You do not ship</text>
<rect x="60" y="60" width="560" height="72" rx="9" style="fill:#FDF6F6;stroke:#8B0000;"/>
<text x="340" y="88" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="13" font-weight="700" style="fill:#8B0000;">Above the line</text>
<text x="340" y="110" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#6B7280;">You have a certificate. That is all</text>
<rect x="60" y="238" width="560" height="56" rx="9" style="fill:#FFFFFF;stroke:#D9D9D9;" stroke-dasharray="5 4"/>
<text x="340" y="262" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="13" style="fill:#6B7280;">Above that: margin</text>
<text x="340" y="281" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#9CA3AF;">Nobody requires it. You decide it</text>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 1 &middot; The certificate covers the line, not the space above it</figcaption>
</svg>
</figure>

## 1. Separate the two numbers first

In discussions like this, the most common mistake is mixing up two quantities that have nothing to do with each other.

One is "how hard do I have to push." China's mandatory national standard GB 7258-2026, *Safety Specifications for Power-driven Vehicles Operating on Roads*, requires that a passenger car reach maximum braking performance at a pedal force no greater than 500 N, roughly 112 lbf. (The version in force today is GB 7258-2017; the new edition was published in August 2026 and takes effect July 1, 2027.) That number governs pedal feel: within normal human effort, the car must be able to stop.

The other is "how hard before it breaks." That is a structural strength question, and it has **no conversion relationship** to the first number.

Treating 500 N as a promise that a pedal won't snap is a category error. 500 N is "how much force normal operation takes," not "how much this part can survive." The standard doesn't contain the second number at all.

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Measured pedal forces: 281 N in controlled driving, 796 N in simulated emergency braking, up to 1793 N at the highest reading, all far above the 500 N standard" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="340" y="30" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="14" font-weight="700" style="fill:#111827;">A startled driver is another scale</text>
<line x1="120" y1="200" x2="620" y2="200" stroke="#D9D9D9" stroke-width="1"/>
<rect x="140" y="176" width="90" height="24" rx="4" style="fill:#E5E7EB;"/>
<text x="185" y="192" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12" style="fill:#374151;">281 N</text>
<text x="185" y="218" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#6B7280;">Controlled</text>
<rect x="300" y="124" width="90" height="76" rx="4" style="fill:#D9D9D9;"/>
<text x="345" y="140" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12" style="fill:#374151;">796 N</text>
<text x="345" y="218" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#6B7280;">Emergency sim</text>
<rect x="460" y="62" width="90" height="138" rx="4" style="fill:#8B0000;"/>
<text x="505" y="78" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12" font-weight="700" style="fill:#FFFFFF;">1793 N</text>
<text x="505" y="218" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#6B7280;">Peak recorded</text>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 2 &middot; Volvo 1998 driver study &mdash; emergency effort reached 2.8&times; the controlled figure</figcaption>
</svg>
</figure>

## 2. How hard a real person actually pushes

That number isn't guesswork. It's been measured.

Volvo ran a driver study in 1998: 35 drivers who each drove more than three days a week, seated in a bench-mounted simulator cab, tested under controlled braking and simulated emergency braking. Controlled braking averaged 281 N of pedal force. Simulated emergency braking rose to 796 N, about 2.8 times as much — and **the peak reading hit 1793 N**.

More telling: in that rig, 160 N was already enough to get maximum braking effect, yet in the emergency scenario the drivers who *felt* they weren't braking hard enough still averaged 591 N. **There is a wide gap between what a driver perceives and what the system actually needs — the brakes are fully applied, and the driver keeps pushing.**

NHTSA in the US ran a different measurement in 2010: 64 participants split into an 18–25 group and a 65-plus group, asked to push the pedal three times as hard as they could. The Mercedes R350 group peaked around 1766 N; the Volvo S80 group around 2117 N.

So **an ordinary person pushing past 1600 N in a specific situation is documented, not a hypothetical.** The design margin on a safety part has to include "the one full-bodied stomp from a panicked human being."

## 3. Our standards system left a gap right there

Now to the standards themselves. This part deserves some detail, because a lot of people assume "meets the national standard" means "designed to the limit."

**GB 21670-2025**, *Technical Requirements and Test Methods for Passenger Car Braking Systems*, took effect January 1, 2026, and is the dedicated mandatory standard for passenger car braking systems. It requires that qualifying critical components — those whose failure would impair emergency braking performance, brake pedals and their brackets included — be made of metal or a material of equivalent performance, and that they show no obvious deformation during normal operation. Its method for verifying strength is to examine the manufacturer's design documentation and perform a visual inspection of the braking system, to confirm these components have sufficient strength.

**Note that second half: the standard's method for confirming strength is to read the design file. It specifies no load limit.**

**GB 7258-2026** is the other mandatory line, but its relevant clause only caps pedal force (≤500 N). It likewise sets no ultimate fracture load for a pedal bracket as a component class.

So where is the number? In **QC/T 788-2018**, *Performance Requirements and Bench Test Methods of Motor Vehicle Pedal Device*. In its own terms: it applies to mechanically hinged metal brake pedals and clutch pedals for motor vehicles, with other pedal types optionally following it. The strength test applies a longitudinal load of 1500 ± 20 N, holds for 5 seconds, releases, repeats 5 times; afterwards permanent deformation must not exceed 5 mm, and there must be no cracking or damage.

Two distinctions matter here:

**First, QC/T 788 is a recommended industry standard, not a mandatory item for new-vehicle type approval.** It is an auto industry standard (QC/T), currently in force, published July 4, 2018, effective January 1, 2019, superseding QC/T 788-2007. Which, incidentally, specified a longitudinal load of 2000 ± 50 N. In other words, **standard values don't always move upward.**

**Second, its scope is "mechanically hinged metal pedals," and the loading is static or quasi-static.** Under continuous emergency braking in a full vehicle, the pedal sees a dynamic, combined load: impact, vibration, and repeated application. At equal nominal magnitude, that kind of loading is typically far more destructive than a static one.

So the whole chain runs like this: **the mandatory national standards govern vehicle-level braking performance and strength under normal conditions (no load limit specified); a recommended industry standard supplies a 1500 N bench figure (not mandatory, restricted by pedal type, statically applied); and the real-world load ceiling for a component under extreme conditions comes down to each company's internal design standard.**

## 4. The space above the line is drawn by the company

From public sources you can see how differently companies set that value:

- GM's 2007 pedal module specification GMW15396: extreme service loads considered in the as-installed vehicle condition, with force applicable at any point on the pedal face; 2700 N in the pedal travel direction, 440 N lateral, with no permanent failure or unsafe operating state permitted under the corresponding extreme conditions.
- Porsche's published 918 Spyder pedal development material: no fracture or cracking below 3000 N, plus a 2300 N, 0.7-second hard-apply test run for at least 3000 load cycles; static and dynamic validation on both the individual part and the complete module, accounting for temperature and humidity. That program also recorded a trade-off that's easy to overlook — the project used fiber-reinforced plastic to save weight, but the original design requirements from the steel version were carried over unchanged, and validation added temperature and moisture-condition factors. Testing found that elevated temperature and moisture reduced maximum load capacity, so the team revised the design and paid back some of the weight. (For North American readers: think of this as the kind of documented design-verification rigour you'd expect behind a PPAP submission, where the DV plan has to cover the real environment, not just the nominal case.)

**That's the point. Same material standard, different structural design, different validation envelope, different safety factor — and the result can differ by more than a factor of two.** Weight reduction is a legitimate engineering goal, but the benefit has to be underwritten by structural design and validated under the corresponding environmental conditions. In development, those two things are tied together. You don't get to do only the first one.

## 5. Why a machine shop should read this carefully

Everything above is OEM business, but reading through it, my stomach tightened. Because what it describes **isn't one company's lapse, it's a way of working** — and that way of working is just as common in contract machining, except the consequences take longer to surface.

Let me translate it into terms we actually use on the floor.

**One: the standard is the line the customer drew, not the floor we should hold ourselves to.** The customer's drawing calls out a tolerance; we run to the middle of the band. That's called conforming. But if the drawing itself compresses the margin, does the shop have room to cover for it anyway? It does — but usually nobody asks. That's the same thing as 1500 N: do everything the regulation requires, and not one bit more. It's legal. It also earns the minimum passing grade and nothing more.

**Two: "per the paperwork" and "per the part" are two different things.** GB 21670-2025 confirms strength by reading the design file. A design file can be immaculate, and if production drifts from it, that file is just paper. The classic version in our trade: the process sheet says leave 0.3 mm of stock before the finish pass and take it in two cuts; production decides to save time and takes it in one — cutting forces climb, and a thin-wall part bows out. Every dimension is now out of tolerance. **That gap between the paper and the part is where quality failures grow.**

**Three: your first response when something goes wrong sets the size of the bill.** This is the hardest lesson I took from my years in investing. After a product fails, the account gets settled four times. First is direct cost — rework, replacement, freight. That one you can calculate. Second is downtime and market, when nobody dares use your product. Third is regulatory and compliance — certificates, market access, penalties. Fourth is trust. That layer never shows up on a financial statement, and it's the only irreversible one.

**Each layer is more expensive than the last, and the later ones can't be bought off with money.** So there is really only one correct posture: own it immediately, investigate immediately, fix immediately — and stop the incident at the first layer.

**Four: prevention is always cheaper than rework.** Traditional Chinese medicine has a concept called *zhi wei bing* — treat the illness before it forms. Intercept it before it takes shape, and the cost is lowest. In manufacturing: change one feature at the design stage, add one full-dimensional first-article inspection during machining, add one cleaning step before assembly. All cheap. And if you wait until after a volume shipment goes out and needs rework or recall, the cost differs by orders of magnitude. **Everybody understands this. The hard part is spending that money when nothing has gone wrong yet.**

## 6. The German model has a precondition

At this point one topic is unavoidable: why, given the same pass line, some places have a harder-won manufacturing reputation than others.

Three things about German manufacturing are checkable: **slow** — stability first, speed second. **Focused** — a large population of firms doing one thing for decades, until nobody can route around them. **Dual vocational training** — vocational schooling and factory practice institutionally bound together. Interestingly, that system took shape precisely when "Made in Germany" had its worst reputation — when Britain required German exports to be marked with their origin, intending to let consumers avoid them, and German manufacturers turned the label into an asset instead.

(Reference: public reporting and interviews from the Industrial Culture Development Center under China's Ministry of Industry and Information Technology, and China Industry News.)

But I don't want to turn this into a slogan. **The German model has a precondition we can't route around: it takes time. Many years, and it doesn't compress.**

An internal standard set at twice the national figure isn't the product of one decision. It's the accumulation of twenty years of stubbornness about never having an incident. Dual training works because companies are willing to spend three years developing a young person who might leave. Neither can be forced out with KPIs, and neither can be ripened with capital.

**So the real question isn't whether we can learn from Germany. It's whether we're willing to accept slow.** If the answer is no, then raising the standard just moves the pass line up one notch, and the space above it stays empty.

## 7. Six things a machine shop can hold to

We've been making precision structural parts for twenty-three years, with thirty machines including 5-axis. I'm not citing that to make a point — I'm saying I have a concrete sense of how well these practices hold up in a small shop.

**One: don't ship critical dimensions at "just barely in tolerance."** Running to the middle of the band isn't conservatism; it's leaving room for everything downstream — finishing, assembly, shipping. The drawing gives you a boundary. What you ship should carry margin against it.

**Two: full-dimensional first article, not just the critical features.** First article is the only chance you get to find a process problem painlessly. Time saved by skipping it gets paid back tenfold later.

**Three: turn "per the paperwork" into "per the part."** The stock allowance, the feed, the workholding method written on the process sheet — is what actually came off the machine the same thing? If those two differ, that's your biggest exposure, and usually nobody catches it, because both sets of records look right.

**Four: think through the failure mode before you talk about cost.** If this part fails, does it deform or does it fracture? Wear-out failure or brittle failure? Brittle fracture gives no warning, and it's the one you can least afford. Once that's clear, you know where you're not allowed to cut.

**Five: leave one thing deliberately un-optimized.** Weight, cost, lead time — all legitimate targets. But every drawing should carry one place — usually the safety-relevant one — explicitly marked "do not optimize; margin retained." Having the nerve to keep that margin is engineering judgement. Refusing to is transferring the risk to somebody else.

**Six: say something the moment a problem appears.** Find a problem internally, you get rewarded. Hide one, and the penalty is severe. This isn't a moral requirement, it's a cost requirement — **every hour of concealment pushes the bill one layer further down.**

## 8. Slow is fine

Let me answer the opening question again.

"Passes. So what?"

A standard is a line. It defines what is not permitted. Its job is to prevent the worst case, not to guarantee a good outcome. **Nobody is stationed above that line to hold the margin for you. Only you can.**

Which leads to a judgement that sounds like a bad deal but that I genuinely believe: **in this trade, the extra margin you hold, the extra validation you run, the extra hours you spend — in the short term they're all cost. In the long term they are the only thing that compounds.**

Twenty-three years in, my takeaway is this: **there are no shortcuts in this work, only fundamentals.** All you can do is read every drawing properly, set every job stably, measure every first article completely. Do those things ten thousand times and they stay just as tedious and unglamorous. But they are the only thing that's truly yours.

**Slow is fine.** Whoever walks steadily earns the right to talk about distance. As for how far we get — who knows. All we control is whether today's part was made right.

## One line for you

**Don't answer "is it safe?" with "it meets the standard." The standard is the pass line somebody else drew for you. Safety is the margin you add above it yourself.**

## Main references

- GB 7258-2026, *Safety Specifications for Power-driven Vehicles Operating on Roads* (published August 2026, effective July 1, 2027)
- GB 21670-2025, *Technical Requirements and Test Methods for Passenger Car Braking Systems* (effective January 1, 2026)
- QC/T 788-2018, *Performance Requirements and Bench Test Methods of Motor Vehicle Pedal Device* (National Standards Information Public Service Platform)
- Volvo 1998 driver pedal-force study; NHTSA 2010 pedal-force study

## About Eternal CNC

We have been making precision structural parts for twenty-three years, running thirty machines including 5-axis, focused on fast-turnaround prototypes and low-volume runs in aluminum and stainless steel. The habits described above — margin, first article, failure mode — are what we do daily, and they're how we judge whether a job is doable. If you have a drawing and you're unsure how much margin to leave, send it over and we'll review the design with you first.

[Free DFM review and quote](/contact/get-a-quote/)
