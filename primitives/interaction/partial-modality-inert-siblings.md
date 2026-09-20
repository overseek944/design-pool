---
id: partial-modality-inert-siblings
category: interaction
tags: [interaction,dialog,accessibility,inert,focus,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Not every overlay should take the whole page. A panel hung off a header needs
that header usable — the field it opened from, the control that toggles it. Do
it by subtraction: `inert` every sibling except the ones opted in, keeping the
list so closing restores exactly those. The moment any region stays reachable,
`aria-modal` must be `false`.

```js
const held = [...panel.parentElement.children].filter(
  el => el !== panel && !el.hasAttribute('data-keep-live'))
held.forEach(el => el.inert = true)          // close: el.inert = false
```
⚠ `aria-modal="true"` over a live region tells a screen reader the boundary is
somewhere it is not. Two at once have no coherent boundary — close the first.
`inert` does not trap focus; here that is right.
