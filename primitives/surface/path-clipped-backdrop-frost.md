---
id: path-clipped-backdrop-frost
category: surface
tags: [backdrop-filter,blur,clip-path,svg,glass,shape]
axes: {energy: 1, density: 3, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`backdrop-filter` is clipped to the element's border box, so frosted glass can
only be a rectangle — a chevron, a hexagon, an angled plate in a diagram has to
fake it with a baked screenshot that stops matching whatever is behind it. Put
the blurring div inside a `<foreignObject>` and clip it to the same path that
paints the shape. What makes it work is sampling headroom: inflate the
`foreignObject` by about twice the blur radius on every side and translate the
clip back by the same amount, or the filter runs out of source and the frost
thins before it reaches the outline. Blur 4–32px.

```html
<foreignObject x="-58" y="-58" width="527" height="352"><div
  xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;
  backdrop-filter:blur(29px);clip-path:url(#plate)"></div></foreignObject>
<clipPath id="plate" transform="translate(58 58)"><path d="…"/></clipPath>
```
⚠ `foreignObject` paints nothing when the SVG is an `<img>` src or a CSS
`url()` — the shape arrives and the frost silently does not. One backdrop
readback per plate per frame; collapse to a flat tint under
`prefers-reduced-transparency`.
