---
id: scrim-over-filtered-bleed
category: perf
tags: [performance,media,mobile,compositing,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A `filter`, `clip-path` and `transform` stacked on one full-bleed image force it
onto its own offscreen layer at full decoded resolution, and mobile Safari drops
that layer silently once the decode is large — the picture is absent on a phone
and fine on every desktop. Dim with a flat overlay in the ground colour instead:
one solid paint, no layer, reaching a background layer and an `<img>` alike.
Scrim 0.3–0.5.
```css
.dim { position: absolute; inset: 0; background: var(--ground); opacity: .42 }
@media (max-width: 900px) { .plate { display: none } .shot { display: block } }
```
⚠ Below the breakpoint hand the treatment to an `<img>` that is already in the
markup — one swapped in unrequested downloads at the worst possible moment.
