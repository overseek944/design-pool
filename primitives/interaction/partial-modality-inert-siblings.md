---
id: partial-modality-inert-siblings
category: interaction
tags: [interaction,dialog,accessibility,inert,focus,correctness]
axes: none
cost: 2
seen: 4
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

A dialog rendered into a portal at the end of `<body>` has almost no siblings,
so inerting one level protects nothing — the header and the main column sit
higher up. Walk from the portal node to `<body>`, inerting the siblings at each
level, and record each element's prior `inert` value on the way.
```js
for (let n = portal; n.parentElement; n = n.parentElement) {
  for (const el of n.parentElement.children)
    if (el !== n) { held.push([el, el.inert]); el.inert = true }
  if (n.parentElement === document.body) break }
```
⚠ Restore from the recorded pairs, never by setting `false` — something inert
before the overlay opened must stay inert after it closes, and a second overlay
opened over the first depends on it.
