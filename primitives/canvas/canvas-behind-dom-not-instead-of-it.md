---
id: canvas-behind-dom-not-instead-of-it
category: canvas
tags: [canvas,architecture,accessibility]
axes: none
cost: 2
seen: 15
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

The same cap belongs on a WebGL renderer, where the API is
`setPixelRatio(Math.min(devicePixelRatio, 2))` and the cost is fragment
shading rather than fill. Set it once and again on resize; renderers do not
re-read it, and a window dragged between a retina and an external panel
otherwise renders at the old ratio.

The cap is one number per class of device, not one number. A phone at 3× pays
the fragment cost of a 9× area for a layer nobody inspects at arm's length, and
its thermal budget is the one that matters: clamp to 1.5 below the mobile
breakpoint and 2 above it. Re-read the branch on resize alongside the ratio, or
a tablet rotated into a wide layout keeps the phone's cap.
```js
const cap = matchMedia('(max-width: 900px)').matches ? 1.5 : 2
r.setPixelRatio(Math.min(devicePixelRatio || 1, cap))
```

Two caps are better than one, and the second is an *area* budget. A backing
store's cost is pixels, not ratio, so a small inline canvas can afford full
device ratio while a full-bleed one cannot — fold both into the same `min` and
the decision stops needing breakpoints at all. Budget 2–3 megapixels; below it
the ratio cap governs, above it the area cap takes over smoothly.
```js
const m = Math.min(devicePixelRatio || 1, 2, Math.sqrt(2.5e6 / (w * h)))
```
⚠ Recompute on every resize, not once — the same element crosses the budget
when a panel opens beside it. Never on a canvas holding text or a hard edge.
