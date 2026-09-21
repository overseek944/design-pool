---
id: rate-split-channel-ensemble
category: canvas
tags: [canvas,field,ambient,technical,measurement,hierarchy]
axes: {energy: 2, density: 2, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Several line traces in one box read as output from several instruments only if
the channels differ in more than phase: give each its own baseline, amplitude,
wavelength and time coefficient, drawn from mutually incommensurate ranges so
the set never re-aligns into one chord. Peers alone are a graph. Promote exactly
one channel — heavier stroke, the only saturated colour — and the rest become
context for it. Baselines 0.25–0.7 of the height, amplitudes 8–28px,
coefficients 1.5e-4–3e-4, sampled every 3–5px.

```js
const ch = [{ y: .30, a: 14, f: .011, s: .00022 }, { y: .46, a: 20, f: .008, s: .00016 },
            { y: .55, a: 26, f: .006, s: .00019, lw: 1.6 }]   // last is the subject
for (const c of ch) { ctx.beginPath(); ctx.lineWidth = c.lw || 1
  for (let x = 0; x <= w; x += 4) ctx.lineTo(x, c.y * h + Math.sin(x * c.f + t * c.s) * c.a)
  ctx.stroke() }
```
⚠ The sample step is a function of the shortest wavelength drawn, not of the
box — coarser than about 5px and the fastest channel resolves as a zigzag.
