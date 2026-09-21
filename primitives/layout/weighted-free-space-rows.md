---
id: weighted-free-space-rows
category: layout
tags: [layout,grid,responsive,rhythm,measurement]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A block sized to the viewport has leftover height; fixed gaps pool it all at one
end — under the last line, where it reads as the section running out. Give the
gaps that slack instead. `fr` rows size from free space, so `auto 2fr auto 1fr
auto` keeps one proportion at every window height, and `minmax()` floors each
gap so a short window compresses rather than collapses. Weights 1–3, floors near
one line of the text they separate.

```css
.stage { display: grid; min-height: calc(100svh - var(--chrome));
  grid-template-rows: auto minmax(2rem, 2fr) auto minmax(1.5rem, 1fr) auto }
```
⚠ `fr` only shares out space the row has: under `height: auto` every gap sits at
its floor. The flex form — empty children at `flex: 2` and `flex: 1` — costs a
node and a `min-height` per gap.
