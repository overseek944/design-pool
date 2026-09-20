---
id: aspect-locked-media
category: media
tags: [layout,media,cls]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Lock every media slot with an explicit `aspect-ratio` and let width drive height.
Kills layout shift and lets odd editorial crops (`320/110`, `16/10.5`, `5/2`)
become a deliberate rhythm rather than whatever the asset happened to be.
```css
.slot { aspect-ratio: 16/10.5 }
```
