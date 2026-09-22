---
id: split-persistence-header-row
category: layout
tags: [layout,header,navigation,positioning,chrome]
axes: {energy: 1, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
The two halves of a header row need not share a position. Give the identity
`absolute` so it leaves with the opening section, and the actions `fixed` so
they stay available for the whole page. One row at rest, two
behaviours the moment it moves: no scroll listener, no threshold. The page's
name becomes an opening rather than a permanent frame, while the way out stays
to hand. Return the pinned half to `static` at the
width where a strip over the hero costs more than it gives.

```css
.bar { position: absolute; inset: 0 0 auto; padding: 16px 28px }
.bar__actions { position: fixed; top: 16px; right: 28px }
@media (width <= 640px) { .bar { flex-wrap: wrap; row-gap: 10px }
  .bar__actions { position: static } }
```
⚠ Both halves are out of flow, so the opening section owes the row's height as
top padding — nothing reserves it. The pinned half also sits over
whatever scrolls beneath: give it a ground once that content can be light.
