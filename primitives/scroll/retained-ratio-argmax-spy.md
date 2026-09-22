---
id: retained-ratio-argmax-spy
category: scroll
tags: [scroll,observer,navigation,architecture,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Where a section can be shorter than the reading band, "whoever fired last wins"
puts the marker on the wrong item. Keep a deliberately *wide* band, retain each
intersecting id's ratio in a map — deleting on exit so nothing stale can win —
and take the argmax on every callback: the active section is the one occupying
most of the band, not the one that crossed a line. Scan the authored id list
rather than the map, so ties resolve to document order and an empty map falls
back to the first id instead of blanking. Band 20–30% of the viewport.

```js
const r = new Map()
new IntersectionObserver(es => {
  for (const e of es) e.isIntersecting ? r.set(e.target.id, e.intersectionRatio) : r.delete(e.target.id)
  setActive(ids.find(id => r.get(id) === Math.max(...r.values())) ?? ids[0])
}, { rootMargin: "-20% 0px -55% 0px", threshold: [0, .1, .25, .5, .75, 1] })
```
⚠ Ratio is a fraction of the *element*, so a section taller than the band pins
at a low value — declare enough thresholds that the ratio is re-reported as it
changes, or the argmax is computed from one stale sample per section.
