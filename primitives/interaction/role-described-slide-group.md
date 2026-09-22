---
id: role-described-slide-group
category: interaction
tags: [interaction,accessibility,carousel,keyboard,correctness]
axes: none
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
A horizontally paging rail is a `div` of `div`s to everything but the eye: no
name, no boundary, no sense that the items are alternatives. Name it —
`role="region"` plus `aria-roledescription="carousel"` on the port, `role="group"`
plus `aria-roledescription="slide"` on each item — and bind Left/Right on the
port itself, so the rail answers the keyboard wherever focus landed inside it.
Derive each arrow's `disabled` from what is actually reachable, never from an
index, or it lies the moment the rail wraps or reflows.

```jsx
<div role="region" aria-roledescription="carousel" aria-label={name} onKeyDown={arrows}>
  <div role="group" aria-roledescription="slide" aria-label={`${i+1} of ${n}`}>
```
⚠ `aria-roledescription` replaces the spoken role, so the element must still
carry a real one and an accessible name — on its own it announces nothing.
Icon-only arrows need text, not a title attribute.

Both end flags need an epsilon. `scrollLeft === 0` and `scrollLeft ===
scrollWidth - clientWidth` are exact comparisons against a value that fractional
layout, a zoom level and a smooth-scroll animation rarely land on — so the
trailing arrow never disables and the leading one disables a pixel early.
Compare with about a pixel of slack either way, and recompute on `resize` as
well as on `scroll`: the flags go stale the moment the track reflows, and no
scroll event follows a reflow.
```js
const atStart = port.scrollLeft > 1
const atEnd   = port.scrollLeft < port.scrollWidth - port.clientWidth - 1
```
⚠ `disabled` on a `<button>` removes it from the tab order, so a keyboard reader
loses a control each time the rail reaches an end and regains it on the way
back. `aria-disabled` with a no-op handler holds the position.
