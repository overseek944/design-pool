---
id: trailing-mask-sweep
category: reveal
tags: [reveal,mask,scan,grid,sweep,technical]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Reveal a field — a measurement grid, a texture, a dot matrix — by animating
`mask-position` across it rather than fading it in. Build the mask as a gradient
with a soft ramp so the field arrives behind a leading edge and holds, which
reads as instrumentation rather than decoration. One custom property sets the
tail length, so the same rule serves both axes by swapping the gradient angle.
Trail 80–160px; sweeps of 1.2–2.5s across a full panel.
```css
.grid { --trail: 118px;
  background-image: linear-gradient(#0275c433 1px, transparent 1px);
  background-size: 23px 23px;
  mask-image: linear-gradient(90deg, transparent 12%, #0001 28%, #000 100%) }
@keyframes sweep { from { mask-position: calc(var(--trail) * -1) 0 } to { mask-position: 100% 0 } }
```
⚠ `mask-position` is not compositor-accelerated everywhere — declare
`will-change: mask-position` and keep the swept layer to one element, not a stack.
