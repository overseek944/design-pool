---
id: svg-geometry-keyframes
category: motion-system
tags: [motion,svg,diagram,precision,detail]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
`r`, `cx`, `cy`, `x`, `y` and `width` are CSS properties on SVG, not just
attributes — so they animate in plain keyframes. A ping that grows `r` keeps its
stroke at the authored weight and stays centred with no transform-origin to set;
the same ring under `transform: scale()` thickens as it expands and has to be
re-centred by hand. Use it for anything whose *geometry* is the message —
radar pings, a node sliding along a connector, a bar extending.

```css
@keyframes ping { 0% { r: .75; opacity: 1 } 60%, 100% { r: 5.25; opacity: 0 } }
.pulse { animation: ping 2s var(--ease) infinite }
```
⚠ Geometry properties are not compositor-accelerated — they relayout the SVG
every frame. Fine for a handful of marks, wrong for hundreds. Safari needs the
property set in CSS, not only as an attribute, before it will animate.

Where the transform is unavoidable — translating or scaling a whole `<g>` — the
origin is the trap. Percentage `transform-origin` on an SVG child resolves
against the nearest *viewport*, not the element, so `50%` on a group parked off
to one side pivots about the middle of the drawing. `transform-box: fill-box`
re-points it at the element's own bounding box and the declaration starts
meaning what it reads as.
```css
.drift { transform-box: fill-box; transform-origin: 50%;
         animation: drift 16s ease-in-out infinite }   /* 8–20s */
```
⚠ `fill-box` measures the geometry, so a group whose bounds change mid-animation
moves its own origin. Stroke and filter regions are outside the fill box — a
blurred group scales about a point offset from where it looks centred.
