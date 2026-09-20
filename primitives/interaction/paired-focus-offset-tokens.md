---
id: paired-focus-offset-tokens
category: interaction
tags: [accessibility,focus,tokens,correctness]
axes: none
cost: 1
seen: 12
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
