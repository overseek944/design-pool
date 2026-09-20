---
id: viewport-proportional-scale
category: scale
tags: [unit,typography,layout,responsive,poster]
axes: {energy: 2, density: 2, weight: 4, finish: 4}
cost: 3
seen: 4
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

The same construction scoped to a container sizes the *parts of a drawing*
rather than type: declare every element of a scene — rail width, band depths,
seat widths — in `cqw` on one `inline-size` container, and the whole thing
scales as one object wherever it is placed. Floor selectively with `max()`:
only the parts that stop being legible get a px minimum, the rest keep scaling.
Retune the ratios at a breakpoint, not just the sizes, so a wide scene can be
re-proportioned rather than shrunk. No WCAG risk here — nothing in it is text.
```css
.scene { container-type: inline-size }
.scene [data-stage] { --rail: max(1.6cqw, 8px); --band: max(14.5cqw, 112px);
                      --seat: 24cqw }
@media (width >= 640px) { .scene [data-stage] { --seat: 19cqw } }
```
