---
id: hash-dither-before-quantise
category: canvas
tags: [canvas,color,ramp,noise,grain,banding,generative]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Snapping a continuous value onto a short palette — eight to twelve grey levels,
a glyph ramp, a stepped tint — bands into visible contours. Add a deterministic
hash jitter of about half a step before flooring, then lerp between the two
adjacent levels. The contour dissolves into grain, and because the hash is pure
in the cell's coordinates that grain holds still instead of crawling. Jitter
0.04–0.12 of the ramp.

```js
const hash = (x, y) => { const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return n - Math.floor(n) }
const f = (v + (hash(c, r) - .5) * .08) * (L.length - 1), i = f | 0
const out = L[i] + (L[Math.min(L.length - 1, i + 1)] - L[i]) * (f - i)
```
⚠ Clamp before indexing — the jitter pushes both ends out of bounds. Seed the
hash with a time term only if the grain should move; drifting it per frame
reintroduces flicker at low frame rates.

The same hash has a second job: per-element variation seeded from an index
rather than a coordinate. Size, angle, phase and intro offset all fall out of
`hash(i + k)` for a few fixed `k`, which costs no stored table and — being pure
— produces byte-identical output on a server and in the client that hydrates it.
`Math.random()` in the same place is a hydration mismatch.

A time term need not drift per frame. Floor it to a rate before it enters the
hash and the grain re-rolls in discrete steps while everything around it still
renders at full speed — the cadence of exposed stock rather than the hiss of a
sensor, and the flicker the per-frame form suffers at low frame rates cannot
happen because the frame rate no longer feeds it. 10–16 re-rolls a second;
below eight the grain becomes a texture the eye tracks.
```glsl
float g = fract(sin(dot(px, vec2(12.9898, 78.233)) + floor(t * RATE) * 0.1) * 43758.5453);
```
⚠ Two hashes averaged with the dot constants swapped kill the diagonal banding
a single `sin` hash leaves across large flat areas. One is enough under grain
of 0.1 amplitude or less.
