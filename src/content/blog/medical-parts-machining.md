---
title: "Why Medical Parts Are Hard to Make: It's Not the Tolerance, It's Three Things You Can't See"
description: "Medical drawings rarely look intimidating, and the tolerances are not the tightest we see. What actually stalls yield and audits is whether the material can be traced back to its heat, whether the surface is clean after machining, and whether the part got contaminated again between cleaning and packing. Here is how ASTM F136, ASTM F138, ASTM A967, ASTM B912 and ISO 19227 actually apply."
pubDate: 2026-09-23
category: "Industry Insights"
system: "medical"
tags: ["medical device", "medical parts", "316L", "Ti-6Al-4V ELI", "ASTM F136", "ASTM F138", "passivation", "electropolishing", "ISO 19227", "traceability"]
author: "Strategy Advisory Team"
readingTime: "12 min read"
---

A medical drawing rarely looks intimidating at first glance. The geometry is not complicated and the tolerances sit around ±0.01 mm — for the robot parts and thermal hardware we run every day, that is not an unusual number.

But that is not where these parts get hard. The difficulty mostly is not on the drawing at all.

After twenty-three years in precision structural parts, what we see stall a medical delivery is seldom "was it milled accurately". It is three things you cannot see: whether the material can be traced back to its heat, whether the surface is actually clean after machining, and whether the part got contaminated again between cleaning and packing.

All three share one property. Done right, you cannot tell. Done wrong, you also cannot tell — not until the customer finds pitting, blows a limit, or an auditor asks for the paperwork.

So let us open all three doors.

## 1. Start with the part map: what on a medical device actually lands on a machining center

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 272" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Categories of medical device parts machined on CNC" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="340" y="28" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">What on a medical device actually lands on a machining center</text>
<rect x="22" y="54" width="150" height="190" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="22" y="54" width="150" height="32" rx="8" style="fill:#8B0000"/>
<rect x="22" y="70" width="150" height="16" style="fill:#8B0000"/>
<text x="97" y="75" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#FFFFFF">Diagnostic Housings</text>
<text x="36" y="116" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Ultrasound probe</text>
<text x="36" y="146" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Analyzer panels</text>
<text x="36" y="176" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">CT gantry parts</text>
<text x="36" y="218" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#8B0000">→ Looks + sealing</text>
<rect x="184" y="54" width="150" height="190" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="184" y="54" width="150" height="32" rx="8" style="fill:#8B0000"/>
<rect x="184" y="70" width="150" height="16" style="fill:#8B0000"/>
<text x="259" y="75" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#FFFFFF">Surgical Instruments</text>
<text x="198" y="116" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Handle housings</text>
<text x="198" y="146" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Blade seats</text>
<text x="198" y="176" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Jaw pivot parts</text>
<text x="198" y="218" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#8B0000">→ Corrosion + clean</text>
<rect x="346" y="54" width="150" height="190" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="346" y="54" width="150" height="32" rx="8" style="fill:#8B0000"/>
<rect x="346" y="70" width="150" height="16" style="fill:#8B0000"/>
<text x="421" y="75" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#FFFFFF">Fixtures &amp; Trays</text>
<text x="360" y="116" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Assembly fixtures</text>
<text x="360" y="146" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Sample trays</text>
<text x="360" y="176" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Calibration blocks</text>
<text x="360" y="218" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#8B0000">→ Accuracy + repeat</text>
<rect x="508" y="54" width="150" height="190" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="508" y="54" width="150" height="32" rx="8" style="fill:#8B0000"/>
<rect x="508" y="70" width="150" height="16" style="fill:#8B0000"/>
<text x="583" y="75" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#FFFFFF">Brackets + Motion</text>
<text x="522" y="116" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Display arms</text>
<text x="522" y="146" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Gimbal joints</text>
<text x="522" y="176" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Base parts</text>
<text x="522" y="218" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#8B0000">→ Stiffness + life</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 1 · Four categories of medical parts produced on machining centers — each with a different real requirement</figcaption>
</figure>

Four categories cover most of what a machining center can produce for a medical device. One distinction matters here: **only the second category touches the patient or body fluids.** For the other three, the difficulty is accuracy, cleanliness and consistency. Their drawing conventions, material standards and acceptance criteria are all different — quoting them as if they were one category is an easy way to underbid.

