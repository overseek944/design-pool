---
id: post-teardown-asset-disposal
category: perf
tags: [performance,correctness,lifecycle,canvas,architecture,memory]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An asynchronous asset load outlives the view that started it. Scroll past fast
enough and the callback fires after teardown, attaching geometry to a scene
nobody renders — GPU memory no garbage collector reclaims. Close over one
cancelled flag: on unmount set it and dispose; in the callback check it and
dispose rather than attach. The same teardown cancels the frame handle,
disposes renderer, controls and decoder, and removes the canvas.

```js
let dead = false
loader.load(url, m => dead ? dispose(m) : attach(m))
return () => { dead = true; cancelAnimationFrame(h); dispose(scene); r.dispose() }
```
⚠ Disposing the scene does not reach geometries and materials — traverse and
dispose each, and treat an array-valued material as the common case.
