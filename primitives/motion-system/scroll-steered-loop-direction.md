---
id: scroll-steered-loop-direction
category: motion-system
tags: [marquee,scroll,loop,direction,motion]
axes: {energy: 4, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [marquee-still-state]
tension: []
---
An autoplaying strip feels attached to the page when scroll steers
it. Keep one infinite loop and flip the sign of its playback rate on every scroll
direction change, so the strip runs one way going down and back going up. On a
wrapper, add a scrubbed offset of 5–15vw across the section's pass, so scrolling
also pushes the strip along.
```js
ScrollTrigger.create({ trigger: strip, start: 'top bottom', end: 'bottom top',
  onUpdate: s => loop.timeScale(s.direction === 1 ? -base : base) })
gsap.fromTo(wrap, { x: '10vw' }, { x: '-10vw', ease: 'none', scrollTrigger: { trigger: strip, scrub: true } })
```
⚠ A hard sign flip jerks. Tween the rate over 0.2–0.4s instead, and freeze both under reduced motion.
