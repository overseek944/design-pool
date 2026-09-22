---
id: one-shot-cache-busted-retry
category: media
tags: [media,error,resilience,image,video,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One dropped connection or a 503 from the edge leaves an image broken for the
session: the browser caches the failure, and reassigning the same `src` is a
no-op it will not re-request. Retry under a URL that cannot hit that entry —
the same path with a throwaway query — behind a flag making it exactly once. A
transient fault costs one extra fetch; a real 404 costs one.

```js
let retried = false
img.addEventListener('error', () => { if (retried) return degrade()
  retried = true; img.src = src + (src.includes('?') ? '&' : '?') + 'r=1' })
```
⚠ Unflagged this is an infinite request loop against a missing file, invisible
until someone opens the network panel. The busted URL is a second cache entry —
re-point a source that will be shown again at the clean one.
