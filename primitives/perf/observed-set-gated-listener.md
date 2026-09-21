---
id: observed-set-gated-listener
category: perf
tags: [performance,scroll,intersection-observer,scrub,listener,correctness]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: [state-seeded-at-listener-attach]
tension: []
---
A scrub that needs a value every frame cannot be served by an observer alone,
but a scroll handler bound for the page's lifetime measures rects long after
its targets have left. Let the observer own a live set of intersecting targets
and let that set's emptiness own the listener: bind on the transition to
non-empty, unbind when it drains, and iterate only the members. Ten scrubbed
blocks then cost one handler over the one or two on screen, and a page scrolled
past all of them costs nothing at all.

```js
const live = new Set()
new IntersectionObserver(es => {
  for (const e of es) e.isIntersecting ? live.add(e.target) : live.delete(e.target)
  live.size ? bind() : unbind()      // scroll {passive:true} + resize
}, { threshold: 0 }).observe(el)
```
⚠ Unbinding leaves an already-requested frame queued — cancel it on teardown or
a write lands after the owner is gone. `threshold: 0` is the right arm: a target
one pixel in view already owes a value.
