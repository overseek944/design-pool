---
id: sign-triple-reference-cage
category: canvas
tags: [canvas,3d,projection,diagram,geometry,data]
axes: {energy: 2, density: 2, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A rotating point cloud gives a reader positions and no frame — no extent, no
orientation, no way to tell which axis is which. Draw the unit cube around it.
Enumerate the eight corners as the sign triples of ±1 and connect every pair
differing in exactly one coordinate: twelve edges from two loops, with no
authored geometry to fall out of step with the projection. Then label three
corners instead of drawing arrows, one per axis, each at the corner where that
axis is extreme. At 25–45% alpha the cage reads as apparatus and the points stay
the subject.

```js
const c = [0,1,2,3,4,5,6,7].map(i => [i&1?1:-1, i&2?1:-1, i&4?1:-1])
const edges = []
for (let i = 0; i < 8; i++) for (let j = i+1; j < 8; j++)
  if (((i^j) & (i^j)-1) === 0) edges.push([i,j])   // one bit differs
```
⚠ The cage means nothing unless the data is normalised into the same ±1 box —
map each dimension against its own extent first, or the points huddle in a
corner of a frame that describes nothing. Project the labels every frame; one
anchored to a screen position slides off its corner as the cage turns.
