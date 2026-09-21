---
id: document-spanned-viewport-field
category: canvas
tags: [canvas,scroll,background,generative,architecture,performance]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A decorative field belongs either to the viewport or to the document, and the
difference is visible: viewport-locked art holds still while the page moves
under it and reads as a sticker. Generate the geometry once across the
document's full scroll height, keep the backing store at viewport size, and
draw the visible slice by translating the context by the scroll offset. The
field travels with the content, never repeats and never drifts, at the paint
cost of one screen — provided the loop culls to the visible band instead of
walking every off-screen element.

```js
build(W, document.documentElement.scrollHeight)     // geometry in document space
ctx.save(); ctx.translate(0, -scrollY)
for (const n of nodes) if (n.y > scrollY - m && n.y < scrollY + H + m) paint(n)
```
⚠ `scrollHeight` grows when webfonts land and when a disclosure opens, leaving
the field short of the footer — rebuild from a `ResizeObserver` on the document
element, never from `window.resize`.
