---
id: dual-duty-mark-animation
category: motion-system
tags: [motion,svg,identity,loading,state,reduced-motion]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 2
seen: 1
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
