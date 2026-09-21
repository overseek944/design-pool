---
id: reseeded-noise-tile
category: canvas
tags: [canvas,texture,ambient,generative,performance]
axes: {energy: 2, density: 3, weight: 2, finish: 3}
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Per-pixel noise across a whole viewport every frame is a fill-rate bill for an
effect nobody inspects. Write one small tile instead — 128–256px of random luma
through `putImageData` — and repeat it as a pattern. A fixed repeat betrays its
grid, so translate by a random sub-tile offset each tick and over-fill by one
tile on both axes: the seam lands somewhere new every time and never resolves.
Re-seed 10–15 times a second, not per frame. Grain reads as film below ~20fps
and as static above it.

```js
ctx.translate(-Math.random() * T | 0, -Math.random() * T | 0)
ctx.fillStyle = ctx.createPattern(tile, 'repeat')
ctx.fillRect(0, 0, w + T, h + T)
```
⚠ Under reduced motion paint once and never start the timer — a still tile is a
valid texture. Clear it on tab hide, or a hidden page keeps paying.

The same re-seed rate belongs in a shader, where there is no tile to translate:
quantise a second clock into whole steps and hash that step into a coordinate
offset, so the grain jumps to a new field on each step and holds still between.
A displaced surface then wants its height fed into those coordinates too — the
grain shifts where the form rises and reads as refraction through the material
rather than a flat film laid over it. Step rate 8–15/s; distortion 10–60 units
of height.
```glsl
float k = floor(uGrainTime * 10.);
vec2  o = vec2(hash(k * .1), hash(k * .3)) * 1e3 + vPos * uRefract;
float g = hash(floor(gl_FragCoord.xy * uGrainScale + o));
```
⚠ Drive the grain from a clock separate from the surface's, or slowing the
animation slows the grain with it and the texture turns to crawling blobs.

Neither form is needed where the grain may be *slow*. Take a CSS dot lattice and
animate it with `steps(n, end)`: the field jumps between n fixed sub-pixel
offsets and holds between them, so there is no canvas, no timer, no per-frame
fill — the compositor repaints n times over the whole period and the tile never
resolves because it never sits still long enough to be read. It is a surface
breathing rather than film; a rate this low reads as wrong the moment the
content under it moves. Steps 4–8 over 5–10s, offsets 1–3px.
```css
.shimmer { background: radial-gradient(var(--speck) 1px, #0000 1.4px) 0 0 / 5px 5px;
           animation: jitter 7s steps(6, end) infinite }
@keyframes jitter { 25% { opacity: .5; translate: -2px 1px } 75% { translate: -1px -1px } }
```
⚠ Inset the layer past its box on all sides, or each step exposes the un-tiled
edge. Cancel under reduced motion — the still tile is already the texture.
