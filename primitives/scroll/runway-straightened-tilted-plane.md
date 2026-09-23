---
id: runway-straightened-tilted-plane
category: scroll
tags: [scroll,sticky,3d,perspective,progress,media]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
A wide product panel can sit tilted back under the headline and square up to the
reader as the page scrolls. Pin it inside a tall runway, map runway progress to
tilt and scale, and it lands flat just as the runway ends. Tilt 12–25deg on X
plus 2–4deg on Z; scale .88–.94 rising to 1–1.04; runway 1.5–2.5× the panel height.

```js
const p = clamp(-stage.getBoundingClientRect().top / (stage.offsetHeight - innerHeight * .55), 0, 1)
plane.style.transform = `rotateX(${22*(1-p)}deg) rotateZ(${-3*(1-p)}deg) scale(${.92+.1*p})`
```
⚠ An entrance keyframe with `forwards` fill overrides every inline write — clear
`animation` once it ends. Below ~1024px drop the runway and render the panel flat.
