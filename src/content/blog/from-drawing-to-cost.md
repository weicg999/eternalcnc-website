---
title: "From Drawing to Cost: How a CNC Part Actually Gets Made"
description: "A beginner's walk through the whole chain — drawing, DFM, material, machine, programming, finishing, inspection, shipping — ending with a line-by-line breakdown of where the money in a CNC quote actually goes."
pubDate: 2026-09-10
category: "Industry Insights"
system: "general"
tags: ["CNC machining", "cost breakdown", "DFM", "manufacturing process", "beginner guide", "quoting", "lead time"]
author: "Eternal CNC Engineering Team"
readingTime: "13 min read"
---

## Who this guide is for

You have a part on your screen and somebody has asked you to get it made.

Maybe you are a hardware founder who has never stood next to a machining centre. Maybe you are an engineer who just inherited purchasing. Maybe you are a buyer who has three quotes for the same drawing and they differ by a factor of three.

Most articles about machining are written for people who already know machining. This one is not. It walks the whole path a part travels — from the file you send to the number on the quote — and at the end it opens the quote up and shows you what each line is paying for.

No prior knowledge needed. No sales pitch in the middle. Just the chain.

## The map: ten stations

Every machined part, no matter how simple, passes through these ten stations. Some take ten minutes, some take three days. All of them cost money.

| # | Station | What actually happens | What it decides |
|---|---|---|---|
| 1 | Drawing | You send files; we read them | Whether the quote is fast and right |
| 2 | DFM | We check if it can be made sensibly | **Most of the final cost** |
| 3 | Material | Bar or plate is ordered and cut | Cost of the metal, and the waste |
| 4 | Process | Which machine, how many setups | Hourly rate and cycle time |
| 5 | Programming | CAM, toolpaths, fixturing | A fixed cost you amortise |
| 6 | Machining | Metal becomes chips | The visible part of the price |
| 7 | Finishing | Anodising, plating, heat treat | Appearance, hardness — and schedule |
| 8 | Inspection | Measuring against the print | Confidence, and paperwork |
| 9 | Packing | Rust protection, crating, docs | Whether it arrives usable |
| 10 | Quote | All of the above, added up | The number you are looking at |

Read the middle eight as one story. The last one is where it pays off.

## Station 1 — The drawing

**What to send:** a 3D file (STEP is the safest common format) *and* a 2D PDF.

The 3D gives us geometry. The 2D gives us intent — tolerances, thread callouts, surface finish symbols, material, heat treatment, and which surfaces actually matter. A STEP file on its own has no tolerances. A PDF on its own has to be re-modelled, which is slow and introduces errors.

**The five things people forget:**

1. **Material grade.** "Aluminium" is not a grade. 6061-T6 and 7075-T6 are different metals with different prices, different strengths and different anodising results.
2. **Quantity — including the next order.** "10 now, maybe 200 in March" is a completely different job from "10, once". It changes fixturing and process.
3. **Surface finish.** If it matters cosmetically, say which faces. If it does not, say so, and save money.
4. **Which tolerances are real.** A drawing where every dimension carries ±0.01 mm is not a precise drawing. It is an expensive one.
5. **Thread depth on blind holes.** The first three threads of any tapped blind hole are never full form. If you cannot accept that, say it.

Every missing item becomes one of two things: a guess, or another email. Both are bad — the first gives you a wrong price, the second gives you a slow one.

## Station 2 — DFM: where the money is actually decided

DFM means design for manufacture. In plain words: *is this part shaped in a way that a machine can make without fighting it?*

This station takes an experienced engineer ten to thirty minutes. It is the highest-value ten minutes in the entire chain, because **by the time the drawing is frozen, roughly 70% of the part's cost is already locked in.** Nothing downstream can undo a bad decision made here.

Four things quietly multiply a price:

**1. Sharp internal corners.** An end mill is round, so it physically cannot leave a sharp corner. Ask for a 0.5 mm radius in a pocket and we have to drop to a tiny cutter, take shallow passes, and the cutting time can go up three or four times. Give us R3 or larger and a Ø6 or Ø8 cutter walks through it in one go.

**2. Deep pockets.** A cutter hanging far out of its holder deflects and chatters. The practical limit is a pocket depth around three to four times the cutter diameter. Deeper than that means smaller cutters, slower feeds, more passes — or a different process entirely.

**3. Tight tolerance everywhere.** Machining holds ±0.05 mm comfortably. Getting to ±0.01 mm means light finishing passes, more measurements, and a slower cycle. Below ±0.005 mm you are usually looking at grinding, not milling. Mark the three faces that actually mate with something. Let the rest be ordinary.

**4. Thin walls.** Aluminium under about 1 mm will move away from the cutter and ring. Holding it flat takes reduced parameters, extra passes, sometimes a temporary rib that has to be removed afterwards.

