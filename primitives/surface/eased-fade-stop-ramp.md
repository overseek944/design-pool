---
id: eased-fade-stop-ramp
category: surface
tags: [surface,gradient,fade,mask,precision]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 3
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

Anchor the stops in pixels, not percentages, wherever the element's height is
content-driven: `calc(100% - 64px)` holds the ramp at the length it was tuned
for whether the block is 300px or 2000px tall, while a percentage ramp stretches
into a wash on the long one and compresses into a hard edge on the short one.
```css
mask-image: linear-gradient(to bottom, #000 calc(100% - 80px),
  #0009 calc(100% - 64px), #0004 calc(100% - 32px), transparent 100%)
```
