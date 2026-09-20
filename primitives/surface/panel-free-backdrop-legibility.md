---
id: panel-free-backdrop-legibility
category: surface
tags: [backdrop-filter,legibility,photography,contrast,surface,type]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: [backdrop-blur-tier-system]
---
Copy over a photograph usually gets a plate, and the plate breaks the picture.
Give the text block itself a `backdrop-filter` and no background at all: the
image keeps its brightness and its frame, and only the detail beneath the words
goes quiet. Blur is an average, so it removes busyness without removing
luminance — contrast stays unsolved until a second term in the same filter list
commits to it. Blur 8–24px, `brightness(.55–.75)` over light imagery.

```css
.copy { background: none; backdrop-filter: blur(16px) brightness(.65) }
```
⚠ The filter stops at the element's box, printing a rectangle of smooth into a
detailed picture — pad 1–2rem past the text and feather the edge with a mask.
One compositing layer per block, so not for long-form running text.

Fixed chrome over imagery wants the filter only part of the time. At the top of
a page the bar sits on a picture chosen to hold it, and a top-down gradient
scrim — weighted behind the links, gone by the bar's own lower edge — buys
legibility with no edge and no compositing layer at all. Add the
`backdrop-filter` from a scroll-state class past 30–60px, where the bar begins
overlapping content it does not control, so the expensive layer exists only
while it earns its keep.
```css
.bar          { background: linear-gradient(#0d121bcc, #0d121b00);
                transition: background-color .3s }
.bar.scrolled { backdrop-filter: blur(10px); background: #10151ed9 }
```
⚠ Transition the background colour, not the filter — animating
`backdrop-filter` recomposites everything under the bar every frame.

Where the busy ground is not one picture but a full-page generative field, the
veil belongs to the *reading column*, not to each block: one fixed element the
width of the measure, spanning the viewport, feathered to nothing on its left
and right edges. Blur as little as 1px — enough to kill fine texture without
touching luminance — over 15–20% white. One compositing layer serves the whole
document, the field keeps its density everywhere else, and the veil never reads
as a box because it has no edge where the eye looks.
```css
.veil { position: fixed; inset-block: 0; width: min(1040px, 94vw);
  background: #fff3; backdrop-filter: blur(1px);
  mask-image: linear-gradient(to right, transparent, #000 16%, #000 84%, transparent) }
```
⚠ Below the column's own breakpoint the veil is the viewport — drop the mask and
raise the alpha instead, or the feather eats the first and last characters.

Over *moving* footage the argument inverts. A blur is recomposited against every
decoded frame, and an alpha tuned against one frame fails against the brightest —
the two answers above are the expensive and the unreliable one. Take the plate,
and stop it breaking the picture by shrink-wrapping each line instead of the
block: a set of tight opaque runs interrupts the frame in slivers, and the gaps
between them are where the footage still reads. Padding 0.4–0.8em, one radius.
```css
.line { display: table; background: var(--paper); border-radius: .6rem;
        padding: .45em .8em; margin-block-end: .5rem }
```
⚠ `display: table` shrink-wraps but drops out of a flex row — wrap each line in
its own block. Ragged plate edges are the point; centred text makes them noise.
