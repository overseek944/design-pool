---
id: root-filter-inversion
category: color
tags: [color,dark,filter,invert,theme,effect]
axes: {energy: 2, density: 2, weight: 4, finish: 2}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`filter: invert(1) hue-rotate(180deg)` on the root flips lightness while
returning hues roughly where they started, so one declaration yields a dark
counterpart to a light design with no token work. The result is a negative
rather than a designed theme — raw, faintly wrong — which is the point when
the mode should read as a switch thrown, not a preference honoured.
Counter-invert photography and marks so they survive, and cross-fade the
filter over .3–.6s or the flip reads as a fault.

```css
html.negative { filter: invert(1) hue-rotate(180deg); transition: filter .45s }
html.negative :is(img, video) { filter: invert(1) hue-rotate(180deg) }
```
⚠ A filtered ancestor becomes the containing block for every descendant
`position: fixed`, so fixed chrome scrolls away. Never the primary dark theme.
