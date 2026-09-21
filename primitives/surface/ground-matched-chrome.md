---
id: ground-matched-chrome
category: surface
tags: [chrome,nav,scroll,contrast,theme,accessibility]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Floating chrome crosses grounds it does not own. Rather than hunting one plate
that survives every section, give the bar two complete treatments — fill,
hairline, ink, focus ring — and let it adopt the one belonging to whatever is
under it. Sections declare their own tone; an observer whose root margin
collapses the viewport to the bar's band reports which is beneath. Cross-fade
140–260ms so the swap reads as passing under a seam.

```css
.bar[data-ground=dark]  { color: #f4f6ff; background: #080b126b; --ring: #4d9bff }
.bar[data-ground=light] { color: #1c1c1c; background: #fcfcfbdb; --ring: #06f }
```
⚠ Each treatment owes the full ratio on its own ground, focus ring included, or
keyboard focus vanishes across half the page. A section shorter than the bar is
never reported — fall back to the last tone, never to none.
