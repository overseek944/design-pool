---
id: character-grid-as-texture
category: type
tags: [type,texture,ornament,ascii]
axes: {energy: 3, density: 5, weight: 2, finish: 3}
cost: 2
seen: 2
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
