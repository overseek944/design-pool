---
id: inverted-field-ground
category: surface
tags: [surface,form,contrast,figure-ground,accessibility]
axes: {energy: 1, density: 2, weight: 3, finish: 4}
cost: 1
seen: 1
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
