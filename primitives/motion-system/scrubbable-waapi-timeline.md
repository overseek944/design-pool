---
id: scrubbable-waapi-timeline
category: motion-system
tags: [motion,scroll,scrub,architecture,performance]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A scroll-scrubbed timeline needs no animation library. Build every step as a
paused Web Animation with `fill: 'both'` and a delay placing it on one shared
clock, then seek the set by writing `currentTime`. Author that clock in abstract
units — 3000–14000 reads well — so retiming one beat never means recomputing
the rest.
```js
const add = (el, kf, o) => {
  const a = el.animate(kf, { ...o, fill: 'both' }); a.pause(); anims.push(a) }
const seek = p => anims.forEach(a => { a.currentTime = clamp01(p) * total })
```
⚠ A Web Animation outranks a CSS animation on the same property, so a timeline
built late snaps already-visible content back to its first frame.
