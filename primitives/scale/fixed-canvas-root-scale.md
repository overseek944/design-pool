---
id: fixed-canvas-root-scale
category: scale
tags: [scale,layout,proportion,transform,responsive]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: [zoom-as-reflowing-scale]
---
Author the page once at one pixel width and scale the whole canvas to the
viewport from the root. Nothing reflows and nothing is a token: radii, hairlines,
gaps and type all move by the same factor, so a composition is exact at every
width rather than approximately right. The design width is the decision: 1024–1440
keeps the factor near 1 where most readers sit.

```css
:root { --f: calc(100vw / 1280) }        /* .55–1.9 usable */
.canvas { width: 1280px; transform: scale(var(--f)); transform-origin: 0 0 }
.wrap   { height: calc(var(--authored) * 1px * var(--f)) }
```
⚠ A scaled box keeps its authored size, so the page under-scrolls above 1 and
overflows sideways below it — the wrapper height above is mandatory, not tidying.
Type sized this way ignores browser zoom and user font size: WCAG 1.4.4 risk, so
narrow widths need their own design width, not a smaller factor.
