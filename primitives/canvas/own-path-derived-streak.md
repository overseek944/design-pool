---
id: own-path-derived-streak
category: canvas
tags: [canvas,motion,morph,points,trail,cheap]
axes: {energy: 4, density: 3, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A field crossing between two states reads as a cut unless the marks show where
they are going, and a stored history buffer is the usual price. Where the pose is
a pure function of the crossing parameter there is nothing to keep: evaluate the
same mark a short step back along the same interpolation and draw the segment
between the two results. The trail is exactly the path that mark takes, it costs
one extra interpolation, and it ends itself the moment the crossing does. Lag
0.10–0.20 of the crossing — shorter reads as a fattened dot, longer as a drawn
line the mark never followed.

```js
const p = lerp(a, b, u), q = lerp(a, b, Math.max(0, u - LAG))   // LAG ≈ .16
if (u > .03 && u < .999) segments.push(p, q)
else dots.push(p)
```
⚠ Collect segments and dots into separate batches and flush each once. Switching
between a fill and a stroke per mark costs far more than the streak itself.

One lag step gives a segment; the same evaluation run `n` times gives the whole
wake. Sample the path at `t − i·Δ` for `i` up to 20–40, stroke the polyline
between consecutive results, and fall both width and alpha off with `i` — the
tail is then exactly the arc the mark just travelled, curvature included, where
a single segment can only ever be its chord. It still stores nothing, so a mark
that reverses or is retimed has a correct tail on the very next frame.
```js
for (let i = 0; i < N; i++) { const f = i / N, p = at(t - i * DT)
  ctx.lineWidth = w0 * (1 - f) ** 1.3                  // alpha ∝ (1 − f) ** 1.15
  ctx.strokeStyle = rgba(c, a0 * (1 - f) ** 1.15); seg(p) }
```
⚠ Cost is `n` path evaluations per mark per frame — cheap for a closed-form
path, ruinous for one that integrates. Skip segments once the alpha rounds
under about 0.015 rather than stroking them invisibly.
