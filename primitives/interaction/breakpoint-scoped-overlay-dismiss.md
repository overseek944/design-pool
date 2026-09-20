---
id: breakpoint-scoped-overlay-dismiss
category: interaction
tags: [navigation,overlay,responsive,correctness,accessibility]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An overlay that exists only below a breakpoint — a mobile nav sheet, a drawer
replacing a sidebar — keeps its open state when the viewport crosses
above it. The media query hides the panel, but the scroll lock, the focus trap
and the aria state survive: a rotated tablet loses its scrollbar for no reason
and the sheet returns on the way back. Close it on the crossing, reading the
stylesheet's own breakpoint.
```js
const wide = matchMedia('(min-width: 768px)')
const sync = () => wide.matches && setOpen(false)
wide.addEventListener('change', sync)
```
⚠ Listen on the query, not `resize`: it fires once per crossing rather than
per pixel, and catches a zoom change that never fires `resize` at all.