> The drawing is the cheapest place to change a part and the most expensive place to get it wrong. A ten-minute DFM conversation can remove 30% from a quote. Nothing else in this chain can.

This is also why a supplier who asks you questions before quoting is worth more than one who sends a number in nine minutes.

## Station 3 — Material

Material cost is not the price of the metal in your finished part. It is the price of the **block we have to start from**.

Take a housing that ends up 120 × 80 × 25 mm. We do not buy that shape. We buy a sawn block slightly larger on every face, clamp it, and mill away everything that is not your part. On a part like that, somewhere between 40% and 60% of the block ends up as chips — recyclable, but only at scrap value.

So the rule of thumb: **material cost is roughly twice the cost of the metal actually in the finished part.** This is also why a part that is 5 mm larger in one direction can cost noticeably more — you just moved into a bigger standard blank.

If you are choosing between grades, we wrote about that separately: [6061 vs 7075 aluminium](/knowledge/tech-blog/6061-vs-7075-aluminum-choose/).

## Station 4 — Process and machine

Now we decide which machine makes it, and how many times it has to be clamped.

A round part goes on a lathe. A flat plate with pockets goes on a 3-axis mill. Features on several faces argue for a rotary fourth axis. A true sculpted surface needs five. Hardened steel or a razor-sharp internal corner pushes you toward wire EDM. A tolerance tighter than cutting can hold needs grinding.

The instinct to say "just use the 5-axis" is almost always wrong, for three reasons: it is the busiest machine in the shop, its hourly rate is several times a 3-axis, and more axes means more error sources to compensate.

We wrote a full guide to this station: [Which CNC machine does your part actually need?](/knowledge/tech-blog/which-cnc-machine-for-your-part/)

## Station 5 — Programming

Someone has to translate the geometry into a set of instructions a specific machine can execute: which cutter, which path, what speed, what feed, in what order, and how the part is held for each operation.

On a simple bracket this is half an hour. On a five-axis impeller with custom fixturing it can be a full day or more.

**This is a fixed cost.** It is the same whether you order one part or two hundred — which is the single most important fact for understanding small-batch pricing, and we will come back to it at Station 10.

## Station 6 — Machining

The part gets clamped, the program runs, chips come off.

The number that matters here is not the cutting time. It is **cutting time × number of setups**. Every time a part is unclamped, turned over and re-clamped, you pay twice — once in handling time, and once in the tolerance you lose with each new datum.

There is also a first-article proving-out: the first part off the machine gets measured, offsets get corrected, and only then does the rest of the batch run. On a ten-piece job that first part can be a meaningful slice of the total time.

## Station 7 — Surface treatment — the lead-time black box

Bare machined aluminium is not usually the finished product. Common options:

- **Anodising (Type II)** — a controlled oxide layer, typically 5–25 µm. Corrosion resistance, and it takes dye, which is where black, red and blue parts come from.
- **Hard anodising (Type III)** — 25–100 µm, much harder, used on wear surfaces.
- **Bead blasting** — a uniform matte texture, often before anodising.
- **Electroless nickel plating** — for wear, solderability, or uniform coverage in blind features.
- **Passivation** — for stainless steel, removing free iron so it resists rust.
- **Heat treatment** — solution treating, ageing, hardening; changes the material, not the surface.

Here is the part nobody puts in the brochure: **most of these are not done in the machine shop.** Your parts go into a van and join somebody else's queue. That queue is invisible to your supplier, it moves for reasons your supplier does not control, and it is the single most common reason a "two-week" delivery becomes five.

Ask two questions about any finishing operation: *who does it*, and *what is their queue today*. A shop that cannot answer the second one is guessing.

## Station 8 — Inspection

Measuring is a ladder, and each rung costs more:

| Tool | Realistically holds | Used for |
|---|---|---|
| Caliper | ~±0.02 mm | Quick checks, non-critical dimensions |
| Micrometer | ~±0.005 mm | Diameter and thickness |
| CMM | a few µm plus a length term | Anything geometric — position, flatness, profile |
| Optical / surface tester | down to sub-µm | Roughness, fine features |

Then there is the paperwork. A **first article inspection report** records what was measured on the first part and what it read. A **material certificate** traces the raw stock back to its mill heat. Aerospace and medical buyers need both. A prototype on a bench usually needs neither — and asking for full documentation you do not need is a real cost.

## Station 9 — Packing and shipping

Aluminium survives shipping well. Steel does not — it will flash-rust in a humid container if it ships bare. So steel parts get oiled or wrapped, everything gets separated so parts do not knock against each other, and anything heavy or precision-finished goes in a crate rather than a carton.

For export there is paperwork: commercial invoice, packing list, HS code, sometimes a certificate of origin. Getting the HS code wrong is a delay at customs, not at the factory — but your customer will blame the factory.

