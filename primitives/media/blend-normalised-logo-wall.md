---
id: blend-normalised-logo-wall
category: media
tags: [media,logos,blend-mode,assets,normalisation]
axes: none
cost: 1
seen: 2
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

Where blending cannot work — a dark or coloured ground, a set mixing dark and
light marks — re-ground each one instead: a small fixed-size light tile, radius
and padding from the same scale as the rest of the chrome, with the mark
`object-fit: contain` inside it. Every logo then sits on the ground it was drawn
for, and the uniform tile normalises wildly different aspect ratios for free,
where a height-sized row cannot. Tile 32–48px, inset 15–25% of it.
```css
.chip { width: 2.5rem; aspect-ratio: 1; display: grid; place-items: center;
  padding: .5rem; border-radius: var(--r-sm); background: #fff }
.chip img { width: 100%; height: 100%; object-fit: contain }
```
⚠ The tiles become the visual rhythm — a wordmark shrinks to illegibility inside
one, so pair each with a text label rather than relying on the mark alone.
