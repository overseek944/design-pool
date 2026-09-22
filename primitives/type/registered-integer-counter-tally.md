---
id: registered-integer-counter-tally
category: type
tags: [type,counter,number,count-up,property,css-only]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A count-up needs no script once the number is a registered property. Declare it
`<integer>` so the engine interpolates it — unregistered, it flips at 50% — then
feed it to `counter-reset` and print it with `content: counter()`. One keyframe
serves every figure; target and stagger are custom properties. 0.9–2s, ease-out, stagger 60–120ms.

```css
@property --n { syntax: "<integer>"; inherits: false; initial-value: 0 }
.tally { counter-reset: n var(--n); font-variant-numeric: tabular-nums;
  animation: tally 1.4s cubic-bezier(.2,.7,.2,1) calc(var(--i,0) * 90ms) both }
.tally::after { content: counter(n) }
@keyframes tally { to { --n: var(--to, 72) } }
```
⚠ Under reduced motion set `--n: var(--to)` — cancelling the animation
leaves zero. Label the settled value; generated
content reads unreliably. Integers only.
