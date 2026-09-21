---
id: worst-case-ground-ink
category: color
tags: [color,contrast,accessibility,icon,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A mark handed to a surface you do not own — a favicon in the tab strip, a
bookmark row, an OS notification — has no ground to measure against, and
`prefers-color-scheme` will not supply one: it reports the OS setting, which
the host chrome may ignore. Guess, and the mark vanishes wherever the guess is
wrong. Take the value whose *lower* contrast across both grounds is highest.

```
maximise  min( contrast(ink, lightGround), contrast(ink, darkGround) )
  vs #fff / #000 the optimum is ~#757575, 4.58 : 1 either way
  real chrome is never pure — re-solve against the two actual extremes
```
⚠ Balanced is mediocre by construction — the ceiling is ~4.6:1, so the mark has
to read at 4:1 and can never reach 7:1. Only where transparency is forced:
anything that can carry an opaque plate should, and then the ink is chosen
against a known colour and beats this every time.
