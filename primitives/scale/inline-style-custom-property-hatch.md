---
id: inline-style-custom-property-hatch
category: scale
tags: [tokens,responsive,breakpoint,architecture,cascade,custom-properties]
axes: none
cost: 1
seen: 14
requires: []
conflicts: []
completes: []
tension: []
---
Markup that carries its layout in `style` attributes — server-rendered
components, CMS blocks, design-tool export — cannot be reached by a media or
container query, because a declaration set inline outranks every stylesheet
rule. Emit a *custom property* inline instead of the property itself. The value
still travels with the node, but the consumer lives in the stylesheet, so a
breakpoint can redefine it like any other token. Where the emitter is not
yours, the only hatch left is a small closed set of `!important` utilities, one
per responsive decision, named in one block so the unoverridable rules stay
countable — four to eight, not a library.
```html
<div class="grid" style="--cols:5">
```
```css
.grid { grid-template-columns: repeat(var(--cols), minmax(0,1fr)) }
@media (width <= 900px) { .grid { --cols: 2 } }
```
⚠ An inline custom property is inherited, so it reaches every descendant that
happens to read that name — scope it with `@property { inherits: false }` or a
component-prefixed name.

Where the `style` attribute is unavailable at all — a `style-src` policy without
`unsafe-inline`, a sanitiser that strips it — the value travels as a plain
attribute and meets a stylesheet that already knows every value it can take.
Enumerate a small closed set of attribute selectors, one per step. It does not
generalise and does not need to: a stagger ladder or a span count has five or
six legal values, and holding them in the stylesheet is what keeps the schedule
retunable in one place.
```css
[data-delay="1"] { transition-delay:  70ms }
[data-delay="2"] { transition-delay: 140ms }   /* 5–7 steps, then stop */
```

The hatch is not needed for *state*. An inline declaration only outranks the
stylesheet on the properties it actually sets, so an ordinary class rule still
wins any property the emitter left alone — hover lift and shadow over markup
that inline-styles only colour, padding and radius. Spend the `!important`
utilities on the properties the emitter does set, and keep every state in
normal rules where the cascade works.
```css
.btn:hover { transform: translateY(-1px) }   /* nothing inline sets transform */
```
⚠ It holds only while the emitter's property set is stable. The release that
starts emitting an inline `transform` for an entrance offset silently kills
every hover written this way, and nothing fails loudly.

The chain runs the other way too. Where the values are per-element and only
their *amplitude* is responsive, let the inline style consume a
stylesheet-defined scalar inside `calc()`: each node keeps its own offsets, and
one breakpoint rule rescales the whole field — or flattens it to nothing —
without the stylesheet knowing any element's numbers.
```html
<div style="transform: translate3d(calc(260px * var(--amp,1)), calc(-180px * var(--amp,1)), 0)">
```
```css
@media (width < 64rem) { .field { --amp: .6 } }
```
⚠ Declare the fallback in every `var()`; one missing default invalidates the
whole `transform` and the element snaps to its origin.

Geometry is the case the hatch cannot rescue. An inline `offset-path: path()`
or a `left`/`top` pair resolves in absolute CSS pixels, so moving it into a
custom property relocates the consumer without making the value responsive —
no breakpoint can scale a path. Either emit the whole path per breakpoint under
one property name, or accept the figure as a fixed-size stage and give the
narrow layout a different figure rather than a squeezed one.
```css
.stage { --route: path("M 190 138 C 380 138, 420 310, 504 310") }
@media (width <= 860px) { .stage { --route: path("M 40 60 C 90 60, 100 150, 150 150") } }
```
⚠ A stage authored at fixed pixels has no intrinsic behaviour under text zoom —
its labels grow and its geometry does not. Cap what it has to hold.

Enumerate the *number* rather than the styled value and the closed set stops
being one ladder per decision. A generated block mapping `[data-n="K"]` to
`--n: K` across a fixed range is written once and then serves span counts,
stagger indices, alpha percentages and delays alike, because every consumer does
its own arithmetic. It is also the only route left where a `style-src` policy
blocks the attribute outright. Ranges of 0–12 for structure, 0–100 for
percentages.
```css
[data-n="0"]{--n:0} [data-n="1"]{--n:1}   /* … generated to the ceiling */
.bar { inline-size: calc(var(--n) * 1%) }
```
⚠ The block is flat bytes in the critical stylesheet, so pick the ceiling
deliberately — and a value past it resolves to nothing at all, which is why
every `var(--n)` still needs a fallback.

Emitted markup often carries no class to hang the `!important` utility on. Match
the inline declaration itself — `[style*="aspect-ratio"]` — and the hatch reaches
exactly the nodes that have the problem and no others, without the emitter
cooperating and without a blanket rule over the subtree. It is the one selector
that reads what the style attribute contains. Reserve it for releasing a
constraint at a breakpoint, never for setting a value.
```css
@media (width <= 640px) {
  .content [style*="aspect-ratio"] { aspect-ratio: auto !important } }
```
⚠ Substring matching is textual, so `aspect-ratio` also matches inside a custom
property name and a shorthand that merely mentions the word. Scope it to a
container, and re-check after any emitter upgrade — nothing fails loudly when
the serialisation changes.

Emit the *index*, not the position. A renderer that knows a cell's row and
column writes them as bare numbers and leaves the geometry to the stylesheet:
`calc(100% * var(--row) / var(--rows))` places every cell as a fraction of its
container, so the whole matrix rescales when the container or the font-size
changes and nothing is remeasured. The markup then carries data and the
stylesheet carries layout, which is also what lets one emitted DOM serve two
sizes — a fluid `font-size` on the host is the only knob the grid needs.
```css
.cell { position: absolute; top:  calc(100% * var(--row) / var(--rows));
                            left: calc(100% * var(--col) / var(--cols)) }
```
⚠ Fractions of a percentage land on subpixels, so a dense grid shows uneven
seams between rows. Fine where the content is drawn on the same fraction — a
character grid, a waveform — wrong where neighbouring cells must share a hard
edge.

A breakpoint can only redefine the inline value where the two sizes are related
by arithmetic. Where they are not — per-element measurements drawn once for a
wide layout and again for a narrow one, with no single ratio between them —
emit *both* under distinct names and let the media query switch which one the
rule reads. The element then carries a small table instead of one number, and
the stylesheet still owns every decision about when to read it.
```html
<div class="bar" style="--h: 32px; --h-wide: 114px">
```
```css
.bar { block-size: var(--h) }
@media (width >= 48rem) { .bar { block-size: var(--h-wide) } }
```
⚠ Two names is the readable ceiling. A third breakpoint wants the numbers in a
data attribute and the geometry back in the stylesheet, not a wider inline
table — and every name still needs its own `var()` fallback.
