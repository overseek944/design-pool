---
id: floor-anchored-squash-landing
category: motion-system
tags: [motion,entrance,keyframes,squash,stretch,impact,choreography]
axes: {energy: 4, density: 1, weight: 3, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
An entrance that jumps, lands and absorbs the landing reads as a body with
mass, not a box easing in. Overshoot upward, drop to rest, squash wide, rebound
tall, settle. Pin `transform-origin: bottom` so the squash presses into the
floor. Squash 1.15–1.3 × 0.6–0.8, rebound at a third of that; 0.6–0.9s.

```css
@keyframes land { 0% { opacity: 0; transform: translateY(4rem) scale(.84) }
  28% { opacity: 1; transform: translateY(-2.4rem) } 40% { transform: none }
  46% { transform: scale(1.28,.62) } 64% { transform: scale(.92,1.12) } }
.pop { transform-origin: bottom; animation: land .82s cubic-bezier(.16,1,.3,1) both }
```
⚠ Once per view; a plain fade under reduced motion.
