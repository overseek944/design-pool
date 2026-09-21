---
id: phase-matched-gradient-drift
category: surface
tags: [surface,gradient,loop,ambient,background]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
An oversized gradient translated behind its box gives a ground ambient motion
with no canvas and no script — but only if the loop closes. Make the stop list
repeat across the element, the same hues twice over a 200% width, and translate
by exactly one repeat: the frame at 100% is then identical to the frame at 0%
and there is no seam to see. Where the stops do not divide evenly, alternate the
direction instead — a ping-pong never wraps, so it never has a seam to hide.
```css
.ground::after { position: absolute; inset: 0 auto 0 0; width: 200%;
  background: linear-gradient(106deg, var(--a) 0, var(--b) 50%, var(--a) 100%);
  animation: drift 20s linear infinite }                  /* 12–40s */
@keyframes drift { to { transform: translateX(-50%) } }
```
⚠ Give the parent `overflow: clip` or the page gains a horizontal scrollbar.
Perpetual ambient motion needs a reduced-motion branch — drop to the 0% frame.
