---
id: slope-held-diagonal-edge
category: surface
tags: [surface,clip-path,edge,section,responsive,geometry]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 2
seen: 4
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

`clip-path` takes no radius and `border-radius` does not survive it, so a
non-rectangular shape that still needs soft corners has to draw them: sample
each corner's arc into 5–9 vertices and emit the polygon from a helper rather
than by hand. A hexagon, a pentagon plate or a chamfered badge then keeps the
corner softness of everything around it instead of ending in points, which is
what makes it read as the same material and not as an icon. Corner radius
5–12% of the shorter side.
```js
const arc = (cx,cy,r,a0,a1,n=7) => Array.from({length:n+1}, (_,i) =>
  { const a = a0 + (a1-a0)*i/n; return `${cx+r*Math.cos(a)}% ${cy+r*Math.sin(a)}%` })
```
⚠ The output is 40+ vertices, unreadable and unmaintainable by hand — keep the
generator in the build, never the expanded list, or the next radius change is
a rewrite. Sampling below five points per corner reads as a visible facet.

A clip takes the border with it, so a chamfered or slanted box cannot be
outlined by `border` at all. One polygon with the `evenodd` fill rule draws
both: the outer shape, then the same shape inset by the hairline, and the
region between them is the only thing painted. The two rings must be listed in
one `clip-path` and the inset vertices computed from the same cut token, or the
stroke thins along the diagonal. Pad the inline axis by the cut plus 4–8px so
the label clears the slope.
```css
.chip { --cut: 10px; clip-path: polygon(evenodd, var(--cut) 0, 100% 0,
  calc(100% - var(--cut)) 100%, 0 100%,
  calc(var(--cut) + 1px) 1px, 1px calc(100% - 1px), /* … inner ring */) }
```
⚠ This paints a border and still clips the focus ring. Where the shape belongs
to a control, skew a pseudo-element behind an unclipped box instead — the ring
then follows the real border box, which is square and therefore honest.
