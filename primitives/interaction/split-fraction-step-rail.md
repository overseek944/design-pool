---
id: split-fraction-step-rail
category: interaction
tags: [interaction,indicator,progress,stepper,scroll]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A stepper driven by a continuous value keeps the index and throws the fraction
away, so the rail is dead between steps and then jumps. Spend that fraction on
two marks in sequence — the current node completes over the leading slice, then
the connector leaving it fills over the rest. The gap becomes the readout, with no
threshold to pick. Node slice 25–40%, opening at 40–60% rather than empty so
the current step is never mistaken for a future one.

```js
const f = Math.min(1, Math.max(0, progress - i))   // 0..1 within step i
const node = f <= .3 ? .5 + (f / .3) * .5 : 1
const link = f <= .3 ? 0 : (f - .3) / .7
```
⚠ Fill by height inside an `overflow: hidden` wrapper, never by opacity — a
half-filled node must still read as the current one. Decoration only: the
position still owes `aria-current` and a spoken count.