## Station 10 — The quote: where the number comes from

This is the station everybody actually wants to see. So let's open one up.

**The example part:** a 6061-T6 aluminium housing, roughly 120 × 80 × 25 mm, two pockets, eight tapped holes, a few counterbores, bead blasted and black anodised. Quantity: 10.

Here is how the money typically splits on a part like that:

| Line | Share of the quote | What it pays for |
|---|---|---|
| Raw material | 15% | The blank — including the ~50% that becomes chips |
| Machine time | 30% | Cutting, at the 3-axis hourly rate |
| Programming + setup | 15% | CAM, fixturing, first-article proving out |
| Tooling and consumables | 4% | Cutters, coolant, workholding |
| Outsourced anodising | 10% | The finishing vendor's charge, plus the freight to them |
| Inspection | 5% | Measuring and the report |
| Packing and shipping | 4% | Materials, crate, documentation |
| Overhead and margin | 17% | Everything else, and the reason the shop exists |

Now the part that explains almost every pricing surprise in small-batch machining. **Look at which lines are fixed and which scale with quantity.** Programming, setup and first-article proving-out cost roughly the same whether you order 10 or 200.

| Cost element | 10 pcs | 50 pcs | 200 pcs |
|---|---|---|---|
| Material, per part | 100 | 100 | 95 |
| Machine time, per part | 100 | 88 | 78 |
| Programming and setup, per part | 100 | 20 | 5 |
| **Unit price index** | **100** | **≈ 60** | **≈ 45** |

*(Indexed to the 10-piece unit price. Machine time improves modestly at volume because of better nesting and optimised toolpaths — not because anyone works faster.)*

That is the whole story of why ten pieces cost so much more per piece than two hundred. The metal is the same. The cutting is nearly the same. What changes is how many parts the one-off engineering cost is divided across.

**The three things that move the number more than anything else**, in order:

1. **Quantity** — because of the table above.
2. **Tolerance** — every halving of a tolerance band is not a small surcharge, it is a different process.
3. **Finishing** — because it adds cost *and* hands your schedule to someone else.

Everything else — the shop's location, its hourly rate, how hard you negotiate — is noise compared to those three.

## The one thing worth remembering

If you take a single idea from this guide, take this one:

**The first two stations take about 5% of the calendar time and decide about 70% of the cost.**

Everything after Station 2 is execution. The money was committed the moment the drawing was frozen. Which means the cheapest thing you can ever do for your budget is to ask a machinist to look at your design *before* it is final — not to get a quote faster, but to find out which dimension on that drawing is quietly costing you 30%.

## Frequently asked questions

**Why is my ten-piece price so much higher per piece than a hundred-piece price?**

Almost entirely the fixed cost: programming, fixturing and first-article proving-out. They cost the same regardless of quantity, so at ten pieces each part carries a tenth of them, and at a hundred each carries a hundredth. Material and cutting barely change.

**What can I do myself to lower the price?**

In rough order of impact: enlarge internal corner radii, loosen tolerances on anything that does not mate, reduce the number of setups by designing features that can be reached from fewer directions, specify standard material sizes, and skip finishing on surfaces nobody sees.

**One supplier quoted half of everyone else. What is going on?**

Usually one of three things: they missed something on the drawing, they are planning to run it on a process that will not hold your tolerances, or they are quoting a different quantity or material than you think. Ask them which machine it will run on and how many setups. The answer tells you very quickly.

**How long should a quote take?**

For a straightforward part with complete files, a real shop should be back to you within a working day, and often within hours. Much faster than that usually means the number came from a formula rather than a human reading your drawing. Much slower means your job is at the bottom of a stack.

**Do I need an NDA before sending drawings?**

If the part is genuinely novel, yes — and any serious shop will sign one without argument. For the overwhelming majority of brackets, housings and fixtures, the design is not the secret; the product it goes into is.

## Where we fit

We run 30 CNC machines in Shenzhen, including true 5-axis, alongside turning and the finishing network that surrounds them — anodising, plating, heat treatment, grinding, wire EDM.

But the reason we wrote this guide is not the machine list. It is that we would rather you arrive already knowing which questions to ask. A customer who understands the chain asks better questions, sends better files, and gets parts that fit the first time. That is worth more to both of us than a fast yes.

Send us the STEP and the PDF. We will tell you which machine your part should run on, where the money goes, and — if there is a cheaper way to make it — what to change.

[Get a free DFM review and quote](/contact/get-a-quote)

*Related: [How to choose a CNC machining supplier in China](/knowledge/tech-blog/how-to-choose-cnc-supplier-in-china/) · [Material selection for robot parts](/knowledge/tech-blog/robot-parts-material-selection-cost-guide/)*
