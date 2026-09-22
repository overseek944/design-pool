---
id: occupancy-grid-canvas-pick
category: interaction
tags: [canvas,pointer,hit-test,performance,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Artwork drawn to a canvas has no boxes, so a pointer over it can only be tested
against the whole rectangle — and re-reading `getImageData` per move stalls the
frame it is trying to answer. Bake a one-bit occupancy grid once instead: step
the decoded alpha, mark a cell where any sample clears the threshold, and a pick
becomes one array index. Cell 4–10 source px, threshold 0.08–0.2, stride 2–4.

```js
for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2)
  if (a[(y * w + x) * 4 + 3] > 24) g[(y / C | 0) * cols + (x / C | 0)] = 1
```
⚠ The grid dilates the shape by up to a cell, so it claims a border of empty
pixels — right for a target, wrong where an exact edge is reported. Rebuild it
with the raster; one held across a re-fit offsets every pick silently.