## 2. First gate: the material is not "just use 316L" — it is whether you can trace the heat

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One grade name, two different governing standards" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="340" y="28" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">One grade name, two different governing standards</text>
<rect x="24" y="48" width="306" height="200" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="24" y="48" width="306" height="34" rx="8" style="fill:#8B0000"/>
<rect x="24" y="66" width="306" height="16" style="fill:#8B0000"/>
<text x="177" y="70" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF">The drawing says "316L"</text>
<text x="40" y="108" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Standard 316L: general stainless spec</text>
<text x="40" y="134" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Medical / implant: ASTM F138</text>
<text x="40" y="160" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">UNS S31673 · 18Cr-14Ni-2.5Mo</text>
<text x="40" y="186" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Cr 17–19 · Ni 13–15 · Mo 2.25–3.00</text>
<text x="40" y="212" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">C ≤0.030 · S ≤0.010 · P ≤0.025</text>
<rect x="350" y="48" width="306" height="200" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<rect x="350" y="48" width="306" height="34" rx="8" style="fill:#8B0000"/>
<rect x="350" y="66" width="306" height="16" style="fill:#8B0000"/>
<text x="503" y="70" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="13" font-weight="700" style="fill:#FFFFFF">The drawing says "Ti-6Al-4V"</text>
<text x="366" y="108" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Industrial: ASTM B348 Grade 5</text>
<text x="366" y="134" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Oxygen max 0.20%</text>
<text x="366" y="160" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Implant: ASTM F136 Grade 23 ELI</text>
<text x="366" y="186" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">O ≤ 0.13% · Fe ≤ 0.25% · C ≤ 0.08%</text>
<text x="366" y="212" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">0.20 down to 0.13 buys toughness</text>
<rect x="24" y="262" width="632" height="44" rx="8" style="fill:#FAF0F0;stroke:#8B0000"/>
<text x="340" y="289" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">Answer these two wrong and everything downstream is guesswork</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 2 · "316L" and "Ti-6Al-4V" are both imprecise callouts, each covering at least two standards</figcaption>
</figure>

Writing 316L and Ti-6Al-4V on a drawing is the most common shorthand there is — and both names are imprecise. Each covers at least two different standards.

**On the stainless side.** Standard 316L is bought to a general stainless specification. Material for medical devices and implants is usually bought to ASTM F138, *Standard Specification for Wrought 18Cr-14Ni-2.5Mo Stainless Steel Bar and Wire for Surgical Implants* (UNS S31673). F138's window is chromium 17.00–19.00, nickel 13.00–15.00, molybdenum 2.25–3.00, carbon ≤0.030, sulfur ≤0.010, phosphorus ≤0.025, copper ≤0.50, nitrogen ≤0.10. Sulfur and phosphorus — the elements most people think of as tramp elements — are held tighter than on general-purpose stock, because they feed directly into corrosion resistance.

**Titanium is the clearer example.** The same Ti-6Al-4V exists as ASTM B348 Grade 5, with oxygen capped at 0.20%, and as implant-grade ASTM F136 Grade 23 — ELI, Extra Low Interstitial — where oxygen is pulled down to 0.13%, iron to 0.25% and carbon to 0.08%. A few hundredths of a percent. No caliper and no eye will find the difference. But oxygen is the strongest solid-solution strengthener in titanium, and giving it up buys toughness and resistance to fatigue crack growth. That is exactly what a load-bearing implant needs, and it is why Grade 23's minimum tensile requirement (860 MPa) is actually *lower* than Grade 5's.

One warning: **industrial ASTM B348 and implant-grade ASTM F136 are not interchangeable.** The industrial grade is legitimate for lightly loaded work such as instruments and external fixators, but it is the wrong call for a long-term load-bearing implant.

**What actually makes buyers sweat is the word "trace".**

Traceability on a medical part is not "we will send you a material certificate". It is a chain that cannot have a gap: the mill heat number on the raw stock → the material certificate → the markings we leave on the part and on the router card → the inspection records → the finished part. The upstream link is an EN 10204 3.1 certificate, listing measured chemistry, mechanical properties and the heat number, issued by an organisation **independent of the producer's commercial function** — not a distributor certificate that the distributor signed for itself.

