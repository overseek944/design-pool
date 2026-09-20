---
id: scroll-energy-accumulator
category: motion-system
tags: [scroll,motion,shader,effect,canvas]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Scroll position says where something is; scroll *effort* should say how hard it
is being driven. Add the absolute delta to a scalar on each scroll event, cap
it, and multiply by a decay factor once per frame. It rises while the reader
works and falls back to rest on its own — no velocity estimate, no timestamps,
no easing curve, nothing to reset when the gesture stops. Feed it an amplitude,
a blur radius, a chromatic offset. Gain 0.002–0.008/px, cap 1–1.5, decay
0.90–0.96.

```js
addEventListener('scroll', () => {                       // passive
  e = Math.min(e + Math.abs(scrollY - last) * .004, 1.2); last = scrollY })
e *= .94                                                 // once per frame
uniforms.uAmp.value = base + e * range
```
⚠ Decay is per frame, not per second — the same factor settles twice as fast at
120Hz; scale by `dt × 60` where the feel must match. Without the cap one flick
pushes the effect past everything it was tuned for.
