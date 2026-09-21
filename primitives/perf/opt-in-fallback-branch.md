---
id: opt-in-fallback-branch
category: perf
tags: [perf,correctness,progressive-enhancement,feature-detection,testing]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A capability gate makes its own fallback unreachable on every browser that has
the feature, so the branch most likely to be broken is the one nobody can open.
Give it a URL flag, and have that one flag do both halves: force the fallback on
*and* switch the primary path off, so the two can never run at once. Leave it in
production — a bug report becomes a link. The same shape carries calibration
modes, a flag that dims or blanks an overlay so its registration against what it
covers can be eyeballed.

```js
const forced = new URLSearchParams(location.search).get('reveal') === 'js'
if (CSS.supports('animation-timeline', 'view()') && !forced) return
root.dataset.reveal = 'js'
```
```css
[data-reveal=js] .beat { animation: none }   /* primary path, off */
```
⚠ Default-inert, and never a flag anything else depends on — a forced fallback
in a screenshot or lighthouse run silently measures the wrong branch.
