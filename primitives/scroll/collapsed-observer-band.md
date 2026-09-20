---
id: collapsed-observer-band
category: scroll
tags: [scroll,observer,navigation,architecture,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Squeeze an observer's root to a single horizontal line and "which section am I
in" answers itself. Top and bottom root margins summing to −100% leave a
zero-height band; at `threshold: 0` only one section can intersect it, so the
latest intersecting entry *is* the active one — no scroll listener, no
measuring, no nearest-distance tiebreak. Move the band to choose where the
hand-off reads: 20–35% from the top for a table of contents, ~50% for a reading
indicator.
```js
new IntersectionObserver(
  es => es.forEach(e => e.isIntersecting && setActive(e.target.id)),
  { rootMargin: "-20% 0px -80% 0px", threshold: 0 })
```
⚠ A section shorter than the band can pass through without intersecting, and
the highlight sticks on the previous one.
