---
id: ground-joined-tab-selection
category: interaction
tags: [tabs,state,selection,ruled,contrast,theme]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [reserved-state-border]
tension: []
---

Where a strip of tabs sits directly on the panel it switches, state the
selection twice. Subtractively: unselected cells stay transparent over a tinted
strip and the selected one takes the panel's own ground, so it reads as the
panel's front face rather than as a highlighted item in a list. Additively: its
segment of the rule shared with the panel goes from hairline to ink. The first
move carries almost no contrast on its own; the second is what survives a faint
tint. Strip tint 3–6% of the ink, selected rule 2–3× the hairline.

```css
.tabs { background: var(--ground-2) }
.tab  { background: none; border-block-end: var(--hair) solid var(--rule) }
.tab[aria-selected="true"] { background: var(--paper);
  border-block-end: calc(var(--hair) * 2) solid var(--ink) }
```
⚠ Neither move is announced and both vanish under forced colours, so
`aria-selected` is not optional. The weight change has to come out of a reserved
border or every tab shifts when selection moves.
