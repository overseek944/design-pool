---
id: reveal-trigger-band
category: scroll
tags: [scroll,reveal,thresholds]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Entrance triggers fire at `top 85%`–`top 90%` — just inside the fold, so content
is already settled when the eye arrives. Drop to `top 55%`–`top 70%` only for
deliberate, high-emphasis reveals that should make the reader wait.
```js
{ trigger: el, start: "top 88%", once: true }
```

The band reaches to `top 80%` for ordinary section content — deep enough that a
fast scroller still meets it finished, shallow enough that a short section does
not fire before it is on screen at all. Treat 80–90% as the working range and
`once: true` as the default; a reveal that replays on scroll-back is a bug.
