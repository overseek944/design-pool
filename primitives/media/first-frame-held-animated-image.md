---
id: first-frame-held-animated-image
category: media
tags: [media,hover,animated-image,canvas,poster,still]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
An animated GIF or WebP in `<img>` cannot be paused, so a grid of them plays at
once. Draw the decoded image to a canvas — that captures frame one — and show
the canvas as the still; swap the animated source in on hover or focus, back to
the canvas on leave. One asset, no hand-made poster. Suits 2–6 demo tiles.

```js
const c = Object.assign(document.createElement('canvas'), {width: im.naturalWidth, height: im.naturalHeight})
c.getContext('2d').drawImage(im, 0, 0)          // frame one
```
⚠ Cross-origin sources without CORS taint the canvas. Cache-busting the URL to
restart refetches the whole file per hover — reassign the same `src` instead.
Keep the still under reduced motion.
