---
id: off-thread-texture-downscale
category: perf
tags: [performance,texture,webgl,loading,memory]
axes: none
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Textures authored at 4K decode to tens of megabytes before anything renders, and
the `drawImage` normally used to shrink them costs 30–80ms of main thread each
at unpredictable moments — random lag on a loading screen rather than a cost.
`createImageBitmap` takes resize options and does it off-thread. Colour maps to
~1024px, data maps to ~512, keyed by source so a shared map shrinks once, one
per frame.
```js
const bm = await createImageBitmap(t.image,
  { resizeWidth: w, resizeHeight: h, resizeQuality: 'medium' })
const n = new THREE.Texture(bm); n.flipY = t.flipY; n.encoding = t.encoding
t.image.close?.(); t.dispose()
```
⚠ Colour space and flip must carry across or the model washes out or renders
inverted. Keep a `drawImage` fallback — some browsers reject resize options, and
the promise rejects rather than throwing.

Downscaling fixes the decode; it does not fix the sampling. A map shown 2–5×
minified and swinging toward edge-on — a plane following a curve, a billboard
turning — aliases along every hard edge in the source, and a baked border shreds
into a ragged line. It needs both halves: a mip chain to kill the shimmer under
minification, anisotropy to restore the detail mips throw away at grazing
angles. Clamp anisotropy to 4–8 against the device maximum.
```js
tex.generateMipmaps = true
tex.minFilter = LinearMipmapLinearFilter; tex.magFilter = LinearFilter
tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
```
⚠ Mips cost a third of the texture's memory again — part of what the downscale
above just recovered — and are silently skipped for a non-power-of-two source
unless wrapping is clamped to edge. Anisotropy past 8 is rarely visible and
never free.

The DOM path has the same problem and no resize option. An `<img>` decoded for a
2D context costs `naturalWidth × naturalHeight × 4` however small it is drawn,
so a cache of them is sized by the source, not the display. Draw each one once
into an offscreen canvas at the width it will actually occupy, then clear the
source's `src` to release the decode; entries then cost what they show. Quantise
that width to 48–96px steps or a dragged window re-requests the set every frame.
```js
const w = Math.min(CAP, 64 * Math.ceil(box * Math.min(devicePixelRatio, 1.5) / 64))
c.width = w; c.height = Math.round(img.naturalHeight * w / img.naturalWidth)
c.getContext('2d', { alpha: false }).drawImage(img, 0, 0, c.width, c.height); img.src = ''
```
⚠ Cap the backing store by the source as well as by DPR — allocating past what
the source can fill buys nothing and costs the difference.
