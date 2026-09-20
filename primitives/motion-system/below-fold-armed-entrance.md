---
id: below-fold-armed-entrance
category: motion-system
tags: [motion,correctness,progressive-enhancement,observer,reveal]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
An entrance system that hides content in CSS and un-hides it from script must be
defended against script that never arrives. Invert it: ship nothing hidden, and
at setup add the hidden class only to elements whose top already sits past the
fold — one `getBoundingClientRect` read, armed at 90–95% of viewport height.
Everything already visible renders settled, so a dead runtime costs the
entrances rather than the page, and the observer gets a smaller set to watch.

```js
els.forEach(el => {
  if (el.getBoundingClientRect().top <= innerHeight * .92) return
  el.classList.add('pre'); io.observe(el) })
```
⚠ Read positions before any layout the entrance itself causes, and in one pass —
arming element by element reflows per element. Content that starts below the
fold is still hidden, so a runtime that dies *after* setup needs a watchdog.
