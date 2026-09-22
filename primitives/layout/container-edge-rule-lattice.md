---
id: container-edge-rule-lattice
category: layout
tags: [layout,grid,hairline,precision,responsive,technical]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 24
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

Pseudo-elements cap the sheet at two rules, and a wrapper that already spends
both has nowhere to put a third. Stacked `linear-gradient`s on the page wrapper
have no such ceiling: one gradient per rule, each transparent except for a band
straddling the coordinate, all on a single node that also runs the full document
height without a rule per section. The straddle is the part that is not
optional — a hard stop at one position paints nothing, so the band has to span
`calc(x - .5px)` to `calc(x + .5px)` or the line lands a whole pixel to one side
of the measure it is supposed to mark. Three rules before it reads as ruled
paper.
```css
.sheet { background-image:
  linear-gradient(90deg, #0000 calc(var(--rail) - .5px), var(--rule) var(--rail),
                         #0000 calc(var(--rail) + .5px)),
  linear-gradient(90deg, #0000 calc(var(--rail-2) - .5px), var(--rule) var(--rail-2),
                         #0000 calc(var(--rail-2) + .5px)) }
```
⚠ A background cannot be `pointer-events: none` on its own — it never takes the
pointer, but it also cannot be excluded from a screenshot or a print sheet the
way a pseudo-element can. On a fractional device pixel ratio the half-pixel band
resolves to a grey ramp rather than a hairline; check at 1.25× and 1.5×.

The ceiling is not a count. Two tiers reads as noise at container pitch because
the rules land near the copy they flank; at a wide even pitch they do not, and a
lattice of five or six clears without crowding anything. What governs is pitch
against line value — roughly 200–280px between rules and an alpha low enough
that a rule is invisible in isolation and only legible as a set (around .04–.08
against the page ground, a step below what a border would take). Derive the
coordinates from one division rather than listing them, so re-columning is one
number and the rules cannot drift off the measure.
```css
.sheet { --cols: 5; --pitch: calc((100% - 2 * var(--gutter)) / var(--cols));
  background-image: repeating-linear-gradient(90deg,
    var(--rule) 0 1px, #0000 1px var(--pitch));
  background-position-x: var(--gutter) }
```
⚠ A repeating gradient has no closing rule — the pattern ends one pitch short of
the last coordinate, so the right edge of the measure goes undrawn unless a
separate stop or a `::after` supplies it.

Where a band's own edge crosses the column rules, marking the crossing is what
makes the sheet read as surveyed rather than merely ruled: a small disc in the
page ground, hairline stroke, centred on the intersection. It says the two lines
are one construction and not two backgrounds that happen to meet. Four per
band — the corners — is the whole device. Disc 8–12px, stroke at the hairline
weight and about a third of its alpha.
```css
.band::before { content: ""; position: absolute; top: 0; left: 0; width: 10px;
  aspect-ratio: 1; translate: -50% -50%; border-radius: 50%; background: var(--paper);
  border: 1px solid color-mix(in oklab, var(--ink) 32%, transparent) }
```
⚠ Drop the discs below the width where the rules clamp to the gutter — they then
mark a crossing that no longer falls on the measure. Over a tinted section the
page-ground fill reads as a punched hole; take `background: inherit` there.

Where the rules must run the whole document and then withdraw under particular
sections, neither pseudo-elements nor a wrapper background will do it: one
absolutely positioned layer at `inset: 0` on the page wrapper draws them once at
full document height, and any section that has to sit on top raises its own
stacking context above that layer and paints an opaque ground. The rules then
need no knowledge of the sections and the sections none of the rules — a
full-bleed band, a credential strip, a dark coda opts out in two declarations
rather than by suppressing a border it inherited. Layer at z-index 1–3, the
opting-out section one step above.
```css
.sheet { position: absolute; inset: 0; z-index: 2; pointer-events: none;
  display: flex; justify-content: center; padding-inline: var(--gutter) }
.sheet > i { inline-size: 100%; max-inline-size: var(--content);
  block-size: 100%; border-inline: var(--hair) solid var(--rule) }
.bleed { position: relative; z-index: 3; background: var(--paper) }
```
⚠ The layer is sized by its wrapper, so an ancestor with `overflow: hidden` or a
transformed section truncates it short of the document. A section that opts out
must also paint a ground — `z-index` alone raises a transparent box and the
rules show straight through it.

Rules and margin ground need not be two mechanisms. One pseudo-element's
background stack carries both: a hard-stop `linear-gradient` places the hairline
pair at the rail width and its mirror, then a `repeating-linear-gradient` sized
`var(--rail) 100%` and placed `left top` / `right top` with `no-repeat` confines
the tick pattern to each gutter. One token retunes rule position and texture
width together, and there is no seam between two boxes to keep aligned. Rail
32–56px, ticks on a 6–10px period.
```css
.sheet { isolation: isolate }
.sheet::before { content: ""; position: absolute; inset: 0; z-index: -1;
  --t: repeating-linear-gradient(90deg, #0000 0 4px, var(--ink) 4px 6px, #0000 6px 8px);
  background: linear-gradient(90deg, #0000 calc(var(--rail) - 1px),
                var(--rule) 0 var(--rail), #0000 0),
              var(--t) left  top / var(--rail) 100% no-repeat,
              var(--t) right top / var(--rail) 100% no-repeat }
```
⚠ `z-index: -1` sends it behind the parent's own background unless that parent
makes a stacking context — without the `isolation`, the whole apparatus is
invisible on any ground that is not transparent.
