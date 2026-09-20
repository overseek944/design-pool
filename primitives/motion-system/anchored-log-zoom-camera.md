---
id: anchored-log-zoom-camera
category: motion-system
tags: [camera,zoom,canvas,interpolation,diagram,scene]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A 2D camera interpolating scale linearly rushes the far half of a deep zoom and
crawls the near half: apparent size grows geometrically, so 0.02→0.2 and 0.2→2
are equal visual distances. Interpolate `log(scale)`, then solve the pan that
pins one world point under the same screen pixel — the push reads at one rate
and the subject never slides out from under itself. Ratios 5–100× over 1.2–3s.

```js
const s = Math.exp(lerp(Math.log(a.sc), Math.log(b.sc), t))
const cx = ax - lerp((ax - a.x) * a.sc, (ax - b.x) * b.sc, t) / s
```
⚠ Ease `t`, not the scale — easing a log interpolation flattens the middle.
Raster content resolves at one depth only.
