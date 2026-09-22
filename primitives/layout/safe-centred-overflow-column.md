---
id: safe-centred-overflow-column
category: layout
tags: [flexbox, overflow, centring, correctness, mobile]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A vertically centred flex column that grows taller than its box overflows out of
both ends, and the top half — usually the heading — lands above the scroll
origin where no scroll can reach it. The `safe` keyword falls back to start
alignment the moment content overflows and centres normally otherwise. Declare
the plain value first so engines without `safe` still centre.

```css
.panel { display: flex; flex-direction: column; overflow-y: auto;
  justify-content: center;
  justify-content: safe center; }
```
⚠ The fallback line still loses the top on old engines; where the content is
long on short screens, pad the panel by the fixed chrome's height as well.
