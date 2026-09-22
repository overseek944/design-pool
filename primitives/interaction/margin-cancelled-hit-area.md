---
id: margin-cancelled-hit-area
category: interaction
tags: [interaction,touch,accessibility,hit-area,layout,correctness]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A link in a dense bar cannot reach the 44px touch floor by growing —
`min-height` pushes its neighbours apart and re-rags the row. Add the padding
and take it straight back as negative margin: the hit box grows, the painted box
and the layout do not. Ship it unconditionally rather than behind
`pointer: coarse`, which misreads hybrid devices and costs a mouse nothing. Pad
(44 − line-box) / 2 vertically, 8–14px horizontally.

```css
.navlink { margin: -14px -11px; padding: 14px 11px }
```
⚠ Adjacent targets overlap once the gap is under twice the horizontal padding,
and the later sibling wins. Keep hover and focus paint on an inner span, or it
grows with the target.

An absolutely-positioned target — a close ×, a corner dismiss — has no flow to
cancel against, so the negative margin has nothing to do. Grow the box to the
floor and shed exactly the growth from its offsets instead: the hit area gains
the difference and the glyph stays on the same optical spot, which is what a
reader tracks across breakpoints. The box is out of flow, so whatever it sits
over has to reserve its width by hand or a long title runs under it.
```css
.close { position: absolute; top: 10px; right: 10px; width: 34px; height: 34px }
@media (pointer: coarse) {
  .close { top: 5px; right: 5px; width: 44px; height: 44px }
  .head  { padding-inline-end: 42px } }
```
⚠ Shed the growth from both offsets or the target drifts diagonally. Centre the
glyph with `display: grid; place-items: center` rather than padding — padding
sized for one box is wrong for the other.
