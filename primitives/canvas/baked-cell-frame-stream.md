---
id: baked-cell-frame-stream
category: canvas
tags: [canvas,animation,precomputed,payload,performance,field]
axes: none
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An ambient field whose motion is authored rather than simulated needs no solver
on the client. Bake it offline to a grid of cells × frames, quantise each cell
to six bits, run-length the byte stream, and ship one `.bin` — playback is then
an index and a lerp between adjacent frames. Unlike a sprite sheet this is
*data*, so it recolours at runtime and redraws at any resolution. Budget 24–32
columns, 60–90 rows, 60–120 frames at 20–30fps; expect 4–8× off the raw count.

```js
for (let i = 0; i < src.length; i++) { const b = src[i]
  if (b < 64) out[w++] = b                            // literal
  else out.fill(src[++i], w, w += b - 126) }          // run of b-126
const v = f0[c] + (f1[c] - f0[c]) * frac              // between frames
```
⚠ Validate the decoded length and throw — a truncated stream renders as a
plausible but wrong field. The bake is a build artefact: ship the generator, or
the animation can never be changed again.
