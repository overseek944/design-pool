---
id: state-scoped-duration
category: timing
tags: [motion,timing,transition,state,asymmetry]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Put `transition-duration` on the state selector rather than the base rule and
one property can enter and leave at completely different speeds. An ambient
layer that should appear the instant it becomes relevant and then leave without
anyone noticing wants roughly 80–120ms in against 500–800ms out — an order of
magnitude apart on the same `opacity`.

```css
.veil { transition: opacity ease-out }
[data-veil="shown"]  .veil { opacity: 1; transition-duration: 90ms }
[data-veil="hidden"] .veil { opacity: 0; transition-duration: .7s }
```
⚠ Invert the ratio for anything the user acted on: response fast, dismissal
faster. A slow exit on a control the user just dismissed reads as the interface
arguing, not as polish.
