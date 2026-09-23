---
id: scroll-seeked-vector-animation
category: media
tags: [media,scroll,scrub,vector-animation,illustration,seek]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An authored vector animation exported as JSON can be the scrubbed property instead
of a timed loop: map the element's travel through the viewport to a frame and seek
to it, never play. The illustration builds as the reader moves and holds when they
stop. Start at 65–80% of viewport height, finish once the top is 30–60% above it.

```js
const p = clamp01((innerHeight*.7 - el.getBoundingClientRect().top) / (innerHeight*1.2))
anim.goToAndStop(p * (anim.totalFrames - 1), true)   // one rAF-coalesced scroll handler
```
⚠ Reduced motion: seek to the last frame once. Keep a static poster until the
player reports both DOM and image assets ready, or the swap flashes blank.
