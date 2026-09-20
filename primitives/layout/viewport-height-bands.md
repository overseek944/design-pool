---
id: viewport-height-bands
category: layout
tags: [layout,responsive,media-query,ornament,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Some decisions belong to the short axis. An opening frame, a pinned figure or
marginal ornament is rarely broken by a narrow window — it is broken by a
shallow one, and width breakpoints cannot see that. Branch on
`min-height`/`max-height`: cap a tall figure so it stays whole, or withhold a
decoration until both axes have room for it. Bands: under 700px, 700–1100px,
over 1300px.
```css
.ornament { opacity: 0 }
@media (min-width: 1100px) and (min-height: 700px) { .ornament { opacity: 1 } }
@media (max-height: 780px) { .stage { padding-block: 100px } }
```
⚠ Mobile chrome resizes the viewport mid-scroll, so a height query can flip on
its own. Keep these behind a pointer-and-keyboard width.
