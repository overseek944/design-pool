---
id: stepped-pixel-corner
category: surface
tags: [surface,ornament,detail,texture,cheap]
axes: {energy: 2, density: 3, weight: 2, finish: 2}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Erode a corner into discrete cells rather than rounding or slicing it: one
square the size of the cell pinned at the corner, plus four to six zero-blur
`box-shadow` copies stepped one and two cells along each axis at falling alpha.
The staircase reads as a low-resolution dissolve — the panel quantises instead
of ending — and costs no pseudo-element, no clip and no asset. Cell 8–16px,
alpha from about 0.3 down to 0.08. Give the diagonal copy a value between its
two neighbours or the step reads as a hole.

```css
.px { position: absolute; top: 0; right: 0; width: var(--c, 12px); aspect-ratio: 1;
  --x: calc(var(--c) * -1); --xx: calc(var(--c) * -2); --yy: calc(var(--c) * 2);
  background: var(--ink);
  box-shadow: var(--x) 0 0 #ffffff57, 0 var(--c) 0 #ffffff33, var(--x) var(--c) 0 #ffffff2e,
              var(--xx) 0 0 #ffffff24, 0 var(--yy) 0 #ffffff1a }
```
⚠ Decoration only — it paints outside the element's box, so any ancestor with
`overflow: hidden` erases it.
