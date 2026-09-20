---
id: fill-derived-shadow-ramp
category: surface
tags: [surface,depth,shadow,color-mix,tokens,control]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A saturated control's shadow should be made of its own colour, not of black —
black under a strong fill greys the ground and reads as grime rather than as
lift. Mix the fill token toward transparent at falling percentages while offset
and blur grow, and one token retints the whole stack, so a rebrand, a per-tenant
colour or a status variant each keep a shadow that belongs to the thing casting
it. Four or five layers, alpha ~10% at the contact layer down to ~1% at the
widest, and a zero-blur ring at full strength first to seal the edge the blur
softens.

```css
.btn { background: var(--fill); box-shadow:
  0 0 0 1px  var(--fill),
  0 1px 2px  color-mix(in srgb, var(--fill) 10%, transparent),
  0 4px 4px  color-mix(in srgb, var(--fill)  9%, transparent),
  0 10px 6px color-mix(in srgb, var(--fill)  5%, transparent) }
```
⚠ The ramp needs a light, low-chroma ground — on anything near the fill's own
lightness it vanishes, so state must also live somewhere else.
