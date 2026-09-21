---
id: container-edge-rule-lattice
category: layout
tags: [layout,grid,hairline,precision,responsive,technical]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
Draw the measurement system, not only the content. Vertical hairlines pinned to
where a centred container's edges *would* fall run the whole document height,
and each section adds its own full-bleed horizontals — the page reads as a
drawing sheet whose cells happen to hold content. `max()` against the gutter is
what makes it survive narrow: below the container width the rules stop tracking
the centre and clamp to the margin instead of crossing. Leave outer cells empty
on purpose; filled edge to edge it collapses into an ordinary bordered layout.

```css
.band { position: relative }
.band::before, .band::after { content: ""; position: absolute; top: 0; bottom: 0;
  width: var(--hair); background: var(--rule); pointer-events: none }
.band::before { left:  max(var(--gutter), calc(50% - var(--content) / 2)) }
.band::after  { right: max(var(--gutter), calc(50% - var(--content) / 2)) }
```
⚠ Two container tiers is the ceiling — a third pair of rules reads as noise.
Rules are decoration: keep them `pointer-events: none` and out of the a11y tree.

Leaving the outer cells empty is one answer; giving them a different *ground* is
a stronger one. Run one texture inside the container's width and another beyond
it — a dot lattice against a fine vertical hatch — and the boundary is drawn by
the change of material, so the hairline becomes optional rather than load-
bearing. The content column then reads as a plate laid on the sheet instead of a
region fenced off on it. Keep both textures within a few percent of the same
optical value; a contrast step reads as two sections side by side.
```css
.band { background: var(--hatch) }               /* the margin, full bleed */
.band > .inner { inline-size: min(100% - 2 * var(--gutter), var(--content));
                 margin-inline: auto; background: var(--dots) }
```
⚠ Two tiling grounds meeting at a line show every rounding error — pin the seam
to the same `max()` expression the rules use, not to a separate padding.
