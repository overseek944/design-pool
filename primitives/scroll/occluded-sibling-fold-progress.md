---
id: occluded-sibling-fold-progress
category: scroll
tags: [scroll,sticky,depth,progress,responsive]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 3
seen: 1
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
