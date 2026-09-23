---
id: blur-covered-undersampled-backing
category: perf
tags: [canvas,performance,blur,dpr,resolution,glow]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A canvas blurred by a CSS `filter` loses every detail finer than the blur
radius, so rendering it at device resolution pays for pixels the filter
destroys. Size the backing store below 1× — the blur hides the upsampling — and
fill cost falls with the square of the scale. Scale 0.4–0.7×
for a 12–30px blur.

```js
const s = Math.min(devicePixelRatio || 1, 2) * 0.6
c.width = w * s | 0; c.height = h * s | 0; ctx.setTransform(s, 0, 0, s, 0, 0)
```
⚠ The filter re-runs on every repaint of an animating canvas; stop the loop
off-screen. Never for hard edges or text.

Derive the scale from the radius rather than fixing it: `min(.5, max(.1, 8 / blur))`
keeps roughly 8 backing pixels per blur radius, so a 20px pass renders at 0.4×
and a 90px one at 0.1×. Several passes of one source at different radii then
cost almost nothing beyond the sharpest.
