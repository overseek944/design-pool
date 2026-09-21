---
id: em-reserved-swap-height
category: layout
tags: [layout,layout-shift,responsive,correctness,tabs]
axes: none
cost: 1
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
Content that swaps in place — a tab's copy, a rotating claim — changes line
count, and everything below it jumps. Reserve the tallest variant on the
container with `min-height` in `em`, not `px`: the reservation is then a count
of lines and survives a fluid type scale and a reader's own font size. That
count is not constant across widths — three lines in a wide column is six in a
narrow one — so restate the value per breakpoint instead of reserving the
mobile worst case everywhere.
```css
.swap > p { min-height: 4.8em }                       /* 3 lines at 1.6 */
@media (max-width: 640px) { .swap > p { min-height: 6.4em } }
@media (max-width: 480px) { .swap > p { min-height: 8em } }
```
⚠ Reserved space is dead space while the short variant shows. Past roughly two
surplus lines, cross-fade through a shared box instead of swapping in place.

The same reservation runs on the inline axis for a state marker. Give the marker
a permanent `em`-square box in the flow — never shrinking, sized in `em` so it
tracks the type it labels — and change only its opacity: the row never reflows
when the selection moves, and the marker rescales with a fluid heading for free.
0.35–0.5em reads as a mark beside text without becoming a bullet.
```css
.item       { display:flex; align-items:center; gap:.5em }
.item .mark { flex:none; inline-size:.4em; block-size:.4em;
              opacity:0; transition:opacity .2s }
.item[aria-current] .mark { opacity:1 }
```
⚠ Opacity leaves the marker in the accessibility tree and in the hit area —
`aria-hidden` it and let `aria-current` carry the state to a reader.

The cross-fade that ⚠ above sends you to needs no reservation at all: put every
variant in the *same* grid cell and the container is already as tall as the
tallest, measured rather than guessed. Only the active one is opaque, and the
box never resizes because all of them are always in flow. This beats an `em`
count wherever the variants differ by more than about two lines, or whenever
their length is not known at authoring time.
```css
.swap       { display: grid }
.swap > *   { grid-area: 1 / 1; transition: opacity .5s ease-out }
.swap > [data-active="false"] { opacity: 0; pointer-events: none }
```
⚠ Zero-opacity copies stay readable to a screen reader and findable by
find-in-page. `aria-hidden` the inactive ones and mark the container
`aria-live="polite"` so the swap is announced once, not four times.

Where the swap is a cut rather than a cross-fade, `visibility: hidden` is the
better hide than zero opacity and answers that ⚠ for free: it takes the inactive
copies out of the accessibility tree, out of find-in-page and out of the tab
order in one declaration, while still contributing height to the shared cell.
`aria-hidden` and `pointer-events` then become belt and braces rather than the
fix. It cannot be transitioned across, which is exactly the case where nothing
is transitioning.
```css
.swap > [data-active="false"] { visibility: hidden }
```
⚠ Not interchangeable with the opacity form — `visibility` is discrete, so a
fade written against it snaps. Pick one per component and say which.
