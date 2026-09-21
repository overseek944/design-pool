---
id: visibility-probed-app-escape
category: interaction
tags: [interaction,navigation,link,mobile,correctness,fallback]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A control that hands off to a native app has no success callback: assigning a
custom scheme either opens the app or does nothing, and nothing is
indistinguishable from slow. Probe it with the page lifecycle. Attempt the
scheme, then navigate to the web fallback only if neither `visibilitychange`
nor `pagehide` fired and the document is still visible after 600–2000ms. Under
~600ms the handoff loses the race and both destinations open; over ~2s the
reader has already decided it is broken.

```js
let gone = false
const seen = () => { gone = true; off() }
addEventListener('pagehide', seen); addEventListener('visibilitychange',
  () => document.hidden && seen())
location.href = scheme
setTimeout(() => { off(); gone || document.hidden || (location.href = web) }, 1200)
```
⚠ Detach both listeners once decided — a page restored from bfcache fires them
later and a stale escape reads as success.
