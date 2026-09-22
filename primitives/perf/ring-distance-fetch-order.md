---
id: ring-distance-fetch-order
category: perf
tags: [carousel, video, lazy, fetch, order, loading]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A wrapping carousel of media should not assign every source at once, nor in DOM
order. Rank slots by circular distance from the active index — min(d, n − d) —
and release one source every 150–300ms, starting when the rail comes within
300–500px. Neighbours load first; the far side, maybe never seen, last.

```js
const ring = i => { const d = ((i - cur) % n + n) % n; return Math.min(d, n - d) }
[...Array(n).keys()].sort((a, b) => ring(a) - ring(b))
  .forEach((i, k) => timers.push(setTimeout(() => load(i), k * 250)))
```
⚠ Clear the timers on unmount; rank once, from the start index.
