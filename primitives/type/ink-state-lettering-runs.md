---
id: ink-state-lettering-runs
category: type
tags: [type,svg,stroke,detail,editorial,hairline]
axes: {energy: 1, density: 2, weight: 4, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One word at display scale can carry two states of ink. Set it as a single SVG
`<text>` split into runs: the leading run near-transparent in fill and drawn by
a dashed stroke, the trailing run solid. It reads as a mark being completed
rather than two graphics. `vector-effect: non-scaling-stroke` is what makes it
work — the glyphs scale with the viewBox while the outline stays a device-space
hairline, so the dash period is identical at 8rem and at 22rem.

```svg
<text font-size="24" fill="#fff">
  <tspan fill="#ffffff05" stroke="#fff" stroke-width="1"
         stroke-dasharray="16 12" vector-effect="non-scaling-stroke">first</tspan>
  <tspan>second</tspan></text>
```
⚠ Dash 10–20 units on 8–14 of gap; finer and the outline dissolves at small
render boxes. Give the whole element one `aria-label` — the split is visual, and
the runs announce as separate words without it.
