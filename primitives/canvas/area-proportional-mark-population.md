---
id: area-proportional-mark-population
category: canvas
tags: [canvas,field,particles,performance,responsive,density]
axes: none
cost: 1
seen: 3
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

Repopulating is wrong where the field has history the reader was watching — a
settled constellation, a trail, a scatter they have been looking at for a minute.
Scale every position by its own axis ratio instead: the composition survives at
the cost of a density slightly off the divisor, which nobody can see, where a
respawn is a visible cut. Skip it below a ratio change of 8–15%, and reseed only
when the previous box was degenerate — collapsed to a few px by a hidden tab or
a mid-mount measure.
```js
if (Math.abs(sx - 1) > .12 || Math.abs(sy - 1) > .12)
  for (const m of marks) { m.x *= sx; m.y *= sy }
```
⚠ Only positions scale, not the count, so a window dragged from phone width to
an ultrawide ends far under its own target — top up toward it over the following
seconds rather than at the event, or the remap buys a repopulation anyway.
