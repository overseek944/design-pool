---
id: rotating-conic-border
category: surface
tags: [surface,border,motion,svg]
axes: {energy: 4, density: 3, weight: 3, finish: 4}
cost: 3
seen: 4
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

Third construction, no mask and no SVG at all: give the element the gradient as
its own background and 2–6px of padding, then let an opaque child fill the
content box. The ring is whatever the padding leaves. It needs no
`mask-composite` support, inherits the radius from a single `overflow: hidden`,
and blurring that inner fill 8–14px lets the gradient bleed softly inward
instead of ending on a hard inner edge — the one thing the mask version cannot
do.
```css
.frame { padding: 4px; border-radius: 20px; overflow: hidden;
         background: linear-gradient(var(--a), #f5c , #5cf) }
.frame > .fill { border-radius: 16px; background: var(--ground); filter: blur(10px) }
```
⚠ The inner fill is a real element in flow — anything positioned against
`.frame` now measures from outside the ring, not from the content edge.
