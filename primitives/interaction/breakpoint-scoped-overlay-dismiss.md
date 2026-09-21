---
id: breakpoint-scoped-overlay-dismiss
category: interaction
tags: [navigation,overlay,responsive,correctness,accessibility]
axes: none
cost: 1
seen: 3
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

Closing it is half the crossing. If the keyboard was inside the panel — on a
link in the sheet, on the toggle that is about to be replaced by a wide-viewport
bar — the close hides the focused element and focus falls to `<body>`, so the
next Tab restarts from the top of the document. Check for it *before* closing,
and hand focus to the control that survives the crossing.
```js
const inside = panel.contains(document.activeElement)
setOpen(false)
if (inside) nav.querySelector('.brand, [data-persistent]')?.focus()
```
⚠ The same applies in the other direction: a control that only exists above the
breakpoint strands focus on the way down. Pick the destination per direction,
not one fallback for both.
