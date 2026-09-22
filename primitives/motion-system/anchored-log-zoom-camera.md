---
id: anchored-log-zoom-camera
category: motion-system
tags: [camera,zoom,canvas,interpolation,diagram,scene]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 3
seen: 2
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

A fixed anchor assumes the two framings nest. Where they sit apart — one ring
across the map from another — the move needs a pull-out mid-flight or the
target is off-screen for most of it. Solve the smooth zoom-and-pan path from
the two endpoints alone: the camera rises, travels while wide, and descends,
at constant *perceived* speed throughout. ρ 1.2–1.6 sets how far it climbs.
```js
const k = rho * rho, b = (wa, sg) => (w1*w1 - w0*w0 + sg*k*k*d*d) / (2*wa*k*d)
const r0 = Math.asinh(-b(w0, 1)), S = (Math.asinh(-b(w1, -1)) - r0) / rho
const s = t * S, w = w0 * Math.cosh(r0) / Math.cosh(rho*s + r0)       // view width
const u = w0 / k * (Math.cosh(r0) * Math.tanh(rho*s + r0) - Math.sinh(r0))  // along d
```
⚠ Degenerate when the centres coincide — fall back to the log form above. Its
duration is S/ρ, not a free choice; scale it rather than overriding it.
