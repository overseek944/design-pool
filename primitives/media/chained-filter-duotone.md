---
id: chained-filter-duotone
category: media
tags: [media,color,filter,normalisation,texture]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Supplied photographs come from different cameras, days and light, and a row of
them reads as a scatter however well each is cropped. Collapse the set onto one
hue with a filter chain. Order is the whole trick: `grayscale()` first so
no source colour survives to fight the tint, `sepia()` to lay down one hue
everywhere, then `hue-rotate()` to steer that hue to the palette. Rotate before
sepia and every photograph rotates from a different start. Sepia 0.3–0.6 sets
tint depth; trim saturation and contrast last.

```css
.duotone { filter: grayscale(1) sepia(.4) hue-rotate(175deg)
                   saturate(.75) brightness(.94) contrast(1.02) }
```
⚠ `filter` makes the element a containing block and a stacking context —
absolutely-positioned children re-anchor to it and blending above it stops
reaching the page. Put it on the image, not the card.

Where the tint must be *removable* — revealed on hover or focus — the filter chain
is the wrong shape: it has no term to fade, and re-running it to neutral crossfades
through the wrong hues. Desaturate the image, then lay the palette colour over it in
an `::after` at `mix-blend-mode: color` and animate only that layer's opacity. The
tint is now the token itself rather than a `hue-rotate` angle found by trial, and
`0 → 0.4` is the whole interaction. Overlay 0.35–0.5.
```css
.shot img     { filter: grayscale(1) contrast(1.04); transition: filter .4s }
.shot::after  { content:""; position:absolute; inset:0; background: var(--accent);
                mix-blend-mode: color; opacity:.42; transition: opacity .4s }
.shot:hover img, .shot:focus-within img { filter: none }
```
⚠ Pair every `:hover` with `:focus-within` or the true photograph is mouse-only.
The blend needs `isolation: isolate` on the frame, or on some stacking contexts it
reaches past the image to the page behind it.
