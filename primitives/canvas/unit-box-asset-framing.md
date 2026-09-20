---
id: unit-box-asset-framing
category: canvas
tags: [canvas,correctness,scale,geometry,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A loaded 3D asset arrives at whatever scale and origin its exporter chose, so a
hand-placed camera frames one file and misses the next. Measure the bounding box
after load, scale by `target / longestAxis`, then subtract the scaled centre —
every asset now occupies the same volume at the origin and one camera position
composes them all. Target edge 1.5–3 units against a camera 2.5–3.5× that back.

```js
const b = new Box3().setFromObject(o), s = new Vector3(), c = new Vector3()
const k = 2 / Math.max(...b.getSize(s).toArray())
o.scale.multiplyScalar(k); o.position.sub(b.getCenter(c).multiplyScalar(k))
```
⚠ Normalising by the longest axis means a flat or elongated asset reads small
in frame. Derive camera distance from the target edge, not a fixed number.
