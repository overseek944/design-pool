---
id: unit-grid-bitmap-lettering
category: type
tags: [type,wordmark,svg,pixel,asset-free]
axes: {energy: 2, density: 3, weight: 4, finish: 2}
cost: 2
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Draw a wordmark as filled cells on a small integer grid — a `viewBox` six to
ten units tall, glyphs built from 1×1 rectangles — and set `shape-rendering:
crispEdges`. Sized by height with `width: auto`, the steps stay hard at every
scale instead of softening into anti-aliased ramps, so one node gives a bitmap
face that is exact at 28px and at 200px with no font file, no FOUT and no
fallback metrics to match. A second path of scattered single cells in a dimmer
tone reads as edge bleed and stops the letterforms looking machine-clean;
10–20% of the perimeter is enough.

```svg
<svg viewBox="0 0 44 8" shape-rendering="crispEdges" aria-label="Name"
     style="height:clamp(28px,6vw,68px);width:auto">
  <path d="M2 0h7v1h-7zM1 1h8v1h-8z" fill="currentColor"/>
  <path d="M1 0h1v1h-1zM12 0h1v1h-1z" fill="currentColor" opacity=".55"/>
</svg>
```
⚠ It is a picture, not text — carry the name in `aria-label` and it will not be
found by in-page search. Below ~3px per cell the grid stops resolving.

Ship the grid as a font instead and the trade inverts: real selectable,
findable, translatable text that wraps and reflows, against a webfont request
and fallback metrics that will not match. The mark then becomes a face-level
choice rather than path data — square, circle, triangle, line or an open grid —
so one headline reads as a bitmap, a stipple or a scatter of plotted points with
no change to the markup. Pick the mark against whatever sits behind it.
```css
@font-face { font-family: Dots; src: url(dots.woff2) format("woff2");
             font-display: swap; size-adjust: 106% }
h1 { font-family: Dots, ui-monospace, monospace; letter-spacing: .02em }
```
⚠ Pixel faces carry almost no hinting, so the marks alias into uneven rows under
fractional scaling — set them at whole pixel sizes, or above ~32px where the
error stops resolving. `font-display: swap` will flash a proportional fallback.

Ship the same grid as DOM cells rather than SVG paths and the trade changes
again: one element per cell over `repeat(var(--cols), minmax(0, 1fr))`, each
glyph row authored as a string of `0`/`1`. It costs a node per cell — a short
word is 200–400 — but every cell is then addressable, so the lettering can phase
in per pixel, resolve a letter at a time, or carry *content* in the ink: fill the
on-cells with digits, ticks or a sampled value and the word is made of the data
instead of sitting beside it. Transition 60–120ms per cell.
```css
.plate { display: grid; grid-template-columns: repeat(var(--cols), minmax(0,1fr)) }
.cell  { text-align: center; opacity: .4; transition: opacity 80ms linear, color 80ms }
.cell--on { opacity: 1; color: var(--accent) }
```
⚠ It is a picture made of characters, so a reader hears the ink spelled out cell
by cell — `aria-hidden` the whole plate and carry the real word in a
visually-hidden node beside it.
