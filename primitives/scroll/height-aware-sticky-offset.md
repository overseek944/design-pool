---
id: height-aware-sticky-offset
category: scroll
tags: [scroll,sticky,layout,correctness,viewport]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`top: 0` is only right while the sticky element fits the viewport. Taller than
that and its foot is never reachable: it pins by its head and the rest stays
below the fold for the whole pin. Sign the offset against the element's own
height instead — one expression pins the top of a short stage and the bottom of
a tall one. A ResizeObserver publishes the height, CSS keeps the decision.
```css
.stage { position: sticky; top: min(0px, calc(100svh - var(--stage-h, 0px))) }
```
```js
new ResizeObserver(([e]) => stack.style
  .setProperty('--stage-h', e.borderBoxSize[0].blockSize + 'px')).observe(stage)
```
⚠ `svh`, not `vh` — the difference on a phone is the toolbar, and it moves the
pin by that much. Subtract fixed chrome from the same expression or a tall stage
parks its head under the bar.
