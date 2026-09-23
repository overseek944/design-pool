---
id: pointer-held-counterfactual
category: interaction
tags: [interaction,hover,data,table,comparison,scenario,counter]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A figure can show its own alternative instead of a second chart. While the
pointer or focus rests on it, tween every cell toward an alternate dataset,
flag only the cells that differ from the captured baseline, and crossfade a
label naming which case is on screen; leaving reverses from wherever the tween
reached. The comparison happens in place, so the reader never has to line up
two tables. Tween 0.8–1.4s ease-out.

```js
card.onpointerenter = () => { card.classList.add('alt'); apply(alt, true) }
card.onpointerleave = () => { card.classList.remove('alt'); apply(base, false) }
```
⚠ Hover-only data is lost to touch and keyboard. Mirror it with a toggle button.
Under reduced motion, swap the values without tweening.
