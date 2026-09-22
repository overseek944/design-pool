---
id: perforation-punched-silhouette
category: surface
tags: [surface,mask,border,texture,detail,css-only,gradient]
axes: {energy: 1, density: 2, weight: 2, finish: 3}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A ticket stub is a rectangle with its edge eaten away, and no `border` will do
it. Give it one mask layer per edge — a radial gradient tiled along that edge
alone — and intersect, with the opaque stop half a pixel past the radius so the
bites cut clean and nothing else does. Radius 5–12px at 2.5–3× pitch reads as
perforation, 14–20px at 2× as a scallop.

```css
.stub { mask-composite: intersect;   /* one layer per edge, tiled along it */
  mask: radial-gradient(circle 8px at 50% 0, #0000 8px, #000 8.5px) 0 0/22px 100% repeat-x }
```
⚠ Without a composite mode the layers add and nothing is cut. A pitch that does
not divide the side half-cuts the corners; `box-shadow` follows the rectangle,
so the outline needs `filter: drop-shadow()`.

A single pair of bites, one per side at the same height, marks a tear line
rather than a perforated edge: two untiled radial layers at `0` and `100%`
along x, intersected, with the height in a custom property so it can track a
divider inside the card. Radius 5–12px; move the height with the breakpoint.
```css
.stub { --y: 60px; --r: 9px; mask-composite: intersect;
  mask: radial-gradient(circle at 0 var(--y), #0000 var(--r), #000 calc(var(--r) + .7px)),
        radial-gradient(circle at 100% var(--y), #0000 var(--r), #000 calc(var(--r) + .7px)) }
```
