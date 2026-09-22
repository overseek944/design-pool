---
id: focus-ceding-hover-ring
category: interaction
tags: [interaction,focus,hover,accessibility,outline,state,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An element has exactly one `outline`, so a hover ring and a focus ring compete
for it and source order decides: tab to a control, then move the mouse, and a
brand-coloured hover ring quietly replaces the focus indicator. Exclude it —
`:hover:not(:focus-visible)`. Declare the outline transparent at its real width
at rest so `outline-color` has something to transition, and unlike a border
there is nothing to reserve, because outline costs no layout. Offset 2–6px.

```css
.btn { outline: 2px solid transparent; outline-offset: 4px;
       transition: outline-color .2s }
.btn:hover:not(:focus-visible) { outline-color: var(--edge) }
```
⚠ The hover ring may take any colour; the focus ring owes 3:1 against both the
control and the ground exposed by the offset.
