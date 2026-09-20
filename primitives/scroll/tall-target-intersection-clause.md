---
id: tall-target-intersection-clause
category: scroll
tags: [scroll,correctness,observer,reveal]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`intersectionRatio` is a fraction of the *element*, so a section taller than the
viewport can never reach a 0.35 threshold. Its observer silently never fires and
the section sits at its hidden first frame — a bug that appears only on short
windows and long content. Accept either the ratio or an absolute clause: an
intersection rectangle covering half the root. Ratio 0.2–0.5 for ordinary
blocks; the coverage clause carries anything full-bleed.
```js
const rootH = en.rootBounds ? en.rootBounds.height : innerHeight  // null cross-origin
const enough = en.intersectionRatio >= .35 ||
  (en.isIntersecting && en.intersectionRect.height >= rootH * .5)
```
⚠ Declare every ratio you test in `threshold` — an undeclared one is never evaluated.
