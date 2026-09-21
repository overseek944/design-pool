---
id: container-edge-rule-lattice
category: layout
tags: [layout,grid,hairline,precision,responsive,technical]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 12
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

The margin ground is also how a section says it is outside the argument. Run
that texture across the full bleed for one terminal block — a closing call, a
colophon — with no inner plate, and the content column stops being laid on the
sheet and becomes margin: the page's own material marks the end, with no rule,
no colour change and no new component. Once per page; a second full-bleed block
and the texture reads as a section style rather than a boundary.
```css
.coda         { background: var(--hatch) }            /* no inner plate */
.coda > .inner { background: none; inline-size: min(100% - 2 * var(--gutter), var(--content)) }
```
⚠ Copy set over a hatch interferes with its own stem weight — keep the rendered
pitch above 8px and the line alpha under .10, and check it at 390px, where the
texture is at its densest relative to the type.

Where the measure is already a real element, the rules are not a lattice to
compute. `border-inline` on the column itself draws both, tracks it through
every breakpoint and needs no `max()`. The pseudo-element form earns its
indirection only when the rules must exist in bands the column does not — a
full-bleed section, artwork that crosses them — which is also the case that
makes them read as a sheet rather than a border.
```css
.measure { inline-size: min(100% - 2 * var(--gutter), var(--content));
  margin-inline: auto; border-inline: var(--hair) solid var(--rule) }
```
⚠ The border sits inside the box, so the column's inline padding has to absorb
it or the first character rests on the rule.

Horizontal rules that should *subdivide* a box rather than tile it want
percentage stops in a single non-repeating gradient, not a `background-size`
pitch. Hard stops a percentage point apart give a hairline; the count is then
fixed and the spacing proportional, so a band reads as quarters at every height
instead of gaining a rule each time the section grows. Three interior rules is
usually the limit before it reads as ruled paper.
```css
.band { background-image: linear-gradient(var(--rule) 0 0) }   /* or, for N: */
  /* linear-gradient(#0000 24%, var(--rule) 25% 25.3%, #0000 26% 49%, …) */
```
⚠ A stop width in percent is a fraction of the box, so the rule thickens as the
section grows. Where the hairline must stay one pixel, the pitch has to come off
`background-size` and the count stops being fixed.

The same rules can trace *an element's own* edges rather than the container's,
and project them into the whitespace above it — a zero-width pseudo-element at
`bottom: 100%` with a negative `top` draws a dashed line rising out of the
block's corner through the gap before it, so a figure reads as dropped onto the
sheet at a measured position rather than merely placed. Let the section's
`overflow: hidden` clip the reach instead of tuning a length. Reach 60–120vh.
```css
.guides { position: relative }
.guides::before, .guides::after { content: ""; position: absolute;
  top: -100vh; bottom: 100%; width: 0; border-left: 1px dashed var(--rule) }
.guides::before { left: -1px } .guides::after { right: -1px }
```
⚠ Without a clipping ancestor the lines run the length of the document and
collect every section they cross. The negative `top` also grows the scroll
height on an `overflow: visible` parent.
