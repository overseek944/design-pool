---
id: em-sheared-highlight
category: type
tags: [type,highlight,clip-path,emphasis,inline,scale]
axes: {energy: 3, density: 2, weight: 4, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A slanted block behind a phrase gives a headline a cut-in, marker-stroke
emphasis. Build the slant with `clip-path: polygon()` and express the horizontal
offsets in `em` — the shear then scales with the type at every breakpoint, and
unlike `transform: skewX()` the glyphs stay upright inside it. Offsets 0.2–0.45em;
beyond that the narrow corner starts clipping descenders. Pair with padding of at
least the offset so the first letter clears the diagonal.
```css
.mark { display: inline-block; padding: .08em .5em; background: var(--accent);
  color: var(--accent-ink);
  clip-path: polygon(.32em 0, 100% 0, calc(100% - .32em) 100%, 0 100%) }
```
⚠ The block is a colour change, so the pair must clear 4.5:1 on its own — a mid
accent behind dark ink usually does not. Reset to `clip-path: none` where the
phrase can wrap, or the shear lands mid-line on the second row.
