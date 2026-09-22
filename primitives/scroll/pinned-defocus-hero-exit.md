---
id: pinned-defocus-hero-exit
category: scroll
tags: [scroll,hero,sticky,pin,blur,exit,depth]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [inert-tracks-opacity]
tension: []
---

An opening section can leave by going out of focus instead of scrolling away.
Pin it in a runway 140–180vh tall and drive rise, shrink, fade and blur from one
progress value, eased with smoothstep so the exit starts and settles softly. The
next section then slides over a defocused plate rather than a hard edge.
Rise 4–8vh, scale loss 6–12%, opacity loss 60–85%, blur 3–6px.

```js
const p = clamp01(-box.top / (runway.offsetHeight - innerHeight)), e = p*p*(3-2*p)
plate.style.cssText = `transform:translateY(${-6*e}vh) scale(${1-.1*e});
  opacity:${1-.75*e}; filter:blur(${4*e}px)`
plate.inert = p > .6
```
⚠ Animating `filter: blur` repaints every frame. Keep the plate to one layer,
and skip it entirely in the reduced-motion branch.
