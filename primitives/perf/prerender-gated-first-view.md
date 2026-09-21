---
id: prerender-gated-first-view
category: perf
tags: [performance,correctness,analytics,navigation,prerender]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A page can be fully loaded, scripted and laid out with nobody having seen it —
a speculation-rules prerender runs the whole boot in a hidden tab. Anything
asserting a *view* must wait on activation rather than load: a pageview beacon,
an impression, autoplay, a dwell timer. `document.prerendering` reports the
state and `prerenderingchange` fires once when the tab surfaces; resolve both
into one promise so an ordinary load takes the same path. Start every clock
there too — a prerender can sit unshown for 1–60s, and a timer begun at boot
reports that gap as reading time.

```js
const seen = document.prerendering
  ? new Promise(r => addEventListener('prerenderingchange', r, { once: true }))
  : Promise.resolve()
seen.then(() => { t0 = performance.now(); beacon('pageview') })
```
⚠ Gate only what claims a human was present — deferring the fetch behind the
same promise defeats the prerender.
