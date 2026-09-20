---
id: off-thread-texture-downscale
category: perf
tags: [performance,texture,webgl,loading,memory]
axes: none
cost: 2
seen: 1
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
