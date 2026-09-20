---
id: offcanvas-ellipse-horizon
category: surface
tags: [surface,hairline,geometry,ambient,background,depth]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A curve whose radius exceeds the viewport cannot be drawn inside the box. Give a
hairline-bordered element `border-radius: 50%`, size it well past the frame and
push most of it off-canvas: the visible sliver is a shallow arc no in-box shape
produces — a horizon rather than a circle. A second, flatter copy behind it
reads as ground receding. Box 130–220% of the frame, border alpha .10–.20, a
white bloom above the stroke to light it.

```css
.horizon { position: absolute; top: 42%; left: -53%; width: 130%; height: 110%;
  border: 1px solid rgb(184 199 230 / .17); border-radius: 50%; rotate: -28deg;
  box-shadow: 0 -22px 45px #ffffff30, 0 1px #ffffffa1 }
```
⚠ The visible arc follows the box's *aspect*, not its scale — re-proportion per
breakpoint, wider and flatter when narrow, or a phone gets a straight line.
