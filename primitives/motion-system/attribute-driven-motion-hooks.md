---
id: attribute-driven-motion-hooks
category: motion-system
tags: [architecture,motion,maintainability]
axes: none
cost: 1
seen: 15
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

Inside inline SVG the fallback of "just use document order" is actively wrong:
document order *is* paint order, so a set exported from a drawing tool is in
stacking order, not reading order. A cascade keyed on the query result then runs
back to front or scrambled, and only on the artwork that happened to be layered
that way. Carry the sequence index on the node and sort by it, and the animation
survives anyone re-stacking a layer.
```js
const bars = [...svg.querySelectorAll('[data-i]')]
  .sort((a, b) => a.dataset.i - b.dataset.i)
```

Read the parameters at *reveal* time rather than at setup where the hook drives
a CSS `transition` instead of a scripted timeline. A `transition-delay` written
once at setup belongs to the property forever, so the same element later
re-transitioning — a hover, a theme swap, a resize — inherits an arrival delay
that has nothing to do with it. Write the declaration in the same statement that
adds the settled class and the delay is scoped to the one arrival.
```js
const show = el => { if (el.dataset.delay) el.style.transitionDelay = `${el.dataset.delay}ms`
                     el.classList.add('is-visible') }
```
⚠ Clear it on the transition's `end` event if anything else on the element
animates the same property — an inline style outranks every rule in the sheet.
