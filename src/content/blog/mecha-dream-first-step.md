---
title: "Mecha Is Just Joints × N: The First Thing You Build Isn't a Mecha"
description: "A mecha looks like thousands of parts. Take it apart and there are four things: joints, frame, brain, skin. And inside a joint, the only parts that get machined are the housing and the flange. This is not a piece telling you to build it, or to give up — it turns the mecha dream into a line-item bill of materials, then explains why step one is making a single joint stand up."
pubDate: 2026-09-15
category: "Industry Insights"
tags: ["robotics", "mecha", "joint module", "open-source hardware", "guide for non-engineers", "getting started"]
system: "robotics"
author: "Eternal CNC Engineering Team"
readingTime: "12 min read"
---

If you are reading this because of a video, or because some morning the old childhood idea came back — one thing first. This is not a piece telling you to build it. It is not a piece telling you to grow up, either.

We are going to do exactly one thing: translate the word mecha out of nostalgia and into a list. Then you decide.

Twenty years ago, wanting to build one of these meant learning hydraulics, then welding, then control theory — and at the end of that, discovering you still could not buy the parts.

That has changed. Motors, reducers, encoders, drivers: all purchasable. Control code: largely open source. A 3D printer sits on the desk. Machined parts can be outsourced. The barrier is no longer whether you can build it.

The barrier is whether you know which single piece to build first.

## 1. First, take the word apart

Mecha is a word anime made bigger than reality. Two people using it may be picturing things two orders of magnitude apart. Without layering it first, the conversation goes nowhere.

Find yourself in this table:

| What you picture | What exists in reality | Cost scale | Feasible solo? |
|---|---|---|---|
| A ten-meter anime mecha | Nothing that moves | — | No |
| A four-meter piloted machine | Kuratas (unveiled 2012, roughly 4 m tall and 4 t, publicly listed at about US$1.35M) | Millions of USD | No |
| A wearable exoskeleton | Industrial exoskeletons, mostly leased | Around US$100K | Extremely hard |
| A full-size humanoid, unoccupied | Unitree G1 class | From US$13.5K list price | Buyable, not buildable solo |
| A mini humanoid, around 0.5 m | ToddlerBot and similar open platforms | About US$6,000 in parts | Yes |
| A desktop arm | SO-ARM100 and similar kits | About US$190 for two arms | Yes |
| **A single joint** | — | A few hundred to a few thousand USD | Yes |

Be honest about the top two rows. For an individual, they are not hard. They are closed.

Not because the engineering is impossible. Kuratas exists: four meters tall, four tonnes, a person sitting inside to drive it. It is closed because its cost structure makes it an exhibit. A seven-figure price tag was never a production price, and it does not need to be. Aim there and you will burn your money in year one and still not own a robot.

From the fourth row down, the paths are open. And every one of them starts with the same step.

## 2. A mecha is four things

Here is the sentence this whole piece is built around:

**Mecha = joints × N + frame + brain + skin.**

- **Joints × N** decide whether it can move.
- **The frame** decides whether it can stand.
- **The brain** decides whether it obeys.
- **The skin** decides whether it looks like anything.

Two of those are mechanical work. The other two are mostly electronics and software — and a large share of that software is open source now. So the difficulty piles into one place, and that place is joints × N.

Which means that N is not a spec. It is the number of times you will do the same job over.

One level down is where it gets useful. Open a joint module:

| Inside a joint | Where it comes from |
|---|---|
| Motor | Buy |
| Reducer | Buy |
| Encoder | Buy |
| Driver | Buy |
| Bearings | Buy |
| Fasteners, pins, retaining rings | Buy |
| **Housing, flange, brackets, cable routing ring** | **Make** |

A decent joint module may hold thirty-odd parts. The ones that genuinely need to be cut usually number between a handful and a dozen.

The point is not that machined parts are cheap. The point is this:

**A mecha dream now has a line-item BOM.**

“I want to build a robot” cannot be quoted. “I need twelve joints, this housing for each, one set to start, 7075” can be quoted by any machine shop within two days.

There is a harsher version of the same idea. A robot with 30 degrees of freedom is not thirty different engineering problems. It is one part, made thirty times.

Which happens to be the thing a machine shop is best at: batch consistency. The gap between your first piece and your tenth is the gap between you and a factory.

(Which parts, which materials, and what this industry actually cares about — we went through that in detail in [the piece on robot joints and flanges](/knowledge/tech-blog/robot-joint-and-flange-parts/).)

## 3. Run the numbers before you commit

Three public projects, side by side:

| Project | Degrees of freedom | Cost | Where the money goes |
|---|---|---|---|
| SO-ARM100 (open-source desktop arm) | 6 per arm, gripper included | About US$190 for two arms | Twelve servos plus printed structure |
| ToddlerBot (open-source mini humanoid) | 30 | About US$6,000 in parts | **90% on motors and computers** |
| Unitree G1 (finished product) | 23 and up | From US$13.5K | Industrial joint modules plus compute |

Look at the last column. The ToddlerBot design paper states it plainly:

> Total BOM cost is US$6,000, with 90% spent on motors and computers.

