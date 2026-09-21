---
id: media-scoped-preload-tier
category: perf
tags: [perf,loading,images,responsive,resource-hints,critical-path]
axes: none
cost: 1
seen: 6
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

Width is only one axis the predicate can split on. `min-resolution` picks the
retina tier of the same crop and `max-aspect-ratio` separates a tall phone from
a short landscape window — conditions no `srcset` descriptor can express, since
`srcset` chooses a *size*, not a different picture. Give the default tier the
negation of every narrow predicate and hand it `imagesrcset`/`imagesizes`, so
the wide case still gets width-based selection. The tiers are then provably
exclusive and exactly one fetch starts.
```html
<link rel=preload as=image fetchpriority=high href="/lo/sky.webp"
  media="(max-width: 480px) and (max-aspect-ratio: 3/5) and (max-resolution: 2dppx)">
<link rel=preload as=image imagesrcset="/half/sky.webp 800w, /sky.webp 1600w"
  imagesizes="100vw" media="not all and (max-width: 480px) and (max-aspect-ratio: 3/5)">
```
⚠ Resolution boundaries need the same fractional care as widths —
`2dppx` / `2.01dppx`, never `2` / `2`, or a 2dppx screen matches both and
preloads two tiers.

A warm started from script — `new Image()` ahead of a loader that will request
the same file — only helps if both land on one cache entry, and the request's
CORS mode is part of that key. Warm without `crossOrigin` ahead of a texture or
font loader that sets it and the file is fetched twice at full size, the second
time on exactly the critical path the warm existed to clear. Copy the loader's
value onto the warm, including the empty-string case.
```js
const img = new Image(); img.crossOrigin = 'anonymous'   // === loader.crossOrigin
img.src = url
```
⚠ Placement decides whether it is a warm at all: a classic `<script>` cannot run
until every stylesheet declared above it has arrived, so one written below the
font links fires after them rather than at parse time. Put it first in the head,
above anything render-blocking.

Theme is a third axis, and it behaves unlike the other two. Crossing it with
width and resolution gives a tier per combination — eight is normal — and the
exclusivity rule has to hold across the whole product, not per axis. The catch
is that `prefers-color-scheme` describes the *system*, while an in-page theme
toggle overrides it: the warmed tier is then the one that never paints, and the
one that does paint starts cold on the critical path. Preload the theme axis
only where the page has no toggle, or where the choice is resolved server-side
into the markup before the preloads are written.
```html
<link rel=preload as=image href="/art-dark@2x.webp"
  media="(min-width: 768px) and (prefers-color-scheme: dark) and (min-resolution: 1.01dppx)">
```
⚠ Two axes double the tiers, three multiply them — past about six, generate the
list from the table rather than hand-writing it, because a gap in the coverage
is silent and a hand-edited predicate is where gaps come from.
