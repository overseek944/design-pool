---
id: single-channel-field-storage
category: canvas
tags: [canvas,simulation,performance,texture,shader]
axes: none
cost: 2
seen: 2
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

Do not sniff the format by extension string — allocate one and ask. Build a 4×4
texture and framebuffer in the format you want, check
`checkFramebufferStatus`, and on failure recurse *up* the ladder: single channel
to two, two to four, and only then give up. A device that advertises the
extension and still refuses the attachment is common enough that the string is
not an answer. Where linear filtering is the missing piece rather than the
format, degrade instead of bailing — drop the display resolution and any shading
pass and keep the effect.
```js
const fmt = probe(gl.R16F, gl.RED) || probe(gl.RG16F, gl.RG) || probe(gl.RGBA16F, gl.RGBA)
if (!fmt) return still()            // nothing usable: the static branch
if (!ext.linearFiltering) { DYE_RES = 256; SHADING = false }
```
⚠ Probe before allocating anything at scene size — a failed attachment after
the real buffers exist leaks them, and the teardown path is the one nobody
tested.
