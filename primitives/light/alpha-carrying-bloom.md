---
id: alpha-carrying-bloom
category: light
tags: [bloom, glow, webgl, transparency, postprocessing, compositing]
axes: {energy: 2, density: 2, weight: 4, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Bloom on a transparent WebGL canvas vanishes: the halo lands where alpha is
zero, so the page ground shows through and only glow inside the geometry
survives. Patch the bloom composite to write its own brightness as alpha, so
the halo carries coverage and composites over whatever DOM sits behind. The
canvas can then float on a themed page without a baked background colour.
Strength 0.2–0.5, threshold 0.9–1.1.

```glsl
vec4 b = bloomStrength * (/* mip sum */);
gl_FragColor = vec4(b.rgb, clamp(max(max(b.r, b.g), b.b), 0., 1.));
```
⚠ Needs a half-float target and premultiplied output; on a light ground an
additive halo reads as haze, not light — keep strength low there.
