---
id: corner-tick-frame
category: surface
tags: [surface,border,frame,detail,currentcolor,precision]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Four short L-marks at the corners instead of a closed border: the eye completes
the rectangle, and what would have read as a box reads as registration on a
drawing. Four no-repeat `linear-gradient`s in `currentColor` on one
pseudo-element cost no extra node and inherit every colour the element already
resolves — hover, inverted section, disabled — without a second rule. Arm
6–14px, at the hairline weight.

```css
.mark::before { content: ""; position: absolute; inset: 0; pointer-events: none;
  --t: linear-gradient(currentColor, currentColor);
  background: var(--t) left top/9px 1px no-repeat, var(--t) left top/1px 9px no-repeat,
    var(--t) right bottom/9px 1px no-repeat, var(--t) right bottom/1px 9px no-repeat }
```
⚠ Decoration, not a focus ring and not a contrast boundary. Below ~6px the arms
read as rendering dirt.
