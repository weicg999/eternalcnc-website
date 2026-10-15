---
title: "POM Costs Less Than Metal. So Why Is the Machined Part Pricier?"
description: "Acetal stock costs less than aluminum, yet the finished part often costs more. Material is one line in the quote; grip, heat and measurement are all the rest."
category: "Machining Tips"
pubDate: 2026-10-15
system: "general"
tags: ["POM", "acetal", "Delrin", "engineering plastics", "CNC machining", "machining cost", "tolerances", "DFM"]
author: "Eternal CNC Engineering Team"
readingTime: "10 min read"
---

## 1. The answer is not in the material price

Here is a question we field most weeks:

> "POM costs less than aluminum. So why is the machined part more expensive than the aluminum one?"

It is a fair question, and the customer has not made an arithmetic mistake. What needs dismantling is an assumption buried inside the question: **that a cheap material makes a cheap part.**

A CNC quote has three parts — material, machine time, and the setup this particular job needs. Plastics are not expensive on the first. They are expensive on the second and third, and the second one usually grows far more than the first one saves.

## 2. First, do the arithmetic with density alone

Every material comparison starts with the same trap: comparing price per kilogram.

**A kilogram of one material does not buy the same volume as a kilogram of another.**

| Material | Density g/cm³ | Volume per 1 kg |
|---|---|---|
| POM-H (acetal) | 1.42 | 1.00 |
| 6061-T6 aluminum | 2.70 | 0.53 |
| Structural steel | 7.85 | 0.18 |

"Plastic is cheaper" depends entirely on whether you are pricing by weight or by volume. By weight, some acetal grades are not cheaper than aluminum at all. By volume, they clearly are. **The two measures disagree, and that is where a lot of quote arguments start.**

We are deliberately not quoting prices here — they move every day, density does not. Put today's number in, and the arithmetic is yours.

## 3. Three things that make a plastic part expensive

Material is only the first layer. What actually drives the cost of a precision plastic part is the three gates it has to pass on the machine. All three come from one fact: **POM's physical properties sit one to two orders of magnitude away from metal's.**

### You cannot hold it

POM-H's tensile modulus is about 2.9–3.1 GPa. 6061-T6 aluminum is 68.9 GPa; structural steel is around 200 GPa.

**Apply the same clamping force and POM deflects more than twenty times as much as aluminum, and more than sixty times as much as steel.**

A metal part goes into a three-jaw chuck or a vise and gets cut. A plastic part deforms elastically the moment you clamp it and springs back the moment you release it — the dimension you measured under clamping was never the dimension you shipped. The workholding has to be rebuilt: vacuum tables, soft jaws, larger contact pads, glued-down setups, lower clamping force, and many light passes instead of a few heavy ones.

All of this is doable. **All of it is setup time and machine time.**

### The heat will not leave

This is the harshest of the three.

| Material | Thermal conductivity W/(m·K) |
|---|---|
| 6061-T6 aluminum | 167 |
| Structural steel | ~50 |
| POM-H | 0.31 |

**Aluminum conducts heat roughly 540 times better than POM.** Even steel — a poor conductor by metal standards — conducts about 160 times better.

The same cut therefore does two very different things. In aluminum, heat leaves with the chip and through the workpiece. In POM, the chip itself is a poor conductor, so heat stays at the cutting edge and in the freshly machined surface.

POM's heat deflection temperature at 1.8 MPa is only 110–125 °C, and it melts around 165–175 °C. Machine shops have measured localized cutting-zone temperatures of 120–150 °C — past the point where the material starts to move.

That is where the familiar symptoms come from: whitened surfaces, undersized dimensions, rolled edges, built-up edge on the tool, stringy burrs. These are heat damage, not a tooling failure.

**The countermeasure runs one way: high spindle speed, shallow depth of cut, fast feed**, so the heat leaves with the chip, plus generous cooling. But shallow depth of cut means less material removed per minute — **and the cycle time goes up.**

### You cannot measure it while it is warm

| Material | Coefficient of thermal expansion (10⁻⁶/K) |
|---|---|
| POM-H | 120 |
| 6061-T6 | 23.6 |
| Structural steel | 11.7 |

Put numbers on it. **Take a 100 mm dimension, in a shop that is 5 °C warmer than it was:**

| Material | Movement on a 100 mm dimension |
|---|---|
| POM-H | **60 µm** |
| 6061-T6 | 11.8 µm |
| Structural steel | 5.9 µm |

Stated the other way: **to move a 100 mm feature by 0.02 mm, POM needs only 1.7 °C of temperature change. Aluminum needs 8.5 °C. Steel needs 17 °C.**

1.7 °C. That is why plastic parts get measured after they have cooled to room temperature, and why the room temperature gets written down. **A part that passes inspection in the morning can fail it in the afternoon**, and that is not a measurement error.

## 4. The invisible line item: more operations

All three gates land on the same result — **more operations, longer lead time.**

