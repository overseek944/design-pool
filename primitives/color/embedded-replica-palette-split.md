---
id: embedded-replica-palette-split
category: color
tags: [color,tokens,product,mock,architecture]
axes: none
cost: 1
seen: 9
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

The boundary needs structure, not only tokens. A region authored in a different
visual language still inherits `box-sizing`, the font stack, link colour, the
focus ring and the scrollbar across its frame, and in a utility-framework app
it inherits the preflight too. Redeclare all of them on the boundary selector
and its descendants, so the region is self-contained in the same way its
palette is.
```css
.replica, .replica *, .replica ::before { box-sizing: border-box }
.replica { font: 14px/1.5 var(--product-font); color: var(--product-ink) }
.replica :focus-visible { outline: 2px solid var(--product-focus); outline-offset: 3px }
```
⚠ `:focus-visible` is the one that goes missing. A region that restyles links
and buttons but not every focusable control ships a frame with no visible focus.

The boundary also has to re-own what the UA paints, which is normally written
once on `body` and therefore belongs to the host. `::selection`, `::placeholder`
and `color-scheme` on date and search fields all inherit across the frame and
land the page's colours inside a region drawn in a different one — a selection
block tinted to the site accent over the replica's own ink is the tell. Scope
each to the boundary selector rather than adding a second global rule.
```css
.replica ::selection { background: var(--product-select); color: var(--product-ink) }
.replica ::placeholder { color: var(--product-ink-faint) }
.replica input[type=date] { color-scheme: light }   /* whatever the region is */
```
⚠ The region's reduced-motion branch is the same problem: a replica animating
its own loading and arrival states needs the blanket collapse scoped to it, not
inherited from a root rule that may not exist in the host at all.
