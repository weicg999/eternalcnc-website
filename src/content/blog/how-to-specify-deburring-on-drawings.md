---
title: "How to Specify Deburring on Drawings: ISO 13715 Edge Callouts"
description: "Almost every drawing says deburr, but those two words set no size, no direction, and no acceptance test. ISO 13715 turns them into a measurable edge callout."
pubDate: 2026-11-12
category: Machining Tips
tags: ["Deburring", "Edge Condition", "ISO 13715", "Drawing Callouts", "DFM", "Inspection"]
system: general
author: Eternal CNC Engineering Team
readingTime: "9 min read"
---

Before you send a drawing out, you probably add one line to the notes: Deburr, break sharp edges.

It reads like diligence. On the shop floor and at the inspection bench, it is the **least enforceable line on the whole drawing**.

## 1 · One line, four readings

The same line lands as four different jobs:

- **Programming** reads it as: run one more pass after the toolpath finishes.
- **The operator** reads it as: if it does not catch a fingernail, it is done.
- **Inspection** reads it as: look at it, there is nothing to measure.
- **You**, receiving the parts: a flap of material holds a mating face off its seat, or a seal face will not stop weeping.

Nobody did anything wrong. The shop did deburr the parts, and inspection did look at them. The argument cannot be settled, because "deburr" is not a requirement. It is a wish.

It is missing four things: a size (how much is enough), a direction (which face may not carry a burr), a scope (which edges it covers), and exceptions (whether a mating face and an exposed edge share one limit).

Set the level of the problem straight: **this is not about how cleanly the operator works. The line has no acceptance condition.** Get the definition wrong and no amount of extra inspection or supplier penalties will fix it.

## 2 · The standard already gives you the wording

ISO 13715:2017 covers exactly this — how to indicate and dimension edges of undefined shape in technical product documentation. Its move is neat: it does not force you to draw every edge as a chamfer. It only asks you to say **how far the actual edge may depart from the theoretical sharp corner**.

Three symbols do the work:

| Symbol | Meaning | When to use it |
|---|---|---|
| `+` | Material may stand proud | Burrs and flash may remain, with a height limit |
| `−` | Material must be removed | The edge must be broken, without specifying radius or chamfer |
| `±` | Either direction is allowed | Give upper and lower limits |

The number is a **maximum deviation**, not a chamfer size. If you really want a `1 × 45°` chamfer, that is a geometrically defined edge: dimension it under ISO 129-1 and leave 13715 out of it.

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 306" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three ways to write one edge under ISO 13715: permitted excess material, required removal, and a geometrically defined chamfer" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">One edge, three ways to write it</text>
<rect x="12" y="46" width="150" height="242" rx="9" style="fill:#FAEEDA;stroke:#EF9F27;stroke-width:1"/>
<rect x="185" y="46" width="150" height="242" rx="9" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<rect x="358" y="46" width="150" height="242" rx="9" style="fill:#E1F5EE;stroke:#5DCAA5;stroke-width:1"/>
<text x="87" y="76" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#633806">Allow excess</text>
<text x="260" y="76" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Require removal</text>
<text x="433" y="76" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#085041">Defined shape</text>
<text x="87" y="104" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" style="fill:#BA7517">+</text>
<text x="260" y="104" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" style="fill:#185FA5">−</text>
<text x="433" y="104" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#0F6E56">1 × 45°</text>
<path d="M77 150 L127 150" style="fill:none;stroke:#B4B2A9;stroke-width:1;stroke-dasharray:4 3"/>
<path d="M107 150 L107 128" style="fill:none;stroke:#B4B2A9;stroke-width:1;stroke-dasharray:4 3"/>
<path d="M37 150 L107 150 L107 212 L37 212 Z" style="fill:#F1EFE8;stroke:#5F5E5A;stroke-width:2.5;stroke-linejoin:round"/>
<path d="M107 150 L124 134 L107 141 Z" style="fill:#D85A30;stroke:#993C1D;stroke-width:1.5"/>
<path d="M250 150 L300 150" style="fill:none;stroke:#B4B2A9;stroke-width:1;stroke-dasharray:4 3"/>
<path d="M280 150 L280 128" style="fill:none;stroke:#B4B2A9;stroke-width:1;stroke-dasharray:4 3"/>
<path d="M210 150 L266 150 Q280 150 280 164 L280 212 L210 212 Z" style="fill:#F1EFE8;stroke:#185FA5;stroke-width:2.5;stroke-linejoin:round"/>
<path d="M423 150 L473 150" style="fill:none;stroke:#B4B2A9;stroke-width:1;stroke-dasharray:4 3"/>
<path d="M453 150 L453 128" style="fill:none;stroke:#B4B2A9;stroke-width:1;stroke-dasharray:4 3"/>
<path d="M383 150 L439 150 L453 164 L453 212 L383 212 Z" style="fill:#F1EFE8;stroke:#0F6E56;stroke-width:2.5;stroke-linejoin:round"/>
<text x="87" y="244" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Burr height</text>
<text x="87" y="268" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">set by a number</text>
<text x="260" y="244" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Removal only</text>
<text x="260" y="268" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">shape not fixed</text>
<text x="433" y="244" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Shape and size</text>
<text x="433" y="268" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">per ISO 129-1</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 1 · Dashed is the theoretical sharp corner, solid is the real edge. The first two only limit deviation; the third defines shape</figcaption>
</figure>

