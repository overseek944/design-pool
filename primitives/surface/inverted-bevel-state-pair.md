---
id: inverted-bevel-state-pair
category: surface
tags: [surface,depth,detail,affordance,state,border]
axes: {energy: 2, density: 2, weight: 2, finish: 3}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
One inset hairline decides whether a box is raised or recessed, and inverting it
is the whole press. Light from above means a lit top edge plus a faint drop;
the same box with a dark inner top edge and no drop is a well. It doubles as a
static grammar — inputs and readouts take the sunken value, controls the raised
one. Highlight 30–50% white, inner shadow 4–10% black, drop 1–2px at 3–6%.

```css
.chip   { border: 1px solid var(--rule); background: var(--surface);
          box-shadow: inset 0 1px 0 #ffffff73, 0 1px 2px #0000000a }
.chip:active,
.well   { box-shadow: inset 0 1px 2px #0000000f }
```
⚠ Depth is invisible in forced-colors and to low-vision readers — carry pressed
state in the background value too, never in the shadow alone. Over a dark ground
the white highlight reads as a seam; derive it from the ground's luminance.

On a saturated fill both inset edges go white and the pair reads as a convex
face rather than a raised plate: the top edge catches the light, the bottom is
the same light wrapping the lower curve, so it must be the dimmer of the two or
the button looks like a hollow tube. Roughly 2:1 — 20–25% top, 10–14% bottom.
No drop shadow is needed; the fill's own tinted ramp does that job.
```css
.btn { box-shadow: inset 0 1px 0 #ffffff3d, inset 0 -1px 0 #ffffff1f }
```
