---
id: destination-miniature-menu-card
category: interaction
tags: [navigation,menu,mega-menu,preview,mock,recognition,card]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
In a menu of product destinations, a name plus one line of copy makes the reader
read every option. Give each card a thumbnail that is a small copy of the
destination's main screen: a list, a meter, a stat row, drawn in live DOM at
6–8px on the page's own tokens. Readers can then pick by recognising the screen,
and a token change restyles every thumbnail. Thumb 120–160 × 64–96px beside the
label.

```css
.menu-card { display: flex; gap: .75rem }
.menu-card .mini { flex: none; width: 140px; height: 80px; overflow: hidden;
  font-size: 7px; border-radius: 12px }
```
⚠ Mark the miniature `aria-hidden`: its invented rows would otherwise become each
link's accessible name. Drop it below about 480px.
