---
id: housing-tucked-hardware-keys
category: surface
tags: [surface, device, bezel, housing, mock, pseudo-element, stacking]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A handset drawn in CSS around a live screen reads as a picture until it has side
keys. Set each key as a thin bar at a negative inset, behind the housing via
`z-index: -1` in an isolated device, so only the protruding sliver shows. A key
pair is one element plus an offset `box-shadow`. Key 3–5px thick, 20–75px long;
shade across the thickness.

```css
.device { position: relative; isolation: isolate }
.key { position: absolute; z-index: -1; left: -4px; width: 4px; height: 42px;
  box-shadow: 0 54px var(--key); background: linear-gradient(90deg, var(--lo), var(--hi), var(--lo)) }
```
⚠ Without `isolation` the keys drop behind the page ground. The shadow clone
cannot take a gradient — keep it a flat mid-tone.
