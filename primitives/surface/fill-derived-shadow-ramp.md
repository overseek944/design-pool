---
id: fill-derived-shadow-ramp
category: surface
tags: [surface,depth,shadow,color-mix,tokens,control]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 7
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

Ramping alpha is one of two ways to build the falloff, and the harder one to
keep smooth by hand. Hold a single alpha across every layer and space the
layers geometrically instead — offset and blur multiplying by 3–4 each rung —
while spread steps down linearly so each wider layer is pulled back inside the
one before it. Area grows geometrically at fixed alpha, so the falloff comes
out of the spacing and the only number left to tune is the shared alpha. Three
or four rungs, alpha 8–16%.
```css
box-shadow: rgb(255 255 255 / .13) .06px  .36px .37px -.83px,
            rgb(255 255 255 / .13) .23px 1.37px 1.4px -1.67px,
            rgb(255 255 255 / .13) 1px      6px 6.1px -2.5px;
```
⚠ Offsetting x as well as y gives the stack a light direction, which every
other shadow on the page then has to share — a page mixing directional and
straight-down ramps reads as two light sources and neither looks intentional.

The emission form runs further than the range above once the ground is
near-black: offset 6–18px, blur 24–56px, alpha to .20 at rest still reads as a
lamp rather than a plate, because there is no ground detail for the pool to
muddy. Put most of the hover in the *alpha* — .18 up to .28–.34 — and only a
few pixels into offset and blur. A hover that grows the geometry as much as it
brightens reads as the control moving toward the reader instead of switching on.
```css
.btn        { box-shadow: 0 18px 45px rgb(120 214 255 / .18); transition: .2s }
.btn:hover  { box-shadow: 0 22px 56px rgb(120 214 255 / .32) }
```
⚠ Past about .30 the pool reads as a halo on anything lighter than ~8% grey —
check it against the section it sits in, not against the page token.

The derivation has nothing to read where the caster is neutral: a white card on
off-white paper has no fill worth mixing, so it falls back to the black this
entry opens against. Take the ink from the *palette* rather than from the
element — the darkest step of the accent ramp, one token, spent by every shadow
on the page. Nothing on screen is that colour, so it never reads as a tint; it
reads as the page having one light. 5–10% at the widest layer, 3–6% at the
contact.
```css
:root { --shadow-ink: var(--accent-900) }        /* darkest chromatic step */
.card { box-shadow: 0 1px 2px color-mix(in srgb, var(--ink-900) 5%, transparent),
        0 16px 40px color-mix(in srgb, var(--shadow-ink) 9%, transparent) }
```
⚠ Tint the wide layer only and keep the contact one neutral — chroma at the
contact edge reads as a coloured keyline rather than as depth. The step has to
be dark enough to stay low-chroma at these alphas, or every card sits in a haze.
