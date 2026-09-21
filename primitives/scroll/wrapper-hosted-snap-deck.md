---
id: wrapper-hosted-snap-deck
category: scroll
tags: [scroll,snap,responsive,breakpoint,correctness,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Vertical snap on the document fights collapsing mobile chrome and cannot be
revoked per breakpoint. Give the narrow layout its own scroller instead: one
wrapper at the small-viewport height carrying `overflow-y` and the snap type, so
the deck is a component decision and the document scroller is left alone. At the
width where the material should read as a page again, release height, overflow
and snap *together* — any one left behind traps the content in a box. `svh`, not
`vh`, or every panel is short by the chrome. Mandatory only where each panel
fills the frame; proximity otherwise.

```css
.deck { block-size: 100svh; overflow-y: auto; scroll-snap-type: y proximity }
@media (width >= 48rem) { .deck { block-size: auto; overflow: visible;
                                  scroll-snap-type: none } }
```
⚠ `window` scroll listeners and native scroll restoration both stop applying —
they move to the wrapper. Fixed bottom chrome now needs its room as padding
inside the deck, not on the body.
