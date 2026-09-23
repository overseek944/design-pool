---
id: drifting-hairline-bar-field
category: canvas
tags: [canvas,field,ambient,lines,background,hero,generative]
axes: {energy: 2, density: 3, weight: 1, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A dark ground gains speed and signal without particles or shaders: a pool of
thin horizontal bars, each a gradient clear→ink→clear, drifting left or right
at its own slow rate and recycled past the far edge. Faint bars set texture;
on a random 3–9s timer one bright, faster bar sweeps once. Bars 1–3px tall,
80–440px long, alpha 0.03–0.25, count ≈ height/8 capped at 70–150.

```js
const g = ctx.createLinearGradient(b.x, 0, b.x + b.w, 0)
g.addColorStop(0, clear); g.addColorStop(.5, ink(b.a * (.85 + .15 * Math.sin(b.ph += .05))))
g.addColorStop(1, clear); ctx.fillStyle = g; ctx.fillRect(b.x += b.vx, b.y, b.w, b.h)
```
⚠ Never stops on its own: freeze one frame under reduced motion and pause offscreen.
