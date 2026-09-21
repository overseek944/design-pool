---
id: rotating-conic-border
category: surface
tags: [surface,border,motion,svg]
axes: {energy: 4, density: 3, weight: 3, finish: 4}
cost: 3
seen: 9
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
only the ring, inherits `border-radius` exactly, and a `filter: drop-shadow()`
on the same element *does* escape the box — the mask resolves first, so the
shadow is cast by the ring's own shape rather than by the padding rect. 4–8px
at 60–80% alpha; the halo is what stops a 2px ring reading as a hairline.
```css
.ring { filter: drop-shadow(0 0 6px rgb(255 130 60 / .8)) }
```

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

A fourth construction spins the gradient rather than the element, which nothing
else here can do: register the angle with `@property` so it interpolates at all
— an unregistered custom property jumps from 0 to 360 with no frames between —
then animate it to `360deg`. The ring holds still while only its light moves, so
nothing inside inherits a rotation. Add the bloom as a second copy behind at
`inset: -4 to -8px` with the angle negated and 6–10px of blur: counter-rotating,
the two beat against each other and the glow never syncs with the edge it came
from. Period 4–8s.
```css
@property --a { syntax: "<angle>"; initial-value: 0deg; inherits: false }
.ring { background: conic-gradient(from var(--a), #f8f9fc, #7e8494 38%, #f8f9fc) }
.ring::after { background: conic-gradient(from calc(var(--a) * -1), …); filter: blur(7px) }
@keyframes spin { to { --a: 360deg } }
```
⚠ `@property` is the whole trick — without registration the animation silently
does nothing at all rather than degrading.
