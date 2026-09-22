---
id: prefix-selected-segment-level
category: layout
tags: [css-only,state,accessibility,data,detail,cheap]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---

A discrete level — three of ten segments lit — usually costs a class per
segment and N writes per change. Make the count a selector: `:nth-child(-n+k)`
lights a prefix, so one rule under a container attribute moves the whole
read-out on a single attribute write. Segments 5–12, 4–8px wide, gap half the
width; the unlit remainder states the scale. Put the value in the container's
`aria-label` — counted spans tell a screen reader nothing.

```css
.level i                   { background: var(--empty) }
.level i:nth-child(-n+3)   { background: var(--on) }
[data-level=high] .level i { background: var(--on) }
```
⚠ Specificity decides, not order: a state rule can only light *more*, so a
lower level restates the unlit colour on the segments it gives back.

Segments need not be nodes at all. Paint one continuous fill and cut the gaps
with a `repeating-linear-gradient` mask over the track: the ticks come from the
mask, the value from a `clip-path` inset the fill is transitioned on. The
read-out then moves *between* segments rather than snapping to them — a
continuous value wearing a discrete face — and the fill can be a gradient across
the whole run, which per-segment children cannot be. Period 4–6% of the track,
15–25% of it gap.

```css
.track { mask-image: repeating-linear-gradient(90deg, #000 0 4%, #0000 4% 5%) }
.fill  { clip-path: inset(0 calc((1 - var(--v,0)) * 100%) 0 0);
         background: linear-gradient(90deg, var(--from), var(--to));
         transition: clip-path .7s cubic-bezier(.22,1,.36,1) }
```
⚠ Nothing here is countable and there are no per-segment hooks, so the whole
read-out is decoration unless the container carries `role="progressbar"` and
`aria-valuenow`. The mask also rasterises the track as its own layer — fine for
one meter, not for a row of them.
