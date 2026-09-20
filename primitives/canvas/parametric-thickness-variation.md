---
id: parametric-thickness-variation
category: canvas
tags: [shader,organic,detail]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Drive line or ribbon thickness with `uThickness + uThickVary * noise(uThickFreq * p)`
rather than a constant. Varying weight along a stroke is most of what separates a
hand-drawn-feeling shader from an obviously-generated one.
