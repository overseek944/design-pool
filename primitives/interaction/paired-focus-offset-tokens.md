---
id: paired-focus-offset-tokens
category: interaction
tags: [accessibility,focus,tokens,correctness]
axes: none
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Ship the focus ring as three tokens — width, an outer offset, and a negative
inner offset — then give every interactive element one of the two offsets. Outer
where there is room around the box; inner for anything flush to a container
edge, filling its cell, or inside a clipping parent, where a positive offset is
cropped away and the ring disappears.
```css
:root { --focus-w:.125rem; --focus-out:.25rem; --focus-in:-.125rem }
:where(a,button,[tabindex]):focus-visible {
  outline:var(--focus-w) solid currentColor; outline-offset:var(--focus-out) }
.tile:focus-visible, .row:focus-visible { outline-offset:var(--focus-in) }
```
⚠ `currentColor` follows the theme, but still check 3:1 against both grounds.
Width below .125rem disappears against busy imagery.

Third case — inline text links want a *larger* outer offset than solid
controls, roughly double. A ring drawn tight to a run of text collides with
descenders and with the underline; pushing it out separates the ring from the
glyphs so both stay readable. Controls .125–.25rem, inline links .25–.375rem.
