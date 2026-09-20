---
id: dom-labels-in-normalised-canvas-space
category: canvas
tags: [canvas,accessibility,architecture,correctness,label]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Text drawn with `fillText` cannot be selected, found, translated or read
aloud, needs the webfont loaded before the first frame, and softens whenever
the backing store is scaled. Draw geometry only, and hang the labels in an
`inset: 0; pointer-events: none` layer above the canvas, placed in the same
0–1 coordinates the drawing uses and written out as percentages. One
coordinate system serves both layers with no per-frame sync, and a label's
state becomes a class on a span. 4–12 anchors.
```js
lbl.style.left = fx * 100 + '%'            // canvas draws the same point
lbl.style.top  = fy * 100 + '%'            // at fx * w, fy * h
lbl.style.transform = 'translate(-50%,-50%)'
```
⚠ Holds only while the canvas draws in fractions of its own box; anything
placed in absolute pixels drifts from its label on resize.

The label layer is also the part that should leave first. Annotations are what
needs the width — 8–10 words of tracked micro-type has no narrow-viewport form
worth shipping — while the drawing itself is already in fractions and composes
at any size. Hide the layer below the breakpoint and keep the canvas: the
figure reads as a diagram wide and as a mark narrow, rather than as a diagram
with unreadable type.
```html
<div class="labels hidden lg:block" aria-hidden="true">…</div>
```
⚠ Only safe while the labels are decorative restatements. If a label carries
information the canvas does not, hiding it at one width hides it from that
reader entirely — move it into the caption instead.
