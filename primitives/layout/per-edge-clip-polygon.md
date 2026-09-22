---
id: per-edge-clip-polygon
category: layout
tags: [overflow,clip,correctness,bleed]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
`overflow` only works per axis, so there is no way to crop one edge and let the
opposite one bleed. A `clip-path` polygon does it: hold the edges you want cut
at `0`/`100%` and push the free edges far outside the box. A rail can then be
cut flush at the container's start while hover lift and shadow still overhang
the end.
```css
.clip-start { clip-path: polygon(0 0, 9000% 0, 9000% 100%, 0 100%) }
```
⚠ Use a large multiple, not `infinity` — engines clamp differently. A clip-path
crops focus rings like any other paint, and it makes the element a containing
block for fixed descendants.

Variant — `inset()` takes negative offsets, which is the same cut in one
function: `inset(0 -64px -64px -64px)` crops the top flush and frees the other
three edges by the shadow's reach. It is the fix for a panel hanging from a bar
— a dropdown, a flyout — whose shadow would otherwise smear up across the bar it
hangs from. Free edges ≥ blur + spread, typically 32–80px.
```css
.flyout { box-shadow: 0 28px 42px -22px #1118272e; clip-path: inset(0 -64px -64px -64px) }
```
