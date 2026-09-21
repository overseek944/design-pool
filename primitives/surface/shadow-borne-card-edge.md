---
id: shadow-borne-card-edge
category: surface
tags: [surface,shadow,border,elevation,tokens,detail]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A white card on an off-white ground has no border that works: at the rule tint it
vanishes, a step darker and it reads as a drawn box. Make the edge the first
layer of the elevation token instead — zero offset, blur under a pixel, ink at
30–50% — and it darkens where the card meets the ground without ever becoming a
line. It follows the radius for free, costs no layout, and rises with the lift
under it as one list.

```css
--card: 0 0 1.1px #0006, 0 2px 4px #0000000a;   /* edge, then lift */
--sunk: inset 0 0 0 .5px #00000013;             /* same argument, inward */
.card { box-shadow: var(--card) }
```
⚠ Under about 0.8px of blur the edge drops out on a 1× display — check it there,
and never let it be the only thing separating two interactive cards.
