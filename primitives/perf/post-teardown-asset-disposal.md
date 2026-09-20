---
id: post-teardown-asset-disposal
category: perf
tags: [performance,correctness,lifecycle,canvas,architecture,memory]
axes: none
cost: 2
seen: 2
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

Traversing at teardown only reaches what is still attached. Anything built and
swapped out — a replaced material, a render target, geometry for a pass that
was dropped — is invisible to the walk and leaks silently. Register instead:
one array and a `track()` that returns its argument, wrapped around every
construction so the registration cannot be forgotten separately from the
creation. Teardown is then one loop over things that definitely exist.
```js
const owned = [], track = o => (owned.push(o), o)
const mesh = new Mesh(track(new Geo(...)), track(new Mat(...)))
return () => { owned.forEach(o => o.dispose()); renderer.dispose() }
```
⚠ Registration order is creation order, so a parent may dispose before a child
reads it — dispose GPU resources only, never objects with teardown side effects.
