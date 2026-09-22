---
id: inverted-field-ground
category: surface
tags: [surface,form,contrast,figure-ground,accessibility]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Invert the form figure-ground: tint the panel *below* the page value and leave
the inputs the brightest thing on screen. The empty boxes become figure, so the
eye lands on what it must fill, and the panel reads as one object instead of a
grid of wells.

```css
.form { background: var(--tint) }          /* 10–25% below page value */
.form :is(input, select, textarea) { background: #fff; border: 0 }
```
⚠ A tint warm enough to feel like paper sits only 1.5–2:1 against white, missing
the 3:1 non-text floor for a control boundary. Keep a hairline on the field or
push the tint past a 3:1 step. Placeholder contrast is measured against the
field, not the panel.

The opposite reduction also works: delete the field box and leave a single 2px
rule under each label, so the form reads as a document being filled rather than
a rack of wells. Cheapest treatment there is on a dark panel, and it fails one
specific way — that rule is now the entire control boundary, so it owes 3:1 at
rest, and recolouring the same 2px on focus is not a focus indicator. Keep the
outline and let the rule move with it.

The inversion assumes a ground to invert against. Lay the same block over a
photograph — a contact panel on the opening frame — and there is none: a
hairline boundary owes 3:1 against whatever pixel it lands on, and a picture
supplies every value at once. Floor each field rather than trusting the frame,
translucent over a known term, so the worst case is the term and not the crop.
Fill 55–80% of the page ground.
```css
.form :is(input, textarea) {
  background: color-mix(in srgb, var(--ground) 68%, transparent);
  border: 1px solid color-mix(in srgb, var(--ink) 55%, transparent) }
```
⚠ Score the hairline against the brightest and darkest region the crop can put
under the panel, not against the design's frame — and re-score at the narrow
crop, where the same form covers different picture.
