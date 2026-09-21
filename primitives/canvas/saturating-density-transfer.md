---
id: saturating-density-transfer
category: canvas
tags: [canvas,shader,color,field,opacity]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
An accumulating field has no upper bound but coverage does, so mapping density
to alpha linearly clips: every source becomes a flat disc at maximum tint with
nothing inside it. Map through a saturating transfer instead —
`1 − exp(−k·d)`, k of 1–2 — which carries any density into (0,1) and keeps a
gradient alive at the top of the range. Spend what alpha can no longer show on
hue instead. Dense regions then read as more material, not more opaque.

```glsl
float a = uMax * (1.0 - exp(-d * 1.3));                    // uMax 0.6-0.8
vec3  c = mix(uTint, uTintDeep, smoothstep(1.5, 4.0, d));  // surplus -> hue
gl_FragColor = vec4(mix(uGround, c, a), 1.0);
```
⚠ Hold `uMax` well below 1 anywhere copy sits over the field. The transfer
flattens the top of the range but still approaches full opacity, so it
guarantees no contrast floor on its own.

Where the field is a *distance* rather than a density, running the same
exponential twice isolates a band instead of filling one: `1 − exp(−k /
exp(k·m))` peaks where `m` is small and collapses away from it, and the single
`k` sets width and edge hardness together — raise it and the band both narrows
and sharpens. Evaluate it once per palette entry with the sample point stepped
a hair between them and the band separates into coloured plies along its own
normal, dispersion for the cost of the loop. k 3–8, step .005–.02.
```glsl
float w = 1.0 - exp(-k / exp(k * m));     // m = distance field, k = 3..8
sum += uColors[i] * w; cover = max(cover, w);
```
⚠ Emit `cover` as alpha rather than compositing against a guessed ground: the
layer then sits on whatever the page actually is, and a palette or theme change
cannot leave a rectangle behind it.

The same transfer belongs on *geometry* wherever a value is drawn into a box
that cannot grow. Scaling a bar linearly against an expected maximum means one
loud sample clips flat against the ceiling and every neighbour past it clips
with it, so the top of the range carries no shape at all. Divide by the bar's
own available height before the curve and multiply back after — `h·tanh(v/h)` —
and the mapping self-normalises per bar: full scale lands near 76%, nothing can
overflow, and peaks stay ordered instead of merging into a plateau.
```js
const h = Math.max(MIN, avail[i])          // per-element budget, not one global
bar[i].style.transform = `scaleY(${Math.tanh(v[i] / h)})`
```
⚠ The knee is the whole point and it is fixed — to make the compression gentler
or harder, scale `v` going in rather than reaching for a different curve.
