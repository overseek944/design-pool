---
id: peak-table-spectrum-profile
category: canvas
tags: [canvas,generative,field,data,precision,technical]
axes: {energy: 2, density: 2, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Summed sines read as a wave. Measurement reads as a quiet baseline carrying
*localised* events: drive the profile from a short table of peaks — centre,
width, height — summed as Gaussians over a low sine floor, and the curve reads
as instrument output rather than decoration. Give each peak its own phase and
rate so they breathe independently instead of pulsing as one. 8–16 peaks, widths
0.003–0.01 of the axis, floor under a tenth of the tallest peak.

```js
let y = .02 * Math.sin(62 * x + .3 * t)                  // baseline, never flat
for (const p of peaks) { const u = (x - p.c) / p.w
  if (u * u > 16) continue                               // 4 widths out, skip it
  y += p.h * (1 + .22 * Math.sin(t * p.rate + p.phase)) * Math.exp(-u * u) }
```
⚠ That early-out is the cost control — `exp` per peak per sample is the inner
loop, and past four widths the term is under 1e-7. Peaks nearer than three
widths merge into one hump instead of resolving.
