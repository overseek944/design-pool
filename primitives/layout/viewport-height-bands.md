---
id: viewport-height-bands
category: layout
tags: [layout,responsive,media-query,ornament,correctness]
axes: none
cost: 1
seen: 5
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

A panel inside a resizable pane, a modal or a split view cannot ask the
viewport — its height is the pane's. Make it a `size` container and branch on
`@container (height < N)`, then step down rather than switch: withdraw the
ornament at the first gate, collapse padding and drop one type step at the
second. Gates 600px and 740px. Take labels out with `sr-only`, not
`display: none`, so the visual collapse does not also strip the accessible name.
```css
.pane  { container: pane / size }
@container (height < 740px) { .ornament { display: none } }
@container (height < 600px) { .head { padding-top: 0 } .tag { /* sr-only */ } }
```
⚠ `container-type: size` needs a definite height from above and stops the panel
being sized by its own contents — a height query on an auto-height box never
matches.
