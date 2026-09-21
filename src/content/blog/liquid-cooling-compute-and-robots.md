---
title: "Cooling Is the Shared Lifeline of Compute and Robots: Why Liquid Cooling Went from Optional to Mandatory"
description: "In six years a single AI chip's power draw nearly quintupled, and humanoid robot joints retired mid-marathon from overheating. Put compute cooling and robot cooling side by side: where the heat comes from, why air cooling hit its ceiling, what makes liquid cooling the successor, and why cold-plate machining tolerance decides whether the cooling actually works — GB/T 48023-2026 now writes cold-plate flow-resistance tolerance into a national standard."
pubDate: 2026-09-19
category: "Industry Insights"
system: "computing"
tags: ["liquid cooling", "compute cooling", "robot cooling", "cold plate", "GB/T 48023-2026", "thermal management", "data center"]
author: "Eternal CNC Engineering Team"
readingTime: "10 min read"
---

Start with a counter-intuitive fact: the parts we make are increasingly less about being cut and more about being cooled. The power draw of compute chips and the power density of robot joints are both climbing fast. Heat is no longer a by-product of machining — it is the ceiling on whether a device runs at all, and how fast. Today we put compute cooling and robot cooling in the same frame, because behind both is the same physical wall.

## 1. Heat is the wall you cannot dodge once density climbs

On the compute side, an NVIDIA GPU's total-board power is a steep curve: A100 about 400 W (2020), H100 about 700 W (2022), B200 about 1000 W (2024), the next-generation Rubin about 2300 W (2026). In six years a single card's draw has nearly quintupled. An AI rack has gone from a few tens of kilowatts to 80–140 kW, and the Rubin rack breaks past 300 kW (the Rubin Ultra system is projected as high as 600 kW).

On the robot side the density is even more brutal. Take the Tesla Optimus joint motor: peak power exceeds 500 W; the heat from a high-load joint breaks 300 W per square centimeter, while air cooling can only carry about 50 W per square centimeter over the same area. That means the joint — a space the size of a palm — has five or six times more heat to shed than air can manage.

The common thread on both sides: it is not the total power that hurts, it is the **heat-flux density** — the heat packed into a small area that cannot get out, sending temperature up exponentially.

## 2. Air cooling has hit its ceiling

Air cooling's essence is using air to carry heat away. Its virtue is cheap and everywhere; its vice is poor thermal conductivity and low specific heat, so its heat-moving efficiency is low.

The compute arithmetic is clear: an air-cooled rack caps at roughly 15–20 kW (an optimistic figure reaches 30 kW), while today's AI racks run 80–140 kW — air cooling is already left behind. The bigger problem is PUE — the ratio of total data-center energy to IT equipment energy. Air-cooled data centers run high PUE; China requires new large data centers to keep PUE under 1.25, and hub nodes under 1.2; the EU requires PUE below 1.5 from July 2026. Air cooling cannot meet that line — the electricity bill and the carbon budget both fail.

The robot arithmetic is more vivid: it is a race. At the 2025 Beijing Yizhuang humanoid half-marathon, over 70% of the robots dropped out mid-race, mainly from joint overheating — temperatures blew past 100 °C and the motor protection tripped them off. By 2026, the champion Lightning finished in 50:26 with a joint temperature of only 31.5–32 °C, thanks to liquid cooling. Same race, two years apart; the cooling method decided who could finish.

## 3. What makes liquid cooling the successor

A liquid's thermal conductivity and specific heat are both about an order of magnitude higher than air's, and its cooling efficiency is typically 5–8× that of air, reaching 50× in extreme designs. So for the same heat-flux density, liquid carries it away with a smaller volume and less pump work.

There are two main routes. One is immersion — dunk the whole board in dielectric fluid. The other is the cold plate — a metal plate with flow channels pressed directly against the heat source, moving heat away from the source as close to it as possible. For machining, the cold plate is the headliner: it is itself a precisely milled part.

