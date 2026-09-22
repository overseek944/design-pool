---
id: occupancy-negotiated-label-placement
category: layout
tags: [layout,label,annotation,collision,diagram,correctness]
axes: none
cost: 4
seen: 3
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

One label on one moving anchor needs none of this. Its only collision is the
frame, so mirror the offset about the frame's midline: the label sits right of
the marker across the left half and left of it across the right half, and can
never be carried outside. One comparison per frame instead of a rectangle
sweep. Give the flip a hysteresis band of 5–10% of the width or a marker
tracking the midline oscillates.
```js
const side = cx > box.x + box.w / 2 ? -1 : 1
label.style.transform = `translate(-50%,-50%) translateX(${side * offset}px)`
```
⚠ The mirror is instantaneous — transition `translateX` or cross-fade the two
positions, because an unanimated flip on a smoothly travelling marker reads as
a glitch rather than as a decision.
