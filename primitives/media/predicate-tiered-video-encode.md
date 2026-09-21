---
id: predicate-tiered-video-encode
category: media
tags: [media,video,responsive,performance,bandwidth,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A `<video>` has no `srcset` and no `sizes`, so nothing picks an encode for it —
every tier has to be a media query on a `<source>`, first match wins. Width
alone is the wrong predicate: a 3× phone reports 390px and a 1× monitor reports
2400px, and only the pair separates them. Order heaviest first and leave the
smallest encode unconditional. Three or four tiers across roughly 720p–2160p.

```html
<video autoplay muted loop playsinline poster="/still.jpg">
  <source src="/loop-2160.mp4" media="(min-resolution: 2dppx) and (min-width: 1800px)">
  <source src="/loop-1080.mp4" media="(min-resolution: 1.5dppx) and (min-width: 800px)">
  <source src="/loop-720.mp4"></video>
```
⚠ `media` on a `<source>` is evaluated once, at load — a window dragged to
another display keeps the encode it started with, and only an explicit `load()`
re-picks, which restarts playback. The poster is not optional: nothing paints
until the chosen file holds a frame.
