---
id: sheared-ghost-silhouette
category: media
tags: [depth,line-art,silhouette,projection,stroke]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Flat line work reads as volume if the outline is drawn twice. Keep the front
copy crisp at full weight; scale a second 0.80–0.88 about the shape's centre,
push it back on a fake depth, and offset it by a constant shear rather than a
perspective — x by −0.15 to −0.3 of that depth, y by +0.15 to +0.25. Draw it
thin and faint, then tie the two hulls with three to five struts. A perspective
divide at this scale only makes the back copy look like a smaller separate
object.

```js
const project = (x, y, z) => ({ x: x + z * KX, y: y + z * KY })  // KX −.22, KY .20
const d = (z - ZMIN) / (ZMAX - ZMIN)                             // alpha .2 + .74d
```
⚠ Paint far-to-near or back edges cross in front and the volume inverts. Hold
the ghost under ~25% alpha, past which it reads as a doubled line.
