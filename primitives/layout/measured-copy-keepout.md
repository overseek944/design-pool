---
id: measured-copy-keepout
category: layout
tags: [layout,measurement,legibility,canvas]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Background art told to keep clear of the copy is usually given a fraction —
"the left 45% is text". That fraction is wrong at the first long headline, the
first translated string, the first reader at 200% zoom. Measure instead: the
block's own rectangle plus its computed sticky offset, taken as the max across
every block sharing the stage so the art does not jump between scenes, handed
to the renderer as one number. Clearance 24–72px beyond it.
```js
const keepout = Math.max(...blocks.map(b => b.getBoundingClientRect().height
  + (parseFloat(getComputedStyle(b).top) || 0)))
```
⚠ Observe the blocks, not the window — a reflow with no resize still moves the
box. Measure on resize and cache; reading geometry inside the frame loop
thrashes layout.

The number is half the job — what the art does with it decides whether the
keepout is visible. Clamping every offending element to the boundary line packs
them into a flat row along it, which draws more attention than the collision
would have. Push each one back along its own direction from the composition's
centre instead, or drop it and resample; either keeps the field's distribution
intact. Where the art is a connected structure, move the whole subgraph rather
than its members, or the links stretch into a visible fan at the edge.
