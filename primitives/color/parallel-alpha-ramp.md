---
id: parallel-alpha-ramp
category: color
tags: [color,tokens,alpha,borders,theming]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Ship two neutral ramps of equal length: one opaque, one alpha-only. Text,
solid fills and anything that must hold a contrast ratio read the opaque ramp.
Borders, hover washes and rings read the alpha one, because those land on
images, gradients and nested surfaces whose colour is not knowable when the
token is authored. One extra ramp removes the whole class of bug where a
hairline vanishes over a screenshot.

```css
--gray-200:       #eaeaea;    /* opaque: text, solid fills */
--gray-alpha-200: #00000014;  /* alpha:  borders, hovers, rings */
.card { border: 1px solid var(--gray-alpha-400) }
```
⚠ Alpha steps do not map one-to-one onto their opaque siblings — .05–.15 for
washes, .2–.5 for borders, .6+ before anything reads as text weight. Never
derive a contrast ratio from an alpha token; its backdrop is unknown by design.
