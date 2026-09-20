---
id: pin-and-progress-stack
category: scroll
tags: [scroll,layout,narrative]
axes: {energy: 4, density: 3, weight: 4, finish: 4}
cost: 4
seen: 2
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
