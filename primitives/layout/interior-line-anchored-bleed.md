---
id: interior-line-anchored-bleed
category: layout
tags: [layout,full-bleed,aspect-ratio,composition,responsive]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A bleeding backdrop positioned by its top edge drifts: widen the window, the
aspect-locked layer grows taller, and the horizon it was composed around slides
down. Anchor the line that carries the composition. Derive the height
from the width, then set `top` so that line lands on a fixed offset —
the artwork grows off-screen where it holds nothing and stays registered where
it does. Nothing is cropped, so no `object-fit` and no art direction per
breakpoint. Floor the size against a narrow window; anchor at 0.4–0.75 of the
section height.

```css
.bleed { --h: max(620px, 65.8vw);                 /* locked to the viewport */
         inline-size: max(1440px, 100vw); block-size: var(--h);
         position: absolute; inset: calc(var(--anchor) - var(--h)) auto auto 0 }
```
⚠ The layer overruns its section on three sides: the parent needs
`overflow: clip`, or the document gains a horizontal scrollbar at every width
above the floor.
