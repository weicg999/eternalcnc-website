---
title: "Implanted parts vs surgical instruments: two tracks on the same device"
description: "Medical parts are often treated as one category, but they really split into two very different tracks — load-bearing implants that stay in the body for years, and surgical instruments that touch a surgeon's hand for a few minutes. From material selection and machining strategy to surface and inspection, the requirements diverge everywhere. This article breaks that line down and ties it to materials we actually machine, like 17-4PH / 630."
pubDate: 2026-09-24
category: "Industry Insights"
system: "medical"
tags: ["medical parts", "implants", "surgical instruments", "17-4PH", "630", "ASTM F899", "ISO 5832", "CoCrMo", "traceability"]
author: "Strategy Advisory Team"
readingTime: "11 min"
---

The previous article covered why medical parts are hard not because of tolerance, but because of three invisible things — material traceability, the surface after machining, and secondary contamination between cleaning and packaging. Those three gates apply to all medical parts.

But medical parts also split into **two very different tracks**: long-term load-bearing **implants** (bone screws, joints, plates) versus **surgical instruments** (needle holders, elevators, retractors, scissors) that only touch a surgeon's hand for a few minutes. One stays in the body for ten years and carries load; the other has intermittent contact and must survive repeated sterilization.

Change the risk level, and the whole chain — from material to inspection — changes with it. Quoting and scheduling them as if they were the same part is exactly how the real cost gets underestimated.

Today we break that watershed down.

## 1. First, which track are you holding?

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Five-dimension comparison of load-bearing implants vs surgical instruments" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="340" y="26" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">One "medical part" is really two tracks</text>
<rect x="22" y="48" width="636" height="30" rx="7" style="fill:#F3F4F6"/>
<text x="170" y="68" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="12.5" font-weight="700" style="fill:#1A1A1A">Dimension</text>
<text x="345" y="68" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">Load-bearing implant</text>
<text x="525" y="68" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">Surgical instrument</text>
<rect x="22" y="84" width="636" height="52" rx="7" style="fill:#FAFAFA;stroke:#E5E7EB"/>
<text x="170" y="106" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11.5" font-weight="700" style="fill:#1A1A1A">In-body / contact</text>
<text x="345" y="100" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11.5" style="fill:#1A1A1A">Permanent, load-bearing</text>
<text x="345" y="120" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280">screws / joints / plates</text>
<text x="525" y="100" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11.5" style="fill:#1A1A1A">Intermittent, resterilizable</text>
<text x="525" y="120" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280">forceps / scissors / retractors</text>
<rect x="22" y="142" width="636" height="52" rx="7" style="fill:#FAFAFA;stroke:#E5E7EB"/>
<text x="170" y="164" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11.5" font-weight="700" style="fill:#1A1A1A">Common materials</text>
<text x="345" y="158" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11.5" style="fill:#1A1A1A">Ti-6Al-4V ELI / CoCrMo</text>
<text x="345" y="178" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280">316LVM (ASTM F138)</text>
<text x="525" y="158" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11.5" style="fill:#1A1A1A">420 / 440C / 17-4PH</text>
<text x="525" y="178" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280">some 303 free-machining</text>
<rect x="22" y="200" width="636" height="52" rx="7" style="fill:#FAFAFA;stroke:#E5E7EB"/>
<text x="170" y="222" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11.5" font-weight="700" style="fill:#1A1A1A">Machining strategy</text>
<text x="345" y="216" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11.5" style="fill:#1A1A1A">5-axis, hard-to-cut, low volume</text>
<text x="345" y="236" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280">full tool traceability</text>
<text x="525" y="216" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11.5" style="fill:#1A1A1A">heat-treated hard, higher volume</text>
<text x="525" y="236" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280">fast tool wear</text>
<rect x="22" y="258" width="636" height="52" rx="7" style="fill:#FAFAFA;stroke:#E5E7EB"/>
<text x="170" y="280" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11.5" font-weight="700" style="fill:#1A1A1A">Surface & cleanliness</text>
<text x="345" y="274" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11.5" style="fill:#1A1A1A">electropolish + passivate</text>
<text x="345" y="294" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280">ISO 19227 (strictest)</text>
<text x="525" y="274" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11.5" style="fill:#1A1A1A">passivate + standard polish</text>
<text x="525" y="294" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280">resterilization resistance</text>
<rect x="22" y="316" width="636" height="36" rx="7" style="fill:#FAFAFA;stroke:#E5E7EB"/>
<text x="170" y="339" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11.5" font-weight="700" style="fill:#1A1A1A">Inspection & docs</text>
<text x="345" y="339" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#1A1A1A">3.1 + 3.2 / lot trace / CMM full</text>
<text x="525" y="339" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280">3.1 / sampling + function test</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 1 · The two tracks diverge on five dimensions</figcaption>
</figure>

