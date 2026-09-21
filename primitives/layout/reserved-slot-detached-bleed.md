---
id: reserved-slot-detached-bleed
category: layout
tags: [layout,bleed,cls,decorative,responsive]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
The rectangle a decorative field *occupies* and the rectangle it *paints* need
not be the same one. Reserve the first with an empty `aspect-ratio` spacer in
normal flow, then paint in an absolutely positioned sibling inflated far past
it and dissolved at its edges — the composition keeps its rhythm, the effect
keeps its scale, and nothing shifts on load. The inflation is a breakpoint
decision, not a constant: a narrow viewport needs a much larger overshoot to
hold the same apparent density. Vertical inset −20% to −40% wide, −100% to
−200% narrow.

```css
.slot  { aspect-ratio: 455/256 }
.bleed { position: absolute; inset-inline: 0; inset-block: -150%;
         pointer-events: none }
@media (min-width: 768px) { .bleed { inset-block: -30% } }
```
⚠ The painted layer escapes its section — give an ancestor `overflow: clip` or
it lands over neighbouring copy, and keep it out of the a11y tree.

The reservation does not need a node. Put the decoration and the copy in the
same grid cell, then give the container an invisible `::before` with the
decoration's `aspect-ratio` and width in that cell — the cell is sized by the
larger of the two, the copy sets its own column, and the absolutely positioned
art paints over the space its own footprint reserved. One rule replaces a spacer
element that every consumer had to remember to include.
```css
.row::before { content: ""; grid-area: 1/1; justify-self: end;
               width: 47%; aspect-ratio: 771/716; visibility: hidden }
.row > .copy { grid-area: 1/1; max-width: 54%; z-index: 1 }
```
⚠ `visibility: hidden` and not `opacity: 0` — the latter keeps the box in the
a11y tree and hit-testable over the copy beside it.
