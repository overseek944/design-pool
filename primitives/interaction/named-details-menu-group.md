---
id: named-details-menu-group
category: interaction
tags: [interaction,disclosure,menu,dropdown,light-dismiss,keyboard,progressive-enhancement,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Header dropdowns rarely need a popover library. Give sibling `<details>` one
shared `name` and the browser makes them exclusive — opening one closes the
rest, no state. Script adds only light dismiss: close on a `pointerdown`
outside, and on Escape — returning focus to the `<summary>` only if focus was
inside the panel, so dismissal never strands the keyboard.

```js
document.addEventListener('pointerdown', e => { if (d.open && !d.contains(e.target)) d.open = false })
document.addEventListener('keydown', e => { if (e.key !== 'Escape' || !d.open) return
  const inside = d.contains(document.activeElement); d.open = false
  if (inside) d.querySelector('summary').focus() })
```
⚠ `name` exclusivity is recent; older engines let several open at once. Hide
the marker with `list-style: none` and `::-webkit-details-marker`.
