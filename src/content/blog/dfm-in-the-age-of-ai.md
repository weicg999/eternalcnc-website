---
title: "AI Can Draw It. Can It Be Machined? DFM in the Age of AI"
description: "Generative design and topology optimization can produce a 40% lighter part in seconds, but design for manufacturability (DFM) still needs a human. What AI optimizes and leaves out, which features double your machining cost, and three checks to run before you send a drawing out."
pubDate: 2026-09-13
category: "Machining Tips"
system: "general"
tags: ["DFM", "design for manufacturability", "generative design", "AI", "drawing review", "cost"]
author: "Eternal CNC Engineering Team"
readingTime: "11 min read"
---

## A part that is 40% lighter

Start with a scenario, not a particular drawing.

Picture a link on a robot arm. The original aluminum part weighs 180 grams. Someone opens a generative design tool, enters the loads, the constraints, the material, and hits enter. Fifteen seconds later there is a new shape on the screen: a bone-like lattice, material only where the stress needs it, 108 grams.

Forty percent lighter. Geometrically flawless.

Then the drawing reaches a machine shop.

Nothing looks wrong at first — the dimension chain closes, tolerances are called out, all the views are there. But work through it and the problems surface one at a time:

- **Organic surfaces.** A 3-axis mill cannot reach them. You need 5-axis and a ball nose tracing the form in fine passes, and the surface finish is still not easy to hold.
- **A pocket that exists only to save weight.** One internal cavity runs to a 9:1 depth-to-diameter ratio. An end mill is comfortable at three or four times its diameter; past that you are into long-reach holders, reduced parameters, or a different process entirely.
- **Ribs that grew thin.** The thinnest wall is 1.2 mm in aluminum. The cutter pushes it away and it rings.

The 72 grams you saved are still in the part. You pay for them twice — once in the material you did not buy, again in the hours it takes to cut.

**None of this is AI's fault. Machining cost simply is not in its objective function.**

## What AI optimizes, and what it does not

Generative design and topology optimization have a clear mathematical core: under given loads and constraints, drive an objective function to its extreme. The usual objective is **minimize mass**, or **maximize stiffness**.

The variables it can move: material distribution, wall thickness, shape boundary.
The constraints it must respect: stress under allowable, stiffness above some value, mounting interfaces fixed in place.

Nowhere on that list:

- The travel of your machine
- The Ø6 end mill in your tool crib
- What shapes your fixture can actually hold
- Whether this batch is 6061 or 7075
- How many jobs the programmer already has on the floor

It did not forget these. They are not in its inputs, and **they should not be** — it is a mathematical instrument, not a machine shop.

So what it hands over is not a part. It is a **geometric optimum**. Turning that into a part takes one more step: someone has to show it can be made on the equipment you own, at a price you will accept.

That step is DFM.

## The question is almost never "can it be made." It is "how much more."

A very common misunderstanding, worth correcting.

A customer sends a difficult drawing and asks, "Can you make this?" The shop says yes. Both sides think the conversation is over.

The real information is in the next question: **Yes — but how much more will it cost?**

For the 40%-lighter part, the arithmetic runs roughly like this:

| | Conventional | Generative |
|---|---|---|
| Setups | 2 | 4–5 (every new face means re-datuming) |
| Machine required | 3-axis | 5-axis |
| That deep pocket | Milling | Long-reach, slow passes — or EDM |
| Tooling | Standard end mills | Ball nose, possibly a custom form cutter |
| Cycle time per part | Baseline | 2.5–4× |

Seventy-two grams of aluminum is a few dollars of material. The extra hours are hundreds, if not thousands.

**This is not an argument against saving weight.** In some industries every gram is money — aircraft, the end of a collaborative arm, anything that accelerates and decelerates all day. There, the trade is not merely worth it; it is the only correct way to think.

The point is that **whoever makes that call has to see both pans of the scale.** Weight saved on one side, hours paid on the other. AI computed the left pan only.

## Where the 70% gets locked in

In our piece on the ten-station chain there is a conclusion worth repeating: about 70% of a part's cost is locked in the moment the drawing is finalized. The DFM station takes an experienced engineer ten to thirty minutes, and it is the most valuable half hour on the whole chain.

Put AI into that picture and the conclusion does not weaken. It hardens.

Because **AI has driven the cost of producing a drawing to nearly zero.**

Drawing used to be slow. To put a shape on paper, an engineer had to walk through it in his head first: which cutter for this edge, how to drill that hole, how to hold this face. He was slow — but **the act of drawing was itself a DFM pass.** His hand moved; so did his mind.

Not any more. Enter the conditions, hit return, get ten options. **For the first time there is a gap between thinking it through and drawing it.** That gap got saved. It also got skipped.

So a new bottleneck appears: drawings are now produced faster than anyone can judge whether they can be made.

**Whatever sits at the bottleneck gets more valuable.**

## “Kung fu is accurate repetition”

A line attributed to the Chinese calligrapher Qi Gong:

> "Kung fu is accurate repetition."

It carries weight because it takes skill out of the realm of talent. Not time piled up, not volume accumulated — but accuracy turning into habit, and habit turning into something the body does on its own.

