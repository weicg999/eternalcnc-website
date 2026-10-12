---
title: "Quality Is Not a Speed Problem: It Is a Reverence Problem"
description: "What the power bank recall and GB 47372-2026 reveal: how quality failures really happen, why prevention beats rework, and seven habits a machine shop holds to."
pubDate: 2026-10-12
category: "Industry Insights"
tags: ["quality management", "power bank recall", "GB 47372", "prevention", "traceability", "FAI", "supplier quality"]
author: "Strategy Advisory Team"
readingTime: "10 min read"
---

Something small but serious happened in consumer electronics over the past year.

A product that lives in a few billion pockets got recalled at scale for safety reasons. Several manufacturers ran recalls. For one of them, a single recall covered 491,745 units. But the inspection data says more than any single recall: the national spot-check failure rate for this product sold online went from 19.8% in 2020 to 44.4% in 2023. In early 2024, one round found a 37.5% failure rate on the safety-related test items alone.

I am not going to name names here. The point of this piece is not that some company did something wrong. It is something harder to sit with: **nobody drew that curve on purpose. An entire industry slid down it, one year at a time.**

Our trade is machining. The housings, the internal structural parts, the interconnect tabs in those products are the kind of work shops like ours do. So this is not a spectator's story for us.

## 1. Where it actually breaks: not at the brand, hundreds of kilometers upstream

Start with the physics, because it runs against intuition.

The dangerous part of a power bank is not the circuit board. It is the cell. Inside a lithium cell, a thin separator film sits between the anode and cathode. That film is the only physical barrier. If metal particles get into the cell during manufacturing, they can pierce the separator, the two electrodes touch, the cell short-circuits internally, and you get thermal runaway — fire, then explosion.

Where do the metal particles come from? Two places, both mundane: **tooling that has worn long past its service life throws off metal debris, and a shop floor that is not clean enough lets airborne contamination settle into the product.**

During this round of recalls, regulators ran unannounced flight inspections at a cell supplier. Investigators found two things: electrolyte material that did not match what had been filed for certification, and — checking purchasing, production and inspection against the factory's own quality assurance requirements — key process parameters that did not comply with the factory's own documented control requirements.

That sounds technical. Here is the translation: **what came off the line that day was not what the paperwork said it was.**

That is the whole secret. Nobody stood up in a meeting and decided to lower the safety bar. What happens is that the document says A, the floor runs B, and nobody notices. A little worn tooling, a cleanliness level that slipped one notch, a parameter that drifted one step — none of that turns a light red on the day's production report.

The brand is hundreds of kilometers away, holding a supplier's certificate of conformity. It cannot find the problem on its own floor, because the problem was never on its floor. **That is the real cost of "fast": the time it compresses is exactly the time you would have needed to catch this kind of defect.**

## 2. Fast and right are not two values on the same dial

The intuition many business owners run on is that fast and right can both be had — you just need better management, better equipment, smarter people.

On an assembly line, that is true. On a product that involves safety, it is false, because **quality spend and lead time are in direct competition.** They are fighting over the same money and the same hours.

There are two different bills in quality, and they behave nothing alike:

- **The verification bill:** how much time and money does it take to know whether this thing is safe? Another aging test, another sampling round, another unannounced supplier audit — all of it costs. And if you pay it, the product may turn out to be perfectly fine. **That makes it look like waste.**
- **The failure bill:** if it is not safe, what does that cost? Recall, penalties, shutdown, brand, human safety. If you do not pay this one, you may not pay it this year or for three years. **That makes it look like savings.**

The problem is timing. **The verification bill is due today. The failure bill is due later.** And "later" does not appear on this quarter's operating report.

So every time a company chooses between them, tilting toward "save" makes the current quarter look a little better. Tilt once, nothing happens. Tilt twice, nothing happens. Gradually the whole organization concludes that the verification bill was never necessary.

One person thinking that way is a personal choice. An entire industry thinking that way is the curve I opened with — **19.8%, 25.0%, 35.4%, 44.4%.**

## 3. The bill comes in four layers, and only the first one is easy to calculate

Customers and readers ask us a version of this all the time: when something like this happens, who actually gets hurt the most?

