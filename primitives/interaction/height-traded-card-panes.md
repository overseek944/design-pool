---
id: height-traded-card-panes
category: interaction
tags: [interaction,hover,card,media,layout,transition]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A card that reveals a summary on hover usually grows — shoving its row — or
lays the copy over the picture. Give the card one fixed height and let its two
panes trade it instead: the media pane drops to a half or a third, the copy
pane takes exactly what it freed. The grid never reflows, the image is never
covered, and the movement itself reads as the card turning over. Media 100% →
40–55% across 0.4–0.7s.

```css
.card { height: 26rem }                 /* the budget both panes share */
.card .shot { height: 100%; transition: height .55s var(--ease) }
.card:hover .shot, .card:focus-within .shot { height: 48% }
```
⚠ The crop changes as the pane shrinks — set `object-position` so the subject
survives losing its lower half. Pair every `:hover` rule with `:focus-within`,
and open the copy unconditionally under `pointer: coarse`.
