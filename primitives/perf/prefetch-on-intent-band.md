---
id: prefetch-on-intent-band
category: perf
tags: [performance,navigation,prefetch,observer,architecture]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Prefetching is two policies, not one. *Intent* arms on `mouseenter`, `focus` and
`touchstart` and commits only after a short delay, so a pointer crossing a nav
never fetches it; cancel on leave and blur. *Viewport* uses an observer at a
high threshold for the one or two links a reader is almost certain to take.
Default everything to intent.

```js
const io = new IntersectionObserver(es =>
  es.forEach(e => e.isIntersecting && prefetch(e.target)), { threshold: .5 })
onEnter = () => (t = setTimeout(prefetch, 100))   // 80–150ms
onLeave = () => clearTimeout(t)
```
⚠ Viewport prefetch on a long page eventually fetches every route on it — the
threshold limits *when*, not *how many*. Skip both under `navigator.connection.saveData`.

Bound the cache: a 30–90s TTL and a cap near 8 entries, evicted oldest-first.
Validate before storing — a redirect or a non-HTML content type means the URL
went somewhere else, and caching it hands the router the wrong document.
