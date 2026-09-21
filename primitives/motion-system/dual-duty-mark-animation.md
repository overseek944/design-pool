---
id: dual-duty-mark-animation
category: motion-system
tags: [motion,svg,identity,loading,state,reduced-motion]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Build a mark from parts that fold about their own seams and one keyframe pair
serves two states. Played once with `both`, the parts swing in from ±90° and
settle: that is the entrance. Looped between zero and a partial extreme, the
same rotation is the indeterminate wait — unmistakably this product's, with no
spinner asset and no second definition to keep in step. `transform-box:
fill-box` plus a per-part `transform-origin` puts each seam where the drawing
says it is. Entrance 0.5–0.9s with slight overshoot; loop 1.2–2s, extreme
60–80°.

```css
.mark__half { transform-box: fill-box; transform-origin: 100% }
.mark--enter .mark__half { animation: fold .7s cubic-bezier(.4,1.4,.4,1) both }
.mark--busy  .mark__half { animation: fold-loop 1.6s ease-in-out infinite }
@keyframes fold      { from { opacity: 0; transform: rotateY(-90deg) } }
@keyframes fold-loop { 0%,100% { transform: rotateY(0) } 50% { transform: rotateY(-75deg) } }
```
⚠ Reduced motion may cancel the entrance outright; it may not cancel the wait.
Stop the rotation and substitute a still busy state, or the only sign that
anything is pending disappears.

The seam need not be a hinge. A mark whose parts are a row of bars does the
same double duty on `scaleY` — still at rest, breathing while something is
listening or working — and `transform-box: fill-box` is required there for the
same reason: without it each bar scales about the viewBox origin and the row
flies apart instead of pulsing in place. Anchor the origin to the row's centre
line so bars grow both ways. Extremes 0.4–0.6 to 1.0–1.1, period 0.8–1.6s.
```css
.bar { transform-box: fill-box; transform-origin: 50% 50%;
       animation: pulse 1.5s ease-in-out infinite }
```
⚠ `fill-box` resolves against the element's own bounding box, so a bar drawn as
a zero-width line has nothing to scale about. Give it a real stroke box or use
a rect.
