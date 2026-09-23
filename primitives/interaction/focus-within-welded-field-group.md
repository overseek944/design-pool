---
id: focus-within-welded-field-group
category: interaction
tags: [interaction,form,field,focus,accessibility,control]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Two native controls that together produce one value — country code and number,
currency and amount, unit and quantity — drawn as two boxes read as two
questions and stack two focus rings. Move the chrome up one level: the wrapper
owns the border, radius, fill and clip, every child is stripped to no border,
no background and no shadow on *every* state, and `:focus-within` puts the one
ring on the wrapper. A hairline between them is the only internal edge. Wrapper
min 44px; children take that minus the border so nothing outgrows the clip.

```css
.group { display: flex; overflow: hidden; min-block-size: 44px;
         border: 1px solid var(--rule); border-radius: 4px }
.group:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px var(--halo) }
.group > *, .group > :focus { min-inline-size: 0; border: 0; border-radius: 0;
         background: none; box-shadow: none }
.group > :first-child { border-inline-end: 1px solid var(--rule) }
```
⚠ One visual box is still two controls: keep a label on each, and put
`aria-invalid` on the field actually wrong even though the error style sits on
the wrapper. `:focus-within` matches *any* descendant — a popover rendered
inside keeps the group lit.

`:has()` closes both halves of that gap. Name the children whose focus should
light the wrapper instead of accepting any descendant, and ask for
`:focus-visible` rather than focus, so the ring appears for a keyboard and not
for the pointer click that merely put a caret in the field — behaviour a bare
control has by default and the welded group silently loses. Strip the child's
own ring in the same rule or both draw.
```css
.group:is(:has(> input:focus-visible), :has(> button:focus-visible)) {
  outline: 2px solid currentColor; outline-offset: 2px }
.group > :focus-visible { outline: none }
```
⚠ A group whose only control is a button now shows nothing on click, which is
correct only where something else marks the press. Keep the `:focus-within`
rule underneath as the fallback: a browser without `:has()` drops this whole
declaration and the group loses its ring entirely rather than degrading.

Stacking the group unwelds it. Once the children sit on separate lines the
wrapper's border is a stray box around two controls, so the chrome has to go
back down a level at that breakpoint: strip the wrapper's border, fill, shadow
and padding, and give each child its own. The ring moves with it —
`:focus-within` on a wrapper that no longer draws anything is invisible, so
restore each control's own `:focus-visible`. Unweld wherever the pair would
wrap, typically 520–640px.
```css
@media (width <= 620px) {
  .group { display: grid; gap: 10px; border: 0; background: none;
           box-shadow: none; padding: 0 }
  .group > * { border: 1px solid var(--rule); border-radius: 10px;
               font-size: 16px } }
```
⚠ 16px on the input is load-bearing, not taste: iOS zooms the viewport on focus
below it, and the welded form's smaller type only got away with it because the
field was never the full-width target it becomes here.

Stacking need not unweld a field-plus-button pair if the wrapper changes shape
with it. Keep the one border and the `:focus-within` ring, let the row wrap so
each child takes the full width, and step the radius down from a pill to
18–24px: a stadium around two lines reads as a lozenge, a rounded card around
them reads as one form. Centre the input text once it is full width.
⚠ The button inside now spans the width, so it needs its own inner radius —
wrapper radius minus the padding — or its corners cut across the card's.
