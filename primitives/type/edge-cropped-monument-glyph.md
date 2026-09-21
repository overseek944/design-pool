---
id: edge-cropped-monument-glyph
category: type
tags: [type,lettering,identity,display,bleed,layout]
axes: {energy: 1, density: 2, weight: 5, finish: 4}
cost: 1
seen: 1
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
