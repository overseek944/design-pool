---
id: canvas-behind-dom-not-instead-of-it
category: canvas
tags: [canvas,architecture,accessibility]
axes: none
cost: 2
seen: 1
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
