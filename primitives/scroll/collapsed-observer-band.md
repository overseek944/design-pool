---
id: collapsed-observer-band
category: scroll
tags: [scroll,observer,navigation,architecture,correctness]
axes: none
cost: 1
seen: 3
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

The band also answers "what is *under* my fixed chrome right now". Offset its
top by the chrome height rather than a percentage and squeeze the bottom to
−90%, and each section can declare its own ground polarity on a data attribute
— the overlay bar then recolours itself from the section it is currently
crossing instead of guessing from scroll position. Transition the colour over
200–300ms so the hand-off does not snap at the boundary.
```js
{ rootMargin: `-${navH}px 0px -90% 0px`, threshold: 0 }
// nav.classList.toggle('over-light', e.target.dataset.navbg === 'light')
```

Where a section shorter than the band is possible, drop the observer and hit-test
instead: on a throttled frame, walk the labelled sections and take the one whose
box spans a single probe line, defaulting if none does. It costs a rAF and a
handful of rect reads, and no section can slip through unnoticed because the
question is asked of every candidate rather than answered by whoever fired last.
```js
const y = bar.getBoundingClientRect().bottom + 36
let g = 'light'
for (const s of sections) { const r = s.getBoundingClientRect()
  if (r.top <= y && r.bottom > y) g = s.dataset.ground ?? 'light' }
```
