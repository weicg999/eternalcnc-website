---
title: "Robot Material Selection, One Page: Part × Environment × Material × Finish"
description: "Stop asking which material is best. Five diagrams settle material, environment, finish and cost for every robot part — built for makers working on a budget."
pubDate: 2026-11-17
category: "Material Selection"
system: "robotics"
tags: ["robotics", "material selection", "6061 aluminum", "7075 aluminum", "carbon fiber", "surface finishing", "makers"]
author: Procurement Department
readingTime: "7 min read"
---

The first thing that stalls a robot build is not the CAD. It is picking material. 6061, 7075, stainless, titanium, carbon fiber — spread out a spec table and you end up more confused than when you started.

The problem is the question. **"Which material is best" has no answer. There is no best material, only the right one for the job.**

This is not a materials encyclopedia. It is a way to match things up: answer four questions, then check five diagrams. When you finish, you can say "this part gets this material, not that one." That is enough.

For the deep dive on joints, jump to the two longer articles at the end.

## 1. Answer four questions before you pick anything

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 316" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four-step material decision order for robots: environment first, then load, then weight, then budget" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">Not picking material — answering four questions</text>
<rect x="16" y="46" width="488" height="58" rx="9" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="42" y="82" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#0C447C">1</text>
<text x="66" y="69" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">What environment?</text>
<text x="66" y="97" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Humidity, heat, cleanliness rule some out</text>
<rect x="16" y="112" width="488" height="58" rx="9" style="fill:#EAF3EC;stroke:#7FBF9A;stroke-width:1"/>
<text x="42" y="148" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#1B5E3A">2</text>
<text x="66" y="135" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">How much load?</text>
<text x="66" y="163" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Static, repeated starts, or impact</text>
<rect x="16" y="178" width="488" height="58" rx="9" style="fill:#FAEEDA;stroke:#EF9F27;stroke-width:1"/>
<text x="42" y="214" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#633806">3</text>
<text x="66" y="201" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Is weight critical?</text>
<text x="66" y="229" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Every gram at the tip costs the whole arm</text>
<rect x="16" y="244" width="488" height="58" rx="9" style="fill:#F3E8EE;stroke:#C77BA6;stroke-width:1"/>
<text x="42" y="280" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#6B2447">4</text>
<text x="66" y="267" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Where does the money go?</text>
<text x="66" y="295" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Upgrade only what really carries load</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 1 · Order matters: environment eliminates options, load sets strength, weight sets specific strength, budget decides what to upgrade</figcaption>
</figure>

**The first question gets skipped most often.** Environment is not a footnote. It can rule out half your options before you draw anything. A prototype that runs fine on a bench can fail in three months in a humid shop.

**The second is the most misunderstood.** Robots see repeated start-stop cycles, not static load. Fatigue strength is typically only 30–40% of tensile strength. Size against static strength and the part runs borderline.

## 2. Six parts, match them up

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Six robot parts mapped to materials: frame 6061, joints 7075 or 17-4PH, drive steel, end effector 6061 or POM, housing sheet metal, bushings POM" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">Six parts, six materials, matched</text>
<rect x="16" y="46" width="150" height="40" rx="6" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="28" y="72" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Frame / base</text>
<rect x="174" y="46" width="330" height="40" rx="6" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="186" y="72" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">6061-T6　best value</text>
<rect x="16" y="90" width="150" height="40" rx="6" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="28" y="116" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Joint / flange</text>
<rect x="174" y="90" width="330" height="40" rx="6" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="186" y="116" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">7075-T6 / 17-4PH　local only</text>
<rect x="16" y="134" width="150" height="40" rx="6" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="28" y="160" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Drive interface</text>
<rect x="174" y="134" width="330" height="40" rx="6" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="186" y="160" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">4140 / 4340 steel　ground</text>
<rect x="16" y="178" width="150" height="40" rx="6" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="28" y="204" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Gripper / tip</text>
<rect x="174" y="178" width="330" height="40" rx="6" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="186" y="204" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">6061 / POM　light wins</text>
<rect x="16" y="222" width="150" height="40" rx="6" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="28" y="248" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Shell / guard</text>
<rect x="174" y="222" width="330" height="40" rx="6" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="186" y="248" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">5052 sheet　bend, don't mill</text>
<rect x="16" y="266" width="150" height="40" rx="6" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="28" y="292" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Bushings</text>
<rect x="174" y="266" width="330" height="40" rx="6" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="186" y="292" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">POM / UHMW-PE　self-lubricating</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 2 · Default the whole robot to 6061 and plastic; only the joint and drive rows are worth upgrading</figcaption>
</figure>

One line to remember: **spend on the parts that carry load. Everything else is 6061, plastic, and bought-in parts.**

For long members, buy extrusion and machine the ends instead of hogging from solid bar — far less scrap. For housings, bent 5052 sheet costs 10–20% of a solid milled block. Bearings, guides, and reducers: buy catalog parts. Never machine what you can order.

The subsystem-by-subsystem cost breakdown is in [Robot Parts Materials](/knowledge/tech-blog/robot-parts-material-selection-cost-guide/).

