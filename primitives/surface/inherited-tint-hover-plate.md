---
id: inherited-tint-hover-plate
category: surface
tags: [surface,hover,currentcolor,theming,accessibility]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
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
