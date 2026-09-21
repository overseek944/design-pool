---
id: single-caster-shadow-budget
category: light
tags: [light,shadow,performance,scene,budget,tier]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Shadow cost is per casting light, not per scene: four lamps with `castShadow`
means four depth passes every refresh, and nobody can tell which soft pool under an
object came from which lamp. Treat casting as a budget the
scene hands out — the first light to ask gets it, later ones are lit-only — and
set the budget from the device tier. One caster reads as a key light. Map
512–1024 for the one that gets it.

```js
let left = tier === 'low' ? 1 : 3
const lamp = (...args) => { const l = new SpotLight(...args)
  if (left > 0) { l.castShadow = true; l.shadow.mapSize.set(1024, 1024); l.shadow.bias = -2e-4; left-- }
  return l }
```
⚠ Grant it deliberately, not by construction order — whichever lamp is built
first is rarely the key. Denying every caster is a different look, not a cheaper
one: without a contact shadow an object floats off its floor.
