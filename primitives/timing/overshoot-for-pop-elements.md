---
id: overshoot-for-pop-elements
category: timing
tags: [motion,easing,delight]
axes: {energy: 4, density: 2, weight: 2, finish: 3}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
`back.out(n)` on small elements that should feel physical — badges, counters,
icons, pills. Tune `n` to size: `1.4–1.6` for large or text-bearing elements,
`2.0–2.8` for small graphic ones. Never on anything holding body copy; the
overshoot makes text unreadable mid-flight.
```js
{ duration: .45, ease: "back.out(2.2)" }
```