## 3. Change the environment, change the answer

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four environments mapped to materials: indoor 6061, humid 316L or sealed anodize, cleanroom electropolished 316L, high heat steel or titanium" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">Same robot, different environment, different answer</text>
<rect x="16" y="46" width="110" height="52" rx="8" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="71" y="78" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Indoor</text>
<rect x="134" y="46" width="370" height="52" rx="8" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="148" y="66" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">6061 + standard anodize</text>
<text x="148" y="93" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Cheapest, and quite enough</text>
<rect x="16" y="106" width="110" height="52" rx="8" style="fill:#FAEEDA;stroke:#EF9F27;stroke-width:1"/>
<text x="71" y="138" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#633806">Humid / salt</text>
<rect x="134" y="106" width="370" height="52" rx="8" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="148" y="126" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">316L, or sealed hard anodize</text>
<text x="148" y="153" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Bare 7075 stress-corrodes</text>
<rect x="16" y="166" width="110" height="52" rx="8" style="fill:#EAF3EC;stroke:#7FBF9A;stroke-width:1"/>
<text x="71" y="198" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1B5E3A">Cleanroom</text>
<rect x="134" y="166" width="370" height="52" rx="8" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="148" y="186" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">316L electropolished</text>
<text x="148" y="213" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Leave outgassing plastics behind</text>
<rect x="16" y="226" width="110" height="52" rx="8" style="fill:#F3E8EE;stroke:#C77BA6;stroke-width:1"/>
<text x="71" y="258" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#6B2447">High heat</text>
<rect x="134" y="226" width="370" height="52" rx="8" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="148" y="246" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1A1A1A">Steel, or titanium</text>
<text x="148" y="273" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Aluminum softens past 150 °C</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 3 · Environment first: humidity means corrosion, cleanrooms mean outgassing, heat means softening — not hardness</figcaption>
</figure>

Two common mistakes are worth correcting.

**Stainless for humidity is about corrosion, not hardness.** Chromium forms a passive film that stops corrosion. Hardness is not the selling point. If you want hardness, martensitic steels are harder; if you want light weight, stainless is heavier. The real cost is work hardening, poor thermal conductivity, and gummy chips.

**Titanium is not just expensive.** Its thermal conductivity is about 7 W/(m·K), one twenty-fourth of aluminum. A joint housing also has to shed heat; titanium traps it inside. And here is the counterintuitive part: the specific stiffness of aluminum, magnesium, titanium, and steel is nearly identical — a narrow band of 24 to 26. Swapping aluminum for titanium to save weight delivers far less than expected. **Material solves strength; structure solves stiffness.**

Carbon fiber is the same story. Its specific stiffness and strength are genuinely high, but it is **anisotropic, weak in interlaminar shear, and prone to edge delamination**. It suits long arm links, not joint housings that need drilled and tapped holes. Don't use it because it sounds premium.

## 4. Pair the finish with the material

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Five materials paired with finishes: 6061 anodize, 7075 hard anodize, carbon steel nickel or black oxide, 316L passivate, titanium anodize but poor heat sink" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">The finish is part of the material choice</text>
<rect x="16" y="46" width="90" height="46" rx="7" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="61" y="75" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">6061</text>
<rect x="114" y="46" width="390" height="46" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="126" y="75" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Anodize — mask where you need conductivity</text>
<rect x="16" y="96" width="90" height="46" rx="7" style="fill:#FAEEDA;stroke:#EF9F27;stroke-width:1"/>
<text x="61" y="125" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#633806">7075</text>
<rect x="114" y="96" width="390" height="46" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="126" y="125" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Hard anodize — allow for bearing fit</text>
<rect x="16" y="146" width="90" height="46" rx="7" style="fill:#EAF3EC;stroke:#7FBF9A;stroke-width:1"/>
<text x="61" y="175" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1B5E3A">Steel</text>
<rect x="114" y="146" width="390" height="46" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="126" y="175" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Nickel / black oxide — bare steel rusts</text>
<rect x="16" y="196" width="90" height="46" rx="7" style="fill:#EAF3EC;stroke:#7FBF9A;stroke-width:1"/>
<text x="61" y="225" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1B5E3A">316L</text>
<rect x="114" y="196" width="390" height="46" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="126" y="225" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Passivate — electropolish for clean use</text>
<rect x="16" y="246" width="90" height="46" rx="7" style="fill:#F3E8EE;stroke:#C77BA6;stroke-width:1"/>
<text x="61" y="275" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#6B2447">Titanium</text>
<rect x="114" y="246" width="390" height="46" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="126" y="275" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Anodize for color — not for heat sinking</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 4 · Decide the finish when you choose the material, not after the parts are made</figcaption>
</figure>

Coating thickness is the easy trap. It **can be measured**, so it sits on the verifiable side — but those few microns of anodic growth eat into fit dimensions. Mask bearing seats or compensate for film thickness on the drawing. That decision happens before release, not after plating. The full calculation is in [Anodizing and Dimension Control](/knowledge/tech-blog/robotics-anodizing-dimension-control/).

