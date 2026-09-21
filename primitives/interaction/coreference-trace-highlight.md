---
id: coreference-trace-highlight
category: interaction
tags: [interaction,annotation,cross-reference,highlight,accessibility,diagram]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Where one value recurs across panels — a figure in a table, the name in the log,
the id in a payload — give every mention the same reference key and let hovering
or focusing any one light all of them. At rest a dotted underline says
*traceable* without claiming a link; lit, the underline goes transparent and a
role-tinted wash lands behind the run, so the eye follows a thread instead of
re-reading three panels. Two or three roles, wash 12–20%.

```css
[data-ref] { text-decoration: underline dotted; text-underline-offset: 3px;
  transition: background .15s, text-decoration-color .15s }
[data-lit="payer"] [data-ref="payer"] { text-decoration-color: transparent;
  background: var(--wash-payer) }
```
⚠ Not a link: no pointer cursor, and drive it from `focusin` too or it exists
only for sighted mouse users. A tint tuned on a light ground dies on an inverted
panel — redeclare the role there.
