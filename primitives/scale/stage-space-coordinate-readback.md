---
id: stage-space-coordinate-readback
category: scale
tags: [correctness,measurement,scale,architecture,pointer]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: [fixed-canvas-root-scale]
tension: []
---
A stage authored in fixed design units keeps every CSS value in those units —
`getBoundingClientRect` does not. Measurements return device pixels, so a
scripted pointer, leader or halo written back as `left`/`top` inside the stage
is right only where the factor is 1. Subtract the stage's own rect and divide
offset *and* size by the same factor the transform reads; the script then works
in authored units at every width. Design widths 540–1440 hold the factor inside
0.4–1.2, where rounding on the readback stays invisible.

```js
const f = +getComputedStyle(el).getPropertyValue('--f')      // never a second copy
const r = target.getBoundingClientRect(), s = stage.getBoundingClientRect()
const box = { x: (r.left - s.left) / f, y: (r.top - s.top) / f,
              w: r.width / f, h: r.height / f }
```
⚠ Measure against the scaled stage, not the viewport — a page-level transform
or a sticky ancestor offsets the two differently, and the error surfaces only
once something above the stage moves.
