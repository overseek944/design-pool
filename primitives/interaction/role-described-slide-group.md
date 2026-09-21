---
id: role-described-slide-group
category: interaction
tags: [interaction,accessibility,carousel,keyboard,correctness]
axes: none
cost: 1
seen: 1
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
