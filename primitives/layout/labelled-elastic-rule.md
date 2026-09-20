---
id: labelled-elastic-rule
category: layout
tags: [layout,type,hairline,metadata,editorial]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A section divider carries more than separation when the rule itself is a flex
child: an index on the left, a caption on the right, and a hairline taking
whatever is left between them. Labels of any length keep the band full width
with no `calc` and nothing to measure. Numbering sections this way also gives
running prose something to point at — *see § 03* — without minting a heading
anchor for it.

```css
.band { display: flex; align-items: center; gap: .75rem }
.band > span  { flex-shrink: 0 }
.band > .rule { flex: 1; block-size: var(--hair, 1px); background: var(--line) }
```
⚠ Both labels want the smallest mono tier, 10–12px at 0.18–0.24em tracking. At
body size the band stops reading as apparatus and competes with the heading
under it.
