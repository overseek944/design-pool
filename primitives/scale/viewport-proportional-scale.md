---
id: viewport-proportional-scale
category: scale
tags: [unit,typography,layout,responsive,poster]
axes: {energy: 2, density: 2, weight: 4, finish: 4}
cost: 3
seen: 2
requires: []
conflicts: []
completes: [proportional-effect-radii, three-tier-token-redefinition]
tension: []
---
Size type AND spacing in `vw` so the page scales as one proportional unit instead
of reflowing. Define the scale as custom properties, then redefine those same
properties per breakpoint — not `clamp()`, which surrenders exact control at each
size. Always terminate in a px floor.

```css
:root      { --fs-hero: 4.8vw; --fs-lg: 1.6vw; --fs-sm: .9vw; }
@media (max-width:768px) { :root { --fs-hero: 8.8vw; --fs-lg: 5.2vw; } }
@media (max-width:420px) { :root { --fs-hero: 44px;  --fs-lg: 20px;  } }
```
⚠ `vw` ignores user font-size preference and browser zoom — WCAG 1.4.4 risk.
Poster/marketing pages only. Never docs, dashboards, or >150 words of body copy.

Variant — for a headline that must fit the first screen, drive it from viewport
*height* instead: `max(min(4–7lvh, <cap>), <floor>)`. `lvh` rather than `vh` so
a collapsing mobile URL bar does not resize type mid-scroll. The cap and floor
are separate tokens, redefinable per breakpoint and per language.
