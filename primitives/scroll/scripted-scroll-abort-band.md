---
id: scripted-scroll-abort-band
category: scroll
tags: [scroll,correctness,accessibility,events,navigation]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A scripted scroll animation owns the viewport for its whole duration, so a
reader reaching for the wheel mid-flight fights it and loses — the page drags
them back every frame. Watch the four inputs that mean "I am steering now" and
abort the tween on the first one. Passive listeners on the document, torn down
when the animation resolves. 600–900ms is the usable duration band; past that
the abort matters more than the easing.

```js
const stop = ['mousedown', 'wheel', 'touchmove', 'keydown']
stop.forEach(e => document.addEventListener(e, abort, { passive: true }))
```
⚠ Abort must leave the scroll where the reader put it, not snap to the target.
Under `prefers-reduced-motion` skip the tween entirely and jump.
