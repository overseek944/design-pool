---
id: unit-grid-bitmap-lettering
category: type
tags: [type,wordmark,svg,pixel,asset-free]
axes: {energy: 2, density: 3, weight: 4, finish: 2}
cost: 2
seen: 1
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
