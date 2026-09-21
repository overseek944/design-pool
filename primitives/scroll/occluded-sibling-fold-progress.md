---
id: occluded-sibling-fold-progress
category: scroll
tags: [scroll,sticky,depth,progress,responsive]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 3
seen: 2
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
A card in a sticky stack should recede by how much of it is *covered*, not by
how far the page has scrolled. Measure the next card's top edge against this
card's own box and publish the ratio as one property; tilt, scale and shadow
contraction all read from it, so the depth cue holds whatever the heights and
gaps are. Tilt 3–8°, scale loss 2–5%, `perspective: 900–1400px` on the parent.

```js
const r = el.getBoundingClientRect(), n = el.nextElementSibling?.getBoundingClientRect()
el.style.setProperty('--fold', clamp01((TOP + r.height - (n?.top ?? Infinity)) / r.height))
```
```css
.card { transform-origin: top center;
  transform: rotateX(calc(var(--fold,0) * -5deg)) scale(calc(1 - var(--fold,0) * .025));
  box-shadow: 0 calc(16px - var(--fold,0) * 6px) calc(44px - var(--fold,0) * 12px) #18181b1c }
```
⚠ `transform: none` is not the still state — leave the stickiness and every
card pins to one offset, collapsing the section. Drop `position: sticky` and
restore the flow gap together, and `removeProperty` the scalar below the
breakpoint rather than writing 0.

Two corrections where the covered element is a sticky *section* rather than a
card. `nextElementSibling` in a component-rendered document is as likely to be a
`<script>`, `<style>` or `<template>` as the cover — walk past anything that
renders nothing or the ratio is measured against a zero-height box. And the
covered element keeps intersecting for the whole overlap, so an
`IntersectionObserver` on it never reports it as gone: publish the fully-covered
case as an attribute and let a header's ground, a pointer-reactive layer or an
idle loop read that instead of observing the element itself.
```js
let cover = el.nextElementSibling
while (cover && !cover.getClientRects().length) cover = cover.nextElementSibling
el.toggleAttribute('data-covered', fold >= 1)
```
⚠ The cover's document top is stable; the sticky element's is not. Cache
`rect.top + scrollY` of the cover at measure time and compare `scrollY` against
it — reading the pinned element's own rect per frame returns its viewport
offset, which stops moving the moment it sticks.
