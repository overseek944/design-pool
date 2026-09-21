---
id: anchor-only-nav-collapse
category: interaction
tags: [navigation,responsive,accessibility,architecture,correctness]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Where every link in a bar is an in-page anchor, the narrow-viewport menu is
already built: it is the scroll. Drop the list rather than fold it into a
sheet, and keep the mark and the one primary action: no drawer, no focus trap,
no scroll lock, no open state to resynchronise. Collapse where the links and
the action stop sharing a line, roughly 820–1000px, and only while the set is
small, four to six sections.

```css
@media (width <= 900px) { [data-nav-links] { display: none } }
```
⚠ Only anchors may go. A destination that is another page vanishes unless the
footer carries it, and that footer is then the sole route for a keyboard user.

The warning above has a cheaper answer than the footer: exempt the off-page
destinations from the collapse instead of dropping the list whole. One `:not()`
keeps the blog, the docs or the pricing link on the bar while every in-page
anchor goes, so nothing that scrolling cannot reach ever disappears. Then shed
in tiers as the room runs out — anchors first, the social icons next, the mark
and the primary action last.
```css
@media (width <= 900px) { [data-nav] a:not([data-keep]) { display: none } }
@media (width <= 480px) { [data-nav] .icon-only        { display: none } }
```
⚠ Two survivors is the ceiling. Past that the bar reads as a menu missing half
its items rather than as one deliberately reduced.
