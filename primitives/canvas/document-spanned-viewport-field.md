---
id: document-spanned-viewport-field
category: canvas
tags: [canvas,scroll,background,generative,architecture,performance]
axes: none
cost: 2
seen: 2
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

The same span in SVG needs neither the rebuild nor the cull. One
`preserveAspectRatio="none"` element at `inset: 0` of the document-height
container re-fits its own geometry whenever the page grows, so webfonts landing
and a disclosure opening cost nothing and the ⚠ above has no counterpart. What
it costs instead is that vertical rhythm becomes a function of page length:
author only geometry that tolerates arbitrary non-uniform scaling — long shallow
curves, horizontal bands — and hold weight with `vector-effect`. Box height
3000–6000 units whatever the real page measures.
```html
<svg viewBox="0 0 1200 5000" preserveAspectRatio="none" aria-hidden="true"
     style="position:absolute;inset:0;width:100%;height:100%">
```
⚠ Circles, glyphs and round caps shear with the stretch. Overrun the viewBox on
both sides — −100 to 1320 in a 1200 box — or curve endpoints show as cut stubs
against the page edge at the one width where they land inside the frame.
