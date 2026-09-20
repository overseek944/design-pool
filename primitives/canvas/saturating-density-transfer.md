---
id: saturating-density-transfer
category: canvas
tags: [canvas,shader,color,field,opacity]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
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