Why does the chain matter so much? Because if one heat number is wrong, your customer is not recalling one part. They are recalling **every** part made from that heat — potentially several months and several hundred pieces. That is why incoming medical stock at our shop is stored segregated by heat, marked at sawing, and retained as samples.

One hard requirement in the Chinese standard is worth knowing: GB/T 13810-2017, *Wrought titanium and titanium alloy for surgical implants* (issued 2017-10-14, effective 2018-05-01), added an explicit rule over the 2007 edition that **recycled material is not permitted as feedstock for ingots or wrought product**. In other words, "this is remelted titanium" is itself a non-conformance in an implant context — and you cannot see it in the appearance or even necessarily in the chemistry. Only the paperwork proves it.

## 3. Second gate: the moment machining ends, stainless is at its dirtiest

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 368" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Passivation and electropolishing after machining stainless steel" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<defs>
<marker id="med3arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" style="fill:#8B0000"/></marker>
</defs>
<text x="340" y="28" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">The moment machining ends, stainless is at its dirtiest</text>
<rect x="24" y="52" width="188" height="104" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="38" y="78" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">1 · Machining</text>
<text x="38" y="106" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#1A1A1A">Tool and fixture steel</text>
<text x="38" y="128" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#1A1A1A">embeds free iron</text>
<text x="38" y="150" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#6B7280">Ignore it: rust in weeks</text>
<rect x="246" y="52" width="188" height="104" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="260" y="78" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">2 · Passivation</text>
<text x="260" y="98" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#8B0000">ASTM A967</text>
<text x="260" y="122" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#1A1A1A">Nitric / citric series</text>
<text x="260" y="144" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#1A1A1A">Free iron only, no size change</text>
<rect x="468" y="52" width="188" height="104" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="482" y="78" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">3 · Electropolish</text>
<text x="482" y="98" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#8B0000">ASTM B912</text>
<text x="482" y="122" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#1A1A1A">Removes material, size moves</text>
<text x="482" y="144" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11" style="fill:#1A1A1A">Specify the datum side</text>
<line x1="214" y1="104" x2="241" y2="104" stroke-width="1.6" marker-end="url(#med3arrow)" style="stroke:#8B0000"/>
<line x1="436" y1="104" x2="463" y2="104" stroke-width="1.6" marker-end="url(#med3arrow)" style="stroke:#8B0000"/>
<rect x="24" y="172" width="632" height="44" rx="8" style="fill:#FAF0F0;stroke:#8B0000"/>
<text x="340" y="190" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">Order rule: passivate after final polishing</text>
<text x="340" y="208" text-anchor="middle" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#6B7280">Polish after passivating and you just removed the film you paid for</text>
<rect x="24" y="232" width="632" height="112" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="44" y="256" font-family="system-ui, 'Segoe UI', sans-serif" font-size="12.5" font-weight="700" style="fill:#1A1A1A">So how do you prove it?</text>
<text x="44" y="282" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">The passive film is only 3–5 nm thick — transparent, invisible</text>
<text x="44" y="306" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Copper sulfate test (ASTM F1089) — any copper color is a fail</text>
<text x="44" y="330" font-family="system-ui, 'Segoe UI', sans-serif" font-size="11.5" style="fill:#1A1A1A">Potassium ferricyanide: free iron turns blue within 30 s</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 3 · Passivation and electropolishing are different processes — run them in the wrong order and the work is wasted</figcaption>
</figure>

The second gate is the surface. The counterintuitive part is this: **stainless steel's "does not rust" property does not hold after machining.**

Milling, turning, drilling and grinding all embed fine free iron into the surface — from the tool, the fixture, the abrasive. That iron is not part of the alloy; it is foreign contamination. Leave it alone and it oxidises within weeks, and you get rust spots on a part that is, on paper, 316L. For a medical part the problem is more than cosmetic: those spots and the pits under them are places where soil hides and where cleaning cannot reach.

So machined stainless normally goes through two operations, governed by two different standards:

