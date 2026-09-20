---
id: attribute-driven-motion-hooks
category: motion-system
tags: [architecture,motion,maintainability]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Target animations off `data-*` attributes, never class names. Styling and motion
then evolve independently — a restyle cannot silently break a timeline — and
every animated node in the codebase is greppable.
```html
<div data-reveal-card data-reveal-index="2">
```
```js
gsap.utils.toArray('[data-reveal-card]')
```

Carry the parameters on the same attributes — `data-delay`, `data-duration`,
`data-ease` read at setup — so one generic initialiser serves every instance and
per-element tuning never becomes a per-element code path. Parse with a fallback
per key; an authoring typo should degrade to the default, not to `NaN`.

Responsive markup that renders the same hook twice — one desktop copy, one
mobile — breaks a lookup by attribute: it returns whichever is first in the DOM,
which is the hidden one half the time. Resolve to the copy that is not inside
the currently hidden variant rather than trusting document order.
```js
const q = id => all(id).find(e => !e.closest(compact() ? '[data-desk]' : '[data-mob]'))
```
