---
title: "How to Choose Materials for Robot Joints: Seven Decisions, from Load Spectrum to Batch Consistency"
description: "Joints carry more than half the BOM cost of a robot. Pick the wrong material and you add 30% weight, halve fatigue life and double unit cost — often all three at once. This is not a 'best material' article. It's the order in which to make the decisions."
pubDate: 2026-09-11
category: "Material Selection"
system: "robotics"
tags: ["robotics", "robot joints", "material selection", "harmonic drive", "specific stiffness", "thin-wall machining", "production consistency"]
author: "Eternal CNC Engineering Team"
readingTime: "10 min read"
---

This piece is about what happens inside a joint — the engineering decisions. If what you need is the quick reference for the dozens of parts in a whole robot, start with [How to choose materials for robot parts](/knowledge/tech-blog/robot-parts-material-selection-cost-guide/). That one saves you money. This one saves you failures.

## 1. The joint is the most expensive thing on the robot

A humanoid carries 30 to 40 degrees of freedom across its rotary and linear joints. In the BOM, the joint module — motor, reducer, encoder, brake and the machined housing around them — usually accounts for more than half the cost.

There's a half-joking line in the industry: building a robot that walks is not hard. Building a joint that is cheap, durable, and manufacturable ten thousand times over is.

Material choice carries more weight in that than most people assume. **On the same structural design, the wrong material can add 30% to weight, halve fatigue life, and double unit cost — and those three failures tend to arrive together.**

This article isn't about which material is best. There is no answer to that. It's about **the order in which you should make the decisions when the drawing is already in front of you.**

## 2. Open a joint up

Take a typical rotary joint module. Roughly, it stacks up like this:

| Part | What it does | Typical material | The constraint that bites |
| --- | --- | --- | --- |
| Harmonic drive flexspline | Elastic deformation transmits motion | 20CrMnTi / 40Cr carburising steel | Fatigue life, tooth accuracy |
| Circular spline | Fixed internal gear meshing with the flexspline | 40Cr / 42CrMo quenched and tempered | Tooth hardness, wear resistance |
| Planetary roller screw (linear joints) | Rotation to linear thrust | GCr15 / 38CrMoAl nitriding steel | Axial stiffness, lead accuracy |
| Joint housing | Load path, heat path, datum | 7075-T6 / 6061-T6 aluminium | Wall thickness, concentricity |
| Output flange | Connects the link, transmits torque | Aluminium / alloy steel | Face runout, bolt hole position |
| Crossed roller bearing | Combined loading | GCr15 bearing steel | Clearance, raceway roughness |
| Encoder disc bracket | Holds the reading accuracy | Aluminium / PEEK | Dimensional thermal stability |

**Look at that last row.** An unremarkable little bracket. If its coefficient of thermal expansion differs enough from the housing, a 30°C rise will make the reading drift — and a great many "joint control accuracy" problems turn out to be a bracket deforming, not an algorithm failing.

## 3. Material selection is not picking the best material. It's solving a constraint equation.

Four constraints, in priority order. The order is not negotiable.

**1. Load spectrum → strength and fatigue**

A robot joint does not see static load. It sees cyclic load from repeated starts and stops. On a walking humanoid, a hip joint cycles in the tens of thousands per day. **Fatigue limit is typically only 30–40% of tensile strength**, which means selecting on static strength produces parts that are quietly unsafe.

**2. Weight budget → specific strength**

The heavier the end effector, the bigger the motor and reducer have to be, and the spiral continues. The rough industry rule: every kilogram removed at the end of a leg is worth considerably more than a kilogram of material.

**3. Operating environment → corrosion, temperature, heat path**

Motors and drives generate heat inside the joint, and the housing *is* the heat sink. This single constraint eliminates a whole set of high-performance, poor-conductivity options. Titanium is the case in point below.

**4. Manufacturing capability → can you actually land it, repeatably**

