---
id: mark-summoned-asset-menu
category: interaction
tags: [brand,logo,context-menu,download,menu]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Right-clicking a logo usually means someone wants the logo. Catch `contextmenu`
on the header mark only and open a small menu at the pointer: SVG, PNG,
dark-ground variant, link to the brand page. Clamp it 8px inside the viewport,
and close it on outside click, Escape, scroll and resize. Keep it to 2–4 items.

```js
mark.addEventListener('contextmenu', e => { e.preventDefault(); open(e.clientX, e.clientY) })
menu.style.left = Math.min(x, innerWidth - menu.offsetWidth - 8) + 'px'
```
⚠ This replaces the native link menu (open in new tab, copy link), so put those
back as menu items. Handle the keyboard's context-menu key, whose coordinates are
0,0, by anchoring to the mark. Fetch downloads as a blob, or they open in a tab.
