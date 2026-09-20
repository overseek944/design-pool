---
id: pin-and-progress-stack
category: scroll
tags: [scroll,layout,narrative]
axes: {energy: 4, density: 3, weight: 4, finish: 4}
cost: 4
seen: 7
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

Nothing has to be pinned at all. Fix the stage to the viewport, let the
document's only tall element be an empty spacer, and hold the timeline as a
table of `{id, length}` in viewport heights — progress is `scrollY / innerHeight`
against a running sum. The spacer's height *is* that sum, so lengthening one
beat is a single number and the document resizes itself. No sticky element, and
the stage never leaves the viewport to be re-entered.
```js
let at = 0
const bands = table.map(([id, len]) => { const b = { id, start: at, len }
  at += len; return b })
spacer.style.height = (at + 100) + 'vh'
```
⚠ The stage is outside the flow, so nothing in it is reachable by find-in-page
or a fragment link beyond the current beat, and the browser will restore a
scroll position the stage has not built yet.
