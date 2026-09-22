---
id: projected-plane-dom-handoff
category: motion-system
tags: [webgl, camera, scroll, overlay, transition]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A scroll-driven camera can fly into a screen inside a 3D scene and land on real
interface. Each frame, project the screen's four world corners to CSS pixels
and hand them to a DOM layer that positions live markup on that quad; crossfade
the in-scene texture out as the camera arrives square-on. The rendered surface
becomes selectable, accessible UI without a cut. Crossfade over the last 10–15%
of travel.

```js
const q = corners.map(c => v.copy(c).project(cam))
if (q.some(p => p.z < -1 || p.z > 1)) return onQuad(null)
onQuad(q.map(p => ({ x: (p.x + 1) / 2 * w, y: (1 - p.y) / 2 * h })))
```
⚠ Any view offset or pixel-ratio scaling on the canvas must be applied to the
projected quad too, or the DOM drifts off its screen.
