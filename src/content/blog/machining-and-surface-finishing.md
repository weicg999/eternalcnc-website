---
title: "Machining and Surface Finishing: Where Most of the Calendar Actually Goes"
description: "A plain-language look at the two stations that eat the most time and money in a machined part — what happens on the machine, why finishing is outsourced, and the traps that catch first-time buyers."
pubDate: 2026-09-10
category: "Machining Tips"
system: "general"
tags: ["CNC machining", "surface finishing", "anodizing", "workholding", "heat treatment", "lead time"]
author: "Eternal CNC Engineering Team"
readingTime: "10 min read"
---

In [From Drawing to Cost](/knowledge/tech-blog/from-drawing-to-cost/) we walked the whole chain in one pass. This article zooms in on two of the ten stations — machining and surface finishing — because between them they account for most of the calendar time and most of the surprises.

Machining is the part everyone pictures. Finishing is the part everyone forgets, until it costs them two weeks.

## Part 1 — Machining

### Workholding is the real skill

Before a single chip is cut, someone decides how the part is held. Everything downstream depends on that decision.

The options form a ladder of cost and rigidity:

| Method | When it's used | Trade-off |
|---|---|---|
| Vise | Simple prismatic parts | Cheap, fast, but only grips two faces |
| Clamps / strap clamps | Large plates | Flexible, but takes time to set up |
| Vacuum plate | Thin sheet, non-magnetic | Holds the whole face; weak against side loads |
| Soft jaws (turned to fit) | Round or odd shapes on a lathe | Excellent concentricity; jaws are one-off |
| Dedicated fixture | Repeat jobs, volume | Expensive to make, then very fast per part |

The rule that matters: **a part is only as accurate as the way it's held.** A perfect program in a sloppy vise produces scrap.

### One setup beats three

Every time a part is unclamped, turned over and clamped again, two things happen: you lose time, and you lose accuracy. Here's why the second one matters more than people expect.

| Setups | Typical positional error between features |
|---|---|
| 1 | datum only — usually under 0.02 mm |
| 2 | adds re-clamping error — often 0.03–0.05 mm |
| 3+ | error stacks; holding 0.05 mm gets genuinely hard |

This is the technical reason behind the advice in [Which CNC machine does your part need?](/knowledge/tech-blog/which-cnc-machine-for-your-part/): if a geometry forces three setups, a 4-axis or 5-axis machine that does it in one is not a luxury — it is often the cheaper answer.

### Roughing, semi-finishing, finishing

Nobody cuts a part to final size in one pass, for two physical reasons:

1. **Heat and stress.** Heavy cutting puts heat and force into the part. Aluminium especially will move as internal stress relieves. Leave a small amount of stock, let it settle, then finish.
2. **Tool deflection.** A cutter under load bends slightly. A heavy roughing pass is accurate to maybe 0.1 mm. A light finishing pass, taking 0.2–0.5 mm, holds the tolerance you actually paid for.

The usual sequence: rough leaving 0.5–1 mm, semi-finish leaving 0.2–0.3 mm, finish to size. On tight-tolerance features there may be a spring pass — the cutter retraces the same path with no additional depth, just to clean up whatever the tool bent away from.

### The three numbers that govern everything

If you only learn three terms, learn these:

- **Vc** — cutting speed, in metres per minute. How fast the cutting edge moves through the material.
- **fz** — feed per tooth, in millimetres. How big a bite each cutting edge takes.
- **ap / ae** — depth and width of cut. How much of the cutter is engaged.

From Vc and the cutter diameter you get the spindle speed:

```
S (rpm) = 1000 × Vc / (π × D)
```

And from fz, spindle speed and the number of teeth you get the feed rate:

```
F (mm/min) = S × fz × Z
```

That is the whole chain: **material sets Vc, Vc sets rpm, rpm plus chip load sets feed.** Every "why is my part taking so long" question eventually lands on one of these numbers. Aluminium lets you run Vc high — several hundred m/min with carbide. Stainless forces it down dramatically, work-hardens if you linger, and that alone can triple the cycle time on an otherwise identical part.

### Chatter: when the part sings

Thin walls, deep pockets and long tool stick-out all have the same failure mode: the cutter or the wall vibrates. You hear it before you see it — a squeal or a rumble. The surface finish shows it as a regular ripple pattern.

The fixes are all expensive: shorten the tool, reduce depth of cut, slow the feed, add a temporary rib, or change the process. Which is why wall thickness is a DFM conversation, not a machining one.

### First article

The first part off the machine is never the first part you ship. It gets measured, offsets get corrected, and only then does the batch run. On a ten-piece job this proving-out can be a meaningful share of the total time — and it is a fixed cost, exactly like programming.

## Part 2 — Surface finishing

Machined parts leave the machine bare. Bare aluminium oxidises on its own, badly and unevenly. Bare steel rusts. Most parts need a deliberate surface, for one of these reasons: corrosion resistance, wear resistance, appearance, electrical behaviour, or a dimensional change.

### Aluminium: anodising

Anodising is not a coating. It grows an oxide layer *out of* the aluminium, so it cannot peel or flake.

- **Type II** — 5–25 µm. Standard decorative and protective anodising. Porous, so it accepts dye. This is where black, red and blue parts come from.
- **Type III (hard anodise)** — 25–100 µm. Much harder, used on wear surfaces. Naturally darker and harder to dye evenly.

