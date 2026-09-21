---
id: decay-composited-frame-history
category: canvas
tags: [canvas,trail,composite,motion,field]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: [own-path-derived-streak]
---
Trails normally cost a stored pose history per mark. Never clear the frame;
erase part of it and the framebuffer is the history. One `destination-out`
fill cuts every pixel's alpha by a fraction, so marks decay into wakes for one
`fillRect` and no per-mark state. It lowers alpha rather than painting, so the
canvas stays transparent. Fade 0.1–0.35, lower for a longer tail.

```js
ctx.globalCompositeOperation = 'destination-out'     // then 'lighter'
ctx.fillStyle = 'rgba(0,0,0,.22)'; ctx.fillRect(0, 0, w, h)
```
⚠ Decay stalls at a floor: 8-bit alpha stops falling once `alpha × fade`
rounds under half. Fade .01 rests at 42/255 forever, .05 at 9/255. Keep it
≥ .1. The tail is per frame — half as long at 120Hz.

The eraser takes a fill, not just a colour. Set a gradient as the
`destination-out` fill and the same operation becomes a soft directional fade
cut into whatever is already painted — a ring that dissolves toward its far
side, a field that thins into the page. Clip first and the erase is confined to
one region: a `Path2D` holding an outer and an inner circle, filled `evenodd`,
gives an annulus to fade without touching the middle.
```js
const g = ctx.createLinearGradient(0, y0, 0, y1)
g.addColorStop(0, 'rgba(0,0,0,.65)'); g.addColorStop(1, 'rgba(0,0,0,0)')
ctx.save(); ctx.clip(ring, 'evenodd'); ctx.globalCompositeOperation = 'destination-out'
ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); ctx.restore()
```
⚠ `save`/`restore` around it or the composite op and the clip leak into every
later draw. The gradient erases alpha, so over an opaque backing it reveals the
backing rather than the page.
