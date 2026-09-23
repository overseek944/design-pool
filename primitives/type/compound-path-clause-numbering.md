---
id: compound-path-clause-numbering
category: type
tags: [type,list,counter,numbering,document,detail]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Nested clauses numbered by path — 1, 1.2, 1.2.3 — without authoring a single
digit. `counters()` joins every enclosing instance of one counter, so each list
level resets it and the full path falls out. Swap the style per level for a
deeper sub-clause — `(a)` then `i.` — and set the marker as a table cell so
wrapped lines hang flush under the text, the gutter widening as the path grows.
Marker gutter 1.5–3em, or a fixed min-width when sibling text must align.

```css
.clauses ol { counter-reset: c; list-style: none }
.clauses li { display: table; counter-increment: c }
.clauses li::before { display: table-cell; content: counters(c, ".") "."; padding-right: 1em }
.clauses ol[type=a] li::before { content: "(" counter(c, lower-alpha) ")" }
```
⚠ Generated numbers are unreliably announced and never copied. If a clause is
cited elsewhere, carry its number in real text.
