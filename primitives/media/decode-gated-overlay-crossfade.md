---
id: decode-gated-overlay-crossfade
category: media
tags: [media,transition,image,crossfade,correctness,swap]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
Two photographs trading places in one slot cannot dissolve by tweening both:
stacking them wants absolute positioning the flow does not have, and the
outgoing one is the element holding the box. Clone the outgoing node where it
stands, strip its `alt` and hide it from the tree, carry across the computed
`object-position`, and fade only the clone. The real image swaps underneath in
one frame. Run it solely when both are decoded — `complete && naturalWidth` —
or the fade uncovers an empty box. 180–260ms.

```js
const ghost = out.cloneNode(); ghost.alt = ''; ghost.ariaHidden = 'true'
ghost.style.objectPosition = getComputedStyle(out).objectPosition
out.after(ghost); out.hidden = true; next.hidden = false
ghost.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220 })
  .finished.finally(() => ghost.remove())
```
⚠ Ghosts stack. Cancel the running animation and sweep any leftover clone
before starting the next swap, or tabbing quickly through a set leaves a pile
of half-faded copies over the live image.
