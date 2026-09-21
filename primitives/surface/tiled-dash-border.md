---
id: tiled-dash-border
category: surface
tags: [surface,border,dash,precision,texture]
axes: {energy: 1, density: 2, weight: 1, finish: 4}
cost: 2
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
`border-style: dashed` offers no control — dash length is derived from border
width, differs between engines, and the pattern almost never lands cleanly at a
corner. A small tile in `border-image` with the `round` keyword replaces it:
the tile is rescaled so a whole number fits each edge, giving identical dash
phase on all four sides at any length. Keep the `dashed` declaration underneath
as the fallback.

```css
.panel { border: 1px dashed var(--rule);
         border-image: var(--dash-tile) 2 round }
```
⚠ Tiles of 8–16px with a 1–2px slice; a larger slice inflates the border box
and shifts the layout. An image cannot inherit `currentColor`, so ship one tile
per theme and swap the token.

Four `repeating-linear-gradient`s on `background-origin: border-box` instead of
one image — a whole edge per layer, sized `100% var(--w)` or `var(--w) 100%` and
placed at each side. It costs the background slot rather than a tile, but the
colour is a custom property so one rule serves every theme, dash and gap tune
independently, and the pattern *can move*: shift `background-position` by
exactly one period and the dashes march. Period 6–10px, dash 3–5px of it.
```css
.panel { --p: 8px; --w: 1px; border: var(--w) solid #0000;
  --e: repeating-linear-gradient(90deg, var(--c) 0 4px, #0000 4px var(--p));
  background: var(--e) 0 0/100% var(--w) no-repeat,
              var(--e) 0 100%/100% var(--w) no-repeat;
  background-origin: border-box; animation: march .7s linear infinite }
@keyframes march { to { background-position: var(--p) 0, calc(var(--p) * -1) 100% } }
```
⚠ Opposite edges must travel in opposite directions or the loop reads as the
whole box sliding. Marching is a live-process cue and reads as one — never on
static chrome, and stopped, not slowed, under reduced motion.

A single dashed edge does not need a border at all. One absolutely-positioned
hairline child — `inset-inline: 0`, one `repeating-linear-gradient`,
`pointer-events: none` — leaves the background slot free for a translucent or
blurred ground and keeps the dash out of the border box, so it cannot inflate
the pinned height of a sticky bar the way a real border does. Dashes also lay
down roughly half the ink of a solid rule at the same colour, so the token can
run 0.18–0.30 alpha and still read quieter than a solid hairline at 0.12.
```css
.bar { position: relative }
.bar::after { content: ""; position: absolute; inset-inline: 0; bottom: 0;
  block-size: 1px; pointer-events: none;
  background: repeating-linear-gradient(90deg, var(--c) 0 4px, #0000 4px 8px) }
```
⚠ Phase is anchored to the box's own inline-start edge, so a full-bleed rule
and a contained one never agree on where their dashes land — give both the same
origin, or accept that they only align by luck.

A `repeating-linear-gradient` passed straight to `border-image-source` with a
slice of `1` is the one-declaration form, and the only one that suits a *single*
edge: the gradient is the image, the colour is authorable inline, and the rule
still lives in the border box so a hairline top rule sits where `border-top`
would. Dash 3–5px on a 6–10px period.
```css
.rule { border-top: 1px solid transparent;
  border-image: repeating-linear-gradient(to right,
    var(--c) 0 4px, transparent 4px 8px) 1 }
```
⚠ Slice `1` cannot take `round`, so the phase is never corrected and the last
dash clips at whatever width the element lands on — fine for a long rule, wrong
for a short one where the cut is visible against a neighbour.
