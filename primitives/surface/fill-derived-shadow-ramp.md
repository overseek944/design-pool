---
id: fill-derived-shadow-ramp
category: surface
tags: [surface,depth,shadow,color-mix,tokens,control]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 4
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

Inverted, the same mechanism stops being lift and becomes emission: a light
control on a dark ground casting a shadow in its *own* colour reads as a lamp
switched on, because nothing in the world darkens a black ground. It needs one
layer rather than five — there is no contact edge to seal and no ramp to fake,
only a wide soft pool under a small lift — and it is the cheapest way to make a
single primary action the brightest object on a dark page. Offset 6–12px, blur
24–36px, alpha 12–22%, paired with a 2–3px rise.
```css
.btn-light:hover { transform: translateY(-2px);
                   box-shadow: 0 8px 28px rgb(255 255 255 / .18) }
```
⚠ Spend it once per view. A dark page with three glowing controls has no primary
action, and at these alphas the pool is invisible the moment the section behind
it is anything but near-black.
