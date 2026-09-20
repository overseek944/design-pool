---
id: origin-flipped-wipe-underline
category: type
tags: [underline,link,hover,transform-origin,wipe,cheap]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A `scaleX` underline that grows from one end and shrinks back to it reads as one
gesture played backwards. Flip `transform-origin` in the frame where the bar is
zero-width: the same element retracts right, then redraws from the left — a
wipe, not a rewind. Nothing is painted at that instant, so the flip is invisible.

```css
@keyframes wipe {
  0%  { transform-origin: 100%; transform: scaleX(1) }
  33% { transform-origin: 100%; transform: scaleX(0) }
  34% { transform-origin: 0;    transform: scaleX(0) }
  to  { transform-origin: 0;    transform: scaleX(1) }
}
```
⚠ Keep a plain resting transition under it or a fast pointer strands the bar
mid-wipe. 0.5–0.7s, and the same rule must answer `:focus-visible`.