The one-line distinction: **does it carry load inside the body for years.** That single sentence decides the material, the machining, and how deep the inspection goes.

## 2. The fork in material selection

Material is where the fork starts, and where names most often get written wrong.

**Load-bearing implants** run on the "implant-grade" material system — composition, inclusions, and grain size all have ceilings, and every heat is traceable:

- **Titanium Ti-6Al-4V**: industrial grade is ASTM B348 Grade 5; implant grade is **ASTM F136 Grade 23 (ELI, Extra Low Interstitial)**, corresponding to **ISO 5832-3, Wrought titanium 6-aluminium 4-vanadium alloy**. ISO 5832-3's window is: aluminum 5.5–6.75, vanadium 3.5–4.5, iron ≤0.30, oxygen ≤0.20, carbon ≤0.08. The ELI version pushes oxygen below 0.13% for toughness and fatigue resistance (covered in the previous article).
- **Cobalt-chromium-molybdenum (CoCrMo)**: cast grade is **ASTM F75** (≈ ISO 5832-4 cast Co-Cr-Mo), chromium 26.5–30, molybdenum 4.5–7, carbon ≤0.35; wrought grade is **ASTM F1537 low-carbon wrought CoCrMo** (≈ **ISO 5832-12 wrought Co-Cr-Mo**, chromium 26–30, molybdenum 5–7, carbon ≤0.14 low-C or 0.15–0.35 high-C). **Cast F75 and wrought F1537 are not interchangeable** — their mechanical and fatigue behavior differ substantially.
- **316LVM**: that is **ASTM F138** (UNS S31673), covered in the previous article.

**Surgical instruments** run on a different standard. The unified spec for instrument stainless is **ASTM F899-20, Wrought Stainless Steels for Surgical Instruments**. It sorts materials into classes: Class 3 austenitic (301/302/304/316), Class 4 martensitic (410/420/440, hardened to HRC 50–60), Class 5 precipitation-hardening (630, i.e. **17-4PH**, and XM-16), Class 6 ferritic (430).

One key point: **ASTM F899 specifies chemistry only**; mechanical properties (hardness, strength) are covered by referenced standards such as A276 and A564. Martensitic grades also cap sulfur at ≤0.030%. It is harmonized with ISO 7153-1, Metallic materials for surgical instruments. So "420 stainless" is not enough — you must state F899 Class 4 and the hardness tier, or the heat treatment that follows has no basis.

**For us specifically:** 17-4PH / 630 is a material we actually machine. It appears in instruments (scissor bodies, forceps, needle holders) and in some non-load-bearing implant attachments. But precipitation-hardening steel has a machining rule we cover below.

## 3. The fork in machining strategy

The two tracks have opposite machining pain points.

**Load-bearing implants** tend to be low-volume and high-complexity: joint surfaces, anatomic curves, thin walls, odd holes — 5-axis single-setup is common. The materials are also hard to cut: titanium and CoCrMo have poor thermal conductivity, gum up the tool, and work-harden, so tool life is short and tools must be traceable from raw stock to finished part. The value here is "make the hard shape, and make it stable," not "make it fast."

