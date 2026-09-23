---
id: shadow-borne-card-edge
category: surface
tags: [surface,shadow,border,elevation,tokens,detail]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 5
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

Factor that first layer into a token of its own and the theme edits one
declaration rather than every tier. It does not merely change alpha across
themes, it changes *kind*: on light it stays an outer ring of ink, on dark it
has nothing darker to darken and inverts to a four-sided `inset` hairline of
white at 6–12%. The lift layers under it move by an order of magnitude at the
same time — ink at 4–18% on light, 55–92% on dark — so a stack authored on one
theme and reused on the other is invisible or a bruise.
```css
:root { --edge: 0 0 1px 0 oklch(0% 0 0 / .3) }
.dark { --edge: inset 0 0 0 1px oklch(100% 0 0 / .09) }
--float: var(--edge), 0 5px 20px oklch(0% 0 0 / .14);        /* .7–.92 on dark */
```
⚠ An `inset` layer paints over the element's own background, not under it — a
tier whose first layer inverts must sit above any fill it is meant to edge, and
a full-bleed child with its own background will cover the ring.
