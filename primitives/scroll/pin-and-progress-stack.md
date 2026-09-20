---
id: pin-and-progress-stack
category: scroll
tags: [scroll,layout,narrative]
axes: {energy: 4, density: 3, weight: 4, finish: 4}
cost: 4
seen: 3
requires: []
conflicts: []
completes: [context-scoped-cleanup, reduced-motion-branch]
tension: []
---
Pin a tall container and drive discrete state from a single scrub progress value
rather than one trigger per layer. The scroll distance *is* the timeline.
```js
scrollTrigger:{ trigger: el, start:"top top", end:"bottom bottom", scrub:.5,
  onUpdate: s => setStep(s.progress < .35 ? 0 : s.progress < .7 ? 1 : 2) }
```
Hysteresis on the thresholds prevents flicker at boundaries.

Thresholds are avoidable. Divide the scrolled distance by the height of *one*
scene and progress arrives in scene units — integer part is which scene,
fraction is how far into the transition — so adding a scene retunes nothing and
there are no boundary numbers to pick. Clamp the top at `count + .99` or the
last scene wraps to the first.
```js
const h = el.querySelector('section').offsetHeight
setProgress(Math.max(0, Math.min(count + .99, -el.getBoundingClientRect().top / h)))
```
