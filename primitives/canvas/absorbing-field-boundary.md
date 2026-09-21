---
id: absorbing-field-boundary
category: canvas
tags: [canvas,simulation,shader,texture,solver,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A simulation lives on a finite grid and whatever reaches the edge comes back:
a wave reflects, a wake returns as a second wake, and a minute later the field
is standing-wave hash reading as a fault, not as weather. Multiply every state
channel by a smoothstep band at the border and the energy leaves instead.
Band 3–8% per side — narrower rings, wider eats visible area.

```glsl
vec2 e = smoothstep(vec2(0.0), vec2(0.05), vUv)
       * smoothstep(vec2(0.0), vec2(0.05), 1.0 - vUv);
state *= e.x * e.y;              // every channel, not just the visible one
```
⚠ Damping only the displayed channel leaves velocity to re-inject the wave next
step. Keep emitters clear of the margin — the band drains them too.
