---
id: prebaked-gradient-sprite
category: canvas
tags: [canvas,performance,particles,light]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
`createRadialGradient` allocates and rasterises on every call, so a field of
glowing marks pays for the same soft disc hundreds of times a frame. Bake it
once per colour into a small offscreen canvas and `drawImage` that: the
per-mark cost drops to a textured blit, and size becomes a draw argument
rather than a new gradient. 32–64px square, stops at 0, around 0.35, and
transparent at the rim. Rebuild when the palette changes, never on resize.
```js
const g = o.getContext('2d').createRadialGradient(24,24,0, 24,24,24)
g.addColorStop(0, c); g.addColorStop(.35, c+'aa'); g.addColorStop(1, c+'00')
ctx.drawImage(sprite[key], x - r, y - r, r * 2, r * 2)
```
⚠ Bake at the largest radius drawn; sprites scaled up past their baked size go
visibly soft. Appending an alpha pair only parses against `#rrggbbaa`.

The same trade at layer scale: bake a whole static stratum — a ruling grid, a
ghost of the finished artwork, thousands of hairlines that never change — into
one full-size offscreen canvas at the device ratio, and composite it each frame
as a single `drawImage` under `globalAlpha`. Fading the stratum in or out is
then one number rather than re-stroking every segment, and the live layer keeps
the whole frame budget. Rebuild on resize and on a pixel-ratio change; never
per frame.
```js
const layer = document.createElement('canvas')
layer.width = w * dpr; layer.height = h * dpr
lctx.setTransform(dpr, 0, 0, dpr, 0, 0); drawStatic(lctx)
ctx.globalAlpha = fade; ctx.drawImage(layer, 0, 0, w, h); ctx.globalAlpha = 1
```
⚠ A full-viewport baked layer is width × height × 4 × dpr² bytes — two or three
of them is the ceiling on a phone, and each one is a texture upload per frame.
