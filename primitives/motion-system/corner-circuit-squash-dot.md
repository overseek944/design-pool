---
id: corner-circuit-squash-dot
category: motion-system
tags: [loader,waiting,dot,keyframes,squash,pending]
axes: {energy: 3, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A pending indicator that walks rather than spins: one dot visits the four
inside corners of a small square, squashing on each arrival, so waiting reads
as patient work, not a whirl. Each quarter is travel plus an 8% hold at
`scale(.92,1.08)`. Box 12–20px, dot .25–.4rem, period 1.6–2.4s.

```css
.dot { --dot: .32rem; position: absolute; animation: lap 2s ease-in-out infinite }
@keyframes lap { 0%,to { left: calc(100% - var(--dot)); top: 0 }
  8% { left: calc(100% - var(--dot)); top: 0; scale: .92 1.08 } /* ×4 corners */ }
```
⚠ `left`/`top` relayout per frame — fine for one dot, never for many. Stop
under reduced motion.
