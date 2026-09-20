---
id: canvas-behind-dom-not-instead-of-it
category: canvas
tags: [canvas,architecture,accessibility]
axes: none
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Absolutely-positioned `inset-0` canvas with `pointer-events-none` under real DOM
content. Text stays selectable, accessible and SEO-visible; the canvas is pure
atmosphere and can fail silently on weak GPUs without taking the page with it.
```html
<canvas class="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
```

Size the backing store separately from the box: multiply by `devicePixelRatio`
**capped at 2**, then `setTransform(m,0,0,m,0,0)` so every draw call stays in CSS
pixels. Uncapped, a 3× phone allocates 9× the fill rate for atmosphere nobody
inspects; unscaled, the whole layer is soft.
```js
const m = Math.min(devicePixelRatio || 1, 2)
c.width = Math.round(w * m); c.height = Math.round(h * m)
ctx.setTransform(m, 0, 0, m, 0, 0)
```
