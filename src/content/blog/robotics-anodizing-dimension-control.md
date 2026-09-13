---
title: "Anodising Robot Parts: The Dimension Trap Nobody Draws"
description: "Anodising is the one station where the part comes back a different size than it left. Film thickness versus fits, why internal threads seize, why batch two never matches batch one, and the exact note to put on your drawing."
pubDate: 2026-09-10
category: "Machining Tips"
tags: ["robotics", "anodizing", "hard anodize", "surface finishing", "dimensional control", "robot parts"]
author: "Eternal CNC Engineering Team"
readingTime: "9 min read"
system: "robotics"
---

In [the ten-station walk](/knowledge/tech-blog/from-drawing-to-cost/) we called surface treatment the station most likely to decide your delivery date. This article is the reason why, and it comes down to one physical fact:

**Anodising is the only step in the chain where the part comes back measurably a different size than it left.**

Everything else — milling, turning, drilling — removes material in a place you chose, at a moment you chose, on a machine you can see. Anodising grows a layer on every bare surface at once, including the surfaces you just spent four setups getting to H7.

Robot parts are unusually exposed to this, because a robot joint is a dense pile of fits: bearing bores, locating spigots, dowel holes and a lot of small threads, all crowded onto a housing typically 60–130 mm across, with adjacent features often only a few millimetres apart.

## Half out, half in

An anodic coating isn't paint sitting on top of the metal. It's aluminium that has been converted into aluminium oxide, and the oxide takes up more room than the metal it came from. The practical result, and the number you need:

**Roughly half the coating thickness grows outward, half eats inward.**

So the surface moves outward by about half the coating thickness. Which means on any diameter — a shaft grows, a bore shrinks — by roughly the full coating thickness.

| Spec | Coating thickness | Surface moves | Change on a Ø |
|---|---|---|---|
| Type II, 8 µm | 8 µm | +4 µm | shaft +8 / bore −8 |
| Type II, 12 µm | 12 µm | +6 µm | shaft +12 / bore −12 |
| Type III hardcoat, 25 µm | 25 µm | +12 µm | shaft +25 / bore −25 |
| Type III hardcoat, 50 µm | 50 µm | +25 µm | shaft +50 / bore −50 |

Now hold that against a real callout. **Ø30 H7 is +0.021 / 0 mm — a 21 µm band.** A 25 µm hardcoat is larger than the entire tolerance zone. That is not a tolerance problem you can machine your way out of; it's a design decision that was made when somebody wrote "hard anodize" in the title block without reading the rest of the drawing.

The fix is simple and has to happen before the part goes in the tank: **machine the bore oversize by the coating thickness, or mask the bore.** What doesn't work is hoping.

## The five things that actually break

Anodise a whole robot joint "all over" and these are the failures we see, roughly in order of frequency:

1. **Internal threads.** The number one reject, by a wide margin. More below.
2. **Sliding and press fits.** A shaft in a bore with 0.02 mm clearance is interference after hardcoat. It goes from "nice fit" to "assembly needs a hammer."
3. **Bearing bores and locating spigots.** The two features robotics cares most about, and the two that move the most.
4. **Grounding and electrical contact faces.** Anodic coating is an electrical insulator — that's half of why it resists corrosion. A robot assembled from fully anodised mating faces has no reliable ground path, and then you chase EMC problems that aren't really EMC problems.
5. **Fatigue-critical surfaces under hardcoat.** The coating is hard and brittle. Under cyclic load it cracks, and those cracks start cracks in the aluminium underneath. Hard anodising is widely reported to reduce fatigue strength of the substrate, alloy-dependent and significantly so on the high-strength grades. Robot links and joint arms are cyclically loaded by definition. Think before you hardcoat a part that flexes.

## Threads: four ways out, none free

For an internal thread, the coating builds on the flanks, and because the flanks are angled the pitch diameter moves by noticeably more than the coating thickness — call it 1.2× as a working rule. A 12 µm Type II costs you roughly 15 µm of pitch diameter. A 25 µm hardcoat costs roughly 30 µm, which on an M4 or M5 6H thread is enough to reject the gauge.

Four fixes, in the order we usually recommend them:

| Option | What it costs you |
|---|---|
| **Mask the holes** (plugs or caps) | Handwork, so money per hole, and plugs occasionally leak. Reliable, and the only option that leaves the coating intact elsewhere. |
| **Tap oversize before anodising** | Free in unit cost, needs the right tap (an "anodising oversize" or high-limit tap) and a one-off trial to size it. Our default on volume work. |
| **Chase the thread after** | Cheap and immediate — but it cuts through the coating into bare aluminium, so you've created the corrosion path you anodised to avoid. |
| **Thread insert after anodising** | Best wear and corrosion result. Costs an insert per hole and needs the boss wall thick enough. |

