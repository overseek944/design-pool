---
id: front-weighted-playback-bar
category: media
tags: [media,video,progress,timing,interaction]
axes: {energy: 2, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A linear bar on a long clip crawls, and a crawling bar invites abandonment.
Draw the fill through a rational curve with head start k: it reads ~80% at the
midpoint and still lands exactly at the end. Seeking inverts the same curve.
k 0.15–0.35.

```js
const shown = p => p / (k + (1 - k) * p)         // p = time / duration
const seekTo = s => (k * s) / (1 - (1 - k) * s)  // bar → time fraction
```
⚠ The bar misstates remaining time. Keep `aria-valuenow`/`aria-valuetext` on
the true fraction, and never use it where readers budget time — lessons,
podcasts.
