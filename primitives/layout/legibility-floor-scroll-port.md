---
id: legibility-floor-scroll-port
category: layout
tags: [overflow,responsive,scroll,correctness,table,figure]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A table or a diagram has a width below which it stops being readable, and
shrinking past it serves nobody. Give the content an intrinsic floor and let
the wrapper scroll sideways instead — 34–40rem for a four-column table, the
authored width for a diagram. Keep the framing rules on the wrapper so the top
and bottom lines hold while the content slides under them.
```css
.port { overflow-x: auto; overscroll-behavior-inline: contain }
.port table { min-width: 38rem }
.port img   { width: 52rem; max-width: none }
```
⚠ Without `overscroll-behavior-inline: contain` a swipe running off the end of
the strip chains to the browser's back gesture and leaves the page.
