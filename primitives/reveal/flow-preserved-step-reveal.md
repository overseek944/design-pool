---
id: flow-preserved-step-reveal
category: reveal
tags: [reveal,text,steps,clip-path,typing,layout-safety]
axes: {energy: 3, density: 2, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A left-to-right text reveal animated on `width` leaves normal flow: the element
needs `white-space: nowrap`, its settled width is the content's rather than the
container's, and `overflow: hidden` then clips the tail permanently wherever the
line no longer fits. Animate `clip-path: inset()` in `steps(n)` instead — the box
keeps the size and wrapping it would have had, nothing reflows as it plays, and
`n` at the rendered character count makes one step one glyph. Steps 20–60; under
about 12 the quantisation reads as chunks rather than as typing.

```css
@keyframes ink { from { clip-path: inset(0 100% 0 0) } to { clip-path: inset(0) } }
.line { animation: ink 1.6s steps(34) .3s backwards }
```
⚠ A clip uncovers every wrapped line at once, so this only reads as typing on a
single line. Land at `inset(0)` under reduced motion — a heading whose animation
never runs is otherwise clipped to nothing and unreadable.
