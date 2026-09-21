---
id: coreference-trace-highlight
category: interaction
tags: [interaction,annotation,cross-reference,highlight,accessibility,diagram]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 2
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

Where there is no reader to hover — an unattended figure, a hero explainer —
the same reference key takes a loop clock instead of a pointer. Every mention
of one key shares an `animation-name` and a delay, so the thread lights itself
across the panels in sequence and the relationship is stated rather than
offered. Keys 3–6, each holding lit for most of its own beat.
```css
[data-ref="payer"] { animation: lit var(--seq) linear var(--beat) infinite backwards }
```
⚠ A clock-lit thread must still be findable at rest and on focus. If the marks
are invisible between beats the relationship exists only for a reader who
happened to be looking, and keyboard users never get it at all.
