---
id: attribute-driven-motion-hooks
category: motion-system
tags: [architecture,motion,maintainability]
axes: none
cost: 1
seen: 1
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
