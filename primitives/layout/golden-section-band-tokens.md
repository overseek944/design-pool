---
id: golden-section-band-tokens
category: layout
tags: [layout,tokens,composition,custom-properties,grid,rhythm]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Halves and thirds are where everything lands by default, and a full-bleed
composition divided that way reads as a template. Publish the two golden
sections as root percentages instead. They are complements, so one pair answers
`top`, `bottom: calc(100% - …)` and `left` alike: bands, hanging labels and
ambient accents register to the same two lines rather than each picking a
number, and their four intersections give placement points that are not the
centre. Keep a gutter-relative twin for anything inside the padded box.

```css
:root { --phi-a: 38.196%; --phi-b: 61.804%;
        --phi-a-abs: calc(var(--gutter) + (100% - 2 * var(--gutter)) * .382) }
.band--lead { top: 0;            bottom: calc(100% - var(--phi-a)) }
.band--body { top: var(--phi-a); bottom: calc(100% - var(--phi-b)) }
.accent--2  { left: var(--phi-b); top: var(--phi-a) }
```
⚠ Percentage offsets need a sized containing block — an auto-height column
resolves them against nothing. The split is a proportion, not a safe area: on a
short viewport the lead band falls under its own content.
