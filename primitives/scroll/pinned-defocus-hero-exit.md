---
id: pinned-defocus-hero-exit
category: scroll
tags: [scroll,hero,sticky,pin,blur,exit,depth]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 2
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

Unpinned and blur-free is the cheap variant: track the section itself from
`start start` to `end start` and let the subject sink rather than rise — 40–100px
of downward drift, a 2–5% scale *gain*, opacity floored at 0.3–0.5 and reached
by 80–90% of progress. The subject lags the scroll and swells slightly, so it
reads as staying behind while the page moves on; nothing repaints.
```js
y = map(p, [0,1], [0,80]); s = map(p, [0,1], [1,1.04]); o = map(p, [0,.85], [1,.35])
```
⚠ Zero all three in the reduced-motion branch, not just the drift.
