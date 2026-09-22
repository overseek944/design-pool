---
id: document-underlay-window
category: layout
tags: [layout,stacking,reveal,video,section,fixed]
axes: {energy: 2, density: 1, weight: 3, finish: 4}
cost: 2
seen: 8
requires: []
conflicts: []
completes: []
tension: []
---
Give the document one fixed, full-viewport media layer at a negative stacking
level, then let every section paint its own opaque ground except the one that
should show it. No pin, no sticky, no scroll listener — the sections themselves
are the aperture. Several windows reveal the same continuous layer, which a
per-section background cannot do: the footage runs between them instead of
restarting. Gate playback on intersection or a covered video decodes for the
whole page.

```css
.underlay { position: fixed; inset: 0; z-index: -1; pointer-events: none;
            width: 100vw; height: 100svh; object-fit: cover }
.section  { background: var(--page) }
.section.window { background: transparent }
```
⚠ `z-index: -1` only reaches behind the page while no ancestor opens a stacking
context and `html`/`body` carry no background — one `transform` above it and the
layer disappears.

Scope the layer to a route wrapper at `z-index: 0` and lift its children to 1,
rather than putting it at −1 behind the document. The ⚠ above then cannot
fire: the wrapper is the stacking context, so a transform anywhere outside it
is irrelevant and `body` may carry whatever background it likes. It also buys
per-route underlays with no global state. Carry the wash as a second fixed
pseudo-element over the first — one flat 35–55% tint of the page ground — so
legibility is tuned by editing one alpha instead of re-exporting the picture.
```css
.route          { position: relative }
.route::before  { content:""; position: fixed; inset: 0; z-index: 0;
  pointer-events: none; background: url(x.jpg) center / cover }
.route::after   { content:""; position: fixed; inset: 0; z-index: 0;
  pointer-events: none; background: rgb(from var(--page) r g b / .44) }
.route > *      { position: relative; z-index: 1 }
```
⚠ Fixed children of a positioned wrapper still fill the viewport, not the
wrapper — the layer outlives the section unless the wrapper is the whole route.

Where the page is already a stack of opaque, margined blocks, no `.window` class
is needed: every gutter between them is an aperture, and the layer reads as a
rhythm of glimpses rather than one opening. The reveal is then edited in the
spacing scale — the margin between sections *is* how much of the layer is seen,
40–60px showing a sliver and 100–160px a passage — and rounded block corners let
it through at the shoulders, which reads as the layer passing behind rather than
through.
```css
.page > * { position: relative; z-index: 1; margin-block: clamp(40px, 6vw, 96px);
            border-radius: 32px; background: var(--page) }
```
⚠ It holds only while every block is genuinely opaque — one tinted or
translucent section and the layer runs behind body copy it was never
contrast-checked against.
