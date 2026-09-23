---
id: named-details-menu-group
category: interaction
tags: [interaction,disclosure,menu,dropdown,light-dismiss,keyboard,progressive-enhancement,correctness]
axes: none
cost: 1
seen: 2
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

Inside a narrow-width nav drawer the same panel should stop floating. Below the
drawer breakpoint, take it out of positioning (`position: static`), remove its
plate (fill, border, radius, shadow), indent it 10–16px, and open it by
`max-height`. One node then works as a dropdown on desktop and as a nested
sub-list in the drawer.
```css
@media (width <= 920px) { .menu-panel { position: static; background: none;
  border: 0; box-shadow: none; max-height: 0; overflow: hidden; padding-left: 14px } }
```
⚠ Cap the open `max-height` just above the real content height; a generous cap
leaves a dead tail at the end of the ease.
