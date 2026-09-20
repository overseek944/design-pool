---
id: gap-compensated-loop-distance
category: motion-system
tags: [motion,marquee,correctness,loop,overflow]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A duplicated track loops seamlessly only when it travels exactly one repeat.
`translateX(-50%)` is that distance only if the halves tile edge to edge — but
a flex `gap` puts a separator *between* the halves as well as inside them, so
the track runs one gap longer than twice its content and 50% lands short by
half a gap. The seam shows as a stutter once per cycle. Subtract it, or drop
`gap` and carry spacing as trailing margin so no separator exists to miscount.
```css
.track { display: flex; gap: var(--g, 14px); width: max-content;
  animation: run 52s linear infinite }            /* 30–90s */
@keyframes run { to { transform: translateX(calc(-50% - var(--g) / 2)) } }
```
⚠ The error is small and periodic, so it reads as jank rather than as a bug —
outline the two halves in contrasting colours before trusting the eye.
