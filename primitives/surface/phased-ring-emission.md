---
id: phased-ring-emission
category: surface
tags: [ring, emission, pulse, loop, attention, halo]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---

A point can radiate without glow: circles over the target at `inset: 0`,
each scaling out while fading on one ease-out keyframe, so a ring slows as it
widens and dissolves rather than exits. Run 2–4 copies delayed by `period / n`
for even spacing: period 3–5s, end scale 2.5–5, start alpha .25–.5.

```css
.ring { position: absolute; inset: 0; border-radius: 50%; opacity: 0;
  border: 1px solid var(--accent); animation: emit 4s ease-out infinite }
.ring:nth-child(2) { animation-delay: calc(4s / 3) }
@keyframes emit { from { opacity: .4; scale: 1 } to { opacity: 0; scale: 4 } }
```
⚠ Keep `opacity: 0` on the base rule: under reduced motion `animation: none`
leaves every ring drawn round the target.

On a single control — a play button, a primary action — one *filled* copy of
the control's own colour works better than rings: start alpha .2–.35, end scale
1.5–2, reaching zero at 75–85% so each period ends in a rest beat. Give the
control a 1.015–1.03 breath on the same period and the halo reads as released
by the swell. Period 3–4.5s.
⚠ Hide the halo under reduced motion rather than stopping it — a stopped copy
is a dark disc behind the control.
