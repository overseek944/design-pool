---
id: mid-flight-lane-convergence
category: motion-system
tags: [loop,ambient,custom-properties,keyframes,stagger,converge]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A stream crossing a stage reads as disorder being sorted when each item
enters on its own custom properties — height, tilt, scale — and a later stop
in the shared keyframes swaps those vars for constants. Every item funnels
into one lane mid-pass, no script, no per-item keyframes. Converge at 20–35%
of the cycle; loop 8–16s, staggered by delay; keep x proportional to percent.

```css
.item { animation: pass 14s linear var(--d) infinite backwards }
@keyframes pass {
  0%   { transform: translate(-10vw, var(--y)) rotate(var(--r)) scale(var(--s)) }
  28%  { transform: translate(28vw, var(--lane)) rotate(0) scale(.85) }
  100% { transform: translate(110vw, var(--lane)) rotate(0) scale(.85) } }
```
⚠ Decorative: `aria-hidden`; under reduced motion stop at the scattered rest.
