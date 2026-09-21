---
id: inherited-tint-hover-plate
category: surface
tags: [surface,hover,currentcolor,theming,accessibility]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A hover plate behind an inline link usually costs a token per context — one
tint for the footer, another for the accent, a third on an inverted panel. Paint
it in `currentColor` at low alpha instead and it derives itself: wherever the
link's colour goes, the plate follows, with no theme branch. A negative inset
gives it the padding the link does not have, so the target grows without the
layout moving. Alpha 6–12%; below that it vanishes on light grounds, above it
competes with the text it sits under.

```css
.link::before { content: ""; position: absolute; inset: -.2rem -.4rem;
  border-radius: .375rem; background: currentColor;
  opacity: 0; transition: opacity .15s }
.link:hover::before, .link:focus-visible::before { opacity: .08 }
```
⚠ The plate is under the glyphs and tinted with them, so it cannot lift
contrast — check the pair still clears 4.5:1 at full opacity.

Alpha is the only handle raw `currentColor` gives, and it can only ever reveal
the ground beneath. Relative colour syntax decomposes the inherited value
instead, so the derived tint can hold hue and chroma while moving lightness on
its own — a highlight that is genuinely *lighter than the text* on a dark panel,
which no opacity can produce. Scaling the source's own `alpha` keeps a derived
layer honest under text that is already faded. Shift `l` by 0.2–0.4.
```css
--lift: oklch(from currentColor calc(l + .3) c h / calc(alpha * .8))
```
⚠ Unsupported browsers drop the whole declaration, not just the function — put
the plain `currentColor` form first and let this one override it.
