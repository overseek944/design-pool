---
id: prebaked-gradient-sprite
category: canvas
tags: [canvas,performance,particles,light]
axes: none
cost: 2
seen: 9
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

The falloff profile is the difference between a hot fragment and a blurry dot. A
plain soft disc — one stop in, one at the rim — reads cheap at any size. Give the
sprite a tight opaque core, a fast collapse and a long faint halo, and each mark
gains presence without gaining radius: the core is what reads as substance, the
halo is what gives it place. Bake the set two or three colour temperatures wide
and index it by each mark's own lifetime — a field running hot at the source and
cooling as it falls kills the flat single-tint tell that no amount of motion
tuning fixes.
```js
g.addColorStop(0, `rgba(${c},1)`);     g.addColorStop(.10, `rgba(${c},.95)`)
g.addColorStop(.24, `rgba(${c},.42)`); g.addColorStop(.52, `rgba(${c},.11)`)
g.addColorStop(1, `rgba(${c},0)`)
```
⚠ A tight core is a hard edge — bake at 48–64px square or the aliasing the soft
disc was hiding comes back with it.

A baked layer is static, which is the whole trade — until two of them are baked
at different phases of the same cycle and cross-faded on a sine. Every member
inside then appears to breathe independently, because each was drawn at a
different point of its own phase in each bake, and the per-frame cost stays two
`drawImage` calls rather than one loop over hundreds of marks. The two bakes
must be a quarter cycle apart; half a cycle and the crossfade passes through a
visibly flat mean.
```js
const A = bake(0), B = bake(Math.PI / 2)        // per-mark: 1 + k * sin(phase + q)
const h = .5 + .5 * Math.sin(2 * Math.PI * t / PERIOD)
ctx.globalAlpha = .35 + .65 * h;       ctx.drawImage(A, x, y)
ctx.globalAlpha = .35 + .65 * (1 - h); ctx.drawImage(B, x, y)
```
⚠ Additive only if the floor is above zero — at `0 + 1·h` the pair dips to one
faint layer at the crossover. Two bakes double the texture memory, so this is a
trade against a third phase, not against the loop.

A table of colour strings serves `fillStyle`; per-pixel work needs the
components. Bake the same ramp as one flat byte array, three entries per level,
and copy straight into `ImageData` — no string, no parse, no mix in the inner
loop, and the palette survives as an editable list of stops rather than as
arithmetic. Smoothstep between the bracketing stops rather than interpolating
straight: a linear ramp creases visibly at every stop it passes.
```js
const L = new Uint8ClampedArray(768)        // 256 levels × rgb, built once
// per level: e = t * t * (3 - 2 * t) between the two stops that bracket it
const v = value * 255 | 0
d[i] = L[v * 3]; d[i + 1] = L[v * 3 + 1]; d[i + 2] = L[v * 3 + 2]; d[i + 3] = 255
```
⚠ Build it at module scope, not per instance and never per frame — it is the
same table for every copy of the effect on the page, and it is the one thing in
the loop that does not depend on the pixel.
