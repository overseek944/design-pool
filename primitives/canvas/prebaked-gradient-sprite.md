---
id: prebaked-gradient-sprite
category: canvas
tags: [canvas,performance,particles,light]
axes: none
cost: 2
seen: 3
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

The same trade applies to text. `fillText` re-shapes the glyph on every call, so
a field drawn in marks — a `+`, a dot, a rule character — pays the shaping cost
per particle per frame. Rasterise the glyph once into a tight offscreen canvas
at the device ratio and blit it; scale then comes from the `drawImage`
arguments, which is also how a mark shrinks with depth. One sprite per size
class, three or four across the whole field.
```js
g.font = `${px * dpr}px ui-monospace, Menlo, monospace`
g.textBaseline = 'top'; g.fillStyle = colour; g.fillText('+', 0, 0)
ctx.drawImage(spr.c, x, y, spr.w * k, spr.h * k)      // k = perspective factor
```
⚠ Bake at the largest size drawn and scale down, never up. Read the colour from
a custom property at bake time — a theme flip needs a re-bake, not a filter.

The same trade applies to the *ramp* rather than the pixels. A field colouring
each mark from a value builds a `rgb(…)` string per mark per frame — allocation
and parse in the innermost loop. Bake the ramp once into a 256-entry array of
colour strings and index it with the quantised value; the per-mark cost becomes
one array read. Two segments — ground to accent, accent to highlight — give a
ramp with a usable mid-tone rather than a straight fade.
```js
const LUT = Array.from({ length: 256 }, (_, i) => mix2(ground, accent, high, i / 255))
ctx.fillStyle = LUT[value * 255 / MAXV | 0]
```
⚠ Clamp the index — a value at the top of the range rounds past the last entry
and yields `undefined`, which canvas silently ignores rather than throwing.
Rebuild on a theme change, never on resize.
