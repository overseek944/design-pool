---
id: counter-set-image-aperture
category: type
tags: [type,svg,display,media,mask,wordmark]
axes: {energy: 1, density: 2, weight: 5, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A word set at architectural scale already contains holes — the counters of
o, e, a, p. Paint an image *behind* live text in the same SVG and the opaque
letterforms become the matte for free: only the counter lets it through, so a
picture sits inside the type rather than beside it. Clip it to an ellipse near
the counter's shape, and mask a second copy under a vertical gradient so it
emerges out of the letter instead of stopping on a rim.

```html
<clipPath id="c"><ellipse cx="517" cy="145" rx="74" ry="91"/></clipPath>
<image href="…" clip-path="url(#c)" mask="url(#fade)" preserveAspectRatio="xMidYMid slice"/>
<text dominant-baseline="hanging">…</text><!-- painted last: it is the matte -->
```
⚠ `aria-hidden` the SVG; keep the readable word in the document. The aperture
is cut for one glyph — re-cut it if the string, face or tracking changes, and
check the counter is still open at 390px.
