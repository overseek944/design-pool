---
id: pixel-ratio-change-watch
category: perf
tags: [performance,canvas,correctness,resize,media-query,dpr]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Device pixel ratio changes when a window is dragged between monitors or the
browser is zoomed, and it fires no `resize` and no `change` on any standing
query — a backing store sized for the old ratio then stays soft or oversized
for the rest of the session. Watch it with a query built from the current
value, and rebuild the query inside its own handler, because once the ratio
moves that query is false forever.

```js
let mq
const arm = () => { mq?.removeEventListener('change', onChange)
  mq = matchMedia(`(resolution: ${devicePixelRatio}dppx)`)
  mq.addEventListener('change', onChange) }
const onChange = () => { arm(); resize() }
arm()
```
⚠ Remove the old listener before re-arming or every zoom step leaves one
behind. A `ResizeObserver` does not cover this — the CSS box is unchanged.
