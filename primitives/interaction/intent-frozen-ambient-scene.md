---
id: intent-frozen-ambient-scene
category: interaction
tags: [interaction,motion,hover,focus,correctness,has]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An ambient scene carrying one real control makes that control a moving target,
and a moving target is harder to hit the faster it drifts. Freeze the scene
from the parent when the control takes hover or focus: `:has()` reads the state
upward, so one rule stops every loop in the subtree with no flag and no script.
Intent to click is the pause signal — the moment the motion stopped being
decorative.

```css
.stage:has(.cta:is(:hover, :focus-visible)) * { animation-play-state: paused }
```
⚠ Include `:focus-visible` or the freeze never fires for keyboard users, who
need it most. Scope the universal selector to the scene, never the page.