Move that sentence onto a shop floor and not one word needs changing.

A new drawing gets a first pass in a few seconds, and that is usually enough to know this job has trouble in it. Naming the trouble, pricing it, and fixing it takes ten minutes. Those first few seconds do not come from being clever. They come from **the same class of mistake having been paid for on a shop floor, many times over.**

Take these three. Anyone who has run this kind of work does not have to work them out from scratch:

- An R1.5 internal corner into a 30 mm deep pocket — that Ø3 cutter hangs 30 mm out and can only nibble at it
- A 9:1 pocket — most likely EDM, three extra days
- A 1.2 mm wall — it will sing on the final finishing pass, ripple all over, and go back through the shop

That flash of recognition is not intuition. It is an **index**: a hundred-odd entries, each one already paid for, compared against every new drawing that arrives.

**That is what accurate repetition means.** Repetition is not the low-grade part you can skip. It is the only route by which a mistake becomes experience, and experience becomes judgment. AI has the whole internet's worth of knowledge. It does not have your shop's scrap log from the last six months.

One practical note: this is also why **it is worth noticing who answers your DFM questions.** An engineer, or a salesperson typing "no problem." "No problem," from someone who has never cut that metal, is the most expensive sentence in procurement.

## This is not an argument against AI

A pause here, to be clear about what is being said.

Nothing above means AI-generated drawings are unusable. The opposite: **if that 40% saving really is worth money, a shape AI computes in fifteen seconds is a shape a person would never have arrived at.**

The question was never whether to use it. The question is **which step went missing from the process.**

The correct shape is:

**AI generates the shape → an engineer runs DFM → the drawing changes, or it does not and you accept the premium → quote → machine**

What goes wrong is deleting the middle step and jumping from "AI generated it" straight to "here is your price."

The interesting part is that the two ends do not compete; they complete each other. **AI spreads the possibilities out. The engineer narrows them down to the one that will actually land on this machine, in this material, at this price.** One diverges, one converges. Lose either end and the part never gets made.

So the stronger AI gets, the more the person who can spot "that will not machine" is worth.

## Three things you can check yourself, before you send the drawing

Not everyone has an engineer on hand. If you are holding an AI-generated drawing and about to send it to a supplier, these three you can do yourself, and they are quick.

**One. Separate the functional faces from the pretty ones.**

Generative parts tend to be complex surfaces all over. But only a few features actually need precision: mounting holes, locating faces, bearing seats, sealing faces. The rest of those surfaces exist to remove weight, and they do not need ±0.02.

Tell your supplier which faces mate with something, and treat the rest as cosmetic. **Spend the tolerance budget where it buys something, and you can cut a lot of finishing time.**

**Two. Translate the organic surface into process language.**

Ask this: can this region be approximated with a set of standard-radius arcs?

Weight saving might drop from 40% to 35%. But tooling goes from custom to standard, the machine goes from 5-axis back to 3-axis, and five operations become two. **Judge that lost 5% by asking whether it is worth 3× the hours — not by asking whether lighter is better.**

**Three. Change the question you ask.**

Do not ask "can you make this." Ask this instead:

> How would you plan to make this shape? Roughly what would it cost? How much more than the conventional version — and which operation is driving that?

The answer to the first question is always yes. The second question is the one that hands you real information: **how much more, on which operation, and whether there is a cheaper way to pay it.**

## FAQ

**Q: Will you quote an AI-generated drawing directly?**

Yes, though the quote usually carries an extra line. We do not rewrite customer drawings — that is your design intent. But when we can see that one detail will double the cost, we show you the difference between changing it and not, and you decide. It is the thing we do most often, and the most useful page in the quote.

**Q: Will you price a hard job high to talk me out of it?**

No. Hard jobs are the ones we want. The only question is whether it is worth it. Some difficult parts become the best calling card a shop can have; some do not. The difference is whether the customer knows where the money goes — and making that visible is our job.

**Q: What kind of part runs into this most often?**

Topology-optimized lightweighting, consolidated parts (five components merged into one), and surface-driven cosmetic housings. They share one trait: **their design objective is a physical or visual metric, not a process metric.**

**Q: So should AI be used to design parts at all?**

Yes, and increasingly so. Just keep a person downstream of it. The tool generates options; the person makes the call. Every tool upgrade in industrial history has ended in that same division of labor.

## Last

We are a precision parts shop. 23 years in manufacturing, 15 years in CNC precision machining, 30 machines. We make joint module housings, reducer planet carriers, structural parts — the kind that look unremarkable but fail if they are slightly off.

If you have a part that AI drew for you and you want to know what it costs to actually make — send it over. We will not just answer "yes, we can."

---

A note on that quotation: it is attributed to the Chinese calligrapher Qi Gong, and reaches us through Li Lianjiang's *The Scholar's Craft and Way*, which itself quotes it second-hand. The second half that usually travels with it — "not time piled up, not volume accumulated" — carries no quotation marks in any source we could trace, and is most likely the summarizer's extension. So only "accurate repetition" is treated as the quotation here; the rest is our reading of it.
