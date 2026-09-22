---
id: blend-seated-artwork-ring
category: media
tags: [media,blend-mode,border,detail,tokens]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A tile of supplied artwork needs a hairline to seat it, and one tint is wrong
for half a set: a light ring glares on dark art, a dark one boxes in pale art.
Blend the ring instead of the art. An overlay at `inset: 0` in `mix-blend-mode:
darken` keeps the border only where the artwork underneath is lighter than it
and vanishes everywhere else, so one declaration seats every tile. The mark
itself is untouched, which the licence usually requires. Flip to `lighten` on a
dark ground. Ring alpha 8–20%; tiles 16–48px.

```css
.tile      { position: relative; border-radius: var(--r) }
.tile::after { content: ""; position: absolute; inset: 0; border: 1px solid var(--border);
               border-radius: inherit; mix-blend-mode: darken; pointer-events: none }
.dark .tile::after { mix-blend-mode: lighten }
```
⚠ The blend is clamped by the nearest stacking context — one ancestor with
`isolation: isolate`, a transform, a filter or `opacity < 1` silently turns the
ring solid. Art that reaches the tile's own edge eats the ring there.
