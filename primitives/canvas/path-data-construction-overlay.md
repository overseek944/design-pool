---
id: path-data-construction-overlay
category: canvas
tags: [svg,path,annotation,overlay,technical,diagram]
axes: {energy: 1, density: 4, weight: 1, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Artwork on the page already carries its own construction. Walk the `d` strings
it ships with, collect the on-curve points and the off-curve controls each cubic
names, and draw them back over the original: anchors, handles, contours. They
land in the same user space as the art, so they stay in register at every size
with no second asset to keep in sync, and the mark reads as being inspected
rather than decorated. Anchor radius 1.5–3 units, handles at the hairline.

```js
const t = d.match(/[A-Za-z]|-?[\d.]+(?:e[-+]?\d+)?/gi)  // commands and numbers
// C takes two controls then the endpoint; each control belongs to the anchor it leaves
handles.push({a: cur, c: c1}, {a: end, c: c2}); anchors.push(cur = end)
```
⚠ Lowercase commands are relative and `M` implies `L` for its trailing pairs —
a parser missing either drops points silently instead of failing. Decorative:
mark the overlay `aria-hidden` and leave the original art as the accessible one.