That is 90 percent. Which means every structural part on that robot, added together, is under a tenth of the cost.

The ratio is not a coincidence. It is the basic shape of this industry. Follow it and you get two conclusions.

First: what you spend buys movement. Motors, reducers, drivers, compute — purchasable, and getting cheaper every year.

Second: what you make decides how much it can carry, how accurately it returns, and how long it lasts. Those three are not reliably purchasable. They come out of how the drawing is dimensioned, how much tolerance you specify, and which process you pick.

So at the start, do not rush to save money on machined parts. And do not rush to spend it either. Which one applies depends on your next step.

## 4. Five steps from *I want to build one* to *it moves*

### Step 1: Define what done means

Three questions. If you cannot answer them, do not start yet.

Does it stand still, or does it walk? Does it pick things up, or does it carry a person? Is it for people to look at, or for people to use?

Those answers push you off the word mecha and onto a specific road. If they will not come, it is not a capability problem. The target has not formed yet.

### Step 2: Make one joint stand up

This is the most important step in the piece, and the one most people skip.

Not finish the full drawing set. Not buy every single part. It means: one joint, powered, closed-loop, load-bearing, holding the angle you asked for without shaking.

Here is why everything else waits behind it.

It contains 80 percent of the traps. Is the torque enough. Does it run hot. How much backlash. How does the cable get out of the joint. Will the encoder lose counts. How do the driver parameters get tuned. None of these get fewer because you drew ten more sheets. They all show up at once, the moment a joint is actually energised.

It is also the only certainty you can buy for a few hundred dollars.

And it quietly converts 30 unknowns into one known plus twenty-nine copies.

Many people die on this step. Many more skip it. They finish the whole machine on paper, buy every part, and then find the first joint will not hold an angle.

### Step 3: Build half

Upper body or lower body. Pick one. Do not solve dozens of problems at the same time.

The upper body is hard on end-effector accuracy and payload. The lower body is hard on balance and peak torque. Different parts lists, different cost structures, different debugging.

Finish half and you have something that demonstrably works. Attempt both and you will own a pile of parts for a long time.

### Step 4: Buy what you buy, make what you make

Buy standard parts. Motors, reducers, bearings, fasteners: all in stock, all cheaper than you can make them.

For structural parts, print first to prove the design, then machine once it settles. There is one extremely common mistake here, and it is machining the first version in aluminum. The first version always changes. Changing means remaking, and remaking costs you double in both money and time.

### Step 5: Assemble it, then do it again

The first version not fitting together is normal. Assembly has its own body of knowledge — fits, stacking, datum transfer — and we are keeping that for a separate piece. Here, one line is enough: a part that will not fit does not mean you were wrong. It means you have reached the point where you change things.

The goal is always to reach *it moves*, not *it looks good*.

## 5. When you actually need machined parts

Step 4 said print first. That is not the same as print forever. The boundary is clear enough.

Printed parts handle: structures under no load or light load, one-off proof-of-concept parts, and complex shells in very small quantities.

Five things printed parts cannot do. These have to be cut.

**Bearing bores.** They need an H7-class fit, roundness, coaxiality. Printed dimensional and geometric accuracy will not hold it.

**Location spigots.** They set the relative position of two parts. Once one loosens, the accuracy of the whole joint is gone.

**Threaded connections.** Not that you cannot print a thread, but that it strips after a few assembly cycles.

**Load-bearing parts under varying load.** Printed parts are anisotropic. Interlayer strength is markedly lower than in-plane strength, and fatigue is what they fear most.

**Thin parts that must stay stiff.** Same reason.

The ToddlerBot paper makes the same call. The body is PLA, but it explicitly notes that high-strength components need stronger print profiles, or carbon-fiber blended filament. It is trading material and parameters for strength. When that trade stops working, that is the moment you move to machined parts.

And on a joint housing, the bearing bore, the location spigot, the pin holes and the M3-to-M6 threads are usually all present at once. One of them landing in the must-cut column drags the whole housing into machining. This is why a joint housing is almost always aluminum or steel.

(Surface finishing adds another layer of dimensional variables on top of that. We covered it separately in [anodizing and dimensional control](/knowledge/tech-blog/robotics-anodizing-dimension-control/).)

## 6. The counterintuitive part

One last thing, and it may not be pleasant to hear.

Your mecha dream will not die on the hardest step. It is far more likely to die on starting too many things at once. Choosing motors, learning to model, tuning drivers, hunting for a machine shop — all in the same month. Each one costs money. Each one costs time. Each one can stall.

Making one joint stand up is the first step precisely because it is the only action that does not require you to have solved everything else first.

It sits at the intersection of every path. Desktop arm, humanoid, quadruped — the first thing you power up is the same thing.

## Where we stand on this

Joint module housings, reducer planet carriers, output flanges, sensor brackets. We make these every day, so the numbers above are not researched. They are quoted.

If your joint drawing is far enough along to be quoted — one joint, one piece is enough — send it over and we will run a free DFM review. Which tolerances are genuinely necessary. Which can be opened up. Which dimensioning choices quietly double the price. It costs you a few days. It may save you your first version.

[Free DFM review and quote](/contact/get-a-quote)
