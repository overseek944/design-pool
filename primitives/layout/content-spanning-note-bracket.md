---
id: content-spanning-note-bracket
category: layout
tags: [layout,annotation,editorial,rule,accessibility]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A note set in the margin beside a long block never says *which* rows it answers.
Bracket the range instead. One empty element pinned to the block's top, bottom
and trailing edge carries three borders and no fill, so it draws a `]` that
resizes with whatever it encloses and needs no measuring script. A hairline
`::after` leaves the bracket's own midpoint for the note, making the tie
geometric rather than implied. Arm 20–36px, leader 32–56px.

```css
.bracket { position: absolute; inset-block: 0; right: 0; width: 28px;
  border: 1px solid var(--line); border-left: 0 }
.bracket::after { content: ""; position: absolute; top: 50%; left: 100%;
  width: 40px; height: 1px; background: var(--line) }
```
⚠ Decoration, not structure — `aria-hidden` it and keep the relation in the
note's own wording. Withdraw the whole thing below the width where the gutter
exists, or the leader points off the page.
