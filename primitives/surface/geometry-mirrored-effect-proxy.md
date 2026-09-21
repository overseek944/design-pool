---
id: geometry-mirrored-effect-proxy
category: surface
tags: [svg,filter,measurement,architecture,correctness,chrome]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Some effects exist only for SVG — a fusing filter, one stroke around a group, a
gradient crossing separate shapes — and reaching them means rebuilding real
controls as SVG, which costs focus order and text. Mirror the geometry instead: a
`pointer-events: none` SVG behind the row holds one shape per control, written
from its live rect. The effect paints on the proxy; the controls stay ordinary
HTML above it. A bridge shape between neighbours lets a fusing filter read them
as one object; drop it to part them.

```js
const b = row.getBoundingClientRect()
svg.setAttribute('viewBox', `0 0 ${b.width} ${b.height}`)
items.forEach((el, i) => { const r = el.getBoundingClientRect()
  proxy[i].setAttribute('x', r.left - b.left)
  proxy[i].setAttribute('width', r.width)
  proxy[i].setAttribute('rx', r.height / 2) })
```
⚠ One layout read per control, so re-measure debounced on resize, 60–120ms, and
on `document.fonts.ready` — otherwise the proxy holds the geometry the row had
before the webfont landed. `aria-hidden` it.
