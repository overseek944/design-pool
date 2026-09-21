---
id: direction-weighted-byte-window
category: perf
tags: [perf,memory,prefetch,scrub,sequence,loading,budget]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A scrubbed sequence's working set is a window, not a list. Budget it in bytes —
`w × h × 4` — never in entries, since one oversized decode costs what twenty
small ones do. Centre the window on the playhead, weighted toward travel, twice
as far ahead as behind, and let it decide both policies: fetch what is inside
it, evict what is not, so nothing is dropped a frame before it is wanted.
Ahead 6–12, behind 3–6; 20–70MB desktop, 10–25MB phone.
```js
const want = new Set([i, ...steps.flatMap(k => [i + dir * k, i - dir * k])].slice(0, fit))
for (const [k, e] of cache) if (!want.has(k) && k !== shown) { free(e); cache.delete(k) }
```
⚠ Cap concurrent fetches at 3–4 and abort any that leaves the window, or a fast
scrub queues the whole set. The displayed entry is never evictable — free it and
the surface blanks under the reader.
