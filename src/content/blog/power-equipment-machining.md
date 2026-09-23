---
title: "Why Power Equipment Parts Are Hard to Make: Three Surfaces Decide Temperature Rise and Leak Rate"
description: "In the last few months, more power-equipment drawings have landed on our shop floor. The parts look simple. What actually caps yield is three surfaces: busbar flatness, enclosure sealing faces, and the size left after plating. Straight from GB/T 5585.1-2018 and GB/T 7674-2020, here is how those three surfaces work."
pubDate: 2026-09-22
category: "Industry Insights"
system: "energy"
tags: ["power equipment", "busbar", "copper busbar", "GIS enclosure", "sealing surface", "tin plating", "GB/T 5585.1", "GB/T 7674"]
author: "Strategy Advisory Team"
readingTime: "11 min read"
---

Start with a change we have seen on our own shop floor: over the last few months, more of the drawings that reach us have been power-equipment parts — busbars for switchgear, aluminum enclosures for GIS (gas-insulated switchgear), flanges and covers, and a steady stream of conductor connections.

At first glance none of these parts look hard. The shapes are simple and the tolerances on the drawing are not aggressive. But in practice, what caps yield is rarely the shape. It is three surfaces: the flatness of a busbar, the sealing face of an enclosure, and the size you are left with after plating. One governs temperature rise, one governs leak rate, one governs whether the part assembles at all.

Let's take them one at a time.

## 1. Start with the part map: what actually lands on a CNC machine

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map of power-equipment parts in a machine shop" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="340" y="28" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">Power equipment: switchgear · GIS · transformer · converter</text>
<rect x="30" y="52" width="190" height="220" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="30" y="52" width="190" height="36" rx="8" style="fill:#8B0000"/>
<rect x="30" y="74" width="190" height="14" style="fill:#8B0000"/>
<text x="125" y="76" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF">Current path</text>
<text x="48" y="122" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" style="fill:#1A1A1A">Busbars</text>
<text x="48" y="152" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" style="fill:#1A1A1A">Lap joints · tin / silver</text>
<text x="48" y="182" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" style="fill:#1A1A1A">Flexible links · clamps</text>
<text x="48" y="228" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#8B0000">→ decides: contact R</text>
<rect x="245" y="52" width="190" height="220" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="245" y="52" width="190" height="36" rx="8" style="fill:#8B0000"/>
<rect x="245" y="74" width="190" height="14" style="fill:#8B0000"/>
<text x="340" y="76" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF">Sealing and shell</text>
<text x="263" y="122" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" style="fill:#1A1A1A">GIS / switchgear shells</text>
<text x="263" y="152" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" style="fill:#1A1A1A">Flanges · seal grooves</text>
<text x="263" y="182" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" style="fill:#1A1A1A">Covers · O-ring faces</text>
<text x="263" y="228" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#8B0000">→ decides: leak rate</text>
<rect x="460" y="52" width="190" height="220" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="460" y="52" width="190" height="36" rx="8" style="fill:#8B0000"/>
<rect x="460" y="74" width="190" height="14" style="fill:#8B0000"/>
<text x="555" y="76" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF">Support, insulation</text>
<text x="478" y="122" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" style="fill:#1A1A1A">Insulator supports</text>
<text x="478" y="152" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" style="fill:#1A1A1A">Busbar clamps · brackets</text>
<text x="478" y="182" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" style="fill:#1A1A1A">Cold plates · cooling</text>
<text x="478" y="228" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#8B0000">→ decides: assembly, life</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 1 · Power-equipment parts on a CNC machine, grouped by the functional surface they carry</figcaption>
</figure>

Across a piece of power equipment — switchgear, GIS, a transformer, a power conversion system — the parts that land on a CNC machine fall into three groups:

- Current-carrying: busbars, flexible links, terminal lugs and clamps. They carry current, not load, so what makes them good or bad is the state of the contact face.
- Sealing: GIS and switchgear shells, flanges, seal grooves, covers. These have to hold a medium under pressure for years.
- Support and insulation: insulator supports, busbar clamps, brackets — and, increasingly, cold plates and cooling-loop parts.

In one sentence: the shape is secondary. These three functional surfaces are the real requirement behind the drawing.

