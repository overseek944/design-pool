---
id: argued-column-as-surface
category: layout
tags: [layout,table,comparison,surface,contrast,hierarchy]
axes: {energy: 1, density: 3, weight: 4, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
In a comparison matrix the column you are arguing for should be a surface, not
a run of highlighted cells: give every cell in it — header included — the
inverted ground, and let the wrapper's radius and `overflow: hidden` clip it,
so it runs edge to edge as a panel the eye reads before any single row. Then
give the marks three tonal registers rather than two: absent at 25–35% ink,
present-elsewhere at mid, present-here at full on the panel.

```css
.matrix :is(th, td):nth-child(4) { background: var(--ink); color: var(--paper) }
.matrix { border-collapse: collapse }        /* wrapper: overflow:hidden; radius */
```
⚠ A tinted column is not a claim a screen reader can hear — the header still
has to say which product it is. `border-collapse: separate` leaves gaps that
break the panel into stripes.
