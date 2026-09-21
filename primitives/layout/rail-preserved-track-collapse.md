---
id: rail-preserved-track-collapse
category: layout
tags: [layout,grid,responsive,rhythm,editorial]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A three-track row — marker rail, title, supporting column — usually collapses
by stacking everything, and the ordinal loses the alignment that made it a
rail. Drop only the tracks carrying prose and re-place their children into what
survives: the marker keeps a narrow track of its own at every width, so the row
still reads as a numbered list rather than as three paragraphs. Give the
narrow rail a fixed value rather than a fraction, since the fraction resolves
below the glyph long before the content stops fitting. Rail 20–40px narrow
against 0.3–0.5fr wide.

```css
.row { display: grid; grid-template-columns: .45fr 2.7fr 1.85fr; gap: 40px }
@media (width <= 50rem) {
  .row { grid-template-columns: 24px minmax(0, 1fr); gap: 20px }
  .row > h3, .row > p, .row > div { grid-column: 2 }
}
```
⚠ Every re-placed child needs its column stated. Mixing explicit placement with
auto-placement drops the unplaced ones back into the rail track.
