---
id: scrub-lag-band
category: scroll
tags: [scroll,motion,feel]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
`scrub` as a *number* adds catch-up lag in seconds and is what separates
expensive-feeling scroll from stiff. **.3–.6** is the usable band: `.3` for
tight, mechanical tracking; `.6` for weighted and cinematic. `scrub: true`
(zero lag) feels stuck to the finger; above ~1s feels broken.

Variant — the same feel without a library. Smooth in a single rAF loop with a
frame-rate-independent coefficient: `k = 1 - Math.exp(-dt / τ)` where `τ` is the
lag divided by 3, giving ~95% catch-up after that many seconds. A fixed
per-frame factor is not equivalent; it makes the lag a function of refresh rate,
so the same page feels tight at 60Hz and sluggish at 120.
```js
const k = 1 - Math.exp(-dt / (LAG * 1000 / 3))
disp += (target - disp) * k
```
