---
id: metric-keyed-cell-loader
category: motion-system
tags: [motion,loader,indicator,grid,stagger,custom-properties,ambient]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
One small dot grid yields a family of pending indicators, no keyframe per
pattern. Precompute each cell's distance under several metrics — ring,
Manhattan, spiral order — as inline properties; a pattern class only picks which
one feeds `animation-delay`. Keyframe stops blend three opacity tokens, so a
muted variant rescales one set. Grid 3–5 a side,
cycle 1.2–2s, step 4–25% of it.

```css
.dot { animation: pulse var(--cycle) ease-in-out infinite;
       animation-delay: calc(var(--d) * .2 * var(--cycle)) }
.ripple .dot { --d: var(--ring) }  .sweep .dot { --d: var(--manhattan) }
@keyframes pulse { 50% { opacity: var(--peak) } }
```
⚠ Up to 25 animating nodes per instance: give unused cells `animation: none`
and stop all of them under reduced motion.
