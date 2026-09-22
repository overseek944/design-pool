---
id: matted-opening-frame
category: layout
tags: [frame,viewport,hero,media,radius,safe-area]
axes: {energy: 1, density: 1, weight: 2, finish: 5}
cost: 1
seen: 11
requires: []
conflicts: []
completes: []
tension: []
---
Inset the opening frame from every viewport edge and the page background becomes
a mat: the media reads as a mounted print rather than an immersive bleed, and
the gutter is a safe zone no rounded display corner or browser chrome can eat.
Scale the inset with the viewport, 2–3% a side, and hold the radius constant at
12–20px — a radius that grows with the box changes the shape's character at
every width.

```css
.mat  { padding: 2.5vw; background: var(--page) }
.card { block-size: calc(100svh - 5vw); border-radius: 16px; overflow: clip }
```
⚠ Size against `svh`, never `vh`: the mobile toolbar eats the bottom gutter and
the mat stops being a frame. Rubber-band scroll reveals the canvas colour, so
`html` must carry the mat's colour rather than the last section's.

The mat does not have to be a box the content sits inside. Make it a `fixed`
layer at `inset: 8–16px` with the radius, behind everything at `z-index: 0`, and
the page ground shows in the gutter while sections scroll over it — no wrapper,
no clipping, no layout cost, and the rounded corners can never crop a sticky
header or a focus ring. It also becomes paintable: one element to recolour when
the page's register changes, where a padded mat would need every section's
ground rewritten.
```css
.mat { position: fixed; inset: .5rem; z-index: 0; border-radius: 1.5rem;
       background: var(--stage); pointer-events: none }
```
⚠ It is a backdrop, not a container — content is above it and will run into the
gutter unless the layout's own padding matches the inset. Two numbers to keep in
step; publish the inset as one custom property both read.

`svh` is unbounded at both ends, and the mat is where that shows: on a landscape
handset the frame collapses to a letterbox with no room for the copy inside it,
on a tall desktop display it grows past any composition it was drawn for. Clamp
it — `min-height` at the tallest arrangement the content can hold, `max-height`
where the frame stops reading as one view. 620–720px and 820–900px suit a
headline plus a short deck; the pair is content's, not the device's.
```css
.card { block-size: calc(100svh - 2 * var(--inset));
        min-block-size: 680px; max-block-size: 860px }
```
⚠ Once `min-height` wins, the frame is taller than the viewport and the bottom
gutter is below the fold — either accept it as a scroll cue or drop the mat
entirely under that height, never let it half-show.

One document serving more than one ground makes the root's colour conditional.
An app shell on tinted paper and a marketing shell on white are the same
`html`, so a fixed root colour shows the wrong one in the rubber-band gutter of
whichever route did not pick it. Derive it from whichever shell is currently
unhidden, and move `scrollbar-color` with it — the track is painted from the
root too, and a pale thumb on white is the tell.
```css
html:has(.marketing:not([hidden])) { background: #fff; scrollbar-color: #cfe0e0 #fff }
```
⚠ `:has()` on the root re-evaluates on every attribute flip in the document —
key it off one shell-level attribute, never off a state deep in the tree.

The mat is a material choice, not only a gutter. Run a photograph in it —
filling the frame, the mounted plate fully opaque on top — and a section carries
an image without one word ever sitting on one: the contrast problem a picture
creates never arises, because nothing legible touches it. A run of sections then
differentiates by ground alone while the plate stays identical, which reads as
one system rather than a series of treatments. Mat 24–56px, even on all sides;
an asymmetric mat reads as a misaligned crop, not as a mount.
```css
.mat        { position: relative; padding: clamp(24px, 3vw, 40px);
              border-radius: 14px; overflow: clip; isolation: isolate }
.mat > img  { position: absolute; inset: 0; inline-size: 100%;
              block-size: 100%; object-fit: cover }
.mat > .plate { position: relative; background: var(--panel) }
```
⚠ Decorative, so empty `alt` — and the plate has to be genuinely opaque; at even
95% the picture's detail sits behind live copy and the mat stops being a mat.
Still a full-size download per section, so gate it on `prefers-reduced-data`.

A mat in *front* of the page turns the whole viewport into a bezel that content
scrolls beneath. One fixed element draws only a ring: a two-layer mask with the
content box excluded from the full box. Push it R past every edge with radius 2R
and its outer curve falls offscreen — the viewport corners stay square while the
inner edge rounds to R − band. Band 3–10px, R 20–32px.
```css
.bezel { position: fixed; inset: calc(-1 * var(--R)); padding: calc(var(--band) + var(--R));
  border-radius: calc(2 * var(--R)); background: var(--accent); pointer-events: none;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); mask-composite: exclude }
```
⚠ The band hides whatever passes under it — scrollbars, sticky headers, focus
rings at the page edge. Inset those by the band.
