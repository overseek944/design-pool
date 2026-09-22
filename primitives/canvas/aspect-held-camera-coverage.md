---
id: aspect-held-camera-coverage
category: canvas
tags: [3d, camera, fov, responsive, framing, webgl]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A perspective camera fixes *vertical* field of view, so narrowing the canvas
crops the subject's sides. Hold horizontal coverage instead: below the authored
aspect, widen vertical FOV until the same width fits, and once that passes a
distortion cap, stop widening and dolly the camera back the remainder. Author
at 16:9–2:1, cap FOV at 60–70°.

```js
const halfW = Math.tan(rad(FOV) / 2) * BASE_ASPECT
let fov = 2 * Math.atan(halfW / aspect), back = 0
if (fov > rad(MAX)) { back = DIST * (halfW / (Math.tan(rad(MAX) / 2) * aspect) - 1); fov = rad(MAX) }
```
⚠ Past the cap the subject shrinks; portrait phones want their own framing.
