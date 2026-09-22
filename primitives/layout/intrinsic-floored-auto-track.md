---
id: intrinsic-floored-auto-track
category: layout
tags: [layout,grid,responsive,correctness,overflow,breakpoints]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
`repeat(auto-fit, minmax(<floor>, 1fr))` reflows a row of cards with no
breakpoints, but the floor is a hard minimum: any container narrower than it
overflows off the screen. Wrap the floor in `min()` against the container —
unchanged above it, collapsed to the available width below — and the last
media query stops being necessary. Floor 140–320px, set by what has to stay
legible in one card.
```css
.row { display: grid; gap: clamp(1rem, 3vw, 2.5rem);
       grid-template-columns: repeat(auto-fit, minmax(min(18rem, 100%), 1fr)) }
```
⚠ It floors the *track*, not the contents — a long unbroken string still
overflows unless the item carries `min-inline-size: 0`. `auto-fit` collapses
empty tracks, so a lone item stretches full width; `auto-fill` keeps them.
