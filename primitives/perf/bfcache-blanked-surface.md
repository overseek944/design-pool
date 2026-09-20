---
id: bfcache-blanked-surface
category: perf
tags: [performance,canvas,lifecycle,correctness,restoration,flicker]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A page restored from the back/forward cache repaints whatever a live surface
last drew before it was frozen — a stale frame, often mid-animation, sometimes
behind a context the browser has since dropped. Blank it on the way out with the
transition suppressed so nothing is captured, and fade it back only when
`pageshow` reports a restore. Fade 150–300ms, the same curve as first paint.

```js
const out = () => { c.style.transition = 'none'; c.style.opacity = '0' }
addEventListener('pagehide', out)
addEventListener('pageshow', e => { if (!e.persisted) return
  c.style.transition = 'opacity 220ms ease-out'; c.style.opacity = '1' })
```
⚠ Listening on `unload` disqualifies the page from the cache outright. A loop
gated on `visibilitychange` alone still restores its last painted frame.
