---
id: svg-geometry-keyframes
category: motion-system
tags: [motion,svg,diagram,precision,detail]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
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
