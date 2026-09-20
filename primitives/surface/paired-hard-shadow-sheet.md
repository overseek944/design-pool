---
id: paired-hard-shadow-sheet
category: surface
tags: [surface,depth,border,detail,editorial]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
To imply a second sheet under a panel, two zero-blur shadows do it with no extra
element: the first offset down in the *page* colour and inset by one pixel of
negative spread to open a gap, the second at the same offset in the rule colour
to draw the sheet's edge. Reads as a stack of paper rather than as elevation —
right where a card should feel filed, not floating. Offset 3–6px.

```css
.panel { border: 1px solid var(--rule);
  box-shadow: 0 4px 0 -1px var(--paper), 0 4px 0 0 var(--rule) }
```
⚠ The gap layer must match whatever is actually behind the panel — over a
banded background it paints a visible false edge.
