---
id: root-split-overscroll-ground
category: surface
tags: [ground,scroll,overscroll,theme,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Paint the root and the body separately. The root's background fills the canvas
beyond the document — rubber-band overscroll, the strip under a short page, the
area behind a mobile toolbar — while the body carries the reading ground. Set
the root to the colour of the page's end (usually the footer) and a bounce past
the bottom reads as more footer instead of a flash of paper.

```css
html { background: var(--footer-ground) }   /* dark end band */
body { background: var(--paper); min-height: 100svh }
```
⚠ The body must fully cover the viewport or the root colour shows through on
short pages; mismatched top and bottom edges need `overscroll-behavior-y: none` instead.
