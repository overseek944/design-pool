---
id: polarity-crossing-panel-ground
category: surface
tags: [surface,gradient,contrast,color,panel,card]
axes: {energy: 1, density: 2, weight: 4, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One panel can carry both polarities of type. Ramp its own ground from paper at
the top to ink at the bottom: the label reads dark-on-light, the figure beneath
it light-on-dark, with no nested block and no second surface. Hold a flat
plateau at each end and spend the whole ramp in a band with nothing set in it.
Plateaus 25–35% and 10–20%.

```css
.panel { background: linear-gradient(180deg, var(--paper) 0 32%,
  color-mix(in oklab, var(--paper) 45%, var(--ink)) 60%,
  var(--ink) 88% 100%) }
```
⚠ The crossover band clears no contrast at all, so nothing may sit on it — and
a panel that grows with its content slides it under the copy. Anchor both
plateaus in px from their own edge once the height is content-driven.
