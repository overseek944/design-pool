---
id: graded-dispersion-lens-blur
category: canvas
tags: [canvas,shader,webgl,blur,chromatic,dispersion,media,texture]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Blur an image or video texture by position: project each fragment onto an
angle, shape the distance with a falloff curve, scale the sample ring by it —
one edge stays sharp, the other melts. Offset red and blue taps perpendicular
to that angle, in proportion to local blur, so the soft end fringes like glass
rather than smearing. Radius
40–350px, dispersion 0.1–0.4, 16–24 taps.

```glsl
float t = applyFalloff(clamp(dot(vUv - uOrigin, dir) / .7, 0., 1.));
float r = mix(uBlur, (1. - t) * uBlur, uFalloff);
vec2 split = vec2(-dir.y, dir.x) * uDispersion * r * .5 * texel;
```
⚠ Time-seeded jitter shimmers on video; hash on position. Poster under reduced motion.
