---
id: phase-spread-turning-ground
category: surface
tags: [gradient, card, ambient, loop, rotate]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A painted card ground lives without looking animated when an oversized gradient child turns a full revolution behind the copy, breathing in scale at each third. Give sibling cards one shared keyframe but a negative delay per index, so each loads mid-cycle and no two ever align. Oversize 30–50%, period 8–20s, scale 0.93–1.12, offset period ÷ n.

```css
.card { position: relative; overflow: hidden }
.ground { position: absolute; inset: -40%; animation: turn 10s ease-in-out infinite;
  animation-delay: calc(var(--i) * -4s) }
@keyframes turn { 33% { rotate: 120deg; scale: 1.1 } 66% { rotate: 240deg; scale: .95 } to { rotate: 360deg } }
```
⚠ Copy sits on moving colour: add a bottom scrim; freeze under reduced motion.
