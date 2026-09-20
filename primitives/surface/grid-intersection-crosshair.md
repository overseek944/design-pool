---
id: grid-intersection-crosshair
category: surface
tags: [surface,grid,detail,blueprint,ornament]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Mark a grid intersection with a small plus centred exactly on the crossing: two
hairlines in a shrink-wrapped box placed by `grid-row-start`/`grid-column-start`
and pulled back by half its own size plus the line width. It reads as a
drafting registration mark and makes an otherwise invisible structure legible.
Position is data, so one component marks any set of intersections.

```css
.cross { position: absolute; pointer-events: none;
  --size: 15px; width: fit-content; height: fit-content;
  grid-column-start: var(--x); grid-row-start: var(--y);
  inset: calc(-1 * (var(--size) / 2 + var(--hair) - .5px)) }
```
⚠ Sizes 11–21px; below about 9px the arms read as dust on the screen. The
`.5px` term is the half-pixel correction for an odd line width — drop it and
every mark sits visibly off-centre.
