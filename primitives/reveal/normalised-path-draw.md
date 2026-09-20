---
id: normalised-path-draw
category: reveal
tags: [svg,stroke,reveal,draw,geometry,correctness]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A draw-on stroke normally needs the path's measured length, which breaks the
moment the geometry is edited or the viewBox changes. Declare `pathLength="1"`
and the dash system becomes unitless: dasharray 1, dashoffset 1 → 0 is always
exactly one full draw. Paths of wildly different lengths then complete together
instead of at speeds proportional to their size. Draws of 0.4–1.2s read as
deliberate; under 0.25s it is a flicker.
```html
<circle pathLength="1" style="stroke-dasharray:1; stroke-dashoffset:1;
  animation: draw .8s cubic-bezier(.4,0,.2,1) forwards" />
```
⚠ Equal timing is a choice, not always the right one — a long connector drawing
as fast as a short one reads as unphysical. Rings need `transform: rotate(-90deg)`
with a 50% origin to start at twelve o'clock.
