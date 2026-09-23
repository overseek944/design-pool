---
id: structure-borne-dwell-meter
category: surface
tags: [surface,hairline,indicator,progress,divider,restraint]
axes: {energy: 2, density: 2, weight: 1, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A list already ruled between its items needs no separate dwell indicator.
Overdraw the active item's own rule with a second darker segment growing from
one end across exactly the dwell, and leave every other rule plain. The meter
costs no layout, no row of dots and no change to the vertical rhythm — it reads
as the structure doing a second job rather than as a widget arriving. Grow it
with `scaleX` from a left origin rather than `width`, which relayouts every
frame. Dwell 4–9s.

```css
.row .rule          { block-size: 1px; background: var(--line); overflow: clip }
.row[aria-current] .rule > i { display: block; block-size: 100%;
  background: var(--ink); transform-origin: left;
  animation: dwell var(--dwell) linear forwards }
@keyframes dwell { from { transform: scaleX(0) } to { transform: scaleX(1) } }
```
⚠ At 0% the active rule and an inactive one are identical, so the meter cannot
be the only thing marking the current item — carry that state on the label too.