POM sheet is extruded. Skin and core cool at different rates, so **the stock arrives with internal stress already frozen into it**. Cut the skin away and the stress redistributes; the part bows. The industry-standard response is to rough with stock left on, then run **a stress-relief anneal**, then finish.

The anneal is not a switch you flip. The usual range is 140–150 °C, followed by **slow cooling** — forced-air cooling would put back the stress you just removed. Hold time scales with wall thickness: roughly 40–60 minutes per 5 mm in an oil bath, or 20–30 minutes per 5 mm in an air oven. Exact schedules differ by supplier; the material supplier's process sheet wins.

<figure>
<svg viewBox="0 0 680 285" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Operation comparison between a metal part and a POM part: the POM part needs annealing, slow cooling and a cooling step that metal does not">
  <rect x="0" y="0" width="680" height="285" rx="10" style="fill:#FFFFFF;stroke:#E5E7EB;stroke-width:1"/>
  <text x="40" y="60" style="font-size:16px;fill:#374151">Metal part (6061 aluminum)</text>
  <rect x="40" y="70" width="145.5" height="44" rx="5" style="fill:#E5E7EB"/>
  <rect x="191.5" y="70" width="145.5" height="44" rx="5" style="fill:#E5E7EB"/>
  <rect x="343" y="70" width="145.5" height="44" rx="5" style="fill:#E5E7EB"/>
  <rect x="494.5" y="70" width="145.5" height="44" rx="5" style="fill:#E5E7EB"/>
  <text x="112.8" y="97" text-anchor="middle" style="font-size:14px;fill:#374151">Stock</text>
  <text x="264.3" y="97" text-anchor="middle" style="font-size:14px;fill:#374151">Rough</text>
  <text x="415.8" y="97" text-anchor="middle" style="font-size:14px;fill:#374151">Finish</text>
  <text x="567.3" y="97" text-anchor="middle" style="font-size:14px;fill:#374151">Inspect</text>
  <text x="40" y="160" style="font-size:16px;fill:#374151">POM part (acetal)</text>
  <rect x="40" y="170" width="81.4" height="44" rx="5" style="fill:#E5E7EB"/>
  <rect x="126.4" y="170" width="81.4" height="44" rx="5" style="fill:#E5E7EB"/>
  <rect x="212.9" y="170" width="81.4" height="44" rx="5" style="fill:#8B0000"/>
  <rect x="299.3" y="170" width="81.4" height="44" rx="5" style="fill:#8B0000"/>
  <rect x="385.7" y="170" width="81.4" height="44" rx="5" style="fill:#E5E7EB"/>
  <rect x="472.1" y="170" width="81.4" height="44" rx="5" style="fill:#8B0000"/>
  <rect x="558.6" y="170" width="81.4" height="44" rx="5" style="fill:#E5E7EB"/>
  <text x="80.7" y="197" text-anchor="middle" style="font-size:14px;fill:#374151">Stock</text>
  <text x="167.1" y="197" text-anchor="middle" style="font-size:14px;fill:#374151">Rough</text>
  <text x="253.6" y="197" text-anchor="middle" style="font-size:14px;fill:#FFFFFF">Anneal</text>
  <text x="340.0" y="197" text-anchor="middle" style="font-size:14px;fill:#FFFFFF">Slow cool</text>
  <text x="426.4" y="197" text-anchor="middle" style="font-size:14px;fill:#374151">Finish</text>
  <text x="512.9" y="197" text-anchor="middle" style="font-size:14px;fill:#FFFFFF">Cool down</text>
  <text x="599.3" y="197" text-anchor="middle" style="font-size:14px;fill:#374151">Inspect</text>
  <polygon points="253.6,166 248.6,156 258.6,156" style="fill:#8B0000"/>
  <polygon points="340.0,166 335.0,156 345.0,156" style="fill:#8B0000"/>
  <polygon points="512.9,166 507.9,156 517.9,156" style="fill:#8B0000"/>
  <text x="340" y="258" text-anchor="middle" style="font-size:15px;fill:#8B0000">In red: the three steps a metal part does not need</text>
</svg>
<figcaption>Figure 1 · Schematic: the extra operations a POM part needs that a metal part does not</figcaption>
</figure>

On a 20 mm part, the anneal alone can be 1.5 to 4 hours. Add workholding that has to be designed from scratch, deburring that cannot be copied from the metal playbook, threads that have to account for stripping and swelling, and a final inspection that waits for the part to cool.

**None of this is a feeling that plastic is difficult. It is time, itemized.**

## 5. The standards do not quite land on machined plastics either

This part is rarely discussed, and it is where precision plastic parts generate the most argument.

**GB/T 1804-2000《General tolerances》**, the Chinese general-tolerance standard for dimensions without individual tolerance callouts, states its own scope: it applies to dimensions produced by metal cutting, and to general stamping. Non-metallic materials and other processes, it says, **may be applied by reference.**

