---
id: embedded-replica-palette-split
category: color
tags: [color,tokens,product,mock,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A page embedding a working replica of the product needs two token sets, not
one. The site accent owns chrome — nav, buttons, kickers, links — and stops at
the replica's frame; inside, the product's own semantic colours rule and the
accent does not appear at all. Recolour the replica to brand and it stops being
evidence of a product and becomes an illustration of one.

```css
:root     { --accent: #f97316 }                  /* chrome only */
.replica  { --accent: var(--product-accent) }    /* nothing inherits past here */
```
⚠ The two sets carry separate contrast obligations. A replica is denser and
smaller-typed than the page around it, so an accent that clears 4.5:1 in a 16px
lede can fail on a 10px label two centimetres away. Audit them apart.
