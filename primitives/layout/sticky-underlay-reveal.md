---
id: sticky-underlay-reveal
category: layout
tags: [layout,scroll,sticky,depth,css-only,section]
axes: {energy: 2, density: 1, weight: 3, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [overflow-clip-over-hidden]
tension: []
---
Invert the usual arrival: a panel placed *after* the content and stuck to the
bottom of the viewport is uncovered by the content scrolling off it, rather than
sliding in. Nothing animates and nothing is measured. Round the content's bottom
corners and pull it down over the panel by that radius, and the seam reads as a
lip lifting away instead of two blocks meeting. Panel height 150px–60svh.

```css
.wrap    { overflow: clip; isolation: isolate }
.content { position: relative; z-index: 1; border-radius: 0 0 var(--lip) var(--lip) }
.under   { position: sticky; bottom: 0; height: clamp(150px, 34vw, 60svh);
           margin-top: calc(-1 * var(--lip)); padding-top: var(--lip) }
```
⚠ `overflow: hidden` on the wrapper makes it the sticky scroll container and the
panel never sticks; `clip` does not. Drop to `position: relative` under
`prefers-reduced-motion` — the two layers travel at different rates.