The design-level answer, if you can still change the part: **don't anodise the threads at all.** Use clearance holes with nuts, or put the threads in a steel insert or a separate bracket. Every threaded hole you delete from the anodise note is a hole you don't pay to mask, plug, chase or scrap.

## Colour: why batch two never matches batch one

Robot parts are visible parts. Black anodised arms and end effectors sit in trade-show photos and on customer floors, and colour mismatch is the complaint that arrives after everything else is perfect.

Anodising is translucent, not opaque, and the dye sits in the pores. So the final colour is a product of the alloy underneath as much as the dye:

- **Alloy.** 6061 anodises clean and predictable. 7075 goes visibly darker and greyer thanks to the zinc. 2xxx (high copper) tends yellow-brown. Cast alloys with high silicon go blotchy grey no matter what you do.
- **Temper and heat history.** Over-aged material shifts. So can a weld or a heavily heat-affected zone right next to an unheated area.
- **Material lot.** Two bars of 6061-T6 from different heats, same machine, same tank, same day — still a visible step. If you care, **buy the spare parts' material with the production material**, and anodise them in the same rack.
- **The line itself.** Bath temperature, current density, dye concentration and bath age, sealing time. A good anodiser controls these tightly; "tightly" is not "identically, six months later."
- **The surface underneath.** This is the one people forget. **Anodising does not hide tool marks — it preserves them, and the gloss often makes them more visible.** A 3.2 Ra as-machined face stays a 3.2 Ra face. If you want a uniform look across a batch, specify the pre-finish (bead blast grit, or a defined Ra) as explicitly as you specify the colour.

The only reliable commercial answer is an **approved sample**: one part signed off, kept as the reference, with subsequent batches quoted and checked against it. Anything else is a comparison of adjectives.

## What to write on the drawing

The default in every anodising shop is "anodise everything bare." That default is what causes the surprises, so write the note as a list of **exclusions**, not inclusions:

```
ANODISE: MIL-A-8625 TYPE II, CLASS 2, BLACK
COATING THICKNESS: 8–12 µm
MASK (NO COATING):
  – ALL THREADS M3 THROUGH M6
  – BORE Ø30 H7 (BEARING SEAT)
  – DATUM A FACE (ELECTRICAL BONDING)
  – DOWEL HOLES Ø6 H7
RACK CONTACT: NON-CRITICAL FACE, OPPOSITE DATUM B
COLOUR: MATCH APPROVED SAMPLE S-2417
```

Three notes on that block:

- **Give the thickness range, not just the type.** "Type II" permits anything from 5 to 25 µm, and that range is the difference between a fit that works and one that doesn't.
- **Say where the rack may touch the part.** Parts have to be electrically contacted to be anodised, so there will be contact marks. If you don't say where, the operator chooses, and operators choose the big flat face you were going to look at.
- **Masking is handwork and it's quoted per feature.** A drawing with a complete exclusion list comes back cheaper and sooner than one that gets revised after the first article fails.

## Frequently asked questions

**Can you just machine everything to final size and anodise thinner?**

You can go thinner, and for a cosmetic-only finish 5 µm is often enough. But thinner means less wear and less corrosion protection, and it doesn't change the arithmetic — it just shrinks the number you still have to compensate for. The compensation step is unavoidable; only its magnitude is negotiable.

**Does anodising affect the dimensional tolerance on the parts we already made?**

It changes the size, so yes. If a bore was measured at Ø30.010 before anodising, it will measure about Ø29.998 after a 12 µm Type II. Measure after anodising for anything that matters, and state on the drawing whether the tolerance applies before or after coating — most drawings don't, which is why this argument happens at goods-in.

**Can you strip and re-anodise a part that came out wrong?**

Usually yes, once. Stripping removes a thin layer of aluminium along with the coating, so a second strip often takes the part out of tolerance. Treat re-work as one shot, not a loop — and don't plan a process that depends on it.

**Is hardcoat always better for robot parts?**

No. Hardcoat is for wear — sliding surfaces, gripper jaws, anything that rubs. It's thicker (so worse for dimensions), darker and less consistent in colour, and it costs fatigue life. Most robot structural parts want Type II. The ones that want Type III know why.

## Where we fit

We machine the pre-anodise dimensions, run a masking plan off your drawing, and measure the parts after they come back from the tank — because that's the number your assembly sees. When a callout and a coating spec are in conflict, we'd rather flag it during DFM than ship parts that gauge correctly in our inspection room and bind on your floor.

Send the STEP and the PDF. If there's an anodise note on it, we'll tell you what it does to your fits before we quote.

[Get a free DFM review and quote](/contact/get-a-quote)
