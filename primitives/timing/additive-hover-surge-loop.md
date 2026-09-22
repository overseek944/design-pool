---
id: additive-hover-surge-loop
category: timing
tags: [motion,timing,loop,hover,css]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Changing a running loop's `animation-duration` on hover re-derives its position
and the element jumps. Instead stack a second copy of the keyframes, `paused`,
under `animation-composition: add`. Hover flips only its play state: its offset
sums onto the base loop while running and is held when paused, so nothing snaps
back. Surge layer 1.5–3× the base period; reversed for a counter-swirl.

```css
.orb { animation: spin 4s linear infinite, spin 10s linear infinite reverse paused;
       animation-composition: add }
.cta:is(:hover, :focus-visible) .orb { animation-play-state: running }
```
⚠ Without `add` support the second layer replaces the first on hover — the loop
visibly slows or reverses. Drop both layers under reduced motion.
