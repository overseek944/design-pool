---
id: area-proportional-mark-population
category: canvas
tags: [canvas,field,particles,performance,responsive,density]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A generative field authored at one mark count is two different compositions: a
crowd on a phone and a scatter on a wide panel. Density is the parameter, not
count. Derive the population from the drawing surface's own area and cap it, so
texture holds at every width while the worst case stays bounded — the ceiling
is a frame-budget decision, the divisor an aesthetic one. Repopulate on resize;
the divisor is where the effect is actually tuned. Divisor 2000–8000 px² per
mark, ceiling 200–600.

```js
const n = Math.min(CEIL, Math.round((w * h) / PER_MARK))
marks = Array.from({ length: n }, spawn)
```
⚠ Separate from the backing-store budget — full device ratio and too many marks
still drops frames. Area from the element, never the viewport, or the same
effect in a sidebar gets the full-bleed population.
