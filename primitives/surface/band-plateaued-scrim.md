---
id: band-plateaued-scrim
category: surface
tags: [scrim,imagery,contrast,gradient,accessibility]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A photograph carrying several bands of copy needs a different scrim in each of
them, and one linear ramp hands every band the wrong one — overpaying at one end,
underpaying at the other. Write the overlay piecewise instead: repeat each alpha
at two stops so it holds flat across the band it has to protect, and let it
relax between them where nothing is read. The picture is then surrendered
exactly where the argument is not. Hold 0.75–0.88 over copy, 0.55–0.68 in the
open bands, ramping over 8–14% so no step is locatable.

```css
.scrim { position: absolute; inset: 0; background: linear-gradient(to bottom,
  #000d 0 20%, #000a 30% 65%, #000d 77% 100%) }
```
⚠ Each plateau must clear 4.5:1 against the brightest pixel inside *its own*
band, not the section average. The bands belong to the layout — a crop or a
breakpoint that moves the copy moves them with it.

Where the bands move — copy that reflows at every width over footage that
recrops — the plateaus cannot be authored against the picture, and the answer is
to split the scrim in two rather than to solve one gradient harder. A flat plate
sets the floor the whole frame needs and holds at any crop; a shaped ramp above
it adds only where the layout puts copy. Each is then tunable without
re-deriving the other, and a breakpoint that moves the copy edits the ramp
alone. Floor .2–.35, ramp adding .15–.3 at its ends.
```css
.floor { background: #0004 }
.ramp  { background: linear-gradient(#0005, transparent 35% 65%, #0006) }
```
⚠ Two layers compound, so the contrast check is against the product, not either
alone — and a floor heavy enough to pass on its own has already thrown the
picture away.