The one most often skipped, and the most lethal. Material datasheets describe theoretical properties. Real properties belong to the process.

## 4. Five material families and where each one belongs

| Material | Density g/cm³ | Tensile strength MPa (typical) | Specific strength | Conductivity W/(m·K) | Machinability | Relative cost |
| --- | --- | --- | --- | --- | --- | --- |
| 6061-T6 aluminium | 2.7 | 310 | 115 | 167 | Excellent | Low |
| 7075-T6 aluminium | 2.7 | 570 | 211 | 130 | Good | Medium |
| AZ31B magnesium | 1.8 | 250 | 139 | 96 | Good (fire precautions) | Medium-high |
| TC4 titanium | 4.5 | 895 | 199 | **7** | Poor | High |
| 42CrMo steel, Q&T | 7.85 | ~1000 | 127 | 44 | Fair | Low |
| PEEK | 1.3 | 100 | 77 | 0.25 | Good | Very high |

> Typical values for common grades. Actual values vary with standard and heat treatment — go by the mill certificate for the specific lot you buy.

**And here is the counter-intuitive conclusion, which deserves its own line.**

Aluminium, magnesium, titanium and steel all have **almost the same specific stiffness** — Young's modulus divided by density. All of them land inside a narrow band around 24 to 26. Which means:

> **Where stiffness is the limit, swapping aluminium for titanium buys you far less weight saving than you expect.**

Real weight reduction comes from structural design: topology optimisation, thin walls with ribs, deeper sections, hollow forms. **Material solves strength problems. Structure solves stiffness problems.** Confusing the two is how people spend titanium money and get psychological comfort in return.

## 5. Five high-frequency parts, and the logic behind each

**1. Harmonic drive flexspline: it has to bend forever without cracking**

The flexspline is elastically deforming every second it runs, and the failure mode is almost always a fatigue crack at the tooth root. Hence **carburising steel** — 20CrMnTi or 40Cr — case hardened to HRC 58–62 for wear, with a tough core to absorb the deformation.

In the process chain, what actually decides service life is the **cryogenic treatment after carburising** (below −70°C). That's what converts retained austenite. Skip it and dimensions drift after assembly, and your accuracy is gone. Tooth form comes from wire EDM or profile grinding, and wall thickness typically has to hold to ±0.01 mm.

**2. Circular spline: the hardness *difference* matters more than the hardness**

40Cr or 42CrMo, quenched, tempered, then ground. The point isn't "harder is better" — it's that the circular spline and the flexspline need a sensible hardness difference, with the flexspline slightly softer. Get it backwards and the flexspline wears out early.

**3. Planetary roller screw: stiffness and accuracy at the same time**

Usually GCr15 or nitriding steel 38CrMoAl. A nitrided case is hard with very little distortion, which is exactly what long, slender, high-aspect-ratio parts need — those are the parts that suffer most in a quench. Lead accuracy after thread grinding sets the repeatability of the whole linear joint.

**4. Joint housing: 7075-T6 is today's value balance point**

Specific strength of 211, close to titanium, plus 130 W/(m·K) which handles the heat path, plus workable machinability. For most load-bearing joint housings it's the realistic answer.

For surface treatment we recommend **hard anodising**, with a film hardness above HV400 — wear resistant and electrically insulating. Micro-arc oxidation if you need more corrosion resistance. But watch what film thickness does to your fits: critical seats like bearing bores need masking or coating-thickness compensation decided in advance. We wrote that up in [Anodising robot parts: the dimension trap nobody draws](/knowledge/tech-blog/robotics-anodizing-dimension-control/).

7075 has two temperaments to work with. First, **weldability is poor** — don't design it as a welded assembly. Second, **stress corrosion sensitivity is higher than 6061**, so humid or salt-laden environments need a proper assessment.

**5. Bearings and raceways: don't economise on GCr15**

