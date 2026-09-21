---
id: beat-split-progress-channels
category: scroll
tags: [scroll,scrub,choreography,custom-properties,sequence,architecture]
axes: {energy: 3, density: 3, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A scrubbed multi-beat scene needs no state machine and no per-element animation.
Split the scroll scalar into named channels — a start and a span each, clamped
and smoothstepped — write them all to the scene root in one pass; every consumer
is then a `calc()`. Named for the beat rather than the child, one channel drives
unrelated elements across the subtree and the schedule reads as a table. Overlap
consecutive spans 20–40% and beats read as one movement; disjoint spans read as
a queue. Spans 0.12–0.3 of the scroll.

```js
const ch = (p, at, span) => smooth(clamp01((p - at) / span))
root.style.setProperty('--merge', ch(p, .54, .16).toFixed(4))   // one per beat
```
⚠ The rule that turns the scrub off — short viewport, reduced motion, dead
script — must neutralise every consumer too, or the channels hold 0 and the
scene paints empty.
