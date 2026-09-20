---
id: breakout-grid-named-lines
category: layout
tags: [layout,grid,tokens,architecture,full-bleed]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One grid on the page wrapper with named lines for the bleed gutters and the
content field: a child picks its width by naming a line instead of escaping with
negative margins. Derive the column track from the content width itself — max
width less margins less gutters, over the count — so full-bleed and in-grid
children share one rhythm.
```css
--col: calc((min(var(--max),100vw) - var(--margin)*2 - var(--gutter)*11)/12);
.page { display:grid; column-gap:var(--gutter); grid-template-columns:
  [full-start] minmax(0,1fr) [content-start] repeat(12,minmax(0,var(--col)))
  [content-end] minmax(0,1fr) [full-end] }
.hero { grid-column: full }  .prose { grid-column: content }
```
⚠ Clamp margin 32–80px, gutter 16–32px; hold the count fixed. `minmax(0,…)`
throughout — a bare `1fr` has an `auto` minimum, so one long string widens a
track.
