---
id: sampled-point-spring-easing
category: timing
tags: [timing,easing,token,css-animation,overshoot,performance]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`linear()` takes a list of sampled outputs, so a spring solved once offline
becomes a plain easing token — overshoot included, no runtime solver, no
element handed to a library. Ship two or three named rungs rather than a
curve per component: a snappy one peaking near 1.03 and a soft one near 1.07
cover most of an interface. 10–16 samples; below eight the settle visibly
kinks, above twenty the bytes buy nothing the eye resolves.

```css
:root { --ease-spring-snappy: linear(0, .347, .768, .974, 1.027, 1.022, 1.009,
        1.002, .999, 1, 1) }
.chip { transition: transform var(--dur-base, .18s) var(--ease-spring-snappy) }
```
⚠ Values past 1 are real overshoot: fine on `transform`, but on `opacity` or a
width they clamp or overshoot the layout. It is a fixed curve, not a
simulation — an interrupted transition restarts rather than carrying velocity.
