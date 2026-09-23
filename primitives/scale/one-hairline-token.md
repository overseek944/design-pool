---
id: one-hairline-token
category: scale
tags: [unit,tokens,border,precision,coherence]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 32
requires: []
conflicts: []
completes: []
tension: []
---
Every thin line in a system should be the same line. Declare one hairline width
in `rem` and spend it on borders, list rules, underline thickness and icon
strokes — `vector-effect: non-scaling-stroke` keeps an icon's stroke at that
weight whatever box it is drawn into. In `rem` the whole system thickens
together on a large display instead of stranding one 1px line.
```css
:root { --hair: .0625rem }
.rule { border-top: var(--hair) solid var(--line) }
a { text-decoration-thickness: var(--hair); text-underline-offset: .2em }
svg [stroke] { stroke-width: var(--hair); vector-effect: non-scaling-stroke }
```
⚠ Useful range .0625–.125rem. Thinner and the line drops out on non-retina.

One width, two tints. The rule separating rows *inside* a surface and the line
bounding the surface are the same weight and must not be the same value: the
interior line sits at the edge of visibility, two or three steps off the ground,
while the boundary reads as an edge at four or five. A single line colour makes
either the interior look ruled like a table or the container look unbounded.
```css
:root { --hairline: var(--ink-200); --edge: var(--ink-300) }
.panel      { border:var(--hair) solid var(--edge) }
.panel li+li{ border-top:var(--hair) solid var(--hairline) }
```
⚠ Two tints is the ceiling. A third reads as an inconsistency rather than a
hierarchy, and none of them may be the only thing separating two interactive
rows.

Spend the same token as a `gap` rather than a border and a grid rules itself:
set the line colour as the container's background, open a one-hairline gap, and
let every cell paint the ground. Interior lines are the container showing
through, so they cannot double at a join, no `:last-child` rule is needed to
strip a trailing edge, and a reflow at any breakpoint re-rules the grid for free.
```css
.grid { display: grid; grid-template-columns: repeat(4, 1fr);
  gap: var(--hair); background: var(--line); border: var(--hair) solid var(--line) }
.grid > * { background: var(--ground) }
```
⚠ Cells must be opaque — a translucent one shows the rule colour across its
whole face, not just at its edge.

One width, two styles. Where a rule is apparatus rather than structure — the
divider between entries in an index, the boundary of a provisional block —
dashing it halves the ink without touching the token, so it separates at a
weight no solid line of the same colour can reach. Hold it as a register: solid
is the edge of a thing, dashed is the edge of a reading. Mixing them by taste
loses both, so pick one role for dashed and keep it across the product.
```css
.section + .section { border-top: var(--hair) dashed var(--line) }
.panel               { border: var(--hair) solid var(--edge) }
```
⚠ Below .0625rem dashes render as a grey wash rather than a line — drop to a
solid rule at a lower tint instead. `border-style: dashed` gives no control over
period or phase; where the corner has to land cleanly, tile the pattern.

A line that must stay legible over content it does not control carries its own
contrast: flank the hairline with one of the ground colour on each side, drawn
as two pseudo-elements a hairline out. Over a dark region the pale flanks read
as the separation; over a pale one the core does. Three hairlines of total
width, no blend mode, no second rule — it survives a photograph, an inverted
panel and a comparison split dragged across both.
```css
.split { position: absolute; inset-block: 0; width: var(--hair); background: var(--ink) }
.split::before, .split::after { content: ""; position: absolute; inset-block: 0;
  width: var(--hair); background: var(--canvas) }
.split::before { left: calc(-1 * var(--hair)) }
.split::after  { right: calc(-1 * var(--hair)) }
```
⚠ Three hairlines is a visible 3px band on a non-retina display. Spend it only
on a line that genuinely crosses unknown content, never on ordinary rules.

