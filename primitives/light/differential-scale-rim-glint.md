---
id: differential-scale-rim-glint
category: light
tags: [light,rim,mask,layers,ambient,metal,3d]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A form cut from a single silhouette has no edge for light to catch. Stack two
layers on the same mask — a textured one below, a flat one above — tilt both on
slow keyframe loops of slightly different period, and scale the upper layer down
by a computed inset. What survives is a rim of the lower layer, and because the
two are out of phase its thickness travels around the outline rather than
sitting still. Inset 0.5–3% per axis, periods within 5–20% of each other,
loops 10–20s.

```css
.rim, .face { mask: var(--shape) 50%/100% 100% no-repeat;
              animation: var(--t) linear infinite }
.face { --inset: .018; animation-name: tilt-b; animation-duration: 16.1s;
        scale: calc(1 - var(--inset)) calc(1 - var(--inset) * 1.1) }
.rim  { animation-name: tilt-a; animation-duration: 13.3s }
```
⚠ The rim *is* the lower layer's edge, so a feathered mask erases it — the
shape must be hard alpha, and both layers need identical `mask-size` or the
inset offsets the silhouette instead of shrinking it.
