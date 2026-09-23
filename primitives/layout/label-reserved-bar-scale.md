---
id: label-reserved-bar-scale
category: layout
tags: [chart,label,bar,comparison,correctness]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A bar with its value printed past its end overflows the track near the top of
the scale, and shortening only the overflowing rows bends their proportions.
Reserve the widest label's width plus a gap at the end of every track and scale
all bars against what remains: bars stay true to each other, labels stay
inside. Gap 8–16px.

```css
.track { --reserve: calc(var(--label-max) + 12px) }
.bar   { inline-size: calc((100% - var(--reserve)) * var(--v) / 100) }
.bar + .value { margin-inline-start: 12px; white-space: nowrap }
```
⚠ A reserve sized to one dataset's labels clips the next one's — measure the
set being shown, not the first set loaded.
