---
id: fling-held-loop-rate
category: interaction
tags: [marquee,drag,velocity,loop,pointer]
axes: {energy: 4, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [drag-suppressed-click-threshold, native-drag-capture-guard]
tension: []
---
A looping strip can be thrown rather than dragged. Map horizontal pointer
velocity to the loop's playback rate, clamp it to ±20–60× base, then ease back
over 0.8–1.5s to ±1 in the throw's direction. It coasts and settles
running the way it was thrown. Wrap position with a modulo so a negative rate
never runs out of track.
```js
onChangeX: e => { const v = clamp(-40, 40, e.velocityX * -.01), dir = Math.sign(v) || 1
  gsap.timeline({ onUpdate: () => loop.timeScale(rate.v) })
    .to(rate, { v, duration: .1, overwrite: true }).to(rate, { v: dir, duration: 1.2 }) }
```
⚠ A drag that swallows pointer events blocks vertical scroll on touch. Set `touch-action: pan-y` and give keyboard users pause/reverse buttons.
