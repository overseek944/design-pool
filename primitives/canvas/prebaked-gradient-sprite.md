---
id: prebaked-gradient-sprite
category: canvas
tags: [canvas,performance,particles,light]
axes: none
cost: 2
seen: 1
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
