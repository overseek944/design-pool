---
id: scroll-advanced-field-clock
category: canvas
tags: [shader,field,scroll,performance,ambient,battery]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A decorative field driven by elapsed time runs forever and then needs a gate for
every reason it should not — offscreen, buried tab, stated preference. Feed it
the scroll offset instead of a clock. The field advances only while the reader
moves, holds perfectly still otherwise, and requests no frame at all when
nothing scrolls: idle becomes the default state rather than something to detect.
Rate 0.5–2 pattern units per 100px — below that the ground reads as dead, above
it churns.

```js
let q = null
const draw = () => { q = null; if (paused || document.hidden) return
  field.setFrame(BASE + scrollY * RATE) }          // RATE 0.5–2
addEventListener('scroll', () => q ??= requestAnimationFrame(draw), { passive: true })
```
⚠ Still governed by `prefers-reduced-motion`: the reader triggers the change but
cannot predict it. A non-zero `BASE` keeps the resting frame off the pattern's
least developed state.
