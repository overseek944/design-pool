---
id: coordinated-group-state
category: interaction
tags: [interaction,surface,hover]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Hover the container, animate the parts. A single `group` parent lets an arrow
translate, a border brighten and a glow lift from one state change — the whole
card responds as one object instead of three independent hovers.
```html
<a class="group"> <svg class="transition-transform group-hover:translate-x-[.15vw]">
```
