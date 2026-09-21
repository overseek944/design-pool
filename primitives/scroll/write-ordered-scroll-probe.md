---
id: write-ordered-scroll-probe
category: scroll
tags: [scroll,correctness,measurement,timing]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A probe that reads rects to decide state — which ground is under the chrome,
which section is active — is a frame stale whenever the sections it measures
are themselves moved by the scroll: the scroll event fires before that frame's
scrub tween writes its transform. An eased or momentum scroll also lands its
last transforms after the final scroll event, so the state sticks. Read on the
animation clock, after the writes.

```js
gsap.ticker.add(probe)     // not addEventListener('scroll', probe)
```
⚠ That clock never stops. Hoist the node list out of the callback, return early
when the result is unchanged, and unsubscribe while no scroll-driven section is
on screen.
