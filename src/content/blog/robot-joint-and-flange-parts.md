---
title: "Robot Joint and Flange Parts: What Actually Gets Machined (and What This Industry Really Cares About)"
description: "A tour of the parts inside a robotic arm — joint modules, reducer housings, end effectors, links, AGV plates — and the four requirements that shape every one of them: weight, repeatability, fatigue life, and geometric tolerance."
pubDate: 2026-09-10
category: "Machining Tips"
tags: ["robotics", "robot parts", "joint module", "reducer housing", "end effector", "tolerance"]
author: "Eternal CNC Engineering Team"
readingTime: "9 min read"
system: "robotics"
---

Take a six-axis industrial arm apart and you'll find somewhere between 40 and 80 machined parts. Not castings, not mouldings — machined. And almost none of them are simple.

This article is a tour of those parts, and more importantly, of the four requirements that shape all of them. If you're new to robotics sourcing, start here.

## The parts inventory

| Assembly | Typical machined parts | Features that drive the cost | Common materials |
|---|---|---|---|
| **Joint module** | Harmonic reducer planet carrier, bearing seat, output flange, cable routing ring | Bearing bore concentricity, thin walls, tight bolt circles | 7075-T6, 4140 steel, Ti-6Al-4V |
| **Reducer** | RV reducer housing, cycloidal disc, input/output shafts, mounting plate | Gear seat true position, sealing face flatness | 20CrMnTi, 40Cr, 6061-T6 |
| **End effector** | Gripper base, suction cup manifold, tool changer adapter, finger mounts | Light weight, complex mounting pattern, no burrs | 6061-T6, POM, 303 stainless |
| **Link / arm** | Structural link, forearm casting substitute, wrist body | Long thin geometry, weight reduction pockets, distortion control | 6061-T6, 7075-T6, carbon-filled alternatives |
| **Sensor bracket** | Encoder mount, vision camera bracket, force sensor adapter | Positional accuracy relative to a datum, stiffness | 6061-T6, brass, engineering plastics |
| **Mobile base (AGV/AMR)** | Chassis plate, motor mount, wheel hub, sensor tower | Large flat faces, many hole patterns, flatness over a big area | 6061-T6, 5052, steel plate |

If you only remember one row, remember the joint module. It is where tolerance, material and cost all collide.

## What this industry actually cares about

Four things. Everything in a robotics drawing traces back to one of them.

### 1. Weight — because it multiplies

A gripper that is 300 g heavier is not 300 g of extra cost. It reduces the payload the arm can carry, or forces a larger arm, or slows the cycle time to protect the reducers. Weight at the end of an arm is paid for several times over.

This is why robotics parts are full of pockets, ribs and lightening holes, and why 7075 (stronger, so you can use less of it) often beats 6061 (cheaper per kg) on end-of-arm parts despite the higher material price. It's also why thin walls show up everywhere — and thin walls are the most expensive feature on this list.

We wrote about the material trade-off in detail: [Robot parts materials: what to use for every component](/knowledge/tech-blog/robot-parts-material-selection-cost-guide/).

### 2. Repeatability, not just accuracy

A single beautiful part is easy. The hard requirement in robotics is that part number 200 measures the same as part number 1 — because an arm is assembled from parts that were machined in different weeks, and the assembly has to hit its repeatability spec every time.

In practice this shifts the conversation from *can you make one* to *how will you hold this across a batch*. It means fixtures, documented setups, and measuring the features that actually determine assembly — not just the dimensions that are easy to check.

### 3. Fatigue — the quiet killer

Robot parts see millions of load cycles. Fatigue cracks start at stress concentrations, and stress concentrations are almost always the least glamorous feature on the drawing: an internal corner with too small a radius, a tool mark across a loaded surface, a thread that runs out into a fillet.

Three DFM habits matter more here than in almost any other industry:

- **Generous internal radii on loaded pockets.** A sharp corner is a crack starter.
- **Surface finish on load-bearing fillets.** A rough toolpath leaves micro-notches.
- **No abrupt section changes.** The transition from a thick boss to a thin web is where cracks begin.

None of these are expensive if they're in the design. All of them are expensive if they get discovered in testing.

### 4. Geometric tolerance beats dimensional tolerance

A bracket can have every dimension in tolerance and still assemble badly, because what matters is *where features sit relative to each other*:

- **Concentricity** between a bearing bore and a mounting spigot
- **Perpendicularity** of a flange face to its axis
- **True position** of a bolt circle relative to a datum

These are the tolerances that decide whether a joint binds, whether a reducer wears unevenly, and whether the arm's repeatability spec holds after 6 months.

The practical implication: **datum structure matters more than the number of decimal places.** Tell us which feature is the datum, and what it must be true to. That's worth more than tightening every dimension.

If you want the general version of this argument, it's Station 2 of [From Drawing to Cost](/knowledge/tech-blog/from-drawing-to-cost/) — the part about marking only the surfaces that actually mate.

## A note on cost structure

Robotics work is typically **high mix, low volume**: many part numbers, ten or twenty of each, revised constantly. That has a specific consequence that surprises people coming from consumer hardware.

The dominant cost is often not cutting time. It is **changeover** — new program, new fixture, new first article, every time the part number changes. Twenty parts across five numbers costs meaningfully more than twenty parts of one number, even if the total metal removed is identical.

What helps, in order:

1. **Freeze the design for a batch** rather than revising between every five pieces.
2. **Common features across part numbers** — same bolt pattern, same thread spec, same corner radii.
3. **Order in sensible lots.** The [quantity table in From Drawing to Cost](/knowledge/tech-blog/from-drawing-to-cost/) applies here more than anywhere: going from 10 to 50 barely changes the metal, but it changes everything about the per-part overhead.

## Frequently asked questions

**Why is a thin-walled aluminium link so much more expensive than it looks?**

Because thin walls fight the cutter. Holding 1 mm walls flat requires reduced parameters, extra passes, and sometimes temporary ribs that get removed in a later operation. A 2 mm wall is dramatically cheaper than a 1 mm wall. If the design can take it, that's the single cheapest change available.

**Do robot parts need heat treatment?**

Gear and shaft parts in steel, yes. Aluminium structural parts usually rely on the T6 temper of the raw stock — but heavy material removal can relieve stress and cause movement, which is why stress relief before finishing is common on precision parts.

**How tight do tolerances really need to be?**

Bearing fits and gear seats: genuinely tight, often ±0.005–0.01 mm on the critical feature. Brackets, covers and sensor mounts: usually ±0.05 mm is fine. The mistake is applying the first number to everything.

**Can you hold concentricity between features on opposite sides of a part?**

Yes, but it usually means one setup. That's the subject of the next article in this series: [one-setup 5-axis machining for robot parts](/knowledge/tech-blog/robotics-5-axis-one-setup/).

## Where we fit

We machine robot parts in Shenzhen on 30 CNC machines including true 5-axis, with turning and the finishing network around them. We do a lot of high-mix, low-volume work, which means we're used to the changeover economics described above rather than surprised by them.

Send the STEP and the PDF. We'll tell you which features are driving your cost, which tolerances are doing real work, and which ones are just making the part expensive.

[Get a free DFM review and quote](/contact/get-a-quote)
