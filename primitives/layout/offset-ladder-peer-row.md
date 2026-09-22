---
id: offset-ladder-peer-row
category: layout
tags: [layout,grid,cards,rhythm,sequence,composition]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Three equal cards in a row read as three options in no order. Step each
successive one down by a fixed increment and the set reads as a progression —
first to last — without numbering anything or changing a single card. It needs
`align-items: start`, or the grid stretches every child and the offsets only
add height. Step 24–44px per position, and release the ladder at the width
where the row stacks.

```css
@media (width >= 48rem) {
  .row { display: grid; grid-template-columns: repeat(3, 1fr); align-items: start }
  .row > :nth-child(2) { margin-block-start: 2rem }
  .row > :nth-child(3) { margin-block-start: 4rem }
}
```
⚠ Visual order now disagrees with a vertical scan — keep DOM order the argument
order. The last card's offset lengthens the section; take it out of the
following margin rather than adding to it.
