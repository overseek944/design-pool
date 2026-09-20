---
id: single-channel-field-storage
category: canvas
tags: [canvas,simulation,performance,texture,shader]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Choose the channel count per field rather than reaching for RGBA everywhere. A
velocity needs two components, a pressure or a density one, and a float target
carrying unused channels pays that bandwidth on every sample. It decides the
frame where sampling concentrates: a transported density is read by advection
and again by every tap of the display pass. Colour is not state — keep the
field scalar and apply the palette where it is drawn.

```js
velocity = doubleFbo(w, h, gl.RG16F, gl.RG)    // two components
pressure = doubleFbo(w, h, gl.R16F, gl.RED)    // one
density  = doubleFbo(w, h, gl.R16F, gl.RED)    // one, and the hot texture
```
⚠ Needs WebGL2 and `EXT_color_buffer_float` — test both and keep a still image
for when either is missing. Half float tops out near 65k: clamp accumulation or
a long-lived source reaches `inf` and every pass reading it returns NaN.
