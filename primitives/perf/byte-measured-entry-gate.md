---
id: byte-measured-entry-gate
category: perf
tags: [performance,loading,progress,fetch,overlay,correctness]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: [layout-release-broadcast]
tension: []
---
An overlay held while an asset loads is usually a timer pretending to be
progress. Read the real transfer: take `content-length`, then count bytes
off `body.getReader()`. The bar now means something, and a cached load finishes
at once. Bound both ends — a floor so a fast load is not a flash, a
ceiling so a stalled one still releases. Floor 300–600ms, ceiling 4–8s.
```js
const r = await fetch(url), n = +r.headers.get('content-length') || 0
let got = 0, rd = r.body.getReader(), c
while (!(c = await rd.read()).done) n && show(Math.min(1, (got += c.value.length) / n))
```
⚠ Chunked responses carry no length — fall back to indeterminate. Release in
`catch` too, or one 404 locks the page.
