---
id: aspect-locked-media
category: media
tags: [layout,media,cls]
axes: none
cost: 1
seen: 7
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

Where the slot's height is set by a sibling rather than by itself — a media
panel beside a column of copy — swap the ratio for a floor at that breakpoint
(`aspect-ratio: auto` plus `min-height`), or a wide ratio on a wide column
makes the panel absurdly tall. Same purpose, different reservation: the floor
still holds the space before content arrives.
