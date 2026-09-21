---
id: slope-held-diagonal-edge
category: surface
tags: [surface,clip-path,edge,section,responsive,geometry]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 2
seen: 2
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

The same trap has a different answer when what must hold is the *corner* rather
than the slope: author every vertex as a pixel offset anchored to `0` or
`calc(100% - n)` and the polygon stops scaling at all. A chamfer, an asymmetric
notch, or a staircase of 4/8/16px steps then cuts identically on a 200px chip
and a 1200px panel, which is what a bevel has to do to read as one material.
```css
.chip { clip-path: polygon(0 9px, 9px 0, calc(100% - 36px) 0, 100% 36px,
          100% calc(100% - 9px), calc(100% - 9px) 100%, 9px 100%,
          0 calc(100% - 9px)) }                        /* cuts 6–40px */
```
⚠ Vertex count grows fast — a four-corner staircase runs to 28 points, each
re-authored by hand if the step size changes. Generate the list, or keep it to a
single chamfer. Steps below ~3px stop resolving and read as a soft corner.
