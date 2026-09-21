---
id: inverted-bevel-state-pair
category: surface
tags: [surface,depth,detail,affordance,state,border]
axes: {energy: 2, density: 2, weight: 2, finish: 3}
cost: 1
seen: 5
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

A single hairline gives a soft plate; a stack of zero-blur insets at increasing
spread gives a *chamfer* — a machined, pre-antialiasing edge that reads as
tooled metal rather than lit paper. Four rings on a flat mid-grey, light source
still up-left: 1px bright, 1px dark on the opposite pair, then a 2px pair one
step closer to the fill. No blur anywhere and no radius, or the steps smear into
a gradient and the whole effect goes. Depth 2–4px; past that it reads as a frame.
```css
.chrome { background: #c0c0c0;
  box-shadow: inset 1px 1px 0 #fff, inset -1px -1px 0 #808080,
              inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #c0c0c0 }
```
⚠ The construction encodes one hard-coded light direction and one fill
luminance — it does not survive a theme flip, so scope it to a deliberately
period surface rather than to the control system.

Over a dark ground the fix is to move the highlight, not to retint it. The lit
edge is the one facing the page's own light, and on dark that is the *under*
side — so the same control takes `0 1px` in light and `0 -1px` in dark, each at
a few percent of the opposite extreme. Flipping only the colour leaves a bright
seam along the top; flipping the edge keeps one light source across both
themes. 4–8% either way, doubled on a saturated fill.
```css
.btn         { box-shadow: inset 0 1px 0 #0000000f }
.dark .btn   { box-shadow: inset 0 -1px 0 #ffffff0f }
```
⚠ Press has to stay distinguishable from rest in both — invert to `0 1px` of
the *ground* colour on `:active` rather than removing the edge, or the dark
theme's pressed state is simply flat.
