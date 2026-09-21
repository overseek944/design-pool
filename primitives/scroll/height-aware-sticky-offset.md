---
id: height-aware-sticky-offset
category: scroll
tags: [scroll,sticky,layout,correctness,viewport]
axes: none
cost: 2
seen: 2
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

The short case wants the opposite decision. An element that fits the viewport
pinned at the top sits under the chrome with the page's weight below it, when
what it is doing — a figure held beside a stepping column — asks to be read at
eye level. Centre it optically instead: half the viewport less half its own
height, clamped at the bottom of the fixed chrome and again well above the fold
so a tall window does not strand it in the middle of nothing. Upper bound
240–320px.
```css
.figure { position: sticky;
  top: clamp(var(--chrome), calc(50svh - var(--fig-h) / 2), 300px) }
```
⚠ Optical centre is not geometric centre — a panel with a footer reads low, so
bias the expression a few percent up rather than retuning the clamp ends.
