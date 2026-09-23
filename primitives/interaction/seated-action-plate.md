---
id: seated-action-plate
category: interaction
tags: [button,icon,radius,inversion,contrast,cta]
axes: {energy: 1, density: 2, weight: 4, finish: 5}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---

A filled control can carry its trailing icon on a surface of its own rather than
as a glyph on the button's face. Collapse the padding on that side to the inset
alone while the label keeps its own, so the plate seats flush against three
edges instead of floating between them; its radius is the outer radius less that
inset, or the corners visibly disagree. Inverting the plate against the fill is
what makes the action read as a mechanism. Inset 2–6px, plate square at the
control's content height, label padding 4–8× the inset.

```css
.btn { border-radius: 12px; padding: 4px 4px 4px 24px; min-height: 56px;
  display: flex; align-items: center; gap: 24px; overflow: hidden }
.btn > .plate { border-radius: 8px; aspect-ratio: 1; align-self: stretch;
  background: var(--paper); color: var(--ink) }
```
⚠ It looks like two controls and is one: never nest a second interactive element
inside, and keep the plate `pointer-events: none`. The label is no longer
optically centred — centre it in its own box.
