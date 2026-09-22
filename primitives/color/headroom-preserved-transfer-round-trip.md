---
id: headroom-preserved-transfer-round-trip
category: color
tags: [color,shader,canvas,grading,transfer,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A chain of colour adjustments wants two different spaces and usually gets one.
Scaling brightness is physical and belongs in linear light; everything pivoted
on mid-grey — contrast, tonal bands, masks keyed off 0.5 — is perceptual and
belongs in the encoded space. Decode, apply the physical term, encode back, and
run the rest there. Leave the encode **unclamped**: the upper branch is
monotonic above 1, so headroom raised early survives to whoever clamps last,
instead of being crushed at the first stage that touches it.

```glsl
vec3 toSRGB(vec3 c) {                       // no clamp — values > 1 pass through
  return mix(c * 12.92, 1.055 * pow(max(c, 0.0), vec3(1.0/2.4)) - 0.055,
             step(0.0031308, c));
}
vec3 work = toSRGB(toLinear(srgb) * exp2(uExposure));   // stops, ~-2..2
```
⚠ Exactly one stage may clamp, and it is the last write. `max(c, 0.0)` guards
`pow` against negatives, which are not headroom — they are a bug upstream.
