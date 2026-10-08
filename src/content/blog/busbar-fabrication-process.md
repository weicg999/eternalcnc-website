---
title: "Busbar fabrication: where a copper bar gets scrapped between raw stock and inspection"
description: "A copper bar looks simple — cut, drill, bend. The yield killers are elsewhere: hard versus soft temper, bending cracks, and why hole pitch beats diameter."
pubDate: 2026-10-04
category: "Machining Tips"
system: "energy"
author: "Eternal CNC Engineering Team"
readingTime: "10 min read"
---

A copper bar arrives at the shop as a straight strip.

By the time it matches the drawing, it usually is not straight anymore: it has two bends, four groups of holes, one face milled flat as a contact surface, and a tin or silver plating over the whole thing. Between the straight strip and the finished part sit several operations — and each one has its own way of scrapping the part.

This piece does not cover "why flatness drives temperature rise" — that was the subject of the [previous article](/knowledge/tech-blog/power-equipment-machining/). This one answers a different question: **how is a busbar actually made, and where does the scrap most often come from?**

## 1. A busbar goes through seven operations

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Busbar fabrication process flow" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="340" y="30" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="15" font-weight="700" style="fill:#111827;">Seven operations for one copper bar</text>
<rect x="20" y="52" width="145" height="58" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9;"/>
<text x="92" y="86" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000;">1. Cut to length</text>
<rect x="185" y="52" width="145" height="58" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9;"/>
<text x="257" y="86" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000;">2. Punch / drill</text>
<rect x="350" y="52" width="145" height="58" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9;"/>
<text x="422" y="86" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000;">3. Bend</text>
<rect x="515" y="52" width="145" height="58" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9;"/>
<text x="587" y="86" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000;">4. Mill contact face</text>
<rect x="20" y="136" width="180" height="58" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9;"/>
<text x="110" y="170" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000;">5. Break edges, deburr</text>
<rect x="250" y="136" width="180" height="58" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9;"/>
<text x="340" y="170" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000;">6. Pre-clean, plate</text>
<rect x="480" y="136" width="180" height="58" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9;"/>
<text x="570" y="170" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000;">7. Inspect</text>
<rect x="20" y="216" width="640" height="62" rx="8" style="fill:#FAF0F0;stroke:#8B0000;"/>
<text x="340" y="242" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000;">Order matters: burrs must be gone before plating</text>
<text x="340" y="264" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="11.5" style="fill:#6B7280;">Top three scrap sources: bend cracks · hole-pitch error · pre-plate burrs</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 1 · The fabrication chain for one busbar, and the three places it most often fails</figcaption>
</figure>

The seven operations are not complicated in themselves. What is hard is that they **constrain each other**: bending wants to happen while the material is still "bendable," yet a busbar usually wants the stiffer hard temper; and a burr left before plating gets buried under the coating, becoming a sharp point on the contact surface. So the real job is not designing one operation — it is designing the **sequence and the allowances between them.**

## 2. The first fork: hard temper or soft temper

The same copper busbar comes in two tempers under GB/T 5585.1-2018: **soft (R) and hard (Y).** Those two words set the difficulty of everything downstream.

- **Soft (annealed):** soft, easy to bend, and higher conductivity (resistivity ≤0.017241 Ω·mm²/m). The cost is stiffness — it deforms easily under its own weight or a bolt, and flatness is hard to hold.
- **Hard (work-hardened):** stiff, dimensionally stable, and still required to keep conductivity at or above 97% IACS (resistivity ≤0.017772 Ω·mm²/m). The cost is **brittleness** — elongation is a single-digit percentage, so a bend can crack it.

Most switchgear busbars end up specifying the hard temper, because a busbar is first of all a structural part: it has to carry its own weight, short-circuit forces, and bolt torque for years. Soft is easier to bend, but soft enough to be crushed by a bolt is not actually easier to use.

**And that is where the problem is born:** you have chosen a material that "should not be bent," and you still have to bend it. The heaviest section of this article lives on that tension.

## 3. Bending: where a hard-temper busbar cracks

Bending a hard copper bar is the step most likely to produce scrap. It sets three traps.

**First, an insufficient bend radius.** In a bend, the outer surface is in tension and the inner surface in compression; the tighter the radius, the harder the outer surface is pulled. Below a critical radius, micro-cracks appear on the outer face. The standard turns this into a test: for a common 30×4 section, it requires bending **90° over a mandrel 8 mm in diameter with no cracks on the surface afterward.** That is the material's floor, and the line your design radius must not cross.

**Second, springback.** Hard-temper material springs back a lot — you set the brake to 90°, and it relaxes to the low eighties. Hand estimating it on a small batch drifts; in production you must **over-bend to compensate**, using the measured springback so it lands back on angle. Skip this, and the two holes will not line up once the bar is in the cabinet.

**Third, a wrong blank length.** For a bar with two bends, the cut length is not the sum of the straight segments: material at the bend is "borrowed," so the flat pattern has to be calculated on the neutral layer (what people call the K-factor). Get it wrong and the first bend is fine while the second comes up short — the whole bar is scrap.