- **Passivation, ASTM A967/A967M.** A chemical immersion, in either the nitric series (Nitric 1–5) or the citric series (Citric 1–4). It dissolves free iron and other surface contamination without attacking the base metal, so it **does not change dimensions**. For tight parts, this is the first choice.
- **Electropolishing, ASTM B912.** Electrochemical. The part is the anode and micro-peaks dissolve preferentially. It lowers surface roughness, smooths micro-burrs and small pits, and improves both corrosion resistance and cleanability. But it is **subtractive** — it removes material and the size moves.

The difference between the two lands right back on the drawing: **for an electropolished part, is the dimension on the drawing before or after polishing? Which side does the tolerance sit on?** Get this wrong and perfectly accurate machining can still be wasted.

**One ordering rule: passivation must come after final polishing.** Polishing strips the film you just grew — passivate first and polish later and the work is void. This is a frequent audit question and a frequent mistake.

**And how do you prove it was done?** The passive film is only 3–5 nm thick and transparent, so you cannot look at it. The industry does not inspect the film; it tests for the absence of free iron. A copper sulfate test — one of the methods in ASTM F1089 — keeps the surface wet for several minutes, and any visible copper deposit is a failure. A potassium ferricyanide test turns blue within 30 seconds where free iron is present.

One practical tell worth keeping: if a supplier says "we passivate" but cannot name which A967 treatment they run — which nitric number, which citric number — the statement carries no information. **Passivation process conditions differ by a grade, and the outcome can differ a lot.**

Finally, the point people miss most often: **rust appearing after delivery is usually not the steel's fault.** Chlorides (saline, chlorine-based disinfectants), the quality of steam and rinse water, detergent residue, and putting 316L parts in the same tray as chrome-plated or carbon steel items — dissimilar metals in contact form a galvanic cell. Any of these can take down a whole tray of instruments at once. Corrosion evaluation for instruments is exactly what ASTM F1089 covers.

## 4. Third gate: cleanliness is not "wiped clean", it is washable and provable

The third gate is cleanliness, and it is the most underrated of the three.

"Wiped clean" is appearance. "Cleanliness" is a set of measurable properties. The international standard ISO 19227:2018, *Implants for surgery — Cleanliness of orthopedic implants — General requirements*, splits residues into seven categories:

| Residue class | Plain-language description |
|---|---|
| Inorganic | Metal fines, salts, ions |
| Organic | Cutting fluid, oils and greases (typically tracked as TOC / THC) |
| Particulate | Solid particles, visible or not |
| Endotoxins | Bacterial debris (public technical summaries commonly cite limits on the order of ≤20 EU per part) |
| Bioburden | Total microbial count |
| Cytotoxicity | Whether the residue provokes a cytotoxic response |
| Visual | Visible staining or deposits |

The structural requirements in that standard matter more than any single number:

- It is expected to operate inside an **ISO 13485** quality system — not "we are careful about cleanliness".
- The cleaning process must be **validated**, with at least three batches of data, and it must be validated using the **worst-case sample** — the most geometrically complex, hardest-to-clean part — not the easiest one.
- It ties directly into biological evaluation (the ISO 10993 series). If the part is not clean, no amount of biocompatibility work stands up.