**Surgical instruments** are usually simpler geometrically and higher in volume, but often arrive already heat-treated to high hardness (martensitic HRC 50–60, or 17-4PH aged to HRC 38–44). Tool wear is fast and the demands on the tool tip and coolant are higher; still, they allow more conventional equipment and more economical cycle times.

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Machining sequence for 17-4PH precipitation-hardening stainless" style="width:100%;height:auto;display:block;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<defs>
<marker id="med2arrow" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 z" style="fill:#8B0000"/></marker>
</defs>
<text x="340" y="26" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="14" font-weight="700" style="fill:#1A1A1A">17-4PH / 630: finish before aging</text>
<rect x="22" y="52" width="180" height="120" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="112" y="80" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">① Solution annealed</text>
<text x="112" y="104" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#1A1A1A">Condition A, softer</text>
<text x="112" y="126" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#1A1A1A">easy to cut, easy to form</text>
<text x="112" y="148" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280">size not yet final</text>
<rect x="250" y="52" width="180" height="120" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="340" y="80" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">② Finish in soft state</text>
<text x="340" y="104" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#1A1A1A">hit the dimensions</text>
<text x="340" y="126" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#1A1A1A">leave aging stock</text>
<text x="340" y="148" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280">this is the key step</text>
<rect x="478" y="52" width="180" height="120" rx="8" style="fill:#FAFAFA;stroke:#D9D9D9"/>
<text x="568" y="80" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">③ Age hardening</text>
<text x="568" y="104" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#1A1A1A">HRC 38–44</text>
<text x="568" y="126" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#1A1A1A">slight growth / distortion</text>
<text x="568" y="148" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11" style="fill:#6B7280">only light touch-up</text>
<line x1="204" y1="112" x2="246" y2="112" stroke-width="1.8" marker-end="url(#med2arrow)" style="stroke:#8B0000"/>
<line x1="432" y1="112" x2="474" y2="112" stroke-width="1.8" marker-end="url(#med2arrow)" style="stroke:#8B0000"/>
<rect x="22" y="188" width="636" height="92" rx="8" style="fill:#FAF0F0;stroke:#8B0000"/>
<text x="340" y="216" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="12.5" font-weight="700" style="fill:#8B0000">Rule: finish machining before aging</text>
<text x="340" y="242" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11.5" style="fill:#1A1A1A">After aging the material hardens and grows / distorts; cutting it hard wastes tools and risks consistency</text>
<text x="340" y="264" text-anchor="middle" font-family="'Segoe UI', system-ui, sans-serif" font-size="11.5" style="fill:#1A1A1A">Whether the drawing calls out "pre-aging" or "post-aging" size decides how the process is sequenced</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 2 · 17-4PH/630 sequencing: finish in the soft state, age last</figcaption>
</figure>

The diagram above is the sequencing logic for 17-4PH / 630: **do the finish machining in the solution-annealed (Condition A, softer) state, and only then run age hardening.** Aging drives the material to HRC 38–44 and brings slight dimensional growth and distortion — cutting it hard is both tool-hungry and hard to keep consistent. So whether the drawing dimension is "pre-aging" or "post-aging" directly sets the process sequence. Miss this, and everything done earlier can be wasted.

## 4. The fork in surface and cleanliness

The three gates from the previous article still apply here; only the strictness differs.

**Load-bearing implants** demand the most: usually electropolish (ASTM B912, electrochemical stock removal, lower roughness) plus passivation (ASTM A967/A967M, dissolves free iron only, no size change), and cleanliness to **ISO 19227:2018, Cleanliness of orthopedic implants** — residues split into seven classes (inorganic, organic, particulate, endotoxin, bioburden, cytotoxicity, visual), all under an ISO 13485 system with worst-case-sample validation. This is the strictest tier in medical parts.

**Surgical instruments** care more about "corrosion resistance through repeated sterilization": passivation plus standard polishing is usually enough, and appearance consistency and feel matter. But do not relax — instrument corrosion is evaluated per **ASTM F1089**; chlorides (saline, chlorine disinfectants) and galvanic contact with chrome-plated or carbon-steel parts in the same tray are common failure points.

Both share the same baseline: **passivation must come after the final polish** (polishing strips the fresh passive film; reverse the order and it is wasted), and "we passivated it" must name which A967 treatment was used.

## 5. The fork in inspection and documentation

The last watershed is inspection and paperwork.

**Load-bearing implants**: the material certificate is usually **EN 10204 3.1** (issued by a unit independent of the commercial function, with actual chemistry, mechanicals, and heat number), and critical parts may require **3.2** (adds third-party witness); full lot traceability from heat number to part number; key dimensions on CMM at full inspection; and a documented link to biocompatibility (ISO 10993 series). Audit wants the "chain," not a single certificate.

**Surgical instruments**: 3.1 is generally sufficient; sampling plus functional testing (open/close, cut, lock) and hardness spot checks. Far less paperwork, but functional pass is a hard metric — a forceps that will not grip angers a customer more than a 0.02 mm size miss.

