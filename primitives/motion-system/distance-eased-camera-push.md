---
id: distance-eased-camera-push
category: motion-system
tags: [camera,3d,easing,scroll,narrative]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Interpolating a camera's *position* between two waypoints looks wrong whenever
the second one is much closer to the subject: the approach rushes, then crawls
the last stretch, because apparent size grows with the reciprocal of distance,
not with distance. Ease the distance to the look target instead — decay it
geometrically and solve back for the position parameter. The push then reads at
a constant rate the whole way in. Apply only when the end distance is under half
the start distance; elsewhere a normal smoothstep is right.

```js
const k = dEnd / Math.max(1, dStart)          // only when k < 0.5
const s = (dStart - dStart * k ** t) / (dStart - dEnd)
pos.lerpVectors(a, b, s)
```
⚠ Interpolate field of view per waypoint as a separate track — folding a zoom
into the same parameter reintroduces the rush it fixes.