Replace "deburr" with a numbered edge requirement, and inspection has something to measure. This adds no machining difficulty. It changes one line on the drawing.

There is a version trap too. ISO 13715:2017 replaced the 2000 edition, and ISO confirmed the 2017 edition as current in October 2024. Drawings carrying the older notation are still in circulation. When drawings from different standards traditions come together on one job, state which edition and which system the callout follows. Otherwise the supplier and incoming inspection each read their own rulebook.

## 3 · Why prototype shops get hit harder

A production shop has it easy: the same edge repeats thousands of times, so a fixture and a fixed method cost almost nothing per part.

A prototype shop does not. Few parts, many edges, and every edge does a different job — locating faces, sealing faces, exposed edges a hand can reach, channel exits and cross-hole intersections. Burrs prefer exactly the places a tool cannot reach: the far side of a through hole, the junction of two internal cavities.

Then there is **sequence**. A burr left in place before plating or anodizing gets sealed under the coating and turns into a small point on a mating face. We have covered that separately in [power-equipment machining](/knowledge/tech-blog/power-equipment-machining/) and [busbar fabrication](/knowledge/tech-blog/busbar-fabrication-process/); both end up as contact resistance or poor seating.

Surface treatment changes dimensions too, and an over-broken edge can eat into a functional face. That arithmetic is in [dimensions before or after finishing](/knowledge/tech-blog/before-or-after-finishing/).

So deburring is never the last operation. It is **a sequencing decision made when the job is routed**.

## 4 · A checklist you can paste into a drawing

**Step one: write one general requirement.** Put it near the title block, covering every edge of undefined shape, with a symbol and a number. For example:

> Undefined edges per ISO 13715, general requirement -0.3; applies except where locally noted.

The `-0.3` comes from an example in published explanations of the standard. It means up to 0.3 mm (about .012 in) of material may be removed. **It is not a recommended value.** Pick the number for your own functional faces; the standard will not choose it for you.

**Step two: pull the critical edges out.** These should not be left to the general note; a local callout overrides it:

- Mating and locating faces — one small flap keeps the assembly from seating
- Sealing faces — scratches and burrs are where leaks start
- Electrical contact and lap joints — a point lifts the contact and becomes a hot spot
- Exposed edges a hand can reach — safety and feel
- Internal channels and cross-hole exits — write "no protrusion allowed", not "deburr"

**Step three: where you need a specific angle or radius, give the geometry.** Draw the `1 × 45°`. Do not work around it with an edge symbol.

One more trap. ASME Y14.5 has no dedicated symbol for breaking an edge; it relies on a text note, which needs a maximum value before it can be inspected. If your drawing is built on ASME but you drop an ISO 13715 symbol into it, say on the sheet which system governs. Otherwise the shop and incoming inspection may each read a different one.

## 5 · The other half lives in process order

The cheapest burr is **the one that never grew**.

Outside the drawing, four things can be settled at quote and programming stage:

- Put the drill exit on a face a tool can reach, or on one that does not matter anyway.
- Avoid intersecting cavities no tool can get into.
- Route operations so a later pass does not roll a fresh burr onto an edge you just cleaned.
- Make pre-plate cleaning a hard gate, not a visual judgment.

