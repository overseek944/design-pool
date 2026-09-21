---
id: rung-stepped-continuous-slider
category: interaction
tags: [interaction,accessibility,control,slider,input,native,keyboard]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A quantity spanning orders of magnitude is meaningful at a handful of rungs —
1, 2, 4, 8, 16 — and nowhere between. Give the native range a dense linear
track so dragging stays continuous, snap the shown value to the nearest rung,
and intercept the keys so one arrow moves one rung rather than one raw unit.
The pointer glides, the keyboard lands. Raw steps 200–1000 across 8–14 rungs.

```js
const KEY = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1,
              PageUp: 4, PageDown: -4 }
const d = KEY[e.key]; if (d == null) return
e.preventDefault(); set(rungs[clamp(rungs.indexOf(value) + d)])
```
⚠ Without `preventDefault` the native step fires as well and the value moves
twice. `value` describes the raw track, so the rung reaches a screen reader
only through `aria-valuetext`.