**The trap nobody warns you about:** the layer grows both inward and outward, roughly half and half. A 20 µm anodic layer changes dimensions by around 10 µm per side. On a sliding fit or a threaded hole, that matters. Options are to machine to a pre-anodise size, mask critical features, or re-tap threads afterwards. Tell your supplier which features are critical *before* the first part is cut, not after.

**The second trap:** anodising does not hide anything. It amplifies. Tool marks, scratches and handling dings are all still there afterwards, and a dyed finish makes them more visible, not less. Cosmetic parts get bead blasted or brushed first, and even then, **colour varies between batches** — for a production run, approve a sealed sample.

Not all aluminium anodises equally. 6061 gives a clean, even colour. 7075 has more alloying content, tends to go slightly yellow, and is harder to colour-match. If a part is cosmetic and structural, that trade-off is worth reading about: [6061 vs 7075 aluminium](/knowledge/tech-blog/6061-vs-7075-aluminum-choose/).

### Aluminium: mechanical finishes

- **Bead blasting** — uniform matte, hides minor marks, standard before anodising.
- **Brushing / grain finishing** — directional satin lines, common on consumer product housings.
- **Polishing** — mechanical or chemical; mirror finishes need fine grits and careful handling afterwards.

### Steel and stainless

| Finish | Roughly | What it's for | Watch out for |
|---|---|---|---|
| Black oxide | ~1 µm | Mild corrosion resistance, black appearance, almost no dimensional change | Needs oil afterwards; not real protection alone |
| Zinc plating | 5–25 µm | Sacrificial corrosion protection on steel | Hydrogen embrittlement risk on hardened parts |
| Electroless nickel | 5–50 µm, very uniform | Wear, solderability, covers blind holes | More expensive; thickness is uniform by nature |
| Phosphate | 2–15 µm | Paint base, break-in wear layer | Not a finish on its own |
| QPQ / nitrocarburising | diffusion layer | Wear and corrosion on steel | Changes dimensions slightly; black in colour |
| Passivation (stainless) | no measurable build | Removes free iron so stainless won't rust | It's a cleaning step, not a coating |
| Electropolishing (stainless) | removes a few µm | Smooth, cleanable, burr-free | Removes metal — account for it in tolerances |

### Heat treatment

Sometimes the material itself has to change, not the surface:

- **6061-T6** — solution treated and artificially aged. If you weld or heavily machine it, you can lose temper locally.
- **17-4PH** — aged to H900, H1075 and other conditions, trading strength against toughness.
- **Steel** — anneal to soften for machining, then quench and temper to harden.

Hardening almost always adds a downstream operation, because a hardened part can no longer be cut economically. That means grinding or wire EDM after heat treatment — which means another hand-off, and another queue.

### Why finishing decides your delivery date

Here is the honest part. Most of these processes are **not done in the machine shop.** Your parts go into a van and join another company's queue.

That queue is invisible to your supplier, it moves for reasons your supplier does not control, and it is the single most common reason a "two-week" delivery becomes five. Machining time is predictable — it is arithmetic. Finishing time is a queue.

Two questions worth asking about every finishing operation on your print:

1. **Who does it?** In-house or outside vendor?
2. **What is their queue today?** Not "usually". Today.

A shop that cannot answer the second one is guessing, and the guess will be optimistic.

## What these two stations cost you

In the example we broke down in [From Drawing to Cost](/knowledge/tech-blog/from-drawing-to-cost/), machining was 30% of the quote and outsourced finishing 10%. The 10% understates its real impact, because finishing contributes disproportionately to *lead time* rather than to *price*.

If you want to shorten delivery, this is where the leverage is:

- **Drop a finishing operation you don't need.** An internal bracket rarely needs anodising.
- **Standardise the colour.** A custom colour match adds a setup at the anodiser.
- **Ask whether a mechanical finish will do.** Bead blast is faster than blast-plus-anodise.
- **Decide early.** Finishing booked at quotation time is a reservation. Finishing booked after the parts are cut is a queue number.

## Frequently asked questions

**Can I anodise a part after it's been assembled with other metals?**

Not usually. Anodising is a bath process — anything on the part sees the chemicals. Press-fit inserts, bushings and fasteners go in afterwards, or the features get masked (which costs time and can leak).

**Why are my black anodised parts slightly different from the last batch?**

Dye uptake varies with alloy composition, bath temperature, time and the surface condition before anodising. Even within one alloy, different heats can shift slightly. For production work, approve a sealed reference sample and specify it.

**Will anodising fix a scratched surface?**

No, it makes scratches more visible. Scratches have to be removed mechanically first — and removing them changes dimensions.

**How much material does electropolishing remove?**

Typically a few microns, but it removes more on edges and burrs than on flat faces, which is part of why it deburrs so well. If you have a tolerance tighter than about 0.01 mm on a feature, tell the vendor it's critical.

**Can hardened steel still be machined?**

Not economically with normal cutters. Once steel is hardened you are looking at grinding, wire EDM, or hard milling with specialised tooling. This is why the sequence matters: machine, *then* harden, *then* finish.

## Where we fit

We run 30 CNC machines in Shenzhen, including true 5-axis, alongside turning and the finishing network around them — anodising, plating, heat treatment, grinding, wire EDM.

The useful thing we can do for you is not to promise that finishing is fast. It is to tell you, when you send the drawing, which operations are in-house and which are outside, and what the outside queue looks like that week. A realistic date beats a fast one that slips.

Send us the STEP and the PDF and we'll tell you what the part needs, what it doesn't, and how long each step really takes.

[Get a free DFM review and quote](/contact/get-a-quote)
