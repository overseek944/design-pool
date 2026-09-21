---
id: peak-table-spectrum-profile
category: canvas
tags: [canvas,generative,field,data,precision,technical]
axes: {energy: 2, density: 2, weight: 1, finish: 5}
cost: 2
seen: 2
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

The same table read over two axes is terrain you can *place*, where noise is
terrain you can only reseed. Give each source a sign alongside its centre, width
and amplitude and a swell or a hollow sits exactly where it was authored; the
sum stays smooth to every derivative, so contours drawn through it never kink.
5–9 sources, width 0.10–0.18 of the domain — closer than two widths and a pair
merges into one hump instead of resolving as two.
```js
const field = (u, v) => S.reduce((h, s) => h + s.sign * s.amp *
  Math.exp(-((u - s.u) ** 2 + (v - s.v) ** 2) / (2 * s.g * s.g)), 0)
```
⚠ State widths in domain units, never pixels, or the terrain deforms as the box
resizes. Signed sources cancel where they overlap — scale to the box from the
summed field's measured extent, not from the tallest amplitude.