Spend the token on `outline` rather than `border` wherever the line must not
cost layout. An outline is drawn outside the box model, so adding or removing
one — a selected cell, a hover edge, a rule inside a grid that already sizes its
children — shifts nothing and has no `box-sizing` interaction to reason about.
Pull it back onto the box edge with a negative `outline-offset` of half the
width, so it lands where a border would and aligns with real borders in the same
lattice.
```css
.cell { outline: var(--hair) solid var(--rule);
        outline-offset: calc(var(--hair) / -2) }
```
⚠ Outlines paint over the neighbour rather than between, and never collapse — a
tiled field doubles at every interior join. For decoration and for state; a
focus ring keeps its own offset and its own colour, and must not be the rule
this one overwrites.

Sub-pixel is a setting of the token, not a mistake in it. At about `.92px` a 2×
display draws a genuine two-device-pixel line while a 1× display antialiases the
same declaration to something lighter than a full pixel — one value yielding a
crisp hairline where the density exists and a softer one where it does not, with
no second colour and no media query. It inverts the first warning above on
purpose: the line is *meant* to weaken where the pixels are missing rather than
be defended from it.
```css
:root { --hair: .92px }        /* not 1px, and not rounded up anywhere */
```
⚠ Below roughly .85px the 1× rendering fades far enough that a bounding box
loses its edge entirely. Choose the value against the ground it is drawn on and
check it at 1×, which is the only place the difference exists.

The token is deliberately spent twice in one place: an inline link whose whole
hover state is its underline thickening from one hairline to two. Decoration is
not layout, so nothing reflows and no neighbouring line moves, and the colour
is inherited, so the link needs no accent token and cannot fail a contrast the
body text already passes. Offset .18–.25em keeps the heavier stroke clear of
the descenders. This is the link affordance for a design with no colour to
spend, not an addition to one that has.
```css
a       { text-decoration-thickness: var(--hair); text-underline-offset: .22em }
a:hover { text-decoration-thickness: calc(var(--hair) * 2) }
```
⚠ Two hairlines is the ceiling — past it the stroke reads as a highlight, and
`text-decoration-skip-ink` cuts visibly wider notches around every descender.

Thickness is one channel; the decoration's *colour* is the other, and it is the
one to spend where the ink ramp already has a faint rung. Hold the underline at
the rule tint — well under the text's own contrast — and resolve both it and the
text to full ink on hover: at rest the link is marked without the underline
competing with the prose it sits in, and the hover strengthens two properties at
once rather than recolouring one. Offset .25–.35em at this weight, since a faint
stroke reads as dirt when it touches a descender.
```css
a       { color: var(--muted); text-decoration-color: var(--line);
          text-underline-offset: .3em; transition: color .2s, text-decoration-color .2s }
a:hover { color: var(--ink); text-decoration-color: currentColor }
```
⚠ The underline is decoration, not contrast — the resting *text* colour still
owes 4.5:1, and a tint chosen so the rule "disappears" fails `prefers-contrast`
unless the faint rung is redeclared there.

Express that pair as alphas of the foreground rather than as solid tints and it
stops being per-ground. A line at 6–9% white reads identically over a page
ground, a raised panel and an elevated sheet because it composites onto each of
them; the solid equivalent has to be re-picked per surface and drifts the moment
a new elevation is added. The edge tint is the same colour at roughly double —
one variable pair for the whole system, and both invert with the theme for free.
```css
:root { --line: #ffffff12; --edge: #ffffff1c }   /* dark: 7% / 11% */
```
⚠ Alpha over a photograph or a video is not a hairline any more — it takes the
value of whatever is beneath. Where a rule crosses media, fall back to a solid.

On a dense display the token can go below one device pixel — 0.4–0.6px renders
as a true hairline at 2x and 3x — provided the root restores a full pixel where
it would round away. Branch on `resolution`, not on width: the failure is the
pixel grid, and a large low-density monitor is exactly where it happens.
```css
:root { --hair: .5px }
@media (resolution <= 1.5x) { :root { --hair: 1px } }
```
⚠ A sub-pixel line on a light ground is also a lighter line — re-check the edge
tint against the ground at the thinner width.
