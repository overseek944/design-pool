---
id: blend-normalised-logo-wall
category: media
tags: [media,logos,blend-mode,assets,normalisation]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Supplied logo files arrive as opaque rectangles — baked-in white, arbitrary
padding — and you rarely control them. `mix-blend-mode: darken` over a light
ground discards every pixel lighter than the ground, so the boxes disappear and
the marks keep their own colour, with no re-cutting and no per-asset rule. On a
dark ground use `lighten`. Reach for it for assets that are not yours; for your
own, fix the file.
```css
.wall { background: var(--tint) }
.wall img { mix-blend-mode: darken; width: 100%; height: auto }
```
⚠ A genuinely light mark inside a logo is eaten too — check each one against
the ground you chose. Blending is clamped by the nearest stacking context, so
an ancestor with `isolation: isolate`, a filter, a transform or `opacity < 1`
silently turns the whole effect off.
