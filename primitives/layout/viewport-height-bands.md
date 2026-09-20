---
id: viewport-height-bands
category: layout
tags: [layout,responsive,media-query,ornament,correctness]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Some decisions belong to the short axis. An opening frame, a pinned figure or
marginal ornament is rarely broken by a narrow window — it is broken by a
shallow one, and width breakpoints cannot see that. Branch on
`min-height`/`max-height`: cap a tall figure so it stays whole, or withhold a
decoration until both axes have room for it. Bands: under 700px, 700–1100px,
over 1300px.
```css
.ornament { opacity: 0 }
@media (min-width: 1100px) and (min-height: 700px) { .ornament { opacity: 1 } }
@media (max-height: 780px) { .stage { padding-block: 100px } }
```
⚠ Mobile chrome resizes the viewport mid-scroll, so a height query can flip on
its own. Keep these behind a pointer-and-keyboard width.

The strongest use is withdrawal, not adjustment. Height decides whether a
pinned multi-screen section should exist at all — on a short window its lower
half is unreachable — so gate the pin itself and let the section fall back to
ordinary flow. Gates 700–780px.

`pointer: coarse` is the discriminator the width was standing in for. The case a
height band usually means is a phone turned sideways — 380–500px tall, wide, and
nothing fits — which a width query cannot distinguish from a wide desktop
window, and a width *floor* excludes outright. Ask for the three facts that
actually define it.
```css
@media (orientation: landscape) and (height <= 500px) and (pointer: coarse) {
  .stage { min-height: 0; padding-block: 1rem }
}
```
