---
id: perspective-divisor-depth-cue
category: canvas
tags: [canvas,depth,projection,wireframe,stroke,3d]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
An armature projected onto a 2D context — a skeleton, a rig, an axis triad —
has no depth buffer, and sorting a hundred segments every frame buys little.
The projection already computed the answer: return the perspective divisor
beside x and y, then spend it. Stroke width, node radius and alpha all scale
by it, each with a floor so far marks thin out rather than disappear. Depth
reads from weight instead of from order. Width `max(0.5–0.8, 2–3 × w)`, alpha
`0.55 + 0.45 × min(1, w)`.

```js
const proj = p => { const w = f / (d + p.z)
  return { x: cx + p.x * w * s, y: cy - p.y * w * s, w } }
ctx.lineWidth = Math.max(.6, 2.4 * a.w)
ctx.globalAlpha = .55 + .45 * Math.min(1, a.w)
```
⚠ Strokes still paint in draw order, so two limbs crossing show the wrong one
in front. Fine for an open armature, wrong for anything that reads as solid.

An orthographic projection has no divisor to spend — parallel lines stay
parallel and a far point is drawn at the same scale as a near one — so the cue
has to be built from the rotated depth coordinate itself. Normalise it against
the scene's own extent rather than a fixed range, then drive radius and alpha
from that scalar exactly as the perspective form drives width. Nothing recedes,
which is the point: a scatter read for *position* must not have its far half
made smaller by the projection, only dimmer. Radius `r × (1 + 0.6–1.2 × d)`,
alpha `0.3–0.4 + 0.5–0.6 × d`.
```js
const d = Math.min(1, Math.max(0, (p.depth + half) / (2 * half)))
ctx.globalAlpha = .35 + .55 * d
```
⚠ Take `half` from the frame's own extent or the whole cloud flattens to one
alpha as it turns. Without a drawn reference frame the cue is the only depth
signal there is, and it cannot say how far.
