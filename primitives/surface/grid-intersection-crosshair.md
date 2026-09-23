---
id: grid-intersection-crosshair
category: surface
tags: [surface,grid,detail,blueprint,ornament]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 12
requires: []
conflicts: []
completes: []
tension: []
---
Mark a grid intersection with a small plus centred exactly on the crossing: two
hairlines in a shrink-wrapped box placed by `grid-row-start`/`grid-column-start`
and pulled back by half its own size plus the line width. It reads as a
drafting registration mark and makes an otherwise invisible structure legible.
Position is data, so one component marks any set of intersections.

```css
.cross { position: absolute; pointer-events: none;
  --size: 15px; width: fit-content; height: fit-content;
  grid-column-start: var(--x); grid-row-start: var(--y);
  inset: calc(-1 * (var(--size) / 2 + var(--hair) - .5px)) }
```
⚠ Sizes 11–21px; below about 9px the arms read as dust on the screen. The
`.5px` term is the half-pixel correction for an odd line width — drop it and
every mark sits visibly off-centre.

Where the crossing is not a grid line but a computed position — a rule placed
by `calc()` inside an inset frame — the placement flips: absolute coordinates
for both axes and `translate(-50%, -50%)` to centre, which needs no half-pixel
correction because it never rounds against a line width. Swap the plus for a
small filled square rotated 45° and the mark stops reading as registration and
starts reading as a *node* — a termination or a junction rather than a
measurement. 7–13px, with the marks at the frame's ends one size down from the
ones on an interior crossing.
```css
.node { position: absolute; width: 9px; aspect-ratio: 1; background: var(--line);
  top: var(--y); left: var(--x); transform: translate(-50%,-50%) rotate(45deg) }
```
⚠ A filled node claims more than a crosshair does — a reader will look for
meaning in where they are. Place them at real terminations, and drop them
entirely at the width where the frame itself goes.

The mark can come free with the grid. In a gap-ruled field — line colour as the
container background, opaque cells — round every cell 4–8px. Each crossing then
shows the line colour flaring into the four concave corners, a small
four-pointed star at every junction and nothing to position. Outer bands beside
a centred column round only the side facing it, so the column's edges carry the
same notch.
```css
.field { gap: 1px; background: var(--line) }
.field > * { background: var(--ground); border-radius: calc(var(--radius) - 4px) }
```
⚠ Above ~10px the stars read as holes rather than joints, and the rule stops
looking continuous.
