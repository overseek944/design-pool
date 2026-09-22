---
id: cycle-resolved-depth-ramp
category: timing
tags: [motion,loop,depth,keyframes,css,ambient]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [phase-offset-as-sequence]
tension: []
---
Phase-offset copies of one loop usually get their differences by hand — this
ring near and pale, that one far and dark — which has to be retuned whenever the
count changes, because each member's look is pinned to its index. Put the ramp
in the keyframe's own timeline instead: one block carries scale, opacity and
colour from far to near, and the offsets alone spread the members across it.
Four rings read as four depths because they are four points on one cycle, so the
count becomes a free parameter. Period 6–12s; innermost scale 0.1–0.2, outermost
1.2–1.5.

```css
.ring { animation: recede 8s linear infinite; animation-delay: calc(var(--i) * -2s) }
@keyframes recede {
  0%   { transform: scale(.14); opacity: 0; background: var(--c-far) }
  50%  { transform: scale(.71); opacity: 1; background: var(--c-mid) }
  100% { transform: scale(1.29); opacity: 0; background: var(--c-near) } }
```
⚠ Both ends must reach zero opacity or members pop into and out of existence at
the extremes. Colour interpolates between stops, so a hard stratum edge needs a
paired stop rather than a single one.
