---
id: edge-cropped-monument-glyph
category: type
tags: [type,lettering,identity,display,bleed,layout]
axes: {energy: 1, density: 2, weight: 5, finish: 4}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
One glyph of the wordmark, set at architectural scale and allowed to run off the
bottom of the first screen, does structural work no mark at chrome size can: it
gives the fold its mass and its asymmetry for the cost of a single character.
The crop is the argument — a letterform that fits inside the frame reads as a
graphic, one cut by it reads as larger than the page. Size it from a height
token, never a width one, so it cannot grow into the copy beside it. Height
26–48svh, floor near 64px.

```css
.stage    { block-size: 100svh; overflow: clip; position: relative }
.monument { position: absolute; inset-block-end: 0; block-size: var(--mark-h) }
/* --mark-h: min(clamp(220px, 42vh, 480px), 48svh) */
```
⚠ It is decoration: `aria-hidden`, and the readable wordmark still has to exist
somewhere in the document. At 390px the glyph and the headline compete for the
same fold — one of them has to withdraw on a short viewport, and it is this one.

The whole word works the same way at the other end of the page: set it as the
last element of a dark footer, near full container width, with `line-height`
0.68–0.8 and the footer's `overflow: hidden`, so the line box ends above the
lower bowls and the page edge cuts the letters. Here the crop reads as a
colophon that runs out of paper rather than as mass at the fold. Size it from
width (roughly 16–24rem, one step down per breakpoint), since nothing sits
beside it.
```css
footer { overflow: hidden }
.colophon { font-size: 20rem; line-height: .72; white-space: nowrap; user-select: none }
```
⚠ A fixed rem size overflows sideways at 390px — step it down or switch to `vw`.

On a light footer the crop can dissolve rather than cut: fill the word with a
vertical gradient running from a mid-grey into the ground itself, clipped to the
glyphs, so the lower bowls fade out before the page edge reaches them. The word
then reads as sinking into the paper, not as trimmed by it. Top stop at 20–35%
ink, bottom stop equal to the ground; `line-height` 0.8–0.95.
```css
.colophon { background: linear-gradient(var(--ink-25), var(--ground) 92%);
  -webkit-background-clip: text; background-clip: text; color: transparent }
```
⚠ Forced-colors mode drops the gradient and `transparent` text vanishes — give
it a `@media (forced-colors: active)` fallback of `CanvasText`.
