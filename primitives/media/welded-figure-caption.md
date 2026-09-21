---
id: welded-figure-caption
category: media
tags: [media,figure,caption,accessibility,editorial]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 3
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
