---
id: gridline-borne-value-label
category: layout
tags: [chart,axis,label,mono,hairline,density]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A plot that reserves a left gutter for its value axis spends 40–60px of the one
dimension a card is short of. Set each label on its own gridline instead —
flush to the line's left end, resting just above it, smallest mono tier at
30–45% ink — and the plot runs full width with no axis column. The rule is the
label's baseline, so nothing aligns to anything, and rules placed by percentage
of the plot box keep the scale out of CSS.

```css
.rule { position: absolute; inset-inline: 0; top: var(--pct);
        border-block-start: 1px solid var(--line) }
.rule > b { position: absolute; left: 0; bottom: 2px; color: var(--ink-35);
  font: 10px/1 var(--mono); font-variant-numeric: tabular-nums }
```
⚠ Labels now sit over the data: reserve 10–16px of head room in the scale so
the top one never lands on a stroke, and set tabular figures or the column
shivers as values change.
