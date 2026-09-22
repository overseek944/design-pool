---
id: copy-deferred-ground-inversion
category: scroll
tags: [scroll,pin,scrub,ground,inversion,contrast,color]
axes: {energy: 2, density: 1, weight: 4, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A pinned section can invert its own ground under the reader — mid-grey to
near-black — as a scene change with no cut. The ground crosses a band where no
ink reads, so keep the copy at opacity 0 until it has, then let it enter
carrying its destination ink. Ground travels over the first 30–40% of the pin;
copy starts 10–25% in, staggered; pin 1.3–1.6 viewports.

```js
tl.to(stage, { backgroundColor: DARK, duration: .35, ease: 'none' }, 0)
  .fromTo(head, { opacity: 0, y: 40 }, { opacity: 1, y: 0, color: LIGHT }, .11)
```
⚠ Reduced motion: render the end state, unpinned. Refresh the pin on
debounced resize or the scrub drifts off its section.
