---
id: inert-keyframe-lifetime
category: timing
tags: [timing,lifecycle,css-animation,cleanup,accessibility]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A transient overlay — a burst, a ripple, a one-shot badge — usually unmounts on
a `setTimeout` that knows nothing about the animation it is timing, so the two
drift and an early unmount leaves the timer running. Give the wrapper a keyframe
animation that changes nothing and unmount on its `animationend`: one clock owns
both the motion and the lifetime, and it dies with the element. Set it 10–20%
past the longest child.

```css
@keyframes life { 0%, to { opacity: 1 } }   /* animates nothing; duration is the point */
.burst { animation: life .9s linear both; pointer-events: none }
```
⚠ `animationend` bubbles, so the first child to finish tears the layer down
early unless the handler checks `event.target === event.currentTarget`. A
blanket `animation: none` under reduced motion kills the timer too and the
overlay never leaves — exempt this one, it animates nothing.