For small batches there is a further practical issue: **the one-time cost of a bending die or a dedicated fixture does not pay back on a few dozen pieces.** This is why many small-batch multi-bend busbars are instead angle-milled on a CNC or formed with a simple fixture, rather than ordering a proper bending die.

## 4. Hole pitch: what actually decides whether the joint closes up

The previous article covered how a contact joint's resistance depends on how well the faces meet. But down at the fabrication level, **the first thing that decides contact area is not flatness — it is hole pitch.**

The reason is simple: the joint bolts pass through holes in both busbars. If the **center-to-center hole distance is out of tolerance**, tightening the bolt forces the bars to fight each other — instead of lying flat against one another, they are pulled together by the bolt, and the real contact area shrinks, so resistance climbs anyway. Hole diameter itself is not the sensitive dimension: it is usually 0.5–1 mm larger than the bolt for assembly clearance, and a little variation does not matter. **What matters is hole pitch and hole perpendicularity.**

On how the holes are made, punching and drilling each have a place:

- **Punching:** fast and cheap, good for high volume and fixed sections. But the sheared face carries rollover and burrs, and the hole wall has a work-hardened layer.
- **Drilling / milling:** slower and dearer per piece, but changing a section needs no new die, positional accuracy is easier to hold, and hole-mouth deburring is easier to do properly.

For many sections, small batches, and frequently changing specs, drilling often beats punching — what you save is not the unit price, it is the **die-change time and the tooling cost.**

## 5. When to mill the contact face, and when shearing is enough

Whether the contact face needs milling depends on its electrical requirement, not its looks.

- **Sheared face:** rollover, burrs, a hardened layer, and poor flatness control.
- **Milled face:** controllable flatness and surface roughness, thorough deburring, and a stable, repeatable contact resistance.

The test is simple: **if the joint has a defined contact-resistance requirement (the common acceptance figures are silver-plated ≤10 µΩ and tin-plated ≤20 µΩ), the contact face should be milled.** If it is just an ordinary low-voltage connection inside a cabinet with a loose requirement, a sheared face with the burrs cleaned off is fine.

In one line: milling the contact face is not buying "looks" — it is buying **controllability and consistency of contact resistance.**

## 6. Mixed small batches: why a die is rarely worth it

The traditional way to make busbars is stamping: one die punches, shears, and forms in a single pass, and at volume the unit price is very low. But that logic rests on **high volume and stable sections.**

In practice, power-equipment busbar orders are often the opposite: **a few dozen a month, with sections that keep changing.** At that scale a die does not pay — the tooling cost spread over a few dozen pieces destroys the unit price; worse, one drawing change can make the die obsolete.

This is exactly where CNC fits: **one machine, and a new program makes a new section without a die.** The per-piece cost is higher than stamping, but it removes the tooling cost and the change-over time. For work that is "many sections, small batches, and fast iteration," that trade usually works out.

## Key references

1. State Administration for Market Regulation / Standardization Administration of China: GB/T 5585.1-2018, *Copper, aluminium and their alloys busbars — Part 1: Copper and copper alloy busbars* — dimensional deviation (TMY 30×4: thickness 4±0.05 mm, width 30±0.15 mm), straightness (wide edge ≤5 mm/m, narrow edge ≤2 mm/m), hardness (Brinell ≥65 HB), bend test (90° over an 8 mm mandrel, no cracks on the surface), chemistry (Cu+Ag >99.90%), conductivity (hard temper ≥97% IACS, resistivity ≤0.017772 Ω·mm²/m), and surface quality (no burrs, flash, or cracks at fillets and edges).
2. State Administration for Market Regulation / Standardization Administration of China: GB/T 5585.2-2018, *Copper, aluminium and their alloys busbars — Part 2: Aluminium and aluminium alloy busbars* — conductivity ≥58% IACS and related requirements.
3. GB/T 7251.1, *Low-voltage switchgear and controlgear assemblies — Part 1: General rules* — joint resistance requirements for busbar contact surfaces; common acceptance figures: silver-plated ≤10 µΩ, tin-plated ≤20 µΩ.
4. IEC 61238-1, *Compression and mechanical connectors for power cables* — test requirements for compressed conductor joints, covering joint resistance and mechanical performance.

## Where we stand on this

We have been making precision structural parts for twenty-three years, with thirty CNC machines including true 5-axis. Power-equipment conductors — copper bars and busbars, contact faces, flexible connectors and joints, and various profiled conductors — sit squarely in our day-to-day work.

The value of these parts is not in their shape but in **how the operations fit together**: get the temper and bend radius right first, then hold the hole pitch and contact face steady, and finally make sure the pre-plate preparation is clean. Many sections, small batches, and fast iteration — stacked together, that is exactly where CNC beats stamping.

If you have a batch of busbars or conductors stuck on bending, hole pitch, or post-plating dimensions, [send us the drawings for a free DFM review and quote](/contact/get-a-quote/).
