---
id: backdrop-captured-filter-warp
category: surface
tags: [surface,glass,refraction,svg-filter,backdrop-filter,displacement]
axes: {energy: 1, density: 3, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`backdrop-filter: url(#f)` renders nothing in most engines, so warping what sits
behind a panel looks unreachable. A zero-strength backdrop filter still copies
the backdrop into the layer's own paint, and a plain `filter:` then warps that
copy. Keep it on an empty absolutely-positioned child so the panel's content is
not warped with it, and stack it after a sibling doing the frosting to bend an
already-blurred plate. Displacement scale 0.2–0.4 of the short side.

```css
.warp { position: absolute; inset: 0; isolation: isolate;
        backdrop-filter: blur(0px); filter: url(#refract) }
```
⚠ The copy is clipped to the border box, so a warp sampling outward thins at the
edge. Two readbacks a frame over a frost layer — collapse both under
`prefers-reduced-transparency`.