Robot-joint liquid cooling has become extreme: microchannels about 1.2 mm in diameter built right into the stator winding, with a 20 000-rpm mag-lev micro-pump moving about 4 L/min. The lab comparison is telling: under the same load, an air-cooled stator hits 102 °C while a liquid-cooled one stays at 32 °C, and sustained torque effectively doubles. A compute cold plate takes a single chip's heat into the piping and hands it to a CDU (coolant distribution unit) for secondary exchange. The Rubin generation is already a fully liquid architecture, with vendors quoting PUE targets near 1.1 and inlet temperatures pushed above 40 °C.

## 4. A cold plate is not just a slab of aluminum — it is defined by machining precision

This is where our trade really matters. When a cold plate fails to shed heat, it is usually not a design problem — it is **machining precision falling short**.

A cold plate's cooling capacity equals flow-channel design times manufacturing consistency. The channels are milled (microchannels, sawtooth fins), then vacuum-brazed under a cover. Any dimensional drift at any step becomes flow-resistance drift — and flow-resistance drift directly eats the thermal margin.

GB/T 48023-2026, approved on 30 July 2026 and effective on 1 February 2027, is China's first national standard for data-center cold-plate liquid cooling, and it puts this red line in numbers:

- **Cold plate:** flow-resistance error within ±10% at rated flow; pressure-test pressure drop within 2%, no deformation, no cracking.
- **Quick connector:** withstanding 1.5× working pressure, no deformation, no visible droplets, nitrogen-seal test with no bubbles; same-spec connectors from different makers should be interchangeable.
- **Manifold:** the difference between the maximum and minimum branch flow shall not exceed 10% of the mean.
- **CDU:** pressure drop within 3%, heat exchange no less than 95% of rated, supply-temperature control within ±1 °C, flow adjustable from 30% to 100%.
- **Coolant:** glycol volume fraction no less than 20%; copper cold-plate coolant pH 8.0–10.0, aluminum cold-plate 8.0–9.0; chloride ion no more than 5 mg/L incoming, no more than 25 mg/L in operation.
- **Piping and filtration:** secondary piping in 304 or 316 stainless steel; filter rating no coarser than 50 μm.

Translated to the shop floor, one sentence says it all: a flow-resistance error within ±10% means channel dimensions, cavity flatness, and the brazing-fit-surface flatness must all be stably controlled. If the fit-surface flatness before vacuum brazing is not up to spec, the part leaks or the flow resistance goes over spec after brazing — and no matter how good the design, it is wasted.

So the job of cooling the equipment, which sounds like a systems engineer's remit, lands in the end on one flow channel after another, one cold plate after another, one flatness after another: **it still comes down to whether the machining precision is good enough.**

## Key References

- Standardization Administration of China: GB/T 48023-2026, *Technical specification for data center cold-plate liquid cooling systems* (issued 2026-07-30, effective 2027-02-01) — China's first national standard for cold-plate liquid cooling.
- Public reports on the 2025 Beijing Yizhuang humanoid half-marathon (Southern Metropolis Daily and others): 20 robots entered, about 30% finished, joint overheating the main cause of retirement, some units above 100 °C.
- Public reports on the 2026 humanoid half-marathon (Toutiao): over 300 robots entered, about 90% finished; champion Lightning finished in 50:26 with active liquid cooling keeping the motor's peak temperature at only 31.5 °C.
- NVIDIA data-center GPU thermal-design-power (TDP) specs and industry analysis (amcompute, Fortis Securities and others): A100 400 W (2020) → H100 700 W (2022) → B200 1000–1200 W (2024) → Vera Rubin about 2300 W (2026, roadmap estimate).

## Where we stand

We have made precision structural parts for twenty-three years, with thirty CNC machines including true 5-axis. Parts like cold plates — aluminum cold plates, manifold housings, quick-connector housings, CDU machined and sheet-metal parts — fall right inside our daily work.

Where we can help is concrete: stable control of flatness, thin walls, cavities, and hole-position accuracy; fit-surface flatness ahead of vacuum brazing; and small-batch rapid prototyping. If your thermal part is stuck on flow-resistance consistency or brazing yield, it is probably not a material problem — it is a machining problem. Send us the drawing and we will get it right together.

[Free DFM review and quote](/contact/get-a-quote)
