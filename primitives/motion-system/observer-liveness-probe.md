---
id: observer-liveness-probe
category: motion-system
tags: [intersection-observer,reveal,fallback,correctness,progressive-enhancement]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A watchdog on whether the script *loaded* misses the case where it loaded,
observed, and the callback never ran — a negative `rootMargin` shrinking the
root below the element's own height, a clipping ancestor, a threshold nothing
reaches. Prove the mechanism alive instead: one shared flag, set by the first
intersection of any element and read once by a timer at 2–4s. Fired means
trust it and leave below-fold content armed; never fired means the observer is
dead, so disconnect and reveal everything.

```js
const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return
  alive = true; show(e.target); io.unobserve(e.target) }))
setTimeout(() => { if (!alive) { io.disconnect(); showAll() } }, 2500)
```
⚠ Key the timer on *any* element firing, never per element — a per-element
timeout fires on a slow reader and deletes the entrances it was meant to save.
