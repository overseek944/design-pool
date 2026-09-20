---
id: composed-arrival-field
category: canvas
tags: [shader,stagger,clock,uniform,reveal,perf]
axes: {energy: 3, density: 3, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Thousands of elements cannot each own a tween. Derive every element's start time
from what it is — distance from the origin, a hash of its index, a layer flag —
then read local progress off one shared clock. The cascade becomes a single
uniform, retimeable mid-flight, and each term tunes alone: spread is shape,
jitter looseness, lag separates layers.

```glsl
float s = far * uSpread + hash(id) * uJitter + layer * uLag, d = uTime - s;
float p = clamp(d / uSpan, 0.0, 1.0) * step(0.0, d);
```
⚠ Park the clock at a negative sentinel until release or everything arrives
during load. Spread plus span is the real duration — budget that, not `uSpan`.
