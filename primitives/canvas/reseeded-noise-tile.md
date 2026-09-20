---
id: reseeded-noise-tile
category: canvas
tags: [canvas,texture,ambient,generative,performance]
axes: {energy: 2, density: 3, weight: 2, finish: 3}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Per-pixel noise across a whole viewport every frame is a fill-rate bill for an
effect nobody inspects. Write one small tile instead — 128–256px of random luma
through `putImageData` — and repeat it as a pattern. A fixed repeat betrays its
grid, so translate by a random sub-tile offset each tick and over-fill by one
tile on both axes: the seam lands somewhere new every time and never resolves.
Re-seed 10–15 times a second, not per frame. Grain reads as film below ~20fps
and as static above it.

```js
ctx.translate(-Math.random() * T | 0, -Math.random() * T | 0)
ctx.fillStyle = ctx.createPattern(tile, 'repeat')
ctx.fillRect(0, 0, w + T, h + T)
```
⚠ Under reduced motion paint once and never start the timer — a still tile is a
valid texture. Clear it on tab hide, or a hidden page keeps paying.
