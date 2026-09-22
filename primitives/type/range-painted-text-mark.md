---
id: range-painted-text-mark
category: type
tags: [type,highlight,selection,geometry,overlay]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`::selection` and a span background both paint whatever the line box hands over
— no blend mode, no overhang, no say in the shape at a wrap. Paint the Range
instead: merge the `getClientRects()` fragments that share a top and touch
within ~2px, then lay absolutely-positioned `aria-hidden` spans behind the
text. The merge is the whole trick — unmerged rects split one run into a block
per text node. Recompute on `selectionchange`, `resize` and capture-phase
`scroll`. Trailing overhang 0–0.3× line height.

```js
const rects = [...range.getClientRects()].filter(r => r.width > 0)
// merge into bars, then paint each at page coords, pointer-events: none
paint(bars, { mixBlendMode: onDark ? 'normal' : 'multiply' })
```
⚠ `multiply` keeps glyphs readable through the mark on a light ground and turns
to mud on a dark one — swap to an opaque fill there. The spans are decoration:
never the only thing carrying a meaning.