## 5. Which layer deserves the money

<figure style="margin:1.8em 0;">
<svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Relative cost ladder for robot materials from cheap to expensive: 6061 and POM, 5052 sheet and 4140 steel, 7075 and 17-4PH and 316L, titanium and PEEK" style="width:100%;max-width:520px;height:auto;display:block;margin:0 auto;border:1px solid #E5E7EB;border-radius:10px;background:#FFFFFF;">
<text x="260" y="30" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="18" font-weight="700" style="fill:#1A1A1A">Spend at the edge, not across the whole robot</text>
<rect x="16" y="48" width="110" height="42" rx="7" style="fill:#E6F1FB;stroke:#85B7EB;stroke-width:1"/>
<text x="26" y="75" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#0C447C">Default</text>
<rect x="134" y="48" width="356" height="42" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="146" y="75" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">6061 / POM / catalog parts</text>
<rect x="16" y="98" width="180" height="42" rx="7" style="fill:#EAF3EC;stroke:#7FBF9A;stroke-width:1"/>
<text x="26" y="125" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#1B5E3A">Form saves</text>
<rect x="204" y="98" width="286" height="42" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="216" y="125" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">5052 sheet / 4140 steel</text>
<rect x="16" y="148" width="270" height="42" rx="7" style="fill:#FAEEDA;stroke:#EF9F27;stroke-width:1"/>
<text x="26" y="175" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#633806">Local upgrade</text>
<rect x="294" y="148" width="196" height="42" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="306" y="175" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">7075 / 17-4PH / 316L</text>
<rect x="16" y="198" width="360" height="42" rx="7" style="fill:#F3E8EE;stroke:#C77BA6;stroke-width:1"/>
<text x="26" y="225" font-family="'Segoe UI', sans-serif" font-size="17" font-weight="700" style="fill:#6B2447">Special cases</text>
<rect x="384" y="198" width="106" height="42" rx="7" style="fill:#F7F8FA;stroke:#E5E7EB;stroke-width:1"/>
<text x="392" y="225" font-family="'Segoe UI', sans-serif" font-size="17" style="fill:#2C2C2A">Ti / PEEK</text>
</svg>
<figcaption style="margin-top:.6em;font-size:.85rem;color:#6B7280;text-align:center;">Figure 5 · Cost climbs to the right. Most parts stay on the default row; upgrades happen in one or two places</figcaption>
</figure>

Three savings moves have nothing to do with grade:

**Change the form.** Sheet metal for thin panels, extrusion for long members, die casting or injection molding for volume, CNC for prototypes. This often saves more than changing alloy.

**Dare to use plastic.** Grippers, bushings, guards — plastic is not just cheaper, often better. Lighter, quieter, no lubrication.

**Do DFM early.** Wall thickness, the tolerance you truly need, feature simplification. Those three cut machining cost before the first cut.

## 6. Makers on a budget: what to spend on first

Engineers and makers fail differently. Engineers fear design failure; makers fear running out of money before the thing moves.

Spend in this order:

1. Build version one from the default layer in Figure 2. Don't touch titanium or carbon fiber yet.
2. Upgrade only the part that broke — change **that one** to 7075 or steel. Don't upgrade the whole arm.
3. Buy every catalog part you can. Don't machine bearing blocks and reducers.
4. Fix the finish on the drawing. Don't discover a plated bearing seat after the fact.
5. When unsure, ask "is there a cheaper material that does this job?" Usually there is.

What we can take off your plate: before quoting, we flag which operations land on the "cannot verify afterward" side; we stock aluminum, steel, titanium, and engineering plastics, from one-off prototypes to small batches, with no minimum order; quotes go out in 2 hours, prototypes in 3–7 days; EN 10204 3.1 certificates and heat-lot traceability are available.

[Send a drawing, get a quote in 2 hours](/contact/get-a-quote/)

## Frequently asked questions

**Should every robot be 6061?**
Most structural parts, yes. Joints, drives, and wear parts often need an upgrade. The default layer is a starting point, not the finish line.

**Does a humid environment mean all stainless?**
No. A whole 316L robot costs more and weighs more. Use stainless for the local parts that see moisture; hard-anodize and seal the rest.

**Is carbon fiber better than aluminum?**
Not "better" — different, anisotropic. Great for long links; not necessarily better for a joint housing that needs holes and heat paths.

**Budget for one upgrade only. Which part?**
The part that fails first. Usually a joint flange or a loaded end-effector piece, never the housing.

## Go deeper

- [Robot Parts Materials: What to Use for Every Component (and How to Cut Cost)](/knowledge/tech-blog/robot-parts-material-selection-cost-guide/) — subsystem-by-subsystem breakdown and five cost rules.
- [How to Choose Materials for Robot Joints: Seven Decisions](/knowledge/tech-blog/robot-joint-material-selection/) — joints only: parameter table, the specific-stiffness surprise, and three traps.

Parameter ranges come from the two articles above, both already published on this site. Selection criteria agree with common-grade data for 6061-T6, 7075-T6, and Ti-6Al-4V; always confirm the current mill certificate for the specific grade.
