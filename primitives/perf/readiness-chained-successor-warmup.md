---
id: readiness-chained-successor-warmup
category: perf
tags: [performance,media,video,bandwidth,sequence,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A sequence of heavy sources — a clip per step of a tabset — warmed on approach
or on a timer all compete for one connection, and the one being watched loses.
Attach the source to the active member only, and let its own readiness event arm
the successor. Nothing fetches ahead of what is playing, so a slow link keeps a
shorter lead instead of starving the foreground. Warm one ahead; two only where
steps are short, 4–8s, and the assets small.

```js
const attach = v => { if (!v.src && v.dataset.src) v.src = v.dataset.src }
attach(cur)
cur.addEventListener('canplay', () => attach(after(cur)), { once: true })
```
⚠ `canplay` never fires for a source that 404s or is blocked, and the chain
stops silently there. Re-arm from the active member on every step change rather
than trusting one pass to reach the end.