My observation is that the cost of a quality failure does not arrive all at once. It arrives in four layers, each heavier than the last — and **layers two through four are things nobody in layer one would have predicted.**

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The four accumulating layers of a quality failure: direct cost, shutdown and recall, regulatory, then trust, each layer heavier" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="340" y="28" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="14" font-weight="700" style="fill:#111827;">One bill, four layers &mdash; each heavier</text>
<rect x="60" y="46" width="560" height="52" rx="9" style="fill:#FAFAFA;stroke:#D9D9D9;"/>
<circle cx="94" cy="72" r="16" style="fill:#8B0000;"/>
<text x="94" y="78" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF;">1</text>
<text x="126" y="70" font-family="'Segoe UI', system-ui, sans-serif" font-size="13.5" font-weight="700" style="fill:#111827;">Direct cost</text>
<text x="126" y="89" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280;">Replacements &middot; refunds &middot; freight</text>
<rect x="80" y="110" width="520" height="52" rx="9" style="fill:#FAFAFA;stroke:#D9D9D9;"/>
<circle cx="114" cy="136" r="16" style="fill:#8B0000;"/>
<text x="114" y="142" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF;">2</text>
<text x="146" y="134" font-family="'Segoe UI', system-ui, sans-serif" font-size="13.5" font-weight="700" style="fill:#111827;">Shutdown &amp; recall</text>
<text x="146" y="153" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280;">Nothing ships &middot; lines idle</text>
<rect x="100" y="174" width="480" height="52" rx="9" style="fill:#FAFAFA;stroke:#D9D9D9;"/>
<circle cx="134" cy="200" r="16" style="fill:#8B0000;"/>
<text x="134" y="206" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF;">3</text>
<text x="166" y="198" font-family="'Segoe UI', system-ui, sans-serif" font-size="13.5" font-weight="700" style="fill:#111827;">Regulatory</text>
<text x="166" y="217" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280;">Certs suspended &middot; revoked</text>
<rect x="120" y="238" width="440" height="52" rx="9" style="fill:#FDF6F6;stroke:#8B0000;"/>
<circle cx="154" cy="264" r="16" style="fill:#8B0000;"/>
<text x="154" y="270" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF;">4</text>
<text x="186" y="262" font-family="'Segoe UI', system-ui, sans-serif" font-size="13.5" font-weight="700" style="fill:#8B0000;">Trust</text>
<text x="186" y="281" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280;">Not on the balance sheet &middot; irreversible</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 1 &middot; The first three can be calculated, the fourth cannot</figcaption>
</figure>

Layers one and two show up in the current quarter. Layer three takes a quarter or two. Layer four takes three to five years — **and layer four is the one that actually closes a company down.**

So when people say the market always collects, that is not fatalism. In business terms it is precise: **every dollar you skip on the verification bill becomes a promissory note with no maturity date, booked against layer four.** You do not decide when it comes due.

## 4. Why prevention always beats rework

Classical Chinese medicine has a concept called treating the illness before it happens. The idea, recorded in the Huangdi Neijing roughly two thousand years ago, is that the best physician treats what has not yet manifested. Once the illness has taken hold, you are digging a well because you are already thirsty, or forging weapons because the battle has already started.

In manufacturing, this is not philosophy. It is arithmetic.

There is a rule of thumb in our trade: **the first two stops — drawing and DFM — take about 5% of the timeline and lock in about 70% of the cost.** Miss a fillet callout, and fixing it at the drawing stage takes a second. Once the part is cut, fixing it means setting it up again, re-cutting it, re-inspecting it. Once the mold is made, it is tens of thousands. Once it has shipped and been assembled, it is a recall.

Healthcare has a version of this that is blunter: spend 1 on prevention, 8 on early detection, 100 on late-stage treatment. I cannot vouch for the exact multiples, but the **shape** is right — **quality cost is not linear, it is exponential.** And the steepest part of that curve sits after the product leaves the building.

Back to power banks. China's new mandatory standard, GB 47372-2026, published in 2026, did something clever: it moved a set of requirements upstream from final inspection to raw materials and production processes. Electrolyte moisture content, key process parameters, supplier material consistency — all of it is now controlled **before the product exists.** It also added a nail penetration test and a lithium plating check after 300 charge-discharge cycles. That is the prevention idea written into a mandatory standard.

**When an industry needs a national standard to do prevention for it, that tells you a lot of companies stopped doing it themselves.**

## 5. What Germany actually got right

People in our trade often say we should learn from Germany. Usually it stays a slogan. But the German approach has a specific shape — it is not a national personality trait.

Three things I found that are checkable:

