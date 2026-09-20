---
id: receding-annulus-mask
category: surface
tags: [surface,mask,gradient,depth,texture]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Concentric rings that grow geometrically and fade as they widen read as a ground
plane receding to a vanishing point — tiered seating, radar, a ripple. Each ring
is one radial-gradient of four stops (clear, opaque, opaque, clear), and every
ring shares an origin placed just below the frame. Grow the radii 1.15–1.3× a
layer and decay alpha from ~.9 to ~.2 across 8–12 of them, then run the whole
stack as a `mask-image` so the surface behind shows through in tiers.

```css
.tiers { --o: 50% 104%; mask-image:
  radial-gradient(60vw 22vw at var(--o), #000e 0 80%, #0000 96%),
  radial-gradient(92vw 35vw at var(--o), #0000 72%, #000b 77% 95%, #0000 97%),
  radial-gradient(155vw 60vw at var(--o), #0000 79%, #0007 83% 95%, #0000 97%) }
```
⚠ Every layer is a full-surface paint — past ~12 the composite cost shows. Hold
one height/width ratio (.35–.40) across all of them or the rings stop reading as
one plane.
