---
title: "From Idea to Quotable Drawing: The Minimum You Actually Need"
description: "You have an idea, a photo, or a model an AI just generated. How does it become something a machine shop can quote? This is not about what to write on a drawing — it is about how a drawing comes into existence: what 3D and 2D each carry, what a datum is, and the smallest information set that gets you a price."
pubDate: 2026-09-14
category: "Machining Tips"
system: "general"
tags: ["drawing basics", "3D and 2D", "datums", "tolerances", "guide for non-engineers", "precision machining"]
author: "Eternal CNC Engineering Team"
readingTime: "11 min read"
---

## 1. Start by looking at what you actually have

If you already have a proper mechanical drawing, this piece is not for you. What to write on one of those is a different question, and we have written about it elsewhere.

This is for the other situation: **you do not have a drawing yet.**

That is a very common place to be, and the thing that blocks people is usually not the inability to draw. It is not knowing how complete a drawing has to be before it is worth sending. So find yourself in the list below.

**You only have an idea.** You know roughly what you want, but nothing is drawn. The shortest way out is not to learn CAD. It is to **write down five numbers first**: what it mounts to, the interface dimensions on that thing, roughly how big it needs to be, what forces it sees or what job it does, and how many you need. Get those five written and the drawing is already half done.

**You have a physical part to copy, or only a photo.** An honest note here: **a photo cannot be machined, and a physical part has to be re-measured.** A photo tells someone what a part looks like. It does not tell them how big it is. With no dimensions, the only judgement a shop can make is whether the shape is possible. It cannot give you a price.

**You have a 3D model an AI generated.** This is more common every month. It is workable, but it has to clear two gates. Section 5 covers them.

**You have a hand sketch.** You can absolutely get a quote from a sketch. Just put dimensions on it. The lines do not need to be pretty; the numbers need to be clear. **A shop reads numbers, not draughtsmanship.**

## 2. 3D defines shape. 2D defines requirements.

This is the one thing worth understanding before anything else, and it is the thing most often misunderstood.

A lot of people assume 3D is the upgraded version of a drawing — that once you have a model, you do not need 2D any more. That is not how it works. They carry different information.

**3D defines shape.** What it looks like, how big it is, where the holes and steps are.

**2D defines requirements.** How good it has to be.

Why must they be separate? Because **inside a STEP file, a Ø30 bore is a mathematically perfect Ø30.** It has no idea whether the Ø30 in your head is an H7 bearing seat or a ventilation hole.

Here is what 3D cannot carry. The list is longer than most people expect:

- Tolerances. There is no concept of plus-or-minus inside a model.
- Surface finish. A model surface is always perfectly smooth.
- Thread specification. The threaded hole in a 3D model is almost always a plain hole — thread surfaces are expensive to model, nobody builds them, and shops do not read them. **The thread callout has to be written.**
- Material. A model has shape, not substance.
- Heat treatment, plating, anodizing, masking, de-embrittlement. None of these have a place in a 3D model.

So the test for whether you need 2D is simple. Ask yourself one question:

> **Does this part have anything on it that you cannot learn from shape alone, and that has to be written down?**

If yes, you need an annotated 2D drawing, or at minimum a written note covering those points. If no — a plain spacer, a purely decorative piece — then a model plus a few sentences is enough.

**On file formats, the order of preference runs like this.**

**STEP (.step / .stp) is best.** It is precise surface geometry — what people mean by a solid. IGES and x_t also work, slightly older.

**Be careful with STL.** STL is not a solid. It is **an approximation built from triangles.** A Ø30 cylinder in STL is really a polygon with a few dozen flat sides. Machine that and the curve comes out with facets you can see. And STL carries no semantics for holes or shafts, which makes feature recognition and toolpath calculation awkward.

The awkward part is that **a lot of AI design tools export STL or OBJ by default** — both are meshes. The first thing to check is whether you can export STEP instead. If you cannot, the model needs rebuilding first.

