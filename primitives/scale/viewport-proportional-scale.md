---
id: viewport-proportional-scale
category: scale
tags: [unit,typography,layout,responsive,poster]
axes: {energy: 2, density: 2, weight: 4, finish: 4}
cost: 3
seen: 9
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

Type and spacing need not share one rate, and usually should not. Drive both
from `vw` but give the gaps a coefficient a quarter to a third of the type's: at
the wide end a strictly proportional gap opens into a hole, at the narrow end it
closes to nothing. Where the two rates only need a floor and a cap rather than
per-breakpoint control, `clamp()` is the cheaper spelling and the exactness it
surrenders lands on spacing, where it costs least.
```css
h1     { font-size:  clamp(1.1rem, 5.3vw, 4.75rem) }
h1 + p { margin-top: clamp(.75rem, 1.3vw, 1.5rem) }    /* ≈ .25× the type rate */
```
⚠ Ratios of .2–.4 hold. At 1.0 the page is one proportional unit again, which is
the decision above, not a tuning of it.

Sub-pixel parts need a different floor from the one `max()` gives. A 0.5cqw
hairline — a caret, a rule inside the drawing — rounds to nothing in a small
container, and `width: max(.5cqw, 1px)` does not save it: the value is a
*basis* a flex parent is still free to shrink to zero. Floor those on
`min-width`/`min-height` and leave `width` proportional. The rule of thumb:
`max()` for anything that only has to stay legible, the `min-*` properties for
anything that has to stay visible at all.

Two bases inside one `min()` and the binding constraint switches with the window.
A display line sized `min(9–10cqw, 8–10vh)` grows with the column it sits in until
the viewport gets short, at which point the height term takes over and the line
still clears the fold on a laptop in landscape — the case a width-only clamp
always overflows. Keep both terms fluid and put the floor outside them.
```css
h1 { font-size: max(2.5rem, min(9.3cqw, 9vh)) }
```
⚠ The `cqw` term needs `container-type: inline-size` on an ancestor or it resolves
against the viewport and the `min()` quietly degrades to a width clamp that looks
right at every width you test at full height.

Where the component's size should be an *input* rather than a consequence of its
box, take one length as a custom property and derive everything inside from it —
type as a coefficient, padding in percent, internal rhythm in `em`. The caller
sets one value and the whole object scales rigidly; no container query, no
breakpoint inside the component, and two instances at different sizes stay
proportionally identical. Coefficients around 0.04–0.06 for body text in a card
whose width is the unit.
```css
.card { width: var(--u); font-size: calc(var(--u) * 0.049); padding: 9% 9.5% }
.card .label { font-size: 0.74em; margin-bottom: 0.5em }     /* em from here down */
.deck { --u: clamp(150px, 12.5vw, 190px) }
```
⚠ A px floor has to go on the *unit*, not on the derived type — flooring the
font-size alone breaks the proportions the construction exists to keep.
