---
id: context-keyed-idle-repertoire
category: motion-system
tags: [motion, character, idle, state, keyframes, loop]
axes: {energy: 3, density: 1, weight: 2, finish: 3}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A resident character with one idle loop is a screensaver. Give it a small
repertoire keyed to where it is — resting, listening, pondering, talking — and
select by attribute, so context swaps the loop without script. Run the shared
float on an outer wrapper and the pose on an inner one so the two compose, and
put each pose's `transform-origin` at its pivot: base for breathing, crown for
a tilt.
```css
.float { animation: float 4.5–6s ease-in-out infinite }       /* 8–14px */
[data-state=rest] .pose  { animation: breathe 4s ease-in-out infinite }
@keyframes breathe { 50% { scale: 1.02–1.03 1.035–1.05 } }       /* taller than wide */
```
⚠ Stop every loop under `reduce`; pause it off-screen.
