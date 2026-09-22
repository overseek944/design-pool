---
id: perimeter-set-display-sentence
category: layout
tags: [layout,composition,type,figure,editorial,responsive]
axes: {energy: 2, density: 2, weight: 5, finish: 3}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A display sentence need not be a block. Break it into two to four fragments,
anchor each to a corner of a stage tall enough to hold a figure, and give the
centre to the subject: the sentence frames the artwork and the reading path
becomes a diagonal across it rather than a column beside it. Every fragment must
be legible alone — the reader assembles the line out of order. Stage 90–130vh,
fragments 6–11vw.

```css
.stage { display: grid; grid-template: 1fr 1fr / 1fr 1fr; min-block-size: 100vh }
.frag:nth-child(1) { place-self: start start }
.frag:nth-child(2) { place-self: end end }
.subject { grid-area: 1 / 1 / 3 / 3; place-self: center }
```
⚠ Below about 700px there is no perimeter: collapse to one stacked block with
the figure above it. DOM order is the announced order, so the corners are a
visual arrangement only — never reorder the source to suit them.
