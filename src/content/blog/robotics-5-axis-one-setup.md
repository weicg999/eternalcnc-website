---
title: "One-Setup 5-Axis Machining for Robot Parts: When It Pays, When It Doesn't"
description: "Robot structural parts are full of features on different faces that must be true to each other. Here's when a single 5-axis setup genuinely saves money — and when it's just an expensive machine doing a 3-axis job."
pubDate: 2026-09-10
category: "Machining Tips"
tags: ["robotics", "5-axis", "workholding", "one setup", "geometric tolerance", "robot parts"]
author: "Eternal CNC Engineering Team"
readingTime: "8 min read"
system: "robotics"
---

In the [previous article](/knowledge/tech-blog/robot-joint-and-flange-parts/) we made the case that geometric tolerance matters more than dimensional tolerance in robotics. This article is about the manufacturing consequence of that fact.

If what matters is where features sit *relative to each other*, then the number of times a part gets unclamped is not a scheduling detail. It's the tolerance budget.

## The problem with three setups

Take a typical joint housing: a bearing bore on the front face, a mounting spigot on the back, a cable gland threaded hole on the side, and a bolt circle around the front.

On a 3-axis machine that's three setups, minimum:

1. Clamp on the back, machine the front face, bore and bolt circle.
2. Flip, clamp on the front, machine the back spigot.
3. Put it in a vise or angle plate, machine the side hole.

Every flip costs time — but that's the small part. The real cost is that **each flip establishes a new datum**, and each new datum adds error between the features cut before and after it.

| Setups | Realistic error between features on different faces |
|---|---|
| 1 | governed by the machine — typically under 0.02 mm |
| 2 | re-clamping adds roughly 0.02–0.04 mm |
| 3+ | 0.05 mm and up, and it varies part to part |

That last row is the one that hurts. Not because the average is bad, but because the *variation* is. An assembly built from parts that each vary a little will sometimes bind and sometimes not — which is exactly what "repeatability problems" look like from the outside.

## What one setup changes

Put the same part on a 5-axis machine and rotate the part instead of re-clamping it. The bearing bore, the spigot and the side hole are all cut in one coordinate system.

Three things improve at once:

1. **Accuracy between features** — no new datum, so no accumulated re-clamping error.
2. **Time** — one clamping, one proving-out, no intermediate handling or waiting.
3. **Consistency across a batch** — the thing robotics actually buys. Every part comes off the same setup in the same coordinate system.

For a part where a bore must be concentric with a spigot on the opposite face, this isn't a nicety. It's often the only way to hold the callout without going to grinding.

## When it genuinely pays

Five-axis earns its rate in these situations:

- **Features on three or more faces that must be true to each other.** Concentricity, perpendicularity, true position across datums.
- **Angled features.** A port or boss at 30° off the main axis is awkward or impossible in three axes without a special fixture.
- **Deep cavities with draft.** Tilting the cutter keeps a short, rigid tool engaged instead of hanging a long one into a corner.
- **Complex structural parts.** Robot links and wrist bodies with lightening pockets on several faces.
- **Low volume.** When you're making 20, a dedicated multi-op fixture doesn't make sense, so one setup on a 5-axis is cheaper than three setups plus fixture design.

## When it doesn't

This is the part worth being blunt about, because a lot of money gets wasted here.

- **Flat plates with pockets on one face.** A 3-axis does this at a fraction of the hourly rate. Five-axis adds nothing.
- **Simple brackets.** Features on two faces where the tolerance between them is ±0.1 mm — re-clamping error is irrelevant at that number.
- **Long production runs.** Once you're making 500, a dedicated fixture amortised over the run wins on cost per part, and the fixture itself guarantees the consistency.
- **Parts that are mostly round.** That's a turning or mill-turn conversation, not a 5-axis one.

The rule we keep repeating: the question is never "what's the best machine for this part" but **"what's the simplest process that can hold these tolerances?"** Sometimes that's the 5-axis. Most of the time it isn't, and a supplier who says so is saving you money rather than upselling you.

The full argument, including why the most capable machine is often the wrong one, is in [Which CNC machine does your part need?](/knowledge/tech-blog/which-cnc-machine-for-your-part/).

## 3+2 versus full 5-axis

Worth knowing the difference, because the prices differ and most robot parts only need one of them.

- **3+2 (positional):** the rotary axes position the part at an angle, then lock. Cutting happens with three axes. Handles angled holes, angled faces, and multi-face work where each feature is individually simple.
- **Full simultaneous 5-axis:** all five axes move at once. Needed for continuous sculpted surfaces — impellers, turbine blades, complex organic shapes.

**Almost every robot structural part is a 3+2 job.** You need the part rotated, not the cutter dancing. Knowing this saves real money, because shops sometimes quote simultaneous 5-axis work when positional would do.

## What to put on the drawing

If you want a supplier to quote one-setup work honestly, tell them three things:

1. **Which feature is the datum.** A, B, C in that order.
2. **Which relationships actually matter.** "Bore Ø30 concentric with spigot Ø25 within 0.02" is a complete instruction. "±0.01 on all dimensions" is not.
3. **That the relationship matters more than the individual sizes.** This is the sentence that lets us choose process instead of just following decimals.

## Frequently asked questions

**Is 5-axis always more accurate than three setups on a 3-axis?**

For relationships between features on different faces, yes — because it removes the re-clamping error entirely. For a single feature machined in one setup on either machine, there's no accuracy difference; there's only a higher hourly rate.

**Can you hold concentricity across a long part on a 5-axis?**

Within the machine's working envelope, generally yes — and considerably better than with multiple setups. Beyond the envelope, the part needs to move regardless, and then it becomes a fixture and datum question again.

**Does one-setup machining cost more per hour but less per part?**

Often, yes. The hourly rate is higher, but you remove two clampings, two handlings and a proving-out, and you scrap less. On complex parts the total usually comes out lower. On simple parts it doesn't, which is why the honest answer is always part-specific.

**We only need ten parts. Is fixture design even worth it?**

Usually not. That's precisely where one-setup 5-axis beats the "cheaper" 3-axis route: you get fixture-grade consistency without paying for a fixture you'll use once.

## Where we fit

We run true 5-axis alongside 3- and 4-axis in Shenzhen, and we put robot parts on whichever one the geometry actually justifies. If your part is a 3+2 job we'll quote it as one, not as simultaneous 5-axis — and if a 3-axis can hold your tolerances we'll say that, even though it's the cheaper quote.

Send the STEP and the PDF and we'll tell you what your part genuinely needs.

[Get a free DFM review and quote](/contact/get-a-quote)
