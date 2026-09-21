---
id: projected-label-visibility-budget
category: canvas
tags: [webgl,label,projection,density,correctness]
axes: none
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Projecting a 3D point to screen coordinates gives a position for every anchor,
including the ones behind the camera — the maths happily returns a mirrored
point in front of the viewer. A DOM label layer over a scene needs its own
visibility policy, in three parts: drop anything behind the near plane, drop
anything outside the viewport plus a 100–200px margin, then cap what is left by
distance *rank* rather than by a distance threshold. Sort the candidates and
take the nth nearest as the cutoff and the layer holds a constant label count
whether the camera is in a crowd or an empty field.

```js
const cut = dists.sort((a,b) => a-b)[Math.min(N-1, dists.length-1)]
el.style.opacity = (behind || d > cut) ? 0 : fade(d)
```
⚠ N between 8 and 14; past that the labels win and the scene disappears.
