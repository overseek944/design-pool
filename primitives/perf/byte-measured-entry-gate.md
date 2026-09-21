---
id: byte-measured-entry-gate
category: perf
tags: [performance,loading,progress,fetch,overlay,correctness]
axes: none
cost: 3
seen: 2
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

Where the assets are images and webfonts rather than a fetch you own there is no
reader to count, but the platform already publishes readiness. Race
`document.fonts.ready`, the `load` event and a `decode()` per non-lazy image
against the same ceiling. Progress is then indeterminate, which is honest, and
the gate releases on the real thing instead of a guess. Excluding
`loading="lazy"` images is what stops a long page holding the gate on artwork
nobody has scrolled to.
```js
const ready = Promise.all([document.fonts.ready, onLoad(), ...[...document.images]
  .filter(i => i.loading !== 'lazy').map(i => i.decode().catch(() => {}))])
await Promise.race([ready, new Promise(r => setTimeout(r, CEILING))])   // 4–8s
```
⚠ `decode()` rejects on a broken image — catch per image or one 404 holds the
page to the ceiling. Remove the overlay node and clear `aria-busy`; a
`role="status"` element left in the tree keeps announcing.
