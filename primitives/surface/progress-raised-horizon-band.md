---
id: progress-raised-horizon-band
category: surface
tags: [surface,gradient,scroll,scrub,ground,section-transition]
axes: {energy: 2, density: 1, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A light section handed to a dark one by a fixed gradient is a printed fade — a
picture the reader travels past. Advance the stop *positions* with scroll, not
the alphas alone: five or six stops migrating up the band as their opacity
rises, and the dark ground climbs through the strip like a horizon instead of
dissolving in place. Ease the band's own progress so the arrival decelerates.
Band 30–50vh; every stop climbs 25–35% of the band's height as it opens.

```js
const e = 1 - (1 - p) ** 2.2                       // p: this band's own 0–1
const s = (a, from, to) => `rgb(${D}/${a * e}) ${from + (to - from) * e}%`
band.style.background =
  `linear-gradient(${LIGHT} ${40 - e * 36}%, ${s(.45, 68, 36)}, ${DARK})`
```
⚠ Both end colours must be the adjacent grounds exactly, or the band grows the
seam it exists to remove. It repaints per frame: `aria-hidden` decoration only,
pinned at 1 under reduced motion.
