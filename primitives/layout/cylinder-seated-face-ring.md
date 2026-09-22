---
id: cylinder-seated-face-ring
category: layout
tags: [3d,ring,carousel,perspective,preserve-3d,placement,depth]
axes: {energy: 3, density: 3, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A ring resolved into `left`/`top` offsets stays in the page plane. To seat faces
on a cylinder — turned outward, near ones large — compose off the parent's own
rotation: `rotateY(i · 360°/n)` turns an item to its seat, `translateZ(r)` pushes
it out along that new axis, and one `rotateY` on the `preserve-3d` parent turns
every seat at once. A `rotateX` after the push leans each face about its own
axis, not the ring's. Radius 120–800px, perspective 2.5–4× it.

```css
.stage { perspective: 1200px }                        /* 2.5–4 × --r */
.hub   { transform-style: preserve-3d; rotate: y var(--turn) }
.face  { transform: rotateY(calc(var(--i) * 360deg / var(--n)))
         translateZ(var(--r)) rotateX(-18deg) }
```
⚠ Adjacent centres sit `2r·sin(180°/n)` apart — a wider face interpenetrates its
neighbours and the depth test notches both. Back-half faces read mirrored;
`backface-visibility: hidden` retires them, leaving half the ring empty.
