---
id: fixed-stage-pane-scroll
category: layout
tags: [layout,grid,scroll,shell,navigation]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A page may decline to scroll. Fix the shell to the viewport as a clipped grid
and give each pane its own scroller. Navigating replaces one pane while the
other — a running demonstration, a map — keeps state and never remounts, which
is the whole argument for it. Hold the split in a variable so the reading pane
claims a *larger* share as the window narrows: 50% wide, 52–56% by the width
before it stacks.

```css
.stage { position: fixed; inset: 0; overflow: clip; display: grid;
         grid-template-columns: minmax(0,1fr) minmax(0, var(--split,50%)) }
.pane  { min-height: 0; overflow-y: auto; overscroll-behavior: contain }
```
⚠ Without `min-height: 0` a child grows instead of scrolling. This gives up the
mobile URL-bar collapse and page-wide find; a pane holding nothing focusable
needs `tabindex="0"` to scroll from the keyboard.
