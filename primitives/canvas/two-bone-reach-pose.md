---
id: two-bone-reach-pose
category: canvas
tags: [canvas,figure,rig,articulation,procedural,geometry]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A limb posed by writing its angles needs a hand-tuned number per joint per frame
and cannot be told to touch anything. Name the target and let the law of cosines
give the elbow — two bones, one `acos`. One arm then
serves a pick, a scan and an idle hover from three target paths. Clamp the
distance into `(0, l1 + l2)` or `acos` leaves its domain and one `NaN` poisons
the pose for good.

```js
const dx = tx - sx, dy = ty - sy, a0 = Math.atan2(dy, dx)
const d = Math.min(Math.max(Math.hypot(dx, dy), 1e-3), l1 + l2 - 1e-3)
const e = a0 + ELBOW * Math.acos(Math.min(1, (l1*l1 + d*d - l2*l2) / (2*l1*d)))
const ex = sx + Math.cos(e) * l1, ey = sy + Math.sin(e) * l1   // hand: a0, d
```
⚠ Both signs of `ELBOW` are valid. Choosing per frame by which elbow sits higher
flips the joint inside out as the target crosses the shoulder axis — fix it per
limb.
