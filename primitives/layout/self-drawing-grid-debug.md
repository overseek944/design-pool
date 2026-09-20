---
id: self-drawing-grid-debug
category: layout
tags: [layout,grid,tooling,debug,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A layout system worth having can show its own work. One class recolours every
guide to a warning hue, tints occupied cells, and redraws as faint dashes the
edges the design deliberately suppressed — so a misplaced span is visible
rather than inferred. A corner pseudo-element prints the active breakpoint name
and fades out after a beat, which is what makes resize testing readable.

```css
.debug { --guide: rgb(255 204 109 / .7) }
.debug .cell { background: rgb(255 204 109 / .1) }
.debug [style*="border-right:none"] { border-right: 1px dashed rgb(255 204 109 / .12) }
.debug::after { content: "lg"; animation: fade 1.5s 1s ease-out forwards }
```
⚠ Gate it behind a build flag or a query parameter. Attribute-substring
selectors are slow enough to measure on a large grid, and the badge sits above
everything. Badge dwell 1–3s before the fade.
