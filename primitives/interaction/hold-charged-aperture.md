---
id: hold-charged-aperture
category: interaction
tags: [interaction,pointer,press,hold,reveal,lens,progress,canvas]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A hover lens shows a patch; holding the press can earn the whole scene. Keep a
0–1 charge that fills while held and drains faster on release, ease it, and
map it to the aperture radius from a peek to past the viewport diagonal. Print
the charge beside the ring so the gesture explains itself. Fill 0.9–1.6s, drain
0.5–0.9s, radius 80–140px up to 0.55–0.7 of the diagonal, ease power 1.5–2.2.

```js
q = held ? Math.min(1, q + dt / FILL) : Math.max(0, q - dt / DRAIN)
const e = 1 - (1 - q) ** 1.8
r = R0 + (Math.hypot(w, h) * .62 - R0) * e
```
⚠ Clear the hold on window `blur` and `touchcancel` or it charges forever. A
press-and-hold has no keyboard equivalent — never put content only there.
