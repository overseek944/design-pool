---
id: rotating-conic-border
category: surface
tags: [surface,border,motion,svg]
axes: {energy: 4, density: 3, weight: 3, finish: 4}
cost: 3
seen: 2
requires: []
conflicts: []
completes: [overflow-visible-for-glow-bleed]
tension: []
---
An animated gradient border without a pseudo-element hack: an SVG stroke inset
`-1px` and sized `calc(100% + 2px)`, spinning under the content. Layer two or
three at different periods and directions for a border that never repeats.
```html
<svg class="absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)]
            overflow-visible animate-[spin_5s_linear_infinite]">
```
`overflow-visible` is load-bearing — without it the stroke's glow is clipped.

Variant — static gradient border with no SVG and no overhang: a pseudo-element
with `padding: 1–2px`, the gradient as its background, and two identical mask
layers clipped to `content-box, border-box` composited with `exclude`. Leaves
only the ring, inherits `border-radius` exactly, but cannot bleed glow outside
the box.
