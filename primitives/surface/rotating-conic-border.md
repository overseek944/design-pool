---
id: rotating-conic-border
category: surface
tags: [surface,border,motion,svg]
axes: {energy: 4, density: 3, weight: 3, finish: 4}
cost: 3
seen: 16
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

Where the content is a photograph rather than a flat fill, the third
construction needs a second gap or the ring looks glued to the subject: give
the inner element its own `border` in the *page ground* colour, 3–5px, and the
conic band reads as detached hardware around the image. Vary `from` per
instance across a set — 120–200° apart — or a row of framed portraits looks
stamped from one file, which is exactly what it is.
```css
.frame { padding: 8px; border-radius: 50%;
         background: conic-gradient(from var(--a, 40deg), #3c518e, #7878c7, #f0d0a1, #3c518e) }
.frame > img { border-radius: 50%; border: 4px solid var(--ground) }
```
⚠ The ground-coloured border is a lie the moment the frame sits on anything
else — a banded section, a gradient, a photo — and then it paints a visible
disc. Only where the frame's own ground is a known flat token.

A fifth construction keeps the masked ring and rotates the *element* carrying
the conic rather than the gradient's angle: an oversized square child, centred
and spun by `transform`, clipped by the ring's own mask. It never repaints — the
loop lives entirely on the compositor, where an animated `--angle` repaints the
gradient every frame — and it needs no `@property`, so it degrades to a static
band instead of to nothing. One narrow bright arc in an otherwise transparent
conic reads as a light travelling the lip rather than a coloured frame. Sweep
10–20% of the turn, period 2–4s.
```css
.ring::before { position: absolute; inset: -30%; margin: auto; aspect-ratio: 1;
  background: conic-gradient(#0000 0 68%, #fff 86%, #0000 100%);
  animation: turn 2.8s linear infinite }
```
⚠ The child must be square and wider than the box's diagonal or the arc clips at
the corners. In ink rather than a hue it reads as specular on the edge; in a
saturated colour the same element reads as a notification.

Shape the conic's stops and the travelling light reads as a head with a tail
rather than an even sweep: full strength at 0°, under half of it by 25–30°,
near nothing by 60°, then transparent across the whole opposite side. One bright
point chases the perimeter while the rest of the ring stays dark, which is
legible at the 1–2px where an even gradient is only a shimmer. Period 2–3s
linear.
```css
background: conic-gradient(from var(--a), var(--c) 0deg,
  color-mix(in srgb, var(--c) 45%, transparent) 26deg,
  transparent 120deg 300deg, var(--c) 360deg)
```
⚠ First and last stop must be the same colour or the head shows a seam once
per turn.

`animation: none` is not the reduced-motion state — it freezes the sweep at the
angle the keyframe happened to start from, which is the one frame nobody
art-directed, and on a narrow arc that usually parks the highlight in a corner.
Re-aim it: write a literal `from` that puts the bright stop on an edge, and
drop its alpha by 20–40% at the same time, since a highlight that no longer
moves reads harder than the same value in motion.
```css
@media (prefers-reduced-motion: reduce) {
  .ring::after { animation: none;
    background: conic-gradient(from 320deg, #0000 0 300deg, var(--c-quiet) 340deg, #0000 360deg) }
}
```
⚠ The frozen angle and the animated one are two values to keep in step — park
it where the sweep spends most of its time, not at an arbitrary number.

Blur the bloom copy far past the ring — 25–40px rather than 6–10 — and it stops
being a halo on the edge and becomes light the control is sitting in, spilling
onto the ground around it. At that radius the negative inset buys nothing: hold
it at `inset: 0` and let the blur do the spreading, 70–90% opacity.
```css
.bloom { position: absolute; inset: 0; border-radius: inherit; opacity: .83;
  background: conic-gradient(from var(--a), …); filter: blur(31px) }
```
⚠ The buffer is the size of the blur, not of the ring, and it repaints every
frame the angle moves. One primary call to action, never a row of them — and
`aria-hidden`, since the bloom is a second copy of nothing.
