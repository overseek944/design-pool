---
id: viewport-offset-subject-framing
category: canvas
tags: [webgl, camera, composition, layout, viewport]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A full-bleed 3D scene behind a text column puts its subject under the words.
Moving the camera changes the perspective; shifting the viewport does not —
offset `gl.viewport` sideways by a fraction of the width and the scene
re-centres in the free half, looking identical. Ease the offset between
sections to swap sides, and drop it to zero on portrait screens. Shift 10–18%
of width.

```js
const shift = portrait ? 0 : W * (0.13 - 0.26 * side)   // side eased 0→1
gl.viewport(shift, 0, W, H)
```
⚠ Anything projected into DOM or SVG over the canvas must add the same shift,
in CSS pixels not device pixels, or every annotation drifts off its target.

Variant — vertical: to lift a 3D subject clear of copy below it, render a
taller virtual frustum and crop it with `camera.setViewOffset`, widening FOV by
the same factor so scale is unchanged. Shift 25–40% of height.
