---
id: ratio-released-viewport-lock
category: layout
tags: [layout,responsive,viewport,aspect-ratio,chrome,mobile,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A page locked to one screen — `100svh`, root `overflow: hidden`, chrome pinned
with `position: fixed` — cannot grow, and fixed chrome is not pushed by content
that overflows: the bar lands *on top of* the copy. Width is the wrong gate for
releasing the lock, since a short landscape window is narrow and still wants it.
Gate on the ratio of the two axes and release everything at once — scroll,
height, and the pinning. Release around 3/4–4/5.

```css
@media (max-aspect-ratio: 4/5) {
  html, body { height: auto; overflow: visible }
  body   { min-height: 100svh; display: flex; flex-direction: column }
  .stage { height: auto; flex: 1 0 auto }
  .bar   { position: static }        /* rejoins flow, sits after the copy */
}
```
⚠ Equal specificity to the base rules, so source order decides — this block
must come last. Zero any clearance the pinned chrome was being padded around,
or the released layout carries that hole at the bottom of every screen.
