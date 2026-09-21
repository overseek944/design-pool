---
id: welded-figure-caption
category: media
tags: [media,figure,caption,accessibility,editorial]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 9
requires: []
conflicts: []
completes: []
tension: []
---
A caption set as a paragraph under a figure reads as body copy and drifts from
its subject. Weld it into the frame instead: one border around the whole plate,
the drawing on a recessed tint, the caption a full-bleed strip on the page
ground with a hairline between. Figure-ground inverts — the caption is the
paper and the drawing is the cut-out — and nothing downstream can separate the
two. Strip padding .75–1rem block, 1–1.25rem inline.

```css
.plate { border: var(--hair) solid var(--rule); background: var(--inset) }
.plate figcaption { background: var(--ground); padding: .875rem 1rem;
  border-top: var(--hair) solid var(--rule) }
```
⚠ Do not also use the caption as the graphic's `aria-label` — it is then
announced twice. Label the graphic with what it *shows*, let the caption say
what it *means*, or hide the graphic and let the caption carry it alone.

The opposite dose reads as a technical report rather than a plate: leave the
figure's hairline box closed and set the label *outside* it, below and flush
left, as bracketed mono small caps with a number — `[ FIG. 01 / SOLVE RATE ]`.
It stops competing with the drawing's own content, and a numbered series lets
running prose cite a figure instead of gesturing at it. 10–12px, tracking
.14–.2em, ink at 45–60%.
```css
.plate + .label { font: 400 .6875rem/1 var(--mono); letter-spacing: .18em;
                  text-transform: uppercase; color: var(--ink-45); margin-block-start: .5rem }
```
⚠ Numbering is a promise: once one figure is `FIG. 01` every figure on the page
needs one, in document order, or the scheme reads as decoration. Generate from a
CSS counter rather than by hand.

Where the figure is a screen out of a system rather than a drawing, the label
that earns its place is a *location*, not a number: the path to it, set above
the frame in the smallest mono tier — `Data / Conversations` — with the
trailing segment stepped from 40–50% ink up to 65–75% so the leaf reads as the
subject and its ancestors as address. It says which part of the product is on
screen, which `FIG. 01` cannot.
```css
.locus { display: flex; gap: .375rem; margin-block-end: .625rem;
  font: 11px/1.45 var(--mono); letter-spacing: .02em; color: var(--ink-45) }
.locus > :last-child { color: var(--ink-70) }
```
⚠ Mark the separators `aria-hidden` or each one is announced as "slash", and do
not repeat the crumb as the image's `alt` — the location is then read twice.

A third way to weld, for a figure that already carries a shadow and cannot take
a border: give the wrapper a decorative plate at `inset: 0` — a tint, a grain, a
soft wash — and let it run *past* the figure to sit under the caption. The
figure floats on the plate, the caption lies on it, and the two are one object
because they share a ground rather than a frame. Nothing is added to the caption
itself, so it stays ordinary text at ordinary contrast.
```css
.wrap { position: relative }                       /* holds figure + caption */
.wrap::before { content: ""; position: absolute; inset: 0; z-index: -1;
  border-radius: 1rem; background: var(--atmosphere) }
```
⚠ The plate is decoration, so `aria-hidden` and `pointer-events: none`. Keep it
within 3–6% of the section ground or it becomes a panel the caption is trapped
in.

A third dose folds the label into the sentence: no strip, no bracket, just the
numeral opening the caption itself — `Figure 2. What the two curves measure.`
— set one ink step darker than the text that follows and nothing
else. The caption stays one line of prose and still gives running copy
something to cite. Keep the numeral in its own element so the step is a rule
rather than a hand-applied span, and do not also change its size: at caption
scale a second variable makes it a heading.
```css
.figcap    { color: var(--ink-45) }
.figcap__n { color: var(--ink-65); font-weight: 500 }
```
⚠ The period after the number belongs inside the element, or the darker run
ends on a lighter full stop at every figure on the page.
