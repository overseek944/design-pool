---
id: mask-swap-over-shared-paint
category: media
tags: [mask,icon,gradient,media,state]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 2
seen: 6
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

Where the family is a *variant set* rather than a morph — a tier seal, a status
glyph, one mark per state — put the mask source in an inherited custom property
and let the state attribute redefine it. One `::after` rule then serves every
member, the icon inherits its size in `em` and its colour from `currentColor`,
and adding a variant is one declaration rather than a new element.
```css
[data-tier]            { --seal: var(--seal-check) }
[data-tier=top]        { --seal: var(--seal-star) }
[data-tier]::after     { content: ""; width: 1.05em; height: 1.05em;
  background: currentColor; mask: var(--seal) center / contain no-repeat }
```

Leave the layer list open. Ending the shorthand with `, var(--extra, none)`
hands every caller a second mask layer — a notch, a corner fade, a cut — without
touching the rule, and putting the compositing operator in a variable of its own
lets that layer add to the shape or subtract from it from the call site.
```css
.icon { mask: var(--glyph) alpha no-repeat center / auto var(--mask-op, add),
              var(--extra, none) }
```
⚠ An empty layer is a no-op under `add` and destructive under `subtract` or
`intersect` — subtracting the glyph from nothing erases the icon. Default the
operator to `add` and let the call site change it only when it also supplies the
layer.
