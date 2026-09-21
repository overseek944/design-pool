---
id: margin-cancelled-hit-area
category: interaction
tags: [interaction,touch,accessibility,hit-area,layout,correctness]
axes: none
cost: 1
seen: 1
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
