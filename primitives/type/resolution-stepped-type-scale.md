---
id: resolution-stepped-type-scale
category: type
tags: [type,tokens,scale,accessibility,legibility,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A size that reads cleanly on a 2x panel is muddy on a 1x one: the same glyph
gets a quarter of the pixels, hinting coarsens, and the low-density screen is
usually the far-away desktop monitor as well. Step the whole scale by one
multiplier under a resolution query rather than retuning each token. 1.1–1.2x
below 1.5dppx covers it. Gate the query on the absence of an explicit
preference so a chosen size is never silently overridden by the hardware.

```css
:root { --size-meta: 9px; --size-body: 14px; --size-title: 18px }
@media (resolution <= 1.5x) { :root:not([data-text-size]) {
  --size-meta: 11.25px; --size-body: 16.1px; --size-title: 20.7px } }
:root[data-text-size=small] { --size-body: 13.02px }
```
⚠ The environment rule and the preference rules have equal specificity, so the
`:not()` is what decides, not source order — drop it and the two fight. Browser
zoom does not move `resolution`, so this cannot stand in for a zoom response.
