---
id: breakpoint-folded-media-rail
category: layout
tags: [layout,media,responsive,snap,carousel,rail]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A short set of views — three or four renders — can sit side by side as one
flex row on wide screens and fold into a full-bleed snap rail below a
breakpoint, from the same markup. Fold the ratio too: a wide 16/9 frame at
phone width is a sliver, so raise it to 4/3–1/1 when each item takes the
viewport. Drive the position dots with an observer rooted on the rail at
threshold .5 — no scroll maths. Gutter 0–4px.
```css
.rail { display: flex; gap: 2px } .rail > img { flex: 1; aspect-ratio: 16/9 }
@media (width < 40rem) { .rail { overflow-x: auto; scroll-snap-type: x mandatory }
  .rail > img { flex: none; inline-size: 100%; aspect-ratio: 4/3; scroll-snap-align: start } }
```
⚠ A hidden scrollbar plus full-width items leaves the dots as the only overflow
cue — show a 6–12% peek of the next item.
