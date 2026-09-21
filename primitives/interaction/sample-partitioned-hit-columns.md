---
id: sample-partitioned-hit-columns
category: interaction
tags: [interaction,hover,hit-area,chart,data,css-only,accessibility]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Points on a small plot are four-pixel targets with dead space between them, so a
pointer between two addresses neither. Partition the plot: one invisible
full-height column per sample, centred on its x and as wide as the sample
spacing, each revealing its own marker and readout on `:hover`. Every horizontal
position belongs to exactly one sample — no pointer maths, no nearest-neighbour
search — and markers can rest at zero opacity, so the line stays clean until
interrogated. Column 0.8–1.2× the spacing; wider and neighbours fight for the gap.

```css
.hit { position: absolute; inset-block: 0; width: var(--w);
       left: calc(var(--x) - var(--w) / 2) }
.hit :is(.dot, .tip)        { opacity: 0; transition: opacity .15s }
.hit:hover :is(.dot, .tip)  { opacity: 1 }
```
⚠ Hover is the entire mechanism: no keyboard, no touch. Make each column a
focusable control carrying its value in its accessible name, or print the series
as a table beside the plot.
