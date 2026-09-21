---
id: background-format-negotiation
category: media
tags: [media,images,formats,correctness,progressive-enhancement]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

An image that must composite with its own scrim in one paint cannot be a
`<picture>` — the gradient and the photograph are layers of a single
`background` shorthand, and no element sits between them. `image-set()` restores
format negotiation inside CSS: list AVIF, WebP and a baseline JPEG with explicit
`type()` and the engine takes the first it can decode, typically 40–60% of the
JPEG's bytes. Older engines need the whole shorthand repeated with the
`-webkit-` prefix, which means the scrim is authored twice — derive both from
the same tokens or they drift the day it changes.

```css
.hero {
  background: linear-gradient(var(--scrim-a), var(--scrim-b)),
    image-set("/h.avif" 1x type("image/avif"), "/h.webp" 1x type("image/webp"),
              "/h.jpg" 1x type("image/jpeg")) 50% / cover no-repeat }
```
⚠ `type()` is not optional — without it an engine may fetch a format it cannot
decode and paint nothing. There is no `sizes` equivalent, so resolution tiers
need `2x` descriptors or a media query, and a background image is never
preloaded by the parser: pair it with `<link rel=preload as=image>`.
