---
id: character-grid-as-texture
category: type
tags: [type,texture,ornament,ascii]
axes: {energy: 3, density: 5, weight: 2, finish: 3}
cost: 2
seen: 6
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
