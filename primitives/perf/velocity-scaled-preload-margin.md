---
id: velocity-scaled-preload-margin
category: perf
tags: [perf,lazy-load,scroll,images,loading]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A fixed lazy-load margin is tuned for one scroll speed. Under a flick it is far
too small — the reader crosses it before the fetch returns and meets blank
boxes. Sample scroll velocity on a passive listener and derive the margin from
it: distance equals velocity times the load budget you expect, floored at a
resting value so slow reading still preloads a little. Costs one subtraction per
scroll event and removes the whole class of fast-scroll blanks.
```js
let y = scrollY, t = performance.now()
addEventListener('scroll', e => {                       // px/ms × ms = px
  margin = Math.min(Math.max(Math.abs(y - scrollY) / (e.timeStamp - t) * BUDGET, FLOOR), CAP)
  y = scrollY; t = e.timeStamp
}, { passive: true })                    // BUDGET 150–300ms, FLOOR 200–400px
```
⚠ `IntersectionObserver` fixes `rootMargin` at construction — rebuild it on a
coarse velocity tier, not per event. Cap at 2–3 viewports or one flick down a
long page requests every asset on it, and skip the whole thing under
`saveData`.
