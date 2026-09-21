---
id: offcanvas-ellipse-horizon
category: surface
tags: [surface,hairline,geometry,ambient,background,depth]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 2
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

Two of them sharing one centre past the frame edge stop reading as a horizon
and start reading as an *orbit*: same centre, radii roughly 1.5–2× apart,
border alpha stepping down 0.25 → 0.15 on the outer. What flips it is a single
filled dot placed on the inner circumference — without the satellite the pair
is decoration, with it the panel carries a diagram it never has to explain.
Dot 10–16px, in a tint two steps off the ground.
```css
.panel { position: relative; overflow: hidden }
.ring  { position: absolute; inset-block-start: 50%; translate: 0 -50%;
         border-radius: 50%; border: 1px solid rgb(255 255 255 / .25) }
.ring--out { inset-inline-end: -120px; inline-size: 420px; aspect-ratio: 1 }
```
⚠ Both circles must resolve the same centre or they read as an error rather
than as concentric — derive each `inset-inline-end` as `radius − offset` from
one shared offset, never eyeball the two.
