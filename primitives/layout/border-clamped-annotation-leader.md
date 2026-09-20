---
id: border-clamped-annotation-leader
category: layout
tags: [layout,annotation,connector,svg,diagram]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A leader line drawn from a label's centre to its subject crosses the label and
reads as a strike-through. Clamp the label end of the line to the label's own
border box on both axes — the line then meets whichever side faces the subject,
at the nearest point on it, with no per-side branching. When the subject falls
*inside* the box the line has nothing to say: drop it and let adjacency carry
the relation. Hairline stroke, dash 2–4 on 2–3, plus a 2–3px dot at the subject
end so a short line still resolves.

```js
line.setAttribute('x2', Math.min(x + w, Math.max(x, ax)))
line.setAttribute('y2', Math.min(y + h, Math.max(y, ay)))
line.style.opacity = (ax > x && ax < x+w && ay > y && ay < y+h) ? 0 : 1
```
⚠ The SVG overlay needs `pointer-events: none` or it swallows clicks on the
label it points at.
