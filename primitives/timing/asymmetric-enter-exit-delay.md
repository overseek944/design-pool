---
id: asymmetric-enter-exit-delay
category: timing
tags: [motion,sequencing,state,transition]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A staggered group should cascade in and collapse out together. Carry the
per-item delay on the *entering* state only, zeroed on exit. Otherwise a group
that reverses spends the whole cascade again leaving, and a panel being
replaced is still dismantling itself as its successor arrives. Steps 60–250ms.
```jsx
transition: 'opacity .38s ease, transform .38s ease',
transitionDelay: on ? `${i * 120}ms` : '0ms'
```
⚠ The delay must flip in the same commit as the state, or the old delay holds
for a frame. Keep the full cascade under ~600ms; longer and a reader who has
already scrolled past sees items still at zero opacity.
