---
id: one-sided-hover-delay
category: interaction
tags: [interaction,hover,delay,css-only,restraint,pointer]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A hover-revealed panel wants patience on the way in and none on the way out: a
pointer crossing a list should not strobe every preview it passes, but a reader
who leaves expects the panel gone now. Declare `transition-delay` only inside
the hover rule — the resting rule carries none, so entry waits and exit runs
immediately. No timer, no state, nothing to leak. Delay 150–300ms; under 120ms
it stops filtering pass-throughs.

```css
.preview { opacity: 0; visibility: hidden; transition: opacity .14s, visibility .14s }
@media (hover: hover) and (pointer: fine) {
  .row:hover .preview { opacity: 1; visibility: visible; transition-delay: .2s } }
```
⚠ Keep it inside `(hover: hover)`: on touch, emulated hover makes the panel
arrive a fifth of a second after the tap that asked for it.
