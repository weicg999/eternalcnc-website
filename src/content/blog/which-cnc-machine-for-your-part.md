---
title: "Which CNC Machine Does Your Part Actually Need? (And a Short History of How We Got Here)"
description: "3-axis, 4-axis, 5-axis, turning, mill-turn, wire EDM or grinding — which machine should make your part? Match your geometry to the right process, plus a 70-year tour from punched tape to AI."
pubDate: 2026-09-10
category: "Machining Tips"
system: "general"
tags: ["CNC machining", "5-axis", "wire EDM", "CNC turning", "machine selection", "manufacturing history"]
author: "Eternal CNC Engineering Team"
readingTime: "11 min read"
---

## The question we get every week

An engineer sends us a drawing and asks: *"Which machine should this go on?"*

It sounds like a technical question. It's really a cost question. The same bracket can be cut on a 3-axis mill for $40 or on a 5-axis for $160 — and if the part doesn't need the 5-axis, that extra money bought you nothing except a slower quote and a longer queue.

So let's answer it properly: start from the geometry of your part, not from the machine list. Then we'll walk through what each machine actually does well. And because the answer "it depends on the machine" only makes sense if you know what those machines came from, we'll close with a short tour of how CNC got here — from punched paper tape to the AI-assisted shop floor.

> This is one station in a longer walk. [From Drawing to Cost](/knowledge/tech-blog/from-drawing-to-cost/) follows a single part through all ten stations — from the file you send to the number on the quote — and breaks the quote open at the end.

## Start from the part, not the machine

Before thinking about machines, look at what your part actually asks for:

| If your part is… | The natural first choice is… | Because |
|---|---|---|
| A cylinder, a shaft, a bushing, anything with a thread | **CNC turning** (lathe) | The part spins; the tool doesn't have to |
| A flat plate, a housing, pockets, a pattern of holes on one face | **3-axis VMC** | One setup covers 80% of prismatic parts |
| Features on multiple faces, or holes around a diameter | **4-axis** (rotary) | Indexing beats re-fixturing |
| A complex surface, an impeller, deep cavity with undercuts | **5-axis** | The tool tilts, so one setup reaches everything |
| A hard material, a sharp internal corner, a narrow slot | **Wire EDM** | A spark doesn't care about hardness |
| Tight tolerance on a hardened surface (±0.002 mm level) | **Precision grinding** | Grinding is how you get past what cutting can hold |
| A small turned part that also needs milled flats or cross-holes | **Mill-turn / Swiss-type** | Complete the part in one machine, one cycle |

The pattern: **the more setups you need, the more you should be looking up this table.** Every time a part is unclamped and re-clamped, you pay twice — in time and in accumulated tolerance.

## The machine lineup, and what each one is actually for

### 3-axis vertical machining center (VMC)

The workhorse. The tool moves in X, Y, and Z; the part sits still.

**Good at:** pockets, faces, drilled and tapped hole patterns, slots, 2D and simple 3D contours, enclosures, brackets, heat sinks, fixture plates.

**Not good at:** anything on the underside or a steep side wall — that needs a second setup. Deep cavities with undercuts are simply out of reach.

**Cost:** lowest per hour. This is where most parts should be made.

### 4-axis (add a rotary)

Same mill, but the part can rotate. Usually indexing — rotate 90°, cut, rotate again — though some jobs use simultaneous 4th-axis motion.

**Good at:** features on several faces in one setup, holes or slots around a cylinder, cam profiles, long parts that would otherwise need multiple fixtures.

**Not good at:** true complex surfaces — indexing is not the same as continuous multi-axis motion.

**Cost:** modest step up from 3-axis; saves real money whenever it avoids two extra fixtures.

### 5-axis

Two rotary axes on top of X-Y-Z, moving simultaneously. The cutter can approach the part from nearly any angle.

**Good at:** impellers and blisks, turbine blades, medical implants and bone plates, mold cavities with deep ribs, aerospace structural parts, deep pockets with draft, and anything where five separate 3-axis setups would stack up error.

**Not good at:** simple flat parts. Putting a bracket on a 5-axis is not better machining — it's just a more expensive machine doing a 3-axis job.

**Cost:** highest per hour. Worth it when it replaces setups, reaches geometry nothing else can, or holds a tolerance that re-fixturing would destroy.

> Our own 5-axis earns its keep on exactly those jobs — complex surfaces and one-setup parts. Everything else goes on a 3-axis, because that is the honest answer for the customer's budget.

### CNC turning (lathe)

The part rotates; a stationary tool cuts.

**Good at:** shafts, pins, bushings, couplings, threaded parts, round flanges, anything fundamentally round. Fast, accurate, and cheap on round features.

**Not good at:** flats, pockets, off-center holes — unless you step up to a mill-turn.

### Mill-turn and Swiss-type

A lathe with live tooling — milling cutters driven in the same machine, sometimes with a second spindle and a sub-spindle.

**Good at:** small complex parts that are mostly round but need flats, cross-holes, or slots: connector pins, bone screws, surgical instruments, hydraulic fittings, sensor housings.

**Why it matters:** the part is finished in one cycle. No queue between machines, no re-fixturing error, no waiting for the mill to free up.

### Wire EDM

A thin brass wire, sparks, and dielectric fluid. No cutting force at all.

**Good at:** hardened steel, carbide, narrow slots, sharp internal corners, precision 2D profiles, extrusion dies, and anything where mechanical cutting force would deflect the part or the tool.