**One more thing worth knowing.** Modern STEP files can carry annotations directly inside the 3D model — the industry calls this MBD or PMI, and it works. The reality, though, is that **the overwhelming majority of shops will not read it.** So do not assume that tolerances embedded in the model replace a 2D drawing. For now, 2D is still the reliable carrier.

## 3. Datums: the line everyone skips

The word sounds technical. The idea is everyday.

**To measure your height you stand against a wall with your heels together.** The wall and the heels are the datum. They establish what you are measuring from and what you are measuring against. Without that, two people who are both 175 cm are not comparable — one stood straight against the wall, the other was on tiptoe.

A datum on a drawing is that wall and that floor.

**What happens when a drawing has no datum?** Every operator picks a face to work from. Different operators pick different faces. Then inspection picks another one again. The result is the most common source of that familiar complaint: **every individual part measures within tolerance, and the assembly still does not go together.**

Where do datums come from? They are not assigned at random. They come from **the assembly**:

> Whatever this part mounts to, and whichever face it seats against — that face is the datum.

A concrete example. A link on a robot arm mounts onto a joint module: located by a spigot, seated on a face. Those two features are its datums — **the face is datum A, the spigot is datum B.** Every other dimension on the part is measured from them.

Notation uses letters A, B, C in order of priority.

**But do not rush to fill in three.** Most parts need one primary datum and one secondary. Three are for parts that mate in all three directions. **Adding a third datum to look thorough usually makes both machining and inspection less clear, not more.**

## 4. The minimum information set

Here is the list. Not the ideal — the minimum. With these, you get a price. Missing any one of them costs you a round of emails.

**1. A 3D file.** STEP preferred. This carries the shape.

**2. The material grade.** Grade, not category. Aluminum is not a grade. 6061-T6 and 7075-T6 are two different metals — different price, different strength, and they anodize to different colors.

**3. Quantity — and your future quantity.** Ten pieces is one job. Ten pieces now, with two hundred possible in three months, is a different job. The reason is that **setup and fixturing get spread across the batch.** Our own estimating puts a single piece at more than twice the unit price of a hundred. If you do not mention the later volume, the shop has no choice but to quote you as a one-off, and that price will be high.

**4. Surface finish.** If some faces matter cosmetically, say which. **And if nothing is required, write none** — because blank and none send different signals. Blank means someone has to ask. None means they can start.

**5. Where the precision actually is.** This is the expensive line on the list, and the maths below shows why.

**6. Datums.** Mandatory as soon as anything mates.

**7. One sentence on what the part is for.** It is not a drafting requirement and the drawing works without it — but it may be the highest-value line you write. Section 7 explains.

### The arithmetic that shows why item 5 is expensive

Say the drawing has a Ø30 bore and no general tolerance note.

By default it falls into **ISO 2768-m**. For the 6 to 30 mm size range, class m allows **±0.2 mm**.

Now suppose that bore is a bearing seat, and what you actually need is **Ø30 H7** — upper deviation +0.021, lower zero. **The entire tolerance band is 21 microns.**

**±200 microns against 21 microns. Roughly ten times.**

On the same drawing, if you do not say which dimensions carry precision, only two outcomes are available: the shop makes it loose and it will not assemble, or the shop quotes it tight and you pay for precision you never needed.

Conversely, one line replaces a great deal of dimension-by-dimension annotation:

```
General tolerances per ISO 2768-m
Critical dimensions individually toleranced
```

### Two things worth knowing about that standard

**First, ISO 2768 has two parts.** Part 1 covers linear and angular dimensions — how long, how big. Part 2 covers geometrical tolerance classes H, K and L — how straight, how square. The familiar callout `ISO 2768-mK` is the two written together.

**Second, Part 2 has been withdrawn.** Per the ISO record, **ISO 2768-2:1989 was withdrawn in February 2021 and replaced by ISO 22081:2021**; Part 1 remains current. So on a legacy drawing that says `ISO 2768-mK`, the m half points at a live standard and the K half points at a document that is no longer maintained.

This is not an argument for rewriting old drawings — **plenty of drawings in production still read that way, and they machine and quote perfectly well.** But two things are worth knowing:

