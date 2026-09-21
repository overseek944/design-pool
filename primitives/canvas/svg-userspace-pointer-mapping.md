---
id: svg-userspace-pointer-mapping
category: canvas
tags: [svg,pointer,correctness,interaction,geometry]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
An SVG with a `viewBox` is drawn in its own coordinate system, and
`preserveAspectRatio` may be scaling *and* cropping it differently on each axis.
Pointer coordinates arrive in CSS pixels, so any radius, falloff or hit test
computed from them is wrong by whatever the fit resolved to — and wrong by a
different amount at every viewport. Push the point through the inverse screen
matrix and every distance is back in authored units.

```js
const m = svg.getScreenCTM(); if (!m) return
const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse())
```
⚠ `getScreenCTM()` returns null while the element is not rendered — guard it or
the first pointer event after a hidden mount throws.
