---
id: smooth-scroll-driving-timeline
category: scroll
tags: [scroll,motion,architecture]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: [context-scoped-cleanup]
tension: []
---
Pair a smooth-scroll library (Lenis) with the animation library's scroll plugin
by driving one from the other's RAF loop. Without this they run on separate
clocks and scrubbed animations judder against the eased scroll position.
```js
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add(t => lenis.raf(t * 1000))
gsap.ticker.lagSmoothing(0)
```
Mark any internally-scrolling panel `data-lenis-prevent` or it fights the page.