Cleanliness and carbide uniformity in high-carbon chromium bearing steel directly set contact fatigue life. This material is a small share of total cost — and the money you save comes back as warranty claims.

## 6. Material choice is worthless if you can't make the part

This is the section where a machining company should be talking. The same 7075-T6 drawing, given to two different suppliers, produces parts a full grade apart in real performance. It comes down to five things.

**Thin-wall distortion.** Joint housings run 1.5–2 mm walls for weight. A three-jaw chuck rounds them, and they spring back on release — the part gauges fine on the machine and is out of tolerance off it. The answer is proper workholding (vacuum or axial clamping), staged stress-relief annealing, and separating roughing from finishing with enough ageing time between.

**Geometric tolerance.** Concentricity and perpendicularity cannot be stacked up from multiple setups. Every extra setup adds another datum error. **Mill-turn in a single setup** is the mainstream way to hold concentricity on a joint housing today — we went through that argument in [One-setup 5-axis machining for robot parts](/knowledge/tech-blog/robotics-5-axis-one-setup/).

**Surface integrity.** Fatigue cracks almost always initiate at the surface. At the same Ra, a ground surface and a milled surface can differ by 20–30% in fatigue life, because the tool marks run in different directions and the residual stress states differ. **Reading the Ra number alone is not enough — look at the texture and the surface stress.**

**Batch consistency.** Producing one good part during prototyping, and producing five thousand good parts in a row, are entirely different trades. The second one runs on SPC and CPK, not on a skilled operator's hands. We took that apart in [From 10 to 1,000](/knowledge/tech-blog/robot-parts-prototype-to-production/).

**Inspection capability.** CMMs, gear measurement centres, profilometers and roughness testers are not decoration. Without inspection data, "in tolerance" only means nobody has found the problem yet.

## 7. The three traps

**Trap one: selecting on static strength and ignoring fatigue.**
A robot is a cyclic-load machine. A static safety factor of 3 will not stop a fatigue failure. Before you choose a material, ask: how many cycles is the design life?

**Trap two: ignoring thermal expansion mismatch.**
Aluminium 23.6×10⁻⁶/K, magnesium 26×10⁻⁶/K, titanium 8.6×10⁻⁶/K, steel 11.7×10⁻⁶/K, PEEK 47×10⁻⁶/K. Bolt a PEEK bracket straight onto an aluminium housing and the mismatch at operating temperature is enough to destroy your encoder accuracy.

**Trap three: using prototype standards for production.**
Prototyping lets you pick the good stock, run slow, and hand-finish. Production has to assume the worst material, the fastest cycle, and the least operator attention. **Treating CPK 1.33 as the tolerance floor at design stage is far cheaper than firefighting it later.**

## The short version

There is no standard answer to joint material selection, only the optimum under your constraints. The professional sequence is: **work out the load spectrum before you discuss material grades; set the inspection standard before you discuss machining process.**

Get those two in the right order and the rest goes much more smoothly.

## About Eternal CNC

**Xin Yongheng (Shenzhen) Precision Industry Co., Ltd.** machines and prototypes precision parts for robot joints, covering everything from a single prototype to low-volume production runs.

**Capability in brief:** 23 years in the manufacturing industry, 15 years in CNC precision machining, 30 CNC machines. Milling to **±0.005 mm**, turning to **±0.01 mm**. 5-axis machining centres, vertical machining centres up to 1,270 mm of travel, mill-turn and precision grinding. Aluminium, stainless steel, copper, titanium and engineering plastics. Mill-turn single-setup forming, thin-wall distortion control, precision grinding of carburising steels. EN 10204 3.1 material certificates available on request, with heat-number traceability end to end.

If you have a part that's giving you trouble, send it over. Our engineers run a DFM review first and **come back with a quote within 2 hours**. Prototypes in 3–7 days, production in 15–30 days, no minimum order quantity.

[Send a drawing, get a quote in 2 hours](/contact/get-a-quote)
