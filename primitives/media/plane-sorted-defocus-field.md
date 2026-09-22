---
id: plane-sorted-defocus-field
category: media
tags: [depth,blur,defocus,scatter,composition,decoration]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A field of images scattered at different sizes still reads flat — scale alone
says *smaller*, not *further*. Sort them into two or three focal planes and
give each plane a fixed blur, the sharp plane holding whatever must be read.
Defocus is the cue the eye trusts; scale and opacity only support it. Two
planes carry it; three before the ramp bands. Far-plane blur 5–12px at 0.3–0.6
opacity and 0.5–0.7 scale; keep the near plane at zero blur so nothing in focus
pays for a filter buffer.

```css
.field > * { --p: 0; filter: blur(calc(var(--p) * 9px));
  opacity: calc(1 - var(--p) * .55); scale: calc(1 - var(--p) * .38) }
.field > [data-plane="far"] { --p: 1 }
```
⚠ `filter: blur()` samples transparent pixels past the box, so a blurred member
loses its own edge — oversize it or inset its content. Mark every one
`aria-hidden` and `pointer-events: none`.
