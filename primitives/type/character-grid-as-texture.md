---
id: character-grid-as-texture
category: type
tags: [type,texture,ornament,ascii]
axes: {energy: 3, density: 5, weight: 2, finish: 3}
cost: 2
seen: 11
requires: []
conflicts: []
completes: []
tension: []
---
A field of monospace glyphs (`+ x X 8 0 @ # % $`) on a grid, used as background
ornament. Gets pattern and motion with zero image weight, is animatable per cell,
and inherits the page's type colour automatically.

At icon scale the same idea drops the glyphs: a 5–9 cell square grid of 1–3px
spans, all `currentColor`, reads as a dot-matrix mark that inherits colour and
needs no asset. Fade it under a gradient mask so it dissolves rather than ending
on a hard column, and it becomes an affordance — a button's trailing mark, a
link's prefix — instead of an icon that must be drawn.
```css
.dots { display: grid; grid-template: repeat(7, 2px) / repeat(7, 2px); gap: 1px;
  mask-image: linear-gradient(90deg, #000 15%, #000000db 62%, transparent) }
.dots > span { background: currentColor }
```
⚠ Decorative — `aria-hidden`, and never the only thing carrying a label.

Full-bleed behind copy, cap alpha at 0.25–0.4 — a light colour alone breaks the
contrast floor under a dense patch.

Pick the glyphs for their *ink density* and the field becomes a gradient rather
than a uniform wash: a ramp like `. : + = # @` run left to right inside one
`<pre>` with `white-space: pre` and `line-height: 1` reads as a band fading
across the panel. One node, no grid, no per-cell spans, and it re-flows to
nothing on a narrow viewport because it simply clips. Alpha 0.04–0.08 against a
near-black ground; the ramp stops reading as texture and starts reading as
content much above that.
```css
.band { white-space: pre; line-height: 1; font-size: 10px;
        color: color-mix(in oklab, currentColor 5%, transparent) }
```
```
  ....:::+++==+++:....        ..:++==++:..
```
⚠ Literal characters — `aria-hidden` the block or a screen reader spells the
ramp out, and keep it clear of anything selectable.

The same field drawn as a *figure* rather than a ground replaces an icon: a
12–20 line block of characters composed into a recognisable object, set in the
card's mark slot at 6–9px with `line-height` one pixel above the size so the
cells stay square-ish. It carries no asset, inherits the type colour, and is
crisp at every device ratio — and because it is text it needs a smaller step at
narrow widths or it wraps and the drawing collapses. Drop one step, never
scale: a fractional font-size breaks the grid.
```css
.figure { white-space: pre; font: 8px/9px var(--mono); overflow: hidden }
@media (width <= 640px) { .figure { font-size: 6px; line-height: 7px } }
```
⚠ `aria-hidden` and `overflow: hidden` both — one stray long line reflows the
whole card.

A fixed character grid does not have to be stepped by breakpoint. Because every
cell is one advance wide and one line tall, the size that exactly fills a box is
solvable: make the slot a *size* container and take the smaller of the two axis
solutions, dividing by the mono face's advance ratio and by the line-height. The
drawing then fills any box at any width with nothing clipped and nothing
reflowed, and the rows and columns arrive as data beside the art.
```css
.stage  { container-type: size; overflow: hidden }
.figure { white-space: pre; line-height: 1.08; font-variant-ligatures: none;
  font-size: min(100cqw / var(--cols) / .62, 100cqh / var(--rows) / 1.1) }
```
⚠ The `.6` advance ratio is per face — measure it, do not assume. `container-type:
size` needs a definite height from above, so the slot wants an explicit
`clamp()`; without one the container has no height and the type collapses to zero.

A field that has to *change* — warped under the pointer, rewritten row by row —
should not hold its glyphs as text. Carry each row in an attribute and paint it
with `content: attr()`: an update is one attribute write with no text node to
invalidate, the characters are unselectable and invisible to find-in-page, and
the served markup stays one line per row.
```css
.row         { display: block; white-space: pre }
.row::before { content: attr(data-line) }
```
⚠ Literal characters are indexable whatever element holds them, and a large
glyph figure can be lifted into a search result ahead of the real copy.
`aria-hidden` stops a screen reader, not a crawler — `data-nosnippet` on the
wrapper does.

Once the field is coloured *and* animated, the cost is node count, not glyph
count: a span per cell is tens of thousands of nodes rebuilt every frame. Emit
one span per colour *run* instead — walk the row, hold the current index, and
close the span only where it changes. A field of a few thousand cells collapses
to a few dozen nodes a row, because a field with any structure at all is mostly
runs. Build the row as one string and assign `innerHTML` once per frame.
```js
if (c !== cur) { line += cur < 0 ? run : `<span style="color:${PAL[cur]}">${run}</span>`
  run = ''; cur = c }
run += ch
```
⚠ Interpolating a palette entry into markup is a string written into `innerHTML`
every frame — index a fixed array, never anything a reader can reach.

The breakpoint step fails below the engine's minimum font size, where a 3px
glyph is rendered at the floor and the grid overflows. Set the figure at a whole
size — 10–14px, `line-height` equal to it — and shrink it with a `transform:
scale()` instead: 0.14–0.35 is typical, stepped per breakpoint. The grid stays
exact because it is laid out at full size, and a scale is composited rather
than reflowed.
```css
.figure { font: 12px/12px var(--mono); transform: scale(var(--s, .25));
  transform-origin: center; transition: transform .5s ease-out }
```
⚠ Layout still reserves the unscaled box — position it absolutely inside a sized
slot, or a 3,000px-wide `<pre>` pushes the page sideways.
