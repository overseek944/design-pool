---
id: borrowed-scene-constructors
category: canvas
tags: [canvas,3d,architecture,interop,bundle]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A wrapper that owns the renderer — a globe, a model viewer, a 3D chart — hands
you its scene but not the engine that built it. Importing that engine again to
add one object ships a second copy of it and stakes the result on two versions
agreeing. Traverse the scene for an object of the shape you need and build from
*its* constructors instead: mesh, geometry, material and texture all come off
the instance. Nothing added to the bundle, and by construction the exact
version already running.

```js
let ref; scene.traverse(o => {
  if (!ref && o.geometry?.type === 'SphereGeometry' && o.material?.map) ref = o })
if (!ref) return                                   // upgrade changed the shape
const Mesh = ref.constructor, Geo = ref.geometry.constructor
scene.add(new Mesh(new Geo(r, 48, 48), new ref.material.constructor({ color })))
```
⚠ An unversioned private contract: guard every lookup and return quietly when
the traverse finds nothing, so an upgrade loses the addition rather than
throwing. Match on geometry and material shape, never on minified class names.
