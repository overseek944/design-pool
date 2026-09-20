---
id: scripted-scroll-abort-band
category: scroll
tags: [scroll,correctness,accessibility,events,navigation]
axes: none
cost: 1
seen: 2
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

The band widens once abort is armed. Where the tween is a *traversal* — paging
between sections rather than nudging to an anchor — scale the duration with the
distance and let it run long: 1.4–1.8s base plus ~0.5s per viewport travelled,
capped near 3s. The reader is never trapped, because the first wheel or touch
ends it, and a long continuous move across several screens reads as travel where
a 700ms one reads as a cut.

This is also the affordance that makes a scroll-driven narrative keyboard-usable
at all — arrow keys step the same tween between sections, with the document ends
as the first and last stop. Guard the handler against typing:
```js
if (/INPUT|TEXTAREA/.test(e.target.tagName) || e.target.isContentEditable) return
```
