---
id: scroll-coupled-mat-inset
category: scroll
tags: [scroll,clip-path,radius,hero,progress]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
An opening section can be full bleed and, once the page moves, a mounted frame.
Drive `clip-path: inset()` from the first screen of scroll, raising the side
insets and the corner radius on one curve, and the section lifts off the window
edges — nothing reflows, so the headline never shifts. Take both as a fraction
of viewport width under a hard cap — near 1.2% inset and 4.5% radius, capped at
16px and 64px — or a wide display rounds into a pill. Travel 300–500px.

```js
const p = 1 - (1 - Math.min(1, scrollY / 420)) ** 2
const i = Math.min(16, .012 * innerWidth) * p, r = Math.min(64, .045 * innerWidth) * p
el.style.clipPath = `inset(0 ${i}px round ${r}px)`
```
⚠ Coalesce the passive listener into one rAF write and give the section
`contain: paint`, or a clip write per event repaints the viewport.
Under `prefers-reduced-motion` set the settled value once and never track.
