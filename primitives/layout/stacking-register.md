---
id: stacking-register
category: layout
tags: [architecture,z-index,tokens,correctness,overlay]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One file owns every stacking value in the product as named tokens, and no
component may write a raw `z-index` again. Leave wide gaps between bands so a
new surface can be inserted without renumbering, order them by how modal the
thing is, and keep a debug band above everything so instrumentation always
draws on top. The names are the documentation: the register is the
interaction hierarchy, readable without opening a component.

```css
:root {
  --z-header: 100; --z-overlay: 500; --z-popover: 600;
  --z-dialog: 700; --z-toast: 800; --z-tooltip: 1100;
  --z-skip-nav: 5000; --z-debug: 11000;
}
```
⚠ A token is useless across a stacking context boundary — `transform`, `filter` or `will-change` on an ancestor traps a child below unrelated siblings whatever its value.
