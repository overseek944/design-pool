---
id: anchor-only-nav-collapse
category: interaction
tags: [navigation,responsive,accessibility,architecture,correctness]
axes: none
cost: 1
seen: 3
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
