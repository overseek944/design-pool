---
id: fill-agnostic-state-plate
category: interaction
tags: [hover,state,pseudo-element,theme,system,contrast]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---

A hover token per fill does not scale: a control faced with an image, a
gradient or a brand colour has no lighter shade to name. Lay a neutral alpha
plate over it instead — an inset `::after` inheriting the radius — and one rule
covers every face in the system. The plate is theme polarity, not palette:
black alpha on light grounds, white on dark, so a single token flips. Bordered
elements need `inset: -1px` or the border stays unlit while its face moves.
3–4% resting step, 8–10% pressed.

```css
.tint { position: relative; isolation: isolate }
.tint::after { content: ""; position: absolute; inset: 0; border-radius: inherit;
  pointer-events: none; background: transparent; transition: background-color .12s }
.tint:hover::after { background: var(--elevate-1, #0000000a) }
```
⚠ The plate sits over the glyphs and tints them too — past ~12% it starts
eating text contrast. Invisible in forced-colors, so carry the state in a
border or outline as well.

Inside a segmented track the plate has to travel the other way. The selected
segment is the darkest thing in the control, so tinting an unselected one
*toward* it says "already chosen" and the reader stops trusting the selection.
Send the hover toward the page ground instead — a paper-coloured plate on a
grey track under a paper page — and the two states separate on direction rather
than on amount. The track then has to sit clearly off the ground, 3–6% of the
ink, or hover has nowhere to travel to.
```css
.track { background: var(--ground-2) }                /* 3–6% ink over the page */
.seg[aria-current] { background: var(--ink); color: var(--paper) }
.seg:not([aria-current]):hover { background: var(--paper) }
```
⚠ Direction is not a state for anyone who cannot see it — the chosen segment
carries `aria-current` or `aria-selected` regardless, and needs a non-colour
mark under forced colours.
