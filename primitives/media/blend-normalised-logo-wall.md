---
id: blend-normalised-logo-wall
category: media
tags: [media,logos,blend-mode,assets,normalisation]
axes: none
cost: 1
seen: 6
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

Desaturate before blending and both remaining failure modes go at once:
`grayscale(1)` makes every mark one neutral, so nothing is eaten for being the
wrong hue and no brand colour shifts against the tint. The row reads as one set
rather than a scatter of competing palettes. It costs the colours — the right
trade in a proof row, the wrong one in a partner directory. Opacity 0.85–0.95
so the marks sit behind the copy.
```css
.wall img { filter: grayscale(1); mix-blend-mode: multiply; opacity: .88 }
```

When every mark must land on one flat colour, `brightness(0)` collapses any
artwork — colour, gradients, a photographic lock-up — to solid black in one
pass, and `invert(1)` after it makes that white for a dark ground. It is the
blunt end of the same problem the blend modes solve, and the right tool where
the row is a texture rather than a set of brands: nothing is eaten for being
the wrong hue because nothing keeps a hue at all. This is also the reason
`grayscale(1)` above does not settle an uneven row on its own — grayscale keeps
luminance, so a yellow mark stays pale beside a navy one and the weights still
scatter. Crushed flat, one `opacity` sets the weight for the whole set:
0.4–0.6 behind copy, 0.7–0.9 where the names carry the argument.
```css
.wall img { filter: brightness(0) invert(1); opacity: .5 }  /* drop invert on light */
```
⚠ Alpha survives and luminance does not, so any mark carrying meaning in its
colour — a status dot, a two-tone lock-up — becomes one silhouette. Check that
counter-shapes are real holes in the asset and not light fill.
