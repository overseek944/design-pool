---
id: transform-hosted-scroll-wrapper
category: scroll
tags: [scroll,architecture,correctness,transform,pin]
axes: none
cost: 3
seen: 1
requires: []
conflicts: [sticky-as-cheap-pin, css-owned-pin-geometry]
completes: [reduced-motion-branch]
tension: []
---

Smoothing the whole page without a library: a spacer takes the measured
content height so the native scrollbar keeps its range, and a fixed wrapper
holding the content translates to the negated smoothed offset each frame.
The cost is containment, not performance: that transform makes the wrapper a
containing block for its descendants, so `position: sticky` and `position:
fixed` inside it stop working and every pin becomes hand arithmetic against
its section's top and slack. Re-measure on debounced resize (100–200ms),
`fonts.ready`, and each late image.

```js
spacer.style.height = content.getBoundingClientRect().height + 'px'   // native range
wrap.style.transform = `translate3d(0,${-smoothed}px,0)`              // #wrap{position:fixed}
// sticky is dead in here — pin by hand:
stage.style.transform = `translateY(${clamp(smoothed - sec.offsetTop, 0, slack)}px)`
```
⚠ Anything that must stay viewport-fixed — header, modal, skip link — lives
outside the wrapper. Focus moving offscreen still scrolls the document, so the
render lags the focused element until that event snaps the value.