**Not good at:** non-conductive materials, and it is slow on bulk material removal. It's a finishing and precision process, not a roughing one.

### Precision grinding

**Good at:** tolerances and surface finishes that cutting can't reach — bearing journals, hardened shafts, gauge blocks, sealing faces, mirror finishes.

**The trade:** it's usually a second operation after heat treatment, which means another hand-off and another schedule. Only pay for it where the print demands it.

## A short history of how we got here

The machine lineup above didn't appear all at once. Each generation of control technology unlocked a new class of parts.

| Era | Milestone | What it unlocked |
|---|---|---|
| Late 1940s | John T. Parsons, working with MIT's Servomechanisms Lab, drives a machine from punched cards to mill helicopter rotor blades | Complex curves without a human hand on the wheel |
| **1952** | MIT publicly demonstrates the first NC (numerical control) milling machine, running on punched paper tape | A "program" could direct a machine tool for the first time |
| Late 1950s | MIT develops APT; EIA later standardizes RS-274 | The ancestor of today's G-code — one language, many machines |
| 1970s | Microprocessors arrive: true **CNC**, with memory and DNC networking | Programs could be stored, edited and sent — no more re-reading tape |
| 1980s | PC-based CAD/CAM reaches the shop (Mastercam ships in 1984) | Programming moved from the shop floor to a screen, with toolpaths you could see before cutting |
| 1990s | High-speed spindles, real 5-axis motion, coated carbide tools | Harder materials, deeper cavities, surfaces finished in one setup |
| 2000s | Networking, MES integration, automatic tool changers and pallet pools | Machines became schedulable assets instead of islands |
| 2010s | Simulation and digital twins, on-machine probing, robot loading | Mistakes moved into the computer, where they cost nothing |
| **2020s** | AI-assisted quoting, programming and customer response | Judgment — the last thing only humans did — starts to be software-assisted |

Two things stand out from that table.

**Every leap was about removing a bottleneck, not adding a feature.** Tape removed the operator's hand. CNC removed the tape. CAM removed the manual calculation. Simulation removed the crashed part. AI is now removing the waiting — the days between "drawing sent" and "price quoted."

**And capability got cheaper, not rarer.** A geometry that needed an aerospace budget in 1990 is a Tuesday job on a 5-axis in Shenzhen today. That's the real reason small-batch custom parts are economically possible now — not because machines got fancier, but because access to them did.

## Why the most capable machine is usually the wrong one

There's a temptation, especially with a difficult part, to say "just put it on the 5-axis."

Resist it, for three reasons:

1. **Queue.** The most capable machine in any shop is the busiest. Putting a simple part on it means waiting behind the parts that genuinely need it.
2. **Cost per hour, not per part.** A 5-axis hour costs several times a 3-axis hour. If the extra axes aren't doing work, you're buying idle capability.
3. **Tolerance is not free.** More axes mean more error sources to compensate. A well-fixtured 3-axis job can be *more* accurate on a simple feature than a complex 5-axis path.

The right question is never "what's the best machine for this part" — it's **"what's the simplest process that can hold these tolerances?"**

## Five questions before you spec a machine

1. **What is genuinely tolerance-critical?** Mark the surfaces that actually mate. Everything else can be looser, and looser means cheaper and faster.
2. **How many setups does the geometry force?** If the answer is three or more, ask whether a 4-axis or 5-axis would do it in one — the comparison often flips.
3. **Is the material hard, or does it get hardened later?** Hardened steel moves you toward grinding or EDM, and that adds a hand-off.
4. **Are there internal corners a round tool can't reach?** Sharp inside corners are where EDM earns its cost.
5. **What is the real quantity — now and next year?** A process that's wrong for two pieces may be perfect for two hundred.

## Frequently asked questions

**Is 5-axis always more accurate than 3-axis?**

Not inherently. 5-axis wins when it removes setups, because every re-clamp adds error. On a simple flat feature that a 3-axis can reach in one setup, there's no accuracy advantage — only a higher hourly rate.

**What is the difference between 3+2 machining and full 5-axis?**

In 3+2, the rotary axes position the part and then lock; the cutting happens with three axes. In full simultaneous 5-axis, all five move at once. 3+2 handles most angled features; true simultaneous motion is for continuous complex surfaces.

**Why does my part need wire EDM if the material is just steel?**

Usually for one of three reasons: the steel is hardened past what a cutter can handle, the internal corner radius is sharper than any end mill, or the wall is too thin to survive cutting force.

**Can one machine make a complete part?**

Sometimes. Mill-turn centers and Swiss-type machines finish complex round parts in a single cycle. For prismatic parts, "one machine" usually means accepting multiple setups — or paying for 5-axis to avoid them.

**How much does machine choice affect lead time?**

Often more than the machining itself. A part that needs three setups, an outside heat treatment and a grinder is waiting on three schedules. Simplifying the process is usually a bigger lead-time win than expediting the machine.

## Where we fit

We run 30 CNC machines in Shenzhen, including true 5-axis, alongside turning and the finishing network that surrounds them — anodizing, plating, heat treatment, grinding, wire EDM.

The honest version of our job is not "run it on the best machine we have." It's "look at your geometry, your tolerance and your quantity, and pick the simplest process that holds them." Sometimes that's the 5-axis. Most of the time it isn't, and telling you so is part of the service.

Send us the STEP or PDF and we'll tell you which machine your part should go on — and what it would cost on each. If the 3-axis can hold your tolerances, we'll say that, even though it's the cheaper quote.

[Get a free DFM review and quote](/contact/get-a-quote)
