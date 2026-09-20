---
id: media-scoped-preload-tier
category: perf
tags: [perf,loading,images,responsive,resource-hints,critical-path]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
When script picks among art-directed sources — an orientation crop, a resolution
tier — the browser cannot start that fetch until the bundle runs, so the opening
image lands after everything else. Put the same condition on a
`<link rel=preload>` as a `media` attribute and exactly one tier is warmed from
the first bytes of markup: no tier fetched twice, none guessed. The predicate
now lives in two places, so derive both from one table or they drift the day a
breakpoint moves.

```html
<link rel=preload as=image fetchpriority=high href="/wide/001.webp"
      media="(min-width: 1024px)">
<link rel=preload as=image href="/tall/001.webp"
      media="(max-width: 1023.98px) and (orientation: portrait)">
```
⚠ Write the boundary as `1024` / `1023.98`, never `1024` / `1023` — a
fractional viewport matches neither and preloads nothing. A tier preloaded and
not used is pure waste, and the console says so.
