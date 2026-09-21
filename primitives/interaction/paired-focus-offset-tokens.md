---
id: paired-focus-offset-tokens
category: interaction
tags: [accessibility,focus,tokens,correctness]
axes: none
cost: 1
seen: 26
requires: []
conflicts: []
completes: []
tension: []
---
Ship the focus ring as three tokens — width, an outer offset, and a negative
inner offset — then give every interactive element one of the two offsets. Outer
where there is room around the box; inner for anything flush to a container
edge, filling its cell, or inside a clipping parent, where a positive offset is
cropped away and the ring disappears.
```css
:root { --focus-w:.125rem; --focus-out:.25rem; --focus-in:-.125rem }
:where(a,button,[tabindex]):focus-visible {
  outline:var(--focus-w) solid currentColor; outline-offset:var(--focus-out) }
.tile:focus-visible, .row:focus-visible { outline-offset:var(--focus-in) }
```
⚠ `currentColor` follows the theme, but still check 3:1 against both grounds.
Width below .125rem disappears against busy imagery.

Third case — inline text links want a *larger* outer offset than solid
controls, roughly double. A ring drawn tight to a run of text collides with
descenders and with the underline; pushing it out separates the ring from the
glyphs so both stay readable. Controls .125–.25rem, inline links .25–.375rem.

`currentColor` fails on any control whose text colour was chosen against its own
fill rather than against the ground — a white label on a solid button rings
white on white the moment the ring clears the box. There the ring colour belongs
to the *surface*, not the element: ship one token per ground tier, set it on the
section, and let every control inside inherit it. Two covers most pages, three
with a saturated band.
```css
.on-light { --focus: var(--ink) }
.on-dark, .on-brand { --focus: #fff }
:where(a,button,[tabindex]):focus-visible { outline-color: var(--focus) }
```

One `:focus-visible` rule at the root is the right default, but it needs a
declared way out. Any control that already draws its own focus state — a field
whose border changes, a row that tints — otherwise carries two rings. Ship the
opt-out as one named class beside the tokens rather than as per-component
overrides, so the exceptions stay countable.
```css
:focus-visible { outline:var(--focus-w) solid var(--focus);
                 outline-offset:var(--focus-out) }
.self-focus:focus-visible { outline:none }
```
⚠ Drawing the ring as `box-shadow` instead costs two things: any ancestor with
`overflow: hidden` clips it away, and the `outline: none` that has to come with
it erases the ring completely in forced-colors mode, where box-shadow is not
painted at all.

There is a third way an outer ring disappears and it is not clipping. Grid and
flex items paint as atomic units in document order, so a later sibling's
background covers an earlier one's outline: a ring on a cell in a row of
abutting cells survives on the outer edges and is cut along every shared one.
Ordinary in-flow blocks do not do this, which is why it only appears once a
strip becomes a grid. The inner offset hides the symptom; lifting the cell fixes
it and keeps the ring outside the box.
```css
.cell:focus-within { position: relative; z-index: 1 }
```
⚠ `z-index` needs the positioning to go with it — on a static grid item it is
ignored and the ring stays cut.

`outline-offset` leaves the gap transparent, so a ring on a control sitting on
a gradient, a photograph or a busy panel is read against whatever happens to be
under it. Paint the gap instead: keep the real `outline`, and fill the offset
with one zero-blur `box-shadow` ring in the surface's own ground token. The
outline then always has a flat ground to contrast against. Gap 2–3px, same
value as the offset.
```css
:focus-visible { outline: var(--focus-w) solid var(--focus);
  outline-offset: var(--gap); box-shadow: 0 0 0 var(--gap) var(--ground) }
```
⚠ Unlike a box-shadow *ring*, this degrades safely — a clipping ancestor or
forced-colors drops only the gap fill and the outline still paints. The cost is
that `--ground` must track the actual surface: set on the wrong tier it paints
a visible halo around every focused control in the section.
