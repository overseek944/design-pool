---
id: foreignobject-dom-snapshot-texture
category: canvas
tags: [webgl,texture,dom,svg,rasterize,fonts,snapshot,handoff]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Live markup can become a texture without a screenshot library. Deep-clone the
element, copy each node's computed style inline, wrap it in an SVG
`foreignObject`, decode it as an image and draw that to a canvas at 2–4× pixel
density. The SVG image is sandboxed, so fonts must travel inside it: inline
only the `@font-face` rules the text uses, with their files as data URLs. The
WebGL layer then shows exactly what the DOM showed, ready to deform.

```js
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <foreignObject width="100%" height="100%">${new XMLSerializer().serializeToString(clone)}</foreignObject></svg>`
img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); await img.decode()
```
⚠ Nested images do not load inside it — draw them separately. Await
`document.fonts.ready` first.
