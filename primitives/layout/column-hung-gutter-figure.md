---
id: column-hung-gutter-figure
category: layout
tags: [layout,gutter,ornament,figure,measure,decoration]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Decorative figures beside a reading column belong to the column, not the
viewport. Centre an empty rail at the measure's max-width and hang each figure
off its edge with `right: 100%` pulled back by a negative margin. It keeps a
fixed relation to the text at every width. On narrow screens, push it further
out instead of hiding it, so it bleeds off the edge. Overlap 2–8ch, narrow
extra 16–28ch.

```css
.rail { position: absolute; inset-block: 0; left: 50%; translate: -50%; width: min(100%, 48rem) }
.fig-l { position: absolute; right: 100%; margin-right: calc(-1 * (var(--off) + var(--off-m, 0ch))) }
```
⚠ Use `aria-hidden` and `overflow: clip` on the section, or the bleed widens the page.