Laid out in order, you can see where the cost jumps:

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 346" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A burr passes through five stages: quote and CAM, drilling, deburring, pre-plate cleaning, and surface treatment, with the cost of change rising at each step" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">One burr, five operations</text>
<rect x="16" y="44" width="488" height="54" rx="9" style="fill:#E1F5EE;stroke:#5DCAA5;stroke-width:1"/>
<rect x="16" y="44" width="5" height="54" rx="2" style="fill:#1D9E75"/>
<text x="34" y="77" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#085041">Quote / CAM</text>
<text x="190" y="77" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Put the exit where a tool reaches</text>
<rect x="16" y="104" width="488" height="54" rx="9" style="fill:#E1F5EE;stroke:#5DCAA5;stroke-width:1"/>
<rect x="16" y="104" width="5" height="54" rx="2" style="fill:#1D9E75"/>
<text x="34" y="137" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#085041">Drilling</text>
<text x="190" y="137" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">The burr grows on the exit side</text>
<rect x="16" y="164" width="488" height="54" rx="9" style="fill:#E1F5EE;stroke:#5DCAA5;stroke-width:1"/>
<rect x="16" y="164" width="5" height="54" rx="2" style="fill:#1D9E75"/>
<text x="34" y="197" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#085041">Deburr</text>
<text x="190" y="197" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Still visible, cheapest to fix</text>
<rect x="16" y="224" width="488" height="54" rx="9" style="fill:#FAEEDA;stroke:#EF9F27;stroke-width:1"/>
<rect x="16" y="224" width="5" height="54" rx="2" style="fill:#BA7517"/>
<text x="34" y="257" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#633806">Pre-plate clean</text>
<text x="190" y="257" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Last chance — make it a hard gate</text>
<rect x="16" y="284" width="488" height="54" rx="9" style="fill:#FCEBEB;stroke:#F09595;stroke-width:1"/>
<rect x="16" y="284" width="5" height="54" rx="2" style="fill:#E24B4A"/>
<text x="34" y="317" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#791F1F">Plating</text>
<text x="190" y="317" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Sealed under the coating, out of sight</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 2 · The first three steps are still fixable. Pre-plate cleaning is the last chance; after that, final inspection cannot see the burr</figcaption>
</figure>

One more thing that is often missed: when burrs grow steadily through a batch, it is rarely a careless operator. It is a worn tool or drifting parameters. Treating edge condition as a process signal beats sorting faults out at final inspection.

## 6 · When not to bother

Not every edge deserves a local callout. Call out all of them and machining cost goes up while inspection loses its focus.

Ask one question: **will this edge affect assembly, sealing, conductivity, safety, or what the customer sees?** If none apply, leave it to the general requirement.

The odd part is that deleting "deburr" and replacing it with one numbered general requirement plus a few local callouts usually makes the drawing shorter. What disappears is ambiguity, not information.

## FAQ

**The drawing says deburr and the parts still have burrs. Can I reject them?**
Hard to. There is no measurable criterion on the sheet, so both sides fall back on whether it feels sharp. That is why the line needs changing, not stricter inspection.

**Is a chamfer the same as breaking an edge?**
No. A chamfer is a geometrically defined edge with an angle and a size, dimensioned under ISO 129-1. Breaking an edge only limits how far you may depart from the theoretical sharp corner; it does not specify a radius or a chamfer. That belongs to ISO 13715.

**Is "no burrs on all edges" the safest note?**
No. "None" is not measurable, and writing it hands the definition to someone else. A measurable upper limit is steadier than an absolute word.

## Key references

- ISO 13715:2017, *Technical product documentation — Edges of undefined shape — Indication and dimensioning* (current edition, replaces ISO 13715:2000; reviewed and confirmed 2024-10-29) — ISO standard page. EN ISO 13715:2019 is the identical European adoption.
- ISO 129-1, *Technical drawings — Indication of dimensions and tolerances — Part 1: General principles* (dimensions for geometrically defined edges) — ISO standard overview.
- ASME Y14.5 practice for text notes on edge breaks, and the sign convention for edge deviations: public technical article by Jiga, *Deburring specified: how to call out, verify, and control edge condition in production* (accessed 2026-11-09; not the standard text).
- GB/T 19096-2003 (China, current, identical to ISO 13715:2000; a 2023-12-28 review recommended revision) — National Public Service Platform for Standards. Relevant when Chinese domestic drawings are in the same job.

## Where we stand on this

What we can help with is four small things:

- Before quoting, flag the edges on your drawing that have no acceptance condition.
- Separate general and local callouts by functional face.
- Put deburring into the operation sequence instead of leaving it for last.
- Align pre-plate cleaning and incoming inspection on one criterion.

If your parts are stuck on burrs holding up assembly, weeping seals, or dimensions after plating, send us the drawing — even if all you want is to get that one line right.

[Free DFM review and quote](/contact/get-a-quote/)