(The specific limit values sometimes quoted alongside that standard, like the endotoxin figure above, appear widely in public technical summaries but are not consistently stated. Acceptance should follow the customer's specified edition and drawing requirements — which I would write into the contract.)

On the shop floor, what you actually control comes down to three plain things:

1. **Parts do not touch the floor and do not sit open between operations.** The window between finish machining and cleaning is where residue is created — dried cutting fluid becomes a carbonised film that resists washing.
2. **Cleaning needs a defined cycle, not "let it run longer".** The usual route is alkaline clean → ultrasonic degrease → multi-stage DI water rinse → IPA dehydration → hot-air dry. Rinse water quality is itself a controlled parameter.
3. **Nothing sits open between cleaning and packing.** A clean part left in air for half an hour undoes much of what came before. Handling after cleaning, the packaging material, and even the environment the bag is opened in are all part of the same chain.

The hard part of the third gate is that it does not produce a number like a dimension does. It rests on process and records.

## 5. Before you send the drawing, settle these eight things

For a medical part, I would run through the list below before releasing the drawing. Settle these and both the quote and the lead time get much more stable:

| To confirm | Why it matters |
|---|---|
| Grade **plus standard number** | "316L" versus "ASTM F138", "Ti-6Al-4V" versus "ASTM F136 Grade 23 ELI" — completely different stock and price |
| Certificate type | EN 10204 3.1 or 3.2, or a CoC only — the three differ in cost and lead time |
| Does the heat number follow the part? | Whether to mark the part, whether to ship a traceability card with it |
| Which surface treatment, specifically | Passivation (A967), electropolishing (B912), or both; anodising titanium is a separate requirement |
| Datum before or after the treatment | Electropolishing removes material, anodising adds film; an unstated datum can put you out of tolerance |
| Cleanliness requirement | Specified standard, acceptance method, who tests, how many pieces |
| Inspection level | Full or sampling on critical dimensions — that call belongs to the customer, and we follow it |
| Packaging | Plain, cleanroom bag, vacuum, and whether the bag must be opened in a controlled environment |

The line most often missed is the **fifth**. It is not an accuracy question; it is an ordering and datum question — and it is also the single largest source of rework.

## Key references

1. ASTM F136, *Standard Specification for Wrought Titanium-6Aluminum-4Vanadium ELI (Extra Low Interstitial) Alloy for Surgical Implant Applications* — Grade 23 (UNS R56401 / R56407): O ≤0.13%, Fe ≤0.25%, C ≤0.08%, Al 5.50–6.50%, V 3.50–4.50%; corresponds to ISO 5832-3; minimum tensile strength 860 MPa, minimum yield 795 MPa.
2. ASTM F138, *Standard Specification for Wrought 18Chromium-14Nickel-2.5Molybdenum Stainless Steel Bar and Wire for Surgical Implants* (UNS S31673) — Cr 17.00–19.00%, Ni 13.00–15.00%, Mo 2.25–3.00%, C ≤0.030%, S ≤0.010%, P ≤0.025%, Cu ≤0.50%, N ≤0.10%.
3. GB/T 13810-2017, *Wrought titanium and titanium alloy for surgical implants* (issued 2017-10-14, effective 2018-05-01) — versus the 2007 edition, it explicitly adds the requirement that recycled material is not permitted as feedstock for ingots and wrought product, along with surface-contamination requirements.
4. ASTM A967/A967M, *Standard Specification for Chemical Passivation Treatments for Stainless Steel Parts*, and ASTM B912, *Standard Specification for Passivation of Stainless Steels Using Electropolishing* — chemical passivation (nitric 1–5, citric 1–4 series) and electropolishing passivation respectively; ASTM A380 covers the associated cleaning, descaling and passivation practice.
5. ASTM F1089, *Standard Test Method for Corrosion of Surgical Instruments* — the boil test and the copper sulfate test. The copper sulfate method detects free iron on the surface, and the standard notes that instruments should be passivated per A967/A967M, electropolished per B912, or both, before corrosion resistance is evaluated.
6. ISO 19227:2018, *Implants for surgery — Cleanliness of orthopedic implants — General requirements* — operates inside ISO 13485, applies risk control per ISO 14971, requires cleaning validation with at least three batches and a worst-case sample, and classifies residues as inorganic, organic, particulate, endotoxin, bioburden, cytotoxic and visual.
7. EN 10204, *Metallic products — Types of inspection documents* — a 3.1 certificate carries measured chemistry, mechanical properties and the heat number, issued by an organisation independent of the producer's commercial function; 3.2 adds independent third-party witnessing.

## About Eternal CNC

We have been making precision structural parts for twenty-three years, with thirty CNC machines including true 5-axis capability. Medical work — diagnostic housings, surgical instrument parts, fixtures and sample trays, brackets and motion components — sits squarely inside what we run every day.

Where we can help is concrete: sourcing to a named standard while retaining heat-number traceability, stable machining of 316L and titanium, deburring and passivation planning after machining, process control across cleaning and packing, and fast small-batch prototyping. If your medical part is stuck on material traceability, surface-treatment datums or cleanliness, send the drawing together with the requirements and we will start with a DFM review — the questions that need asking, we would rather ask before quoting.

[Free DFM review and quote](/contact/get-a-quote)
