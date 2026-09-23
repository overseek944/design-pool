---
id: stacked-layer-glyph-tint
category: type
tags: [type,ascii,glyph,mono,color,ornament]
axes: {energy: 1, density: 4, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A glyph figure in two or three inks does not need a span per run. Split it into
one monochrome `<pre>` per colour on an identical grid, with spaces where
another layer owns the cell, and stack the layers at the same origin. Each
layer is one text node, and a quiet ring and an accented core can fade or mask
independently. Use 2–4 layers, ground ink at 0.08–0.25 alpha and accent at
0.25–0.5.

```css
.fig > pre { position: absolute; inset: 0 auto auto 0; margin: 0;
  white-space: pre; font: 8px/1.26 var(--mono) }
```
⚠ Every layer must match face, size and line-height exactly, or the drawing misregisters. Put `aria-hidden` on the wrapper.