## 2. Busbars: flatness is not a cosmetic spec — it sets the temperature rise

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three variables on a busbar lap joint" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<defs>
<marker id="pf2arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" style="fill:#8B0000"/></marker>
</defs>
<text x="340" y="28" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">A lap joint: three variables, one number</text>
<text x="40" y="98" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12" style="fill:#8B0000">① Flatness · contact ratio</text>
<line x1="150" y1="104" x2="205" y2="120" stroke-width="1.2" style="stroke:#8B0000"/>
<text x="470" y="98" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12" style="fill:#8B0000">② Plating: tin / silver</text>
<line x1="470" y1="104" x2="400" y2="120" stroke-width="1.2" style="stroke:#8B0000"/>
<text x="64" y="114" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#6B7280">Busbar A</text>
<text x="470" y="114" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#6B7280">Busbar B</text>
<rect x="50" y="124" width="300" height="34" stroke-width="1.2" style="fill:#C77B3A;stroke:#8A5324"/>
<rect x="230" y="124" width="310" height="34" stroke-width="1.2" style="fill:#D89A5C;stroke:#8A5324"/>
<rect x="230" y="124" width="120" height="34" stroke-width="1.5" stroke-dasharray="5 3" style="fill:#E8C09A;stroke:#8A5324"/>
<line x1="290" y1="116" x2="290" y2="166" stroke-width="2" style="stroke:#222222"/>
<circle cx="290" cy="141" r="9" stroke-width="1.5" style="fill:#4A4A4A;stroke:#222222"/>
<text x="40" y="190" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12" style="fill:#8B0000">③ Deburring · edge radius</text>
<line x1="200" y1="183" x2="272" y2="160" stroke-width="1.2" style="stroke:#8B0000"/>
<line x1="290" y1="172" x2="290" y2="200" stroke-width="2" marker-end="url(#pf2arrow)" style="stroke:#8B0000"/>
<rect x="80" y="208" width="520" height="56" rx="8" style="fill:#FAF0F0;stroke:#8B0000"/>
<text x="340" y="228" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="13" font-weight="700" style="fill:#8B0000">Contact R ↑ → local heating ↑ → oxidation ↑ → resistance ↑ again</text>
<text x="340" y="248" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#6B7280">At 1000 A, 20 µΩ makes about 20 W; 100 µΩ makes 100 W</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 2 · Flatness, plating and burrs all convert into one number at the lap joint: contact resistance</figcaption>
</figure>

Many people file busbar flatness under cosmetics. It is actually the first gate on temperature rise.

Two busbars are bolted together and carry current through the joint. Current only passes where the surfaces genuinely touch — at the small high points. Lose a little flatness and the real contact area drops sharply, so contact resistance jumps. Contact resistance turns into heat, heat accelerates oxidation on the copper, the oxide conducts worse, and resistance climbs again. It is a loop that speeds itself up.

The national standard is refreshingly concrete here. GB/T 5585.1-2018, *Electrical copper and aluminum busbars — Part 1: Copper and copper alloy busbars*, specifies:

- **Flatness**: for hard-temper copper busbar, within 1 m the wide-face flatness must not exceed 5 mm and the narrow-face flatness must not exceed 2 mm (4 mm for the thicker range).
- **Dimensional tolerance**: for a common TMY 30×4, thickness ±0.05 mm and width ±0.15 mm; larger sections carry a wider band.
- **Surface quality**: no fins, burrs, or cracks — and especially no burrs at the rounded corners and edges.
- **Conductivity**: not lower than 97% IACS; DC resistivity at 20 °C no more than 0.017772 Ω·mm²/m.

On the assembly side, GB/T 7251.1, *Low-voltage switchgear and controlgear assemblies — Part 1: General rules*, requires the resistance of a joint to stay within a defined multiple of an equal length of conductor of the same cross-section. The figure used in acceptance practice is **no more than 10 µΩ on a silver-plated lap joint and 20 µΩ on a tinned one**.

Line the two ends up and it becomes obvious: flatness, plating quality, and deburring all convert into the same number — contact resistance. And contact resistance converts into heat as a square. At 1000 A, 20 µΩ makes about 20 W; take it to 100 µΩ and you make 100 W. That extra 80 W sits entirely on a lap joint the size of your palm.

So the shop floor really has to control three things: flatness after milling; burrs removed before tin or silver plating (plating covers a burr and turns it into a local hot spot); and the edge radius the drawing asks for at the joint.