By reference — not by right. Write "general tolerances to GB/T 1804-m" on a machined plastic part and, strictly speaking, that is a reference. The standard leaves no room for creep, moisture uptake or springback.

Worth knowing: GB/T 1804-2000 is an equivalent adoption of **ISO 2768-1:1989**, the system most European drawing sets inherit — and the same gap travels with it. In North America the general tolerances usually sit in the title block instead of pointing at a standard number, but the logic is identical: they were written for metal.

Does plastic have its own tolerance standard? Yes: **GB/T 14486-2008**, tolerances for plastics molded parts, grades MT1 to MT7. But its scope is **molded parts** — injection, compression and similar — **not machined parts**. The American counterpart, the SPI mold-tolerance classes, draws the same line: it describes molded parts.

Two footnotes worth knowing. GB/T 14486-2008 is a non-equivalent adoption of German **DIN 16901:1982**, and DIN 16901 has since been superseded by **DIN 16742:2013**. A new Chinese standard for molded-part tolerances and acceptance conditions is in preparation, transferring **ISO 20457:2018**.

So on a machined precision plastic part: the metal standard only asks you to reference it, and the plastic standard is written for molding. **Neither lands squarely on the part in your hand.** That is not a defect in the standards — it reflects the fact that tolerances on these parts have to be agreed against the material and the service environment, item by item.

**Practical consequence:** do not copy a metal part's general tolerances or its Ra callouts onto a plastic part. Copied over, they will either be ignored or double the price — plastic surface finish is described by **method**, and the same Ra number does not mean the same thing across polymers.

## 6. When plastic is right, and when it is not

This is where we need to reconcile this article with one we published in September.

In our guide to choosing materials for robot parts, we said: **be willing to replace metal with plastic** — grippers, bushings, wear pads, guards. POM, UHMW-PE and PEEK are lighter, cheaper, and often simply better.

**That statement and this article do not contradict each other, because they are about different classes of part.**

| | Plastic is the right answer | Do not force plastic |
|---|---|---|
| Tolerance | Nothing called out, or ±0.1 mm and looser | Mating faces at the ±0.02 mm level |
| Geometry | Simple, even wall thickness | Thin walls, deep pockets, large hollowed areas |
| Temperature | Room temperature, stable environment | Cycling temperature, or near a heat source |
| Load | Light, wear-facing, self-lubricating | Load-bearing, or needing long-term stiffness |
| Volume | One-offs to small batches | Batch-to-batch consistency is the requirement |

**The dividing line is precision and stability, not whether the material is expensive.**

Which is why the cost-saving answer is often a third option: **a metal frame with plastic functional surfaces**. Metal takes the mating features that need accuracy; plastic takes the light, self-lubricating, non-marking surfaces. You get both, and you stop asking plastic to hold something it cannot hold.

## 7. If you are the one drawing the part: six things

1. **Do not compare material by the kilogram.** Convert to the volume of your actual part first — the ranking often reverses.
2. **Do not copy metal general tolerances or Ra callouts.** "To GB/T 1804-m" on plastic is a reference, not a scope; describe finish by method.
3. **Leave stock on thick parts** so the shop can rough, anneal, then finish. This is the single most effective step against warping.
4. **Accept "cool to room temperature before final inspection"**, and agree the inspection temperature in the drawing or the order. This alone prevents a lot of late argument.
5. **On critical mating features, change the design before you tighten the tolerance.** A metal insert, a pressed-in brass nut or a metal bushing is usually cheaper and more reliable than demanding ±0.01 mm from POM.
6. **State the service temperature.** POM's continuous service range sits around 85–100 °C, with higher short-term excursions; if it overheats during machining it decomposes and releases formaldehyde, so high-speed cutting needs extraction.

## Key References

- GB/T 1804-2000, General tolerances — tolerances for linear and angular dimensions without individual tolerance indications (equivalent adoption of ISO 2768-1:1989)
- GB/T 14486-2008, Plastics molded parts — tolerances (non-equivalent adoption of DIN 16901:1982). US counterpart: SPI mold-tolerance classes, which likewise describe molded parts
- Working-group notes for the Chinese standard on molded-part tolerances and acceptance conditions (SAC/TC15; transfer of ISO 20457:2018)
- Ensinger, POM Homopolymer Stock Shapes material data sheet (ASTM D638 / D696 / D792 / D648)
- Aluminum Association typical property values for 6061-T6

## Where we stand on this

Acetal parts are routine work here — grippers, bushings, rail pads, insulators, fixture plates. The numbers above are not looked up; they are quoted work and a few lessons learned the hard way.

**If this is your first plastic part, or you have a batch that keeps failing on dimensional consistency, send us the drawing.** We will tell you three things up front: which dimensions should be opened up for plastic, which features we would redesign, and where the real cost of the part actually sits.

[Free DFM review and quote](/contact/get-a-quote/) · [Browse the materials hub](/materials/)
