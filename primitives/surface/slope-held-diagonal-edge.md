---
id: slope-held-diagonal-edge
category: surface
tags: [surface,clip-path,edge,section,responsive,geometry]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A `clip-path: polygon()` with percentage vertices does not keep its angle.
Percentages resolve against the box, so a diagonal authored wide flattens out
as the box narrows and grows tall — the same declaration reads as a different
cut at every width. Hold the visual slope by re-authoring the vertex per
breakpoint rather than by resizing the element. Because it clips rather than
paints, whatever fills the box shows through the cut: flat colour, a gradient,
a drifting ground.
```css
.band { clip-path: polygon(0 0, 100% 0, 100% 28%, 0 92%) }   /* 24–35% wide */
@media (max-width: 1200px) { .band { clip-path: polygon(0 0,100% 0,100% 45%,0 92%) } }
@media (max-width: 760px)  { .band { clip-path: polygon(0 0,100% 0,100% 70%,0 92%) } }
```
⚠ A clip takes everything with it — a focus ring, a shadow or a sticky child
inside the box is cut at the same edge. Keep interactive content out of the
slanted band.
