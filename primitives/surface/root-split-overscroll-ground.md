---
id: root-split-overscroll-ground
category: surface
tags: [ground,scroll,overscroll,theme,correctness]
axes: none
cost: 1
seen: 2
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

Where only some routes use a different ground — an editorial template on warm
paper inside an app of white — let the page's own layout class repaint the root:
`html:has(.layout)` needs no router hook or class toggled on `<html>`, and it
clears itself when the route unmounts. Pair it with `overscroll-behavior-y: none`
when the header and footer grounds differ.
```css
:is(html, body):has(.editorial) { background: var(--paper-warm); overscroll-behavior-y: none }
```
⚠ `:has()` on the root re-evaluates on every DOM mutation beneath it — scope it
to a stable class near the top, never to a deep or frequently toggled one.
