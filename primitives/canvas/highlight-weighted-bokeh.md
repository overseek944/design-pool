---
id: highlight-weighted-bokeh
category: canvas
tags: [canvas,shader,webgl,blur,light,texture]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A box or gaussian blur averages a bright point away. Weight every sample by a
high power of its own brightness instead and the bright ones dominate their
neighbourhood, so small highlights spread into discs and the field blooms like a
defocused lens rather than going uniformly soft. Sample on a golden-angle
spiral — radius grows as the square root of the index, so coverage stays even
with no kernel table and no separable pass. Samples 12–24, exponent 6–10, gain
50–200 over a base near 5.

```glsl
float r = 1.0; vec3 acc = vec3(0.0), wsum = vec3(0.0);
for (float a = 0.0; a < GOLDEN * N; a += GOLDEN) {
  r += 1.0 / r;                                   // radius ~ sqrt(index)
  vec3 s = texture(tInput, uv + (r - 1.0) * vec2(cos(a), sin(a)) * uRadius).rgb;
  vec3 w = vec3(5.0) + pow(s, vec3(uExp)) * uGain; acc += s * w; wsum += w; }
fragColor = vec4(acc / wsum, 1.0);
```
⚠ The weight is per channel, so a saturated highlight drifts in hue as it
spreads — use one luminance weight where that matters. The sample count is the
cost, not the radius.
