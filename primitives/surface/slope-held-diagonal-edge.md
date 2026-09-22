---
id: slope-held-diagonal-edge
category: surface
tags: [surface,clip-path,edge,section,responsive,geometry]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 2
seen: 8
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

A chamfer that must not clip is painted rather than cut. Stack two
pseudo-elements on the same corner, each a zero-content box with four
transparent borders: the lower takes the rule colour on two adjacent sides, the
upper takes the page ground on the opposite two. The upper triangle is the cut,
the sliver of the lower one showing past it is its edge — inset the upper by
1–2px for a stroked diagonal, or leave the pair the same size and the lower
colour reads as a bevel face instead. Nothing is clipped, so a focus ring, a
shadow and a sticky child all survive, which is what makes this the cut to use
on a control. Border width sets the notch: 4–14px.
```css
.cut::before, .cut::after { content: ""; position: absolute; top: 0; left: 0;
                            border: var(--cut, 6px) solid transparent }
.cut::before { border-bottom-color: var(--rule); border-right-color: var(--rule) }
.cut::after  { border: calc(var(--cut) - 1px) solid transparent;
               border-top-color: var(--ground); border-left-color: var(--ground) }
```
⚠ It paints the ground, so it only holds over a known flat colour — over an
image, a gradient or a blurred backdrop the wedge shows as a patch. The box's
own border still turns that corner square underneath the overlay; suppress it on
the two cut edges or the hairline doubles back on itself.

One length can hold the angle as well as the size. Step the polygon the same
distance along the bottom as up the side and the cut is 45° on any aspect
ratio — which a percentage cannot do, since `calc(100% - 25%)` is a quarter of
the *width* on x and a quarter of the *height* on y, two different amounts on
anything but a square. Author that step as a single custom property and the
mirrored corner becomes one override rather than a second polygon; a
viewport-scaled `clamp()` keeps the bite proportionate across widths. 40–120px.
```css
.chop      { --chop: clamp(60px, 6.6vw, 96px);
             clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--chop)),
                                calc(100% - var(--chop)) 100%, 0 100%) }
.chop-left { clip-path: polygon(0 0, 100% 0, 100% 100%,
                                var(--chop) 100%, 0 calc(100% - var(--chop))) }
```
⚠ Whatever is inside has to clear the cut: pad the bitten corner by the step
plus 8–16px, or a line of copy runs into the diagonal at exactly the width
where the clamp is largest.

`shape()` retires the arc generator. Its `curve to <point> with <control>` draws a
quadratic fillet inline, so a chamfer with both knees rounded is one declaration
reading two tokens — cut and radius — that resizes with the box. Gate it on
`@supports (clip-path: shape(from 0 0, line to 1px 1px))` and keep the
pixel-offset polygon as the fallback: same cut, sharp knees. Cut 60–280px,
knee radius 8–16px.
```css
.plate { clip-path: shape(from 0 0, hline to calc(100% - var(--cut) - var(--r)),
  curve to calc(100% - var(--cut) + var(--r)) var(--r) with calc(100% - var(--cut)) 0,
  line to calc(100% - var(--r)) calc(var(--cut) - var(--r)),
  curve to 100% calc(var(--cut) + var(--r)) with 100% var(--cut), vline to 100%, hline to 0, close) }
```
⚠ Offsets of ±r on both axes keep the fillet symmetric only at 45°; at any other
slope scale the diagonal-side offsets by the slope or the knee reads lopsided.