## 3. GIS enclosures: a 0.5% yearly leak rate is built one sealing face at a time

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Enclosure sealing faces and leak rate" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="340" y="26" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">Sealing a shell: the leak rate is a sum, not a single number</text>
<text x="28" y="70" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12" style="fill:#8B0000">① Groove flatness / depth</text>
<line x1="150" y1="76" x2="306" y2="122" stroke-width="1.2" style="stroke:#8B0000"/>
<text x="470" y="70" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12" style="fill:#8B0000">② O-ring compression</text>
<line x1="500" y1="76" x2="364" y2="124" stroke-width="1.2" style="stroke:#8B0000"/>
<rect x="110" y="86" width="460" height="50" stroke-width="1.2" style="fill:#DCDCDC;stroke:#B0B0B0"/>
<rect x="110" y="136" width="460" height="50" stroke-width="1.2" style="fill:#DCDCDC;stroke:#B0B0B0"/>
<rect x="308" y="122" width="64" height="28" rx="4" stroke-width="1.2" style="fill:#FFFFFF;stroke:#B0B0B0"/>
<ellipse cx="340" cy="136" rx="20" ry="11" stroke-width="3" style="fill:none;stroke:#8B0000"/>
<circle cx="150" cy="136" r="8" stroke-width="1.2" style="fill:#9A9A9A;stroke:#777777"/>
<circle cx="530" cy="136" r="8" stroke-width="1.2" style="fill:#9A9A9A;stroke:#777777"/>
<text x="28" y="208" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12" style="fill:#8B0000">③ Face roughness · weld distortion</text>
<line x1="237" y1="199" x2="300" y2="184" stroke-width="1.2" style="stroke:#8B0000"/>
<rect x="80" y="226" width="520" height="76" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="100" y="250" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" style="fill:#1A1A1A">GB/T 7674-2020: ≤ 0.5% leak rate per compartment, per year</text>
<text x="100" y="271" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" style="fill:#1A1A1A">Over a 25-year life, average gas loss across all compartments &lt; 15%</text>
<text x="100" y="292" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" style="fill:#1A1A1A">Field bagging test: ≤ 30 ppm SF₆ in each bag after 24 hours</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 3 · Groove flatness and face roughness accumulate into the leak rate of the whole unit</figcaption>
</figure>

The second group of parts is about holding pressure in.

A GIS puts the circuit breakers, disconnectors, busbars, and instrument transformers inside a grounded metal enclosure filled with SF₆ at pressure, using it for both insulation and arc quenching. The dielectric strength of SF₆ tracks its density: lose gas, lose pressure, lose insulation — first partial discharge, then flashover, in the worst case a rupture. So leak rate is a hard specification, and the standard draws the line explicitly.

GB/T 7674-2020, *Gas-insulated metal-enclosed switchgear for rated voltages of 72.5 kV and above*, states that GIS shall be a closed-pressure system or a sealed-pressure system; for closed-pressure systems, **the leak rate from any single compartment to atmosphere, and between compartments, must not exceed 0.5% per year**. The same standard takes a longer view: over a minimum 25-year service life, the average loss across all gas compartments should be less than 15%.

0.5% sounds generous until you put it on site. Handover testing commonly uses the bagging method: wrap the joints at flanges and seals in film and, after 24 hours, the SF₆ concentration inside each bag must be no more than 30 ppm. In other words, whether the assembly passes is the sum of dozens to hundreds of flanges and sealing faces. Any single face that is not flat enough raises the leak rate of the whole unit.

For us on the machining side, that means the work on a GIS aluminum shell (typically 5xxx or 6xxx aluminum) is never about the outline. It is the flatness and depth of the seal groove, the roughness of the sealing face, distortion control after welding, and whether there is enough machining stock to clean up the post-weld distortion.

## 4. After plating, which way does the size move?

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="How surface finishing shifts a dimension" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<defs>
<marker id="pf4arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" style="fill:#8B0000"/></marker>
</defs>
<text x="340" y="26" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">After surface finishing, which way does the size move?</text>
<line x1="340" y1="48" x2="340" y2="264" stroke-width="1.2" stroke-dasharray="4 4" style="stroke:#8B0000"/>
<text x="340" y="44" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#8B0000">drawing nominal</text>
<text x="40" y="76" font-family="system-ui, 'Segoe UI', sans-serif" font-size="13" style="fill:#1A1A1A">Anodizing</text>
<rect x="300" y="62" width="80" height="16" stroke-width="1.2" style="fill:#EDEDED;stroke:#C0C0C0"/>
<line x1="300" y1="70" x2="278" y2="70" stroke-width="2" marker-end="url(#pf4arrow)" style="stroke:#8B0000"/>
<line x1="380" y1="70" x2="402" y2="70" stroke-width="2" marker-end="url(#pf4arrow)" style="stroke:#8B0000"/>
<text x="424" y="76" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12" style="fill:#6B7280">Diameter shifts ≈ 1× film; allow stock</text>
<text x="40" y="136" font-family="system-ui, 'Segoe UI', sans-serif" font-size="13" style="fill:#1A1A1A">Plating: tin / silver</text>
<rect x="300" y="122" width="80" height="16" stroke-width="1.2" style="fill:#EDEDED;stroke:#C0C0C0"/>
<line x1="300" y1="130" x2="264" y2="130" stroke-width="2" marker-end="url(#pf4arrow)" style="stroke:#8B0000"/>
<line x1="380" y1="130" x2="416" y2="130" stroke-width="2" marker-end="url(#pf4arrow)" style="stroke:#8B0000"/>
<text x="424" y="136" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12" style="fill:#6B7280">One film on each face: +2× in total</text>
<text x="40" y="196" font-family="system-ui, 'Segoe UI', sans-serif" font-size="13" style="fill:#1A1A1A">Electropolishing</text>
<rect x="300" y="182" width="80" height="16" stroke-width="1.2" style="fill:#EDEDED;stroke:#C0C0C0"/>
<line x1="264" y1="190" x2="300" y2="190" stroke-width="2" marker-end="url(#pf4arrow)" style="stroke:#8B0000"/>
<line x1="416" y1="190" x2="380" y2="190" stroke-width="2" marker-end="url(#pf4arrow)" style="stroke:#8B0000"/>
<text x="424" y="196" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12" style="fill:#6B7280">Removes material; size shrinks</text>
<text x="40" y="256" font-family="system-ui, 'Segoe UI', sans-serif" font-size="13" style="fill:#1A1A1A">Heat treatment</text>
<rect x="300" y="242" width="80" height="16" stroke-width="1.2" style="fill:#EDEDED;stroke:#C0C0C0"/>
<path d="M300 250 q10 -9 20 0 q10 9 20 0 q10 -9 20 0 q10 9 20 0" stroke-width="1.6" style="fill:none;stroke:#8B0000"/>
<text x="424" y="256" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12" style="fill:#6B7280">Unpredictable; leave extra stock</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 4 · Different finishes move a dimension in different directions — the drawing must say before or after plating</figcaption>
</figure>

