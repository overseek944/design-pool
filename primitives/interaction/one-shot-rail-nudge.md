---
id: one-shot-rail-nudge
category: interaction
tags: [affordance,interaction,carousel,scroll,ux,detail]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A horizontal rail whose overflow is only a cropped sliver can still read as a
static row. Demonstrate it once: when the rail first enters view, translate the
track 16–32px against the scroll direction and ease back over 0.7–1.1s, then
retire the attribute on `animationend` so it never replays. Fast out (~40% of
the duration), slow return.

```css
[data-nudge=run] { animation: nudge .9s both }
@keyframes nudge { 40% { transform: translateX(-24px);
  animation-timing-function: cubic-bezier(.45,0,.55,1) } }
```
⚠ Cancel it on the first pointerdown or key press — a nudge fighting a real drag
reads as a bug. Drop it under `prefers-reduced-motion`; the edge crop remains.
