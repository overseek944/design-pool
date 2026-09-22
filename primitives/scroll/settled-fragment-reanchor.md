---
id: settled-fragment-reanchor
category: scroll
tags: [anchor,fragment,navigation,fonts,correctness,layout-shift]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A page opened directly on a `#fragment` scrolls once, early, and the browser
stops correcting after `load`. Anything changing height above the target
afterwards — a webfont's metric swap re-wrapping a heading — strands the reader
tens of pixels off, with nothing to report it. Wait for
`fonts.ready` and `load`, then poll until the scroll position holds still for
a few ticks: the native jump animates under `scroll-behavior: smooth`, and
correcting mid-animation makes two scrollers fight. Re-jump only if the landing is
off, and abandon the moment the reader scrolls.

```js
await Promise.all([document.fonts.ready, onLoad])
;(function tick(){ if (moved) return                  // reader took over
  if (!heldStill(3)) return setTimeout(tick, 100)
  const m = parseFloat(getComputedStyle(t).scrollMarginTop) || 0
  if (Math.abs(t.getBoundingClientRect().top - m) > 4)
    t.scrollIntoView({ behavior: 'instant', block: 'start' }) })()
```
⚠ Correct instantly — a smooth correction is a second animation over the first
and reads as drift. Bind the abandon listeners `once` and `passive` before the
await, or a reader scrolling during font load is yanked back.

Where the target lives in a lazily loaded chunk, the first failure is earlier:
the id is not in the document yet, so the browser's jump finds nothing and gives
up for good. Poll for the element once per frame, scroll the moment it mounts,
and abandon after a bound — 60–120 frames. Re-run on `hashchange`, cancelling
any poll still pending.
```js
let n = 0; const find = () => { const t = document.getElementById(decodeURIComponent(location.hash.slice(1)))
  if (t) return t.scrollIntoView({ block: 'start', behavior: 'instant' })
  if (++n < 90) raf = requestAnimationFrame(find) }
```
