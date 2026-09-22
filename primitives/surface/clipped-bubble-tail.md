---
id: clipped-bubble-tail
category: surface
tags: [surface, clip-path, message, pseudo-element]
axes: {energy: 2, density: 2, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A message bubble's tail needs no border triangle or SVG. Hang a small square
pseudo-element off the bottom corner, fill it from the bubble's own token, and
clip it with a three-point polygon whose third vertex sits part-way up the edge
so the hook sweeps back into the bubble. Drop that corner's radius to 4–6px.
Square 10–14px; offset −4 to −6px; third vertex 65–80%.

```css
.msg { border-radius: 22px 22px 5px 22px; background: var(--msg) }
.msg::after { content: ""; position: absolute; right: -5px; bottom: 0;
  width: 12px; height: 12px; background: var(--msg);
  clip-path: polygon(0 0, 100% 100%, 0 72%) }
```
⚠ `clip-path` clips the pseudo's shadow; shadow the bubble with `filter:
drop-shadow` instead.