Both groups of parts share a trap: the drawing gives a finished size, but current-carrying faces get tinned or silver-plated and aluminum shells get anodized — **surface finishing changes the size, and not always in the same direction**.

- **Anodizing**: the film grows half outward and consumes half of the substrate, so the diameter shifts by roughly one film thickness. Holes or shafts that must fit need machining stock reserved for it.
- **Plating** (tin or silver): it adds material, on both faces, so a size grows by roughly one film on each side — shafts get larger, holes get smaller.
- **Electropolishing**: it subtracts material; the size shrinks.
- **Heat treatment**: the direction and amount of distortion are unpredictable; only process control and stock can absorb it.

That leads to a question we have to ask at the quoting and DFM stage: is the size on the drawing before or after plating, and which side of the tolerance does it apply to? Take a tinned copper busbar. The plating is often only a dozen micrometers or less, easy to dismiss. But when the mating part is a close fit, or when a single dimension is plated on both faces, that thickness doubles — and it stops being negligible.

In one sentence: for power-equipment parts, the final size is not decided by the machine alone. It is decided by machining and surface finishing together.

## Key References

1. Standardization Administration of China: GB/T 5585.1-2018, *Electrical copper and aluminum busbars — Part 1: Copper and copper alloy busbars* — flatness (wide face ≤5 mm/m, narrow face ≤2 mm/m), dimensional tolerance, conductivity (≥97% IACS), hardness (≥65 HB), and surface-quality requirements.
2. Standardization Administration of China: GB/T 7674-2020, *Gas-insulated metal-enclosed switchgear for rated voltages of 72.5 kV and above* — Clause 6.16, gas tightness: for closed-pressure systems, the leak rate from any single compartment to atmosphere, and between compartments, must not exceed 0.5% per year; over a minimum 25-year life the average gas loss across all compartments should be less than 15%.
3. GB/T 7251.1, *Low-voltage switchgear and controlgear assemblies — Part 1: General rules* — requirements on the resistance of busbar joints (a defined multiple of an equal length of conductor of the same cross-section); the working acceptance figures are ≤10 µΩ for silver-plated and ≤20 µΩ for tinned joints.
4. Power-industry handover leak-test practice for GIS (bagging method): after 24 hours, SF₆ in each bag must not exceed 30 ppm (by volume). Manufacturer data sheets commonly quote a per-compartment yearly leak rate of 0.3% or lower.

## Where we stand

We have made precision structural parts for twenty-three years, with thirty CNC machines including true 5-axis. Parts like these — busbars and copper bars, aluminum shells for GIS and switchgear, flanges and covers, conductor connections — fall right inside our daily work.

Where we can help is concrete: stable control of flatness and straightness, deburring before plating, machining of seal grooves and sealing faces, stock control for post-weld distortion, and small-batch rapid prototyping. If your power-equipment part is stuck on contact resistance, leak rate, or post-plating size, it is probably not a design problem — it is one of those surfaces not being right. Send us the drawing and we will get it right together.

[Free DFM review and quote](/contact/get-a-quote)
