---
id: measured-shared-menu-panel
category: interaction
tags: [navigation,menu,mega-menu,dropdown,transition,measurement]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Header menus of different sizes can share one panel. Anchor a single container
at a fixed inline start, measure the entering menu's content and transition only
width and height to it: moving between triggers reshapes one surface instead of
swapping boxes. A short intent delay stops a pointer crossing the bar from
flickering through every menu. Resize 250–350ms, intent 100–180ms.

```js
const r = item.firstElementChild.getBoundingClientRect(); // item shown, panel clipped
panel.style.width  = r.width  + padX + 'px';
panel.style.height = r.height + padY + 'px';
```
⚠ Height and width transitions relayout every frame — keep the panel's subtree
small, and let keyboard users open it without the delay.
