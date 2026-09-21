---
id: age-shaded-traversal-field
category: canvas
tags: [canvas,ambient,texture,generative,progress,grid]
axes: {energy: 2, density: 4, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A field that reads as *being worked through* rather than animating carries its
own history: stamp each cell the moment the pass reaches it and derive its ink
from age, over a window several times longer than one step. The position is
then legible as the boundary between fresh and faded and no leading edge needs
drawing — the composition is the record, not the motion. Walk the cells in
reading order, not at random, or it reads as twinkle. Step 400–900ms per cell,
decay window 10–30× that.

```js
if ((t += dt) > STEP) { t = 0; cells[order[i++]].seen = now }   // one cell per step
const age = (now - c.seen) / DECAY
ctx.globalAlpha = c.seen ? Math.max(.06, .55 - .35 * Math.min(1, age)) : .2
```
⚠ Floor the faded alpha above zero. Decaying to nothing empties the field
behind the pass and the texture disappears for most of every cycle.
