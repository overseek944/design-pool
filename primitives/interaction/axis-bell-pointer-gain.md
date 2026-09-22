---
id: axis-bell-pointer-gain
category: interaction
tags: [interaction,pointer,falloff,data,hover,detail]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A row of elements already carrying values can answer the pointer without any
being selected. Multiply each one's own value by a bell centred on the pointer's
position along the row's one meaningful axis — gain, not replacement, so the
data survives under the cursor and the row bulges as though amplified rather
than lighting a hit target. Park the centre far outside on `pointerleave` and
the bell decays through the same arithmetic, no branch and no leave animation.
Radius 90–180px, peak 1.5–2×.

```js
let px = -1e4                                    // parked, not a null check
el.addEventListener('pointerleave', () => px = -1e4)
const u = (x[i] - px) / R
bar[i].style.transform = `scaleY(${v[i] * (1 + A * Math.exp(-u * u))})`
```
⚠ Pointer-only: decorate a row already legible at rest, never make this how a
value is read. A style write per element per frame is the cost — window the loop
to the indices the bell reaches.

The row generalises to a plane, and what it buys there is different. In a grid
of peer tiles `:hover` is exclusive — one tile wins and the other five are
simply not it. Drive each tile's scalar from 2D distance instead and the
nearest sits near 1 while its neighbours wear a fraction of the *same*
composite treatment — lift, border tint, shadow, the affordances inside it — so
the grid answers as one surface rather than as a set of buttons. Square the
linear falloff; unsquared, everything lights at once and the grade reads as
fog. Radius 1.5–2× the tile pitch.
```js
const n = Math.max(0, 1 - Math.hypot(px - cx, py - cy) / R)
tile.style.setProperty('--d', (n * n).toFixed(3))
```
⚠ One rAF for the whole set, never one per tile, and zero every scalar on
`pointerleave` — a cancelled frame otherwise strands the grid mid-grade. On a
coarse pointer the system is wholly inert, so whatever it was revealing has to
be promoted to permanent rather than left at 0.
