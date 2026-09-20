---
id: mask-swap-over-shared-paint
category: media
tags: [mask,icon,gradient,media,state]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
When a family of glyphs must share one fill — a gradient, a video, a live layer
— paint it once and let `mask-image` carry the shape. Each icon becomes a flat
alpha file, so the fill is authored and rasterised a single time. Morphing
between two is then stacking both over the same paint and cross-fading opacity
with a slight scale, and the fill never re-renders underneath. Cross-fade
100–200ms, incoming scale 0.5–0.9.
```css
.glyph { position:absolute; inset:0; background:var(--paint);
  mask:url(shape.png) center/100% no-repeat;
  opacity:0; transform:scale(.7); transition:all .15s ease-out }
.glyph[data-active] { opacity:1; transform:none }
```
⚠ A mask reads alpha only — artwork whose meaning lives in its internal
colours cannot be drawn this way.
