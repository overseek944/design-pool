---
id: keyframe-gated-hit-target
category: interaction
tags: [accessibility,pointer-events,visibility,entrance,correctness,keyframes]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A delayed entrance leaves its controls clickable while still invisible. Put
the discrete properties inside the keyframe: hidden and untargetable at `0%`,
visible at `.01%`, then fade. With `both` fill the element is unreachable for
the whole delay, with no timer or class toggle. Delays 0.2–0.6s, fades 0.2–0.4s.

```css
.actions { animation: in .3s ease .36s both }
@keyframes in { 0% { visibility: hidden; pointer-events: none; opacity: 0 }
  .01% { visibility: visible; pointer-events: auto; opacity: 0 } to { opacity: 1 } }
```
⚠ Under reduced motion remove the animation — a zero-length run with a delay
still holds the hidden frame.
