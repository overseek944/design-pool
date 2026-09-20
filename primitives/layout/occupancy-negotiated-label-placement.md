---
id: occupancy-negotiated-label-placement
category: layout
tags: [layout,label,annotation,collision,diagram,correctness]
axes: none
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Annotations placed independently overlap the moment two anchors converge. Keep
one list of occupied rectangles per frame, seed it with the fixed chrome, and
walk the labels in order of how little they can move — pinned to the layout
first, free-floating last, dependants after their parent. Each label takes its
preferred box, and if that box hits an occupied one, searches the four sides of
every obstacle for the nearest clear position; finding none, it hides rather
than stacking. Then it pushes its own rectangle, so later labels see it. Gaps
12–20px, viewport margins 24px.

```js
const free = (r) => !taken.some(t => r.x < t.x+t.w && r.x+r.w > t.x &&
                                     r.y < t.y+t.h && r.y+r.h > t.y)
```
⚠ Measure once per label per frame — reading `offsetWidth` after writing a
transform thrashes layout. Hiding is the correct failure; a stack is not.
