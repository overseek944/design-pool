---
id: floor-anchored-squash-landing
category: motion-system
tags: [motion,entrance,keyframes,squash,stretch,impact,choreography]
axes: {energy: 4, density: 1, weight: 3, finish: 3}
cost: 1
seen: 2
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
An entrance that jumps, lands and absorbs the landing reads as a body with
mass, not a box easing in. Overshoot upward, drop to rest, squash wide, rebound
tall, settle. Pin `transform-origin: bottom` so the squash presses into the
floor. Squash 1.15–1.3 × 0.6–0.8, rebound at a third of that; 0.6–0.9s.

```css
@keyframes land { 0% { opacity: 0; transform: translateY(4rem) scale(.84) }
  28% { opacity: 1; transform: translateY(-2.4rem) } 40% { transform: none }
  46% { transform: scale(1.28,.62) } 64% { transform: scale(.92,1.12) } }
.pop { transform-origin: bottom; animation: land .82s cubic-bezier(.16,1,.3,1) both }
```
⚠ Once per view; a plain fade under reduced motion.

The same body can jump on demand — a tap on a mascot or logo — if it crouches
first. Open with an anticipation squash (≈1.15 × 0.75, 10–20% of the run)
before takeoff, stretch on the way up, hold the peak with a small ±3–5° wobble,
then land as above. 1–1.4s total. Guard against re-trigger with a class that
blocks the next tap until `animationend`, not a timeout that can drift from
the keyframe duration.
```js
el.onclick = () => el.classList.contains('hop') || el.classList.add('hop')
el.onanimationend = () => el.classList.remove('hop')
```
⚠ A bare `<img>` with a click handler is not operable — make it a `<button>`
with a label.
