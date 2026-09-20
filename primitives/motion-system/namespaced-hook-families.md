---
id: namespaced-hook-families
category: motion-system
tags: [architecture,motion,scale]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Prefix hooks by section (`data-why-card`, `data-why-canvas`, `data-why-gauge`)
so one section's motion system is self-describing and removable in one grep.
Scales to dozens of choreographed sections without collision.
