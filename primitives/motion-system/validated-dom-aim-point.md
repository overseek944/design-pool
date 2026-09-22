---
id: validated-dom-aim-point
category: motion-system
tags: [cursor,demo,synthetic-pointer,correctness,dom-measure]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A scripted pointer aiming at live elements rather than stored coordinates
survives layout change — if it refuses bad targets. Classify each target
(visible, zero-area, off-viewport, clipped by a tagged ancestor scroller) and
hold unless visible. Aim at a named spot — lower third, or leading edge at
15–25% — plus 2–8px jitter seeded from a hash of the target id, so repeat
visits land consistently but never dead-centre.

```js
const r = el.getBoundingClientRect();
const clip = el.closest('[data-scroller]')?.getBoundingClientRect();
const ok = r.width * r.height > 0 && (!clip || (r.top >= clip.top && r.bottom <= clip.bottom));
```
⚠ Re-measure on scroll and resize, never cache — a stale aim point clicks empty space.