- New drawings that want geometrical defaults should state them separately: ISO 2768-m for linear, ISO 22081 for geometrical.
- **ISO 22081 no longer supplies a fixed table of values.** Unlike 2768-2, it does not hand you three classes of numbers. It requires the drafter to write the values in. That is the biggest difference from the old standard, and a large part of why it has not swept the field the way the old one did.

A wider point: mechanical standards are full of this — advice circulating widely while the standard underneath has moved. **Before you cite a standard number, check that it still exists.**

## 5. Three routes from idea to drawing

**Route one: draw it yourself.**

The barrier is far lower than it was ten years ago. A week or two of serious practice is enough for a structural part. There is one thing to get right: **draw the functional dimensions first, and do not chase looks.** Hole positions, mating faces, envelope — the fillets and chamfers come last.

**Route two: have someone draw it.**

Drafting services are cheap now, tens to a few hundred per part. **But there is a condition: you have to be able to describe the function.**

A drafter is responsible for shape. Give them an outline and they will return a beautiful model — but **they do not know which bore takes a bearing**, so they cannot know where the tight tolerance belongs. You end up with a drawing that looks right and cannot be used.

Give them five things: **what it mounts to, the interface dimensions, the envelope, the load or the job, and the quantity.** The more concrete you are, the more useful the result.

**Route three: generate it with AI.**

Workable, but two gates.

**Gate one: format.** Confirm it can export STEP. Many tools hand you STL, which is a mesh and has to be rebuilt.

**Gate two: add the precision.** AI-generated designs tend to be complex surfaces all over, with no idea which faces mate. We wrote about this separately — separate the functional faces from the cosmetic ones, translate organic surfaces into process language, and change the question you ask your supplier.

Clear both gates and the output is an ordinary drawing waiting for a quote.

## 6. Sixty seconds before you hit send

- [ ] The 3D file is **STEP**, not STL only
- [ ] Material is a **grade** (6061-T6), not a category (aluminum)
- [ ] Quantity is stated, **including future volume**
- [ ] Surface finish is stated — **write none if there is none**
- [ ] Precision dimensions are **called out individually**, and everything else is covered by a **general tolerance note**
- [ ] Anything that mates has a **datum**
- [ ] Threaded holes carry a **specification** (do not rely on the plain hole in the model)
- [ ] **Units are consistent** throughout
- [ ] And you wrote **one sentence about what the part does**

## 7. The last line may save you the most money

Item 7 on the list and the last item on the checklist are the same thing: **tell them what this part is and where it goes.**

It is not part of any drafting standard. Omitting it does not stop the part being made. But it changes how the shop thinks about your job.

Before quoting, an experienced shop makes a process judgement. How will this be held? How many axes? Does it need a stress-relief step in the middle? Where does heat treatment go in the sequence? **Every one of those judgements depends on where the part is used.**

The same cantilever bracket, sitting on a static enclosure, and the same bracket cycling several times a minute on a moving axis, are not the same job. Add one line — this is a link on a robot arm — and the shop knows it needs to be light, that balance probably matters, and that it will likely be anodized. The quote gets sharper. Leave it out and they can only guess conservatively — and **conservative assumptions always end up in your price.**

## Where we stand

We are a precision parts shop in Shenzhen with thirty CNC machines including true 5-axis, turning alongside them, and a finishing network around all of it — anodizing, plating, heat treatment, grinding, wire EDM.

There is a saying in this trade that a machine shop just works to the drawing. That is only half true. **Whatever is missing from a drawing does not disappear. It turns into a guess** — and the customer always pays for the guess. Either the price comes back wrong, or the first article turns out not to be what they wanted.

So we would rather say things up front: what is missing, what is toleranced but probably wasting money, where a datum is absent. That is not extra service. It is the first step in doing the job right.

If you have an idea that is not a drawing yet, or a drawing you are not sure about, send it over. We will run the checklist with you and then tell you roughly what it costs.

[Free DFM review and quote](/contact/get-a-quote)
