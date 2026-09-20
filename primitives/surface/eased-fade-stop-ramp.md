---
id: eased-fade-stop-ramp
category: surface
tags: [surface,gradient,fade,mask,precision]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A two-stop fade interpolates alpha linearly and the eye reads the straight ramp
as a visible shoulder where the fade begins. Hand-place eight to thirteen stops
on a decelerating curve instead — alpha falling steeply at first, then a long
low tail with the stops crowding toward transparent — and the transition stops
having an edge. Keep the stop list in one token and reuse it for every
direction.

```css
--fade: #000 0, #000b 20%, #0007 35%, #0004 48%, #0002 62%, #0001 78%, #0000 100%;
.edge::before { background: linear-gradient(to bottom, var(--fade)),
                            linear-gradient(to right,  var(--fade)) }
```
⚠ Worth it over 24–64px of fade. Shorter than that a two-stop gradient is
already imperceptible and the extra stops are wasted bytes.