Run this checklist before sending the drawing; quote and lead time will both be steadier:

| Confirm | Why the two tracks differ |
|---|---|
| Grade **with standard number** | "420" vs "ASTM F899 Class 4", "Ti-6Al-4V" vs "ASTM F136 Grade 23 ELI" change material and price |
| Which medical class | Implant vs instrument sets traceability depth, cleanliness tier, inspection ratio |
| Aging condition | 17-4PH/630 "pre-aging" vs "post-aging" size sets the sequence |
| Surface treatment named | Passivate (A967) / electropolish (B912) / both; order and datum must be stated |
| Certificate type | 3.1, 3.2, or CoC only — cost and lead time differ |
| Cleanliness requirement | Implants often specify ISO 19227; instruments use ASTM F1089 corrosion test |
| Inspection ratio | Implants lean full inspection on key dims; instruments lean sampling + function test |

## Key references

1. ASTM F899-20, *Standard Specification for Wrought Stainless Steels for Surgical Instruments* — Class 3 austenitic (301/302/304/316), Class 4 martensitic (410/420/440, HRC 50–60), Class 5 precipitation-hardening (630/17-4PH, XM-16), Class 6 ferritic (430); **chemistry only**, mechanicals referenced to A276/A564, martensitic sulfur ≤0.030%; harmonized with ISO 7153-1.
2. ISO 5832-3:1996, *Implants for surgery — Metallic materials — Part 3: Wrought titanium 6-aluminium 4-vanadium alloy* — aluminum 5.5–6.75, vanadium 3.5–4.5, iron ≤0.30, oxygen ≤0.20, carbon ≤0.08; ASTM F136 Grade 23 ELI is the stricter low-interstitial version (oxygen ≤0.13%).
3. ISO 5832-12:2016, *Implants for surgery — Metallic materials — Part 12: Wrought cobalt-chromium-molybdenum alloy* — chromium 26–30, molybdenum 5–7, carbon ≤0.14 (low-C) or 0.15–0.35 (high-C), nickel ≤1, iron ≤0.75; ≈ ASTM F1537 wrought low-C CoCrMo.
4. ASTM F75, *Cast Cobalt-Chromium-Molybdenum Alloy for Surgical Implant Applications* — cast CoCrMo (≈ ISO 5832-4), chromium 26.5–30, molybdenum 4.5–7, carbon ≤0.35; not interchangeable with wrought F1537.
5. ASTM F138, *Wrought 18Cr-14Ni-2.5Mo Stainless Steel Bar and Wire for Surgical Implants (UNS S31673)* — 316LVM, chromium 17.00–19.00, nickel 13.00–15.00, molybdenum 2.25–3.00, carbon ≤0.030, sulfur ≤0.010.
6. ASTM A967/A967M (Chemical Passivation Treatments), ASTM B912 (Passivation Using Electropolishing), ASTM F1089 (Corrosion of Surgical Instruments) — chemical passivation (Nitric 1–5 / Citric 1–4), electropolishing, and instrument corrosion evaluation (boiling water + copper sulfate).
7. ISO 19227:2018, *Implants for surgery — Cleanliness of orthopedic implants — General requirements* — under ISO 13485, seven residue classes; EN 10204 defines 3.1 / 3.2 certificate types.

## Where we stand on this

We have machined precision structural parts for twenty-three years, with real 5-axis capability among our thirty CNC machines. We can take both tracks of medical parts, but with different playbooks:

- **Surgical instruments (17-4PH/630, 420/440C, 303, etc.)**: low-volume rapid prototyping is our strength, with a quote inside two hours; for precipitation-hardening materials like 17-4PH we follow the rule above — finish in the soft state, age last.
- **Load-bearing implants**: we handle the precision machining of load-bearing attachments and non-core structural parts within our capability; for core implants we recommend co-development with a partner holding ISO 13485 certification — we bring machining and traceability, and do not take on the regulatory responsibility of the implant itself.

If your medical part is stuck on material selection, aging sequence, surface-treatment datum, or cleanliness, send the drawing and requirements together and we will run a DFM review first — we ask the right questions before the quote.

[Free DFM review and quote](/contact/get-a-quote/)
