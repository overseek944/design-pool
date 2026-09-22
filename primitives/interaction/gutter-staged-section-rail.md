---
id: gutter-staged-section-rail
category: interaction
tags: [navigation,indicator,progress,rail,responsive,fixed]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [aria-current-scrollspy-state]
tension: []
---
A fixed edge rail of section anchors spends only the gutter it has. Stage
its labels by viewport width: absent below the gutter threshold (~1200–1300px),
markers only with the label revealed on hover and focus in the middle band, and
inline once the gutter holds them (~1500–1600px). Current is the last
section whose top has crossed a line 35–50% down the viewport.

```css
.rail { position: fixed; inset-inline-end: 12px; top: 50%; translate: 0 -50% }
.rail .label { opacity: 0; position: absolute; inset-inline-end: 100% }
.rail a:is(:hover,:focus-visible) .label { opacity: 1 }
@media (width >= 96rem) { .rail .label { opacity: 1; position: static } }
```
⚠ A hover-only reveal hides labels from keyboard users — include `:focus-visible`.
