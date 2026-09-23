---
id: addressable-cell-lattice
category: surface
tags: [lattice,grid,hairline,pointer-events,node-budget,decoration]
axes: {energy: 1, density: 3, weight: 1, finish: 4}
cost: 2
seen: 8
requires: []
conflicts: []
completes: []
tension: []
---
A hairline lattice drawn as two gradients costs one node and answers to nothing.
The moment a single cell must respond — a hover tint, a press origin, a label —
the field has to be real elements, and the pitch stops being a rhythm decision
and becomes a node budget: a 1900×950 band is 800 cells at 48px and 3,200 at
24px. Keep each cell a bare box with one border and no text, and make the
wrapper `pointer-events: none` so only the cells themselves are targets.

```css
.field { position: absolute; inset: 0; pointer-events: none; display: grid;
         grid: repeat(auto-fill, var(--cell, 48px)) / repeat(auto-fill, var(--cell, 48px)) }
.field > i { border: var(--hair) solid var(--rule); pointer-events: auto }
```
⚠ Cells that take the pointer also take it from anything beneath them — raise
real controls above the field rather than trusting source order. Adjacent cells
draw every interior rule twice, so the lattice is heavier than the token says.

The node budget buys addressability a pointer tint does not need. Leave the
whole lattice `pointer-events: none`, listen once on the container, and resolve
the cell by integer division of the pointer offset by the pitch — the
arithmetic is exact because the grid *is* uniform, one listener replaces N hit
targets, and the ⚠ above disappears because nothing in the field can take a
click. Coalesce samples into a rAF and rebuild the index on a debounced
`ResizeObserver`, 120–200ms.
```js
const i = Math.floor(y / pitch) * cols + Math.floor(x / pitch)
cells[i]?.style.setProperty('--lit', 1)
```
⚠ Exact only while every cell is the same size — an `auto-fill` track
distributing a remainder, or a fractional device pixel ratio, drifts the index
by one near the far edge. Derive `cols` from the measured track count, never
from the intended one.

A pointer that paints rather than tints leaves a wake. On each move, stamp every
cell within a radius of 1–2 pitches with one colour and an expiry 300–600ms
out, advancing through a 3–5 colour palette per *event* rather than per cell —
a fast stroke then lays down bands. One 30ms sweep drops expired entries; lit
cells snap on over 40–80ms. When the pointer leaves, a 10–25% random population
can hold the field alive, reseeded on each leave.
```js
const exp = now + LIFE, c = palette[n++ % palette.length]
for (const k of cellsWithin(x, y, R)) lit.has(k) || lit.set(k, { c, exp })
```
⚠ Pointer-only decoration — `aria-hidden`, `touch-action` untouched on mobile,
and no idle population under reduced motion.
