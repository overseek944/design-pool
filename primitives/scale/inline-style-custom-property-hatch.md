---
id: inline-style-custom-property-hatch
category: scale
tags: [tokens,responsive,breakpoint,architecture,cascade,custom-properties]
axes: none
cost: 1
seen: 8
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
