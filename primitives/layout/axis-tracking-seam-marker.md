---
id: axis-tracking-seam-marker
category: layout
tags: [layout,seam,affordance,responsive,breakpoint]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Two panels that argue in sequence — problem, then answer — lose the sequence at
the breakpoint where they stop sitting side by side. Put the direction cue on the
shared edge rather than inside either panel: a 36–48px disc carrying its own
ground, centred on the join and pulled back half its size so it straddles both,
with the glyph rotated 90° when the split axis flips. One token, two
orientations, and the pair reads the same way at every width.

```css
.token { position: absolute; inset-block-start: -22px; inset-inline-start: 50%;
  translate: -50% 0; rotate: 90deg }                       /* stacked: points down */
@media (min-width: 64rem) { .pair { grid-template-columns: 1fr 1fr }
  .token { inset-block-start: 50%; inset-inline-start: 0;
           translate: -50% -50%; rotate: 0deg } }
```
⚠ The token is decoration — `aria-hidden` it; reading order already carries the
sequence. `overflow: hidden` on either panel eats half the disc: clip the
children, not the pair.
