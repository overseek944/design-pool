---
id: clock-bucketed-scene-state
category: surface
tags: [surface,ground,state,root-attribute,progressive-enhancement,ambient]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Resolve the reader's hour into three to five named buckets, set it on the root
from a blocking inline script in the head, and let one CSS rule per bucket
decide which ground and palette show. Every variant ships in the document, so
the swap is a `display` change with nothing to fetch and no flash. Default in
the stylesheet on the attribute's *absence*, not in script: a dead runtime still
renders a scene, not an empty stage. Re-resolve on a 30–90s interval so a tab
left open crosses a boundary.

```html
<script>{const h = new Date().getHours()              /* before first paint */
  document.documentElement.dataset.hour = param('hour') /* ?hour=night wins */
    || (h < 11 ? 'dawn' : h < 17 ? 'noon' : h < 21 ? 'dusk' : 'night')}</script>
```
```css
.scene { display: none }
html:not([data-hour]) .noon, html[data-hour="dawn"] .dawn { display: block }
```
⚠ Preload only the default variant; preloading all of them spends every scene's
bandwidth to show one. Body text must clear 4.5:1 against every bucket.
