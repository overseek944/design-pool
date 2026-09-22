---
id: self-resolving-text-sweep
category: type
tags: [type,gradient,entrance,currentcolor,reveal]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A one-shot sweep through `background-clip: text` normally needs cleanup: when it
ends, something must strip the transparent fill or the heading is left painted by
a dead gradient. Build the resting colour into the gradient instead —
`currentColor` across the leading third, the chroma band mid-strip, transparent
behind — at 300% width, and run `background-position` from 100% to 0 with
`forwards`. The end frame is plain inherited text. No listener, no class removal,
no state to unwind. Band 8–25% of the strip; 0.6–1.4s.

```css
.sweep { -webkit-text-fill-color: transparent; color: #0000;
  background: linear-gradient(90deg, currentColor 0 33%, var(--c1) 40%,
    var(--c2) 50%, var(--c3) 60%, #0000 67%) 100% 0 / 300% 100%;
  background-clip: text; animation: sweep 1s ease-in-out forwards }
@keyframes sweep { to { background-position: 0 0 } }
```
⚠ Under `reduce` the animation must not simply be cancelled — `forwards` never
applies and the text sits on the transparent tail, invisible. Restore
`-webkit-text-fill-color: currentColor` and drop the image.