- **Slow.** The first characteristic of the German craftsman ethos is described as slow, careful work: stability first, speed second. That is not an aesthetic preference. It was the core of the transformation that took "Made in Germany" from a British insult to a synonym for quality. (Source: Sun Xing, deputy director of the Industrial Culture Development Center at China's Ministry of Industry and Information Technology, in an interview with Chinese Social Sciences Today.)
- **Narrow.** About 95% of German companies are family-owned, and many are "hidden champions" that hold the number one market position worldwide in one narrow field, obsessively perfecting a single product — Würth, the "screw king," makes screws. They do not chase trends, because trends move too fast, and chasing them is what forces you to cut the costs you should not cut. (Source: same interview; see also People's Daily's Japan edition.)
- **Institutionalized.** Germany's dual vocational training system — apprentices spending three or more years split between a company and a vocational school — is the backbone of how German manufacturing transmits standards from one generation to the next. Worth noting: this system took shape precisely when German products had their worst reputation. (Source: China Industry News, "The transformation path of Made in Germany.")

That third point is the one I would underline. **Germany was not born rigorous. It built rigor into a system — reproducible, auditable, transferable to the next generation — at the moment it was least respected.**

The lesson I take from it: **rigor cannot live in people. It has to live in a system.** People move on, get tired, and find reasons for themselves at the end of the month when a shipment is due. Systems do not. And a system costs money today.

## 6. The part of the German model we cannot copy

Here is something less comfortable, because this is where companies most often trip.

Behind Germany's system sit two preconditions we cannot simply copy: **decades or centuries of accumulated process knowledge and skilled labor, and an industrial order that keeps cheap, unsafe product out of the market.**

Look at the numbers again: from 2020 to 2023, the national spot-check failure rate for power banks sold online went from 19.8% to 44.4% — more than doubling in four years. That tells you the market itself did not screen out the non-conforming product. **The filter was not in the market's hands.**

That sounds pessimistic. For a shop like ours, it is actually freeing: **you do not have to wait for the market to improve, or for a standard to save you.** What a machine shop can hold is the handful of things happening on its own floor. Nobody else can manage them, and nobody else can do them for you.

So learning from Germany is not about importing a culture or a temperament. It is about importing **a few specific actions that can be written down, audited, and traced to a name.**

## 7. Seven things one machine shop can actually hold

The first six sections were analysis. This section is our own ledger — seven things we hold ourselves to every day. None of them is sophisticated. All of them can be checked, and all of them can be traced back to a person.

1. **First article inspection (FAI), every time, with the record kept.** If the first article is wrong, everything after it is wrong — and the longer you run, the harder it is to walk back.
2. **Never run a critical dimension at the edge of the tolerance band.** Leave process margin inside the band. A part running at the edge will exceed tolerance from normal process variation. It is only a question of when.
3. **Material certs have to tie to an actual heat number, not just be a piece of paper.** The point of an EN 10204 3.1 cert (in North America, the equivalent is a mill cert or an MTR) is that when something goes wrong, you can trace it to that heat, that machine, that day. If you cannot trace it, the cert is decoration.
4. **Log anomalies, including the ones that later turn out to be nothing.** The cost of logging an anomaly is small. The cost of hiding one is not.
5. **Turn down work we cannot do.** Winning an order with a low quote and then cutting process steps to make the margin back is not operating — it is transferring cost onto the customer's future. That is not a business model.
6. **When something goes wrong, the customer should hear it from us first.** Rework has a price. Trust does not get a second run. I have written that line elsewhere and I am writing it again, because it is the hardest of the seven.
7. **One small debrief a day: where did I not follow the documented process today?** The most useful question in quality management is not "did we do well today." It is "which step did I run from memory instead of from the document?"

None of these seven costs money. **They cost something else: patience.**

## 8. Slower is fine

Having written all of this, my own conclusion is pretty plain.

We are a machine shop in Bao'an, Shenzhen, with thirty CNC machines, five-axis included. We cannot move an industry's failure rate. We cannot audit anyone else's cells. **What we control is the several dozen machines on our floor, and the drawings and parts that move through them each day.**

There will always be someone faster and cheaper than you. If speed and price are the only race, then sooner or later we get pushed to that same fork in the road where cutting the verification bill starts to look reasonable. That is exactly why this is our problem and not someone else's news.

But there is another road: **build the fundamentals.** Do the quality management today. Bank the process knowledge today. Run one honest self-review today. Think today about what would actually make things better for the customers and the people who work here. Improve one thing today.

These are small enough to be invisible inside a single day. But they share one property: **they accumulate, and they do not depreciate.**

So "slower" is not a posture for us. It is a cost decision: **we would rather buy certainty than spend time cleaning up a failure.**

## One line for you

**Fast and slow is not a matter of pace. It is a matter of which bill you pay — whatever you skip on the verification side comes back on the failure side.**

## Main references

- China's State Administration for Market Regulation: national spot-check report on electronic products, 2021 (power bank failure rate 25.0%; prior three years 39.7%, 19.8%, 25.0%)
- State Administration for Market Regulation: press conference on the ten major cases in its 2025 campaign against "involutionary" competition (1,169 enforcement cases related to power banks nationwide)
- Xinhua: mandatory national standard GB 47372-2026, Safety Technical Specifications for Power Banks, published 2026, effective 1 April 2027, with a 12-month transition period
- Ministry of Industry and Information Technology: the five areas of strengthened requirements in GB 47372-2026 (nail penetration test, lithium plating check after cycling, real-time battery monitoring, unique product coding, full-process control)
- Shenzhen Municipal Administration for Market Regulation: recall notice for power banks manufactured by Shenzhen Romoss Technology (491,745 units across three models, 16 June 2025)

## About Eternal CNC

We have been making precision structural parts for twenty-three years — aluminum, stainless steel, titanium alloys and engineering plastics, from one-off prototypes to small-batch production.

Those seven items are not posters on our wall. They are the ledger we walk through every day. We cannot promise zero defects. We can promise this: every part has a record, every batch of material can be traced back, and every anomaly gets written down.

If you have parts where safety matters, or you would rather have the design reviewed before anything is committed to metal, send us the drawing — we would rather have the hard conversation before the spindle starts.

[Free DFM review and quote](/contact/get-a-quote/)
