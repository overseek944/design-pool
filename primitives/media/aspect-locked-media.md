---
id: aspect-locked-media
category: media
tags: [layout,media,cls]
axes: none
cost: 1
seen: 44
requires: []
conflicts: []
completes: []
tension: []
---
Lock every media slot with an explicit `aspect-ratio` and let width drive height.
Kills layout shift and lets odd editorial crops (`320/110`, `16/10.5`, `5/2`)
become a deliberate rhythm rather than whatever the asset happened to be.
```css
.slot { aspect-ratio: 16/10.5 }
```

Where the slot's height is set by a sibling rather than by itself — a media
panel beside a column of copy — swap the ratio for a floor at that breakpoint
(`aspect-ratio: auto` plus `min-height`), or a wide ratio on a wide column
makes the panel absurdly tall. Same purpose, different reservation: the floor
still holds the space before content arrives.

Where several layers stack in one slot — a poster, a skeleton, a live frame
that replaces both — give them one ratio token rather than one literal each.
The layers cannot drift, and changing the product's stage shape is a single
edit instead of a search. `aspect-ratio: var(--stage-aspect)` on every layer,
the token defined once beside the spacing scale.

Where the reservation has to survive before any stylesheet or script runs — a
lazy swap that sets `src` late, or a first paint that beats the CSS — put the
ratio inside the placeholder rather than around it. A content-free SVG data URI
carrying the *final* asset's `viewBox` and dimensions is an intrinsic ratio the
element already has, at roughly 100 bytes and no request. A 1×1 transparent GIF
reserves a square and collapses on swap.
```html
<img width="1159" height="430" src="data:image/svg+xml,%3Csvg%20xmlns=
  'http://www.w3.org/2000/svg'%20viewBox='0%200%201159%20430'/%3E" data-src="…">
```
⚠ The placeholder's numbers must match the real asset — a stale ratio is a
shift that no `aspect-ratio` rule above it can correct.

A third-party widget is the same reservation with a different source of truth.
You do not control what it renders, but its size variants are documented and
fixed, so hold one map from variant name to box and let the same entry both size
the host element and configure the widget — the reservation cannot then drift
from what arrives. Give an invisible variant a real `0 × 0` box with
`overflow: hidden` rather than `display: none`, or a widget that decides to
render a challenge has nowhere to put it.
```js
const BOX = { normal: [300, 65], compact: [150, 140], invisible: [0, 0] }
```

A script-drawn stage is a media slot with no intrinsic size at all: a canvas
sized only from JavaScript is zero-height until the first measure, so the page
reflows on hydration and the `ResizeObserver` gets a useless first tick. Put
the ratio and a pixel floor on the *container* and let the canvas fill it
absolutely — the box then exists at first paint, before any script, and every
later measurement reads a real rectangle.
```css
.stage  { position: relative; aspect-ratio: 16 / 8.6; min-height: 220px }
.stage > canvas { position: absolute; inset: 0; width: 100%; height: 100% }
```
⚠ The floor matters more than the ratio on a narrow screen, where a wide ratio
collapses the stage to a strip — restate both at the mobile breakpoint.

A ratio is the wrong reservation when peer slots hold assets of unrelated
shapes — a tall object, a wide one, and a card carrying no asset at all.
`aspect-ratio` ties the slot's height to its own column width, so cards at
different widths put their media at different heights and the row loses its
internal alignment. A fixed band of 140–200px with the content centred and
`object-fit: contain` inside it aligns them, and gives an empty card somewhere
to say it is empty. The reservation is preserved either way — a declared height
is not a collapsed one.

Which ratio is right is a function of the column's share of the viewport, not of
the picture. A slot inside a 30–40% track can be near-square for very little
scroll; the same ratio full-bleed on a phone is most of the screen and the
reader scrolls past a wall to reach the next sentence. Widen the crop as the
column widens relative to the viewport — roughly 1.2 in a third-width track,
1.4–1.7 at full bleed — and the image holds a near-constant fraction of the
screen at every width.
```css
.plate { aspect-ratio: 1.22 }
@media (width <= 37.5rem) { .plate { aspect-ratio: 1.4 } }
```
⚠ Under `object-fit: cover` a restated ratio is a re-crop: pair each with an
`object-position` that keeps the subject inside the narrower band, or widening
silently cuts the top of the frame.

Where the ratio is not known until the asset arrives — a player handed an
arbitrary recording — the lock has to come from the source. Read
`videoWidth/videoHeight` on `loadedmetadata` and write `aspect-ratio` on the
frame, holding a declared default until then so the space is still reserved.
The frame matches the recording instead of letterboxing it; pick the default
from whatever most of the library is in, 16/9 or 4/3.
```js
v.addEventListener('loadedmetadata', () => { if (v.videoWidth)
  frame.style.aspectRatio = `${v.videoWidth} / ${v.videoHeight}` })
```
⚠ Guard on a non-zero width — the event also fires after an error recovery and
on a source swap, and `0 / 0` collapses the frame to nothing.

Where one slot is fed a set whose ratios differ — several clips behind one stage
— measure rather than declare. Mount a throwaway element per source at
`preload="metadata"`, read `videoWidth / videoHeight` on `loadedmetadata`, write
the ratio per source, then dispose the probe. Keep a declared fallback for first
paint so the box is reserved before any probe lands.
```js
const p = document.createElement('video'); p.preload = 'metadata'; p.src = src
p.onloadedmetadata = () => set(r => ({ ...r, [src]: p.videoWidth / p.videoHeight }))
```
⚠ One metadata request per source — worth it for a handful, never for a grid.
The fallback has to be within ~10% of the real ratio or the correction is
itself the shift this primitive exists to prevent.

Where the real extent is only known at runtime and is usually *smaller* than the
slot — a transcript, a log, a recorded session that has printed six of its forty
rows — the ratio is a floor rather than a lock. Reserve it, then measure the
last line carrying anything and write a height clamped between the reserved box
and the full extent, so the panel occupies what it is actually showing and still
never shifts the page below it. Write the height only when the measured value
changes, or the loop costs a style recalc every frame.
```js
const want = Math.max(slot.clientHeight, Math.min(full, tail.bottom - top + tail.height))
if (want !== prev) { prev = want; stage.style.height = want + 'px' }
```
⚠ This grows the page under a reader who is already on it — right for a panel
below the fold or one they started, wrong above it. Grow only, never shrink, or
content clearing re-collapses the panel with the pointer still inside it.
