---
id: fused-run-highlight
category: type
tags: [type,annotation,editorial,diff,state]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Marking a run of blocks — changed lines, an annotated passage — one at a time
gives a column of chips with a seam at every break. Let each block ask about
its neighbour: a flagged block *followed* by another
drops its bottom radius and bottom margin, and the run fuses into one band
reading as a region rather than as paragraphs. Wash 8–15% alpha. Carry the same
test across a list boundary or every nested list reopens the band.

```css
.flag { background: hsl(40 80% 55% / .1); border-radius: 3px }
.flag + .flag { border-start-start-radius: 0; border-start-end-radius: 0; margin-block-start: 0 }
.flag:has(+ .flag), .flag:has(+ ul > .flag:first-child) {
  border-end-start-radius: 0; border-end-end-radius: 0; margin-block-end: 0 }
```
⚠ A wash alone does not say *what* changed — pair it with a word or a marker.
A list item cannot take the bleed as padding without dragging its marker along;
paint that ground on a negatively-inset `::after`.
