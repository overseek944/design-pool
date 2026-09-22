---
id: open-state-content-defocus
category: interaction
tags: [overlay,drawer,menu,blur,focus,depth,state]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: [inert-tracks-opacity]
tension: []
---
A drawer opened from fixed chrome can push the page back by blurring the
content element itself — `filter` on `main`, not a `backdrop-filter` scrim — so
chrome and drawer stay sharp with no extra layer. Key it on a root attribute the
open state writes. Blur 6–12px over 200–350ms; drop it where the drawer covers
the viewport.

```css
main { transition: filter .3s cubic-bezier(.4,0,.2,1) }
body[data-drawer-open] main { filter: blur(10px) }
@media (max-width: 767px) { body[data-drawer-open] main { filter: none } }
```
⚠ Re-rasterises the page per frame, and breaks `position: fixed` descendants.
Blurred content stays focusable — add `inert`.
