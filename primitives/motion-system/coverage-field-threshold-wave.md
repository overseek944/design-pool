---
id: coverage-field-threshold-wave
category: motion-system
tags: [field,grid,threshold,cells,shimmer,generative]
axes: {energy: 3, density: 4, weight: 2, finish: 4}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A field of cells carrying a coverage value — how much of some form falls inside
each — normally animates by rewriting a value per cell per frame. Animate the
*threshold* instead. Hold the coverage fixed and sweep one wave across the
lattice's own coordinates: cells deep inside the form never change, only the
ragged edge breathes. The write is one boolean per cell. Base 0.06–0.12, amplitude half of it, 0.2–0.5 rad per cell.

```js
const bar = base + amp * Math.sin(kx * c.cx - w * t + Math.sin(ky * c.cy))
const v = c.cover > bar ? '' : 'hidden'
if (n.style.visibility !== v) n.style.visibility = v      // write only on change
```
⚠ Amplitude is a repaint budget — every cell it carries across the bar repaints
that frame. Under reduced motion run one pass at the base threshold rather than
stopping the wave, or the form keeps the holes the last frame left in it.

Where a live loop is too costly, bake the breathing instead. Pre-render 8–16
frames in which each set cell is dropped with probability `churn × (1 −
local density)`, density read in O(1) from a summed-area table over a 9–15px
window; solids hold and only sparse edges shimmer. Cycle the frames as the
layer's background image every 80–200ms from a seeded PRNG so every frame is
stable. Churn 5–25%.
```js
const pOff = churn * ((1 - density(x, y, 6)) * .9 + .1)
if (rand() >= pOff) ctx.fillRect(x * cell, y * cell, cell, cell)
```
⚠ Each swap is a full-layer repaint — stop the interval when off-screen.
