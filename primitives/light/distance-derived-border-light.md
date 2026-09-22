---
id: distance-derived-border-light
category: light
tags: [light,shader,sdf,glow,border,webgl]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One signed distance to the element's rounded rectangle pays for the whole
lighting. The ring is a band around `abs(d)`; the outward bloom an exponential
in positive `d`; the inward bleed the same curve in negative `d`. Three terms,
one shape function, one pass — and each inherits the true corner radius, which
a blurred copy behind the box cannot. Outward decay 0.1–0.3 per pixel, inward a
third of that; band 1–2px plus equal softness.

```glsl
float d    = sdRoundBox(p, half, radius);
float ring = 1.0 - smoothstep(0.0, band + soft, abs(d));
float out_ = d > 0.0 ? exp(-d * 0.25) : 0.0;
float in_  = d < 0.0 ? exp( d * 0.10) : 0.0;
```
⚠ Inflate the canvas past the element by the bloom's reach or the falloff ends
on a straight cut. This is light, not contrast — never the only edge separating
a control.
