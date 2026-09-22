---
id: eased-fade-stop-ramp
category: surface
tags: [surface,gradient,fade,mask,precision]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 10
requires: []
conflicts: []
completes: []
tension: []
---
A two-stop fade interpolates alpha linearly and the eye reads the straight ramp
as a visible shoulder where the fade begins. Hand-place eight to thirteen stops
on a decelerating curve instead — alpha falling steeply at first, then a long
low tail with the stops crowding toward transparent — and the transition stops
having an edge. Keep the stop list in one token and reuse it for every
direction.

```css
--fade: #000 0, #000b 20%, #0007 35%, #0004 48%, #0002 62%, #0001 78%, #0000 100%;
.edge::before { background: linear-gradient(to bottom, var(--fade)),
                            linear-gradient(to right,  var(--fade)) }
```
⚠ Worth it over 24–64px of fade. Shorter than that a two-stop gradient is
already imperceptible and the extra stops are wasted bytes.

Anchor the stops in pixels, not percentages, wherever the element's height is
content-driven: `calc(100% - 64px)` holds the ramp at the length it was tuned
for whether the block is 300px or 2000px tall, while a percentage ramp stretches
into a wash on the long one and compresses into a hard edge on the short one.
```css
mask-image: linear-gradient(to bottom, #000 calc(100% - 80px),
  #0009 calc(100% - 64px), #0004 calc(100% - 32px), transparent 100%)
```

Crossed ramps over one photograph are two different jobs, not one applied twice.
The ramp along the text axis is asymmetric — dense at the copy edge, clear by
60–100% — so it buys contrast only where words are and leaves the far side of
the picture intact. The ramp along the scroll axis is dense at *both* ends: the
top seats a transparent header, the bottom hands off to the next section.
Weight them the same and the whole frame greys, which is the flat overlay this
was meant to replace.

Generate the stops rather than place them, once the ramp is reused. Sample a
power curve at evenly spaced positions — `α = t^γ` at 0, ⅙, ⅓ … 1 — and γ alone
controls the shoulder: γ ≈ 3 holds the transparent end nearly flat and spends
the whole change in the last third, which is what a fade *into* a solid ground
wants. Then spend the identical curve twice: as the alpha mask on a blur layer,
and as the colour ramp on the tint beneath it. Blur and tint then retire
together instead of one outliving the other.
```css
--ramp: 0, .0046 16.67%, .037 33.33%, .125 50%, .296 66.67%, .579 83.33%, 1;
```
⚠ γ above ~4 crushes the change into a band short enough to read as the hard
edge the curve was meant to remove. 2.5–3.5 is the useful range.

Write the stops in relative colour and one ramp serves every ground:
`oklch(from var(--ground) l c h / a)` takes lightness and chroma from whatever
the section sets, so a fade authored once follows a theme flip or a tinted band
with no second stop list. Put the angle in a property too and the four
directions become overrides rather than copies.
```css
.fade { background: linear-gradient(var(--angle, 0deg), oklch(from var(--ground) l c h / 1),
  oklch(from var(--ground) l c h / .89) 33%, oklch(from var(--ground) l c h / .44) 67%,
  oklch(from var(--ground) l c h / 0)) }
```
⚠ Where relative colour is unsupported the whole declaration is dropped — put a
literal two-stop gradient on the line above it as the fallback.
