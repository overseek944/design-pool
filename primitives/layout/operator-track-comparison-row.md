---
id: operator-track-comparison-row
category: layout
tags: [layout,comparison,diagram,table,reconciliation]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Values a reader must reconcile — what was billed, what was ordered, what
arrived — set as equal columns have to be read across before the mismatch
surfaces. Give the relation its own narrow track between each pair and print
the operator in it. The row becomes an equation, so `= ≠` registers as a shape
before a figure is read, and only the failing term takes the tint. Track
20–28px against `1fr` columns.

```css
.match  { display: grid; grid-template-columns: 1fr 22px 1fr 22px 1fr }
.op.bad { color: var(--flag) }
.col.bad{ border-color: color-mix(in srgb, var(--flag) 50%, var(--line)) }
```
⚠ The operators are content: `≠` has to reach a reader as a word, and the tint
cannot be the only thing naming the failing term. Below ~420px the five tracks
stop fitting — stack them and restate the relation in each label.
