---
id: single-read-state-fanout
category: perf
tags: [performance,scroll,listener,state,architecture,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: [state-seeded-at-listener-attach]
tension: []
---
Several components asking one continuous input the same question each bind a
listener and each wake on every event. Bind once, coalesce reads into a single
frame, and publish the *derived* value, not the input — a boolean flips a few
times down a page where the offset changes thousands. A subscriber wakes
only on the flip.

```js
let queued, last
const read = () => { queued = null; const v = scrollY > 40   // 16–64px
  if (v !== last) subs.forEach(s => s(last = v)) }
addEventListener('scroll', () => queued ??= requestAnimationFrame(read), { passive: true })
```
⚠ A subscriber registered after the first read holds nothing until the value
changes — seed it as it subscribes.
