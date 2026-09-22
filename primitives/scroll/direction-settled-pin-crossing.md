---
id: direction-settled-pin-crossing
category: scroll
tags: [scroll,pin,scrub,snap,settle,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A pinned section crossing between two states has two legible rest positions and
a wide illegible middle — one thing half gone, the next half arrived, nothing
saying which way is out. Settle to an end when the reader stops inside it, and
settle in the *direction of travel*, never to the nearest end: nearest-end
hauls a reader who has just scrolled out of the first third backwards, and
fighting someone who is leaving is worse than the state they left.

```js
if (t > .02 && t < .98)                        /* strictly inside; ends are fine */
  scrollTo({ top: Math.round(scrollY + ((dir > 0 ? p1 : p0) - p) * span),
             behavior: 'smooth' })
/* dir from the last scrollY delta; fire on scrollend, 100–160ms timer fallback */
```
⚠ Abandon on the first wheel, touch or key — a settle that argues with a live
gesture is worse than none. Never arm it under reduced motion or a coarse
pointer, where the stage is not pinned.
