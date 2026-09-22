---
id: viewport-lerped-scalar
category: scale
tags: [scale,responsive,custom-properties,calc,tokens,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`clamp()` interpolates a *length* and stops there: a number, a ratio, an
opacity or a `color-mix()` percentage cannot be written that
way. Dividing one length by another yields a number, so one root token can
carry a unitless 0→1 position across a width band and each consumer lerps its
own endpoints against it. Declared once; no media query downstream. Band
400–700px.

```css
:root  { --t: clamp(0, calc((100vw - 760px) / 480px), 1) }
.shape { --in: calc(var(--peek) + (var(--edge) - var(--peek)) * var(--t)) }
.veil  { opacity: calc(.15 + .5 * var(--t)) }
```
⚠ All three `clamp()` arguments must be unitless — one stray `px` invalidates
the declaration and every consumer silently falls back to its initial value.
