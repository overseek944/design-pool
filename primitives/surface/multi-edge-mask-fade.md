---
id: multi-edge-mask-fade
category: surface
tags: [surface,mask,edge,composition,bleed]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 16
requires: []
conflicts: []
completes: []
tension: []
---
Let an oversized panel run past the layout and dissolve instead of being cropped
by a hard edge. One `linear-gradient` mask layer per side, each with its own
fade distance, so a detailed surface can bleed off two edges while staying
legible on the others. Name the stops as tokens so the rule reads as a list of
edges, not a wall of colour. Fade distances 80–560px, tuned per edge.

```css
:root { --mask-on: #000; --mask-off: transparent }
.stage {
  mask-image:
    linear-gradient(to left,   var(--mask-off) 0, var(--mask-on) var(--fade-r, 400px)),
    linear-gradient(to top,    var(--mask-off) 0, var(--mask-on) var(--fade-b, 300px));
  mask-composite: intersect;
}
```
⚠ `mask-composite` needs the `-webkit-` prefix pair to work in Safari; without `intersect` the layers union and nothing fades.

Percentage stops instead of px when the fade should scale with the element —
`8%`/`92%` on a horizontal rail keeps the same proportion of fade at every width,
where a fixed 400px eats a narrow one whole. Px for fixed-size stages,
percentages for anything fluid.

On a rail that scrolls, the two ends are not the same edge and should not fade
equally. A short fade at the start — 0.5–1× the gutter — reads as a soft crop,
while a longer one at the end, 1.5–2.5×, reads as *more*: content dissolving
because it continues. A symmetric mask says the rail is centred; an asymmetric
one says which way to swipe.
```css
mask-image: linear-gradient(to right, transparent 0, #000 var(--lead),
                            #000 calc(100% - var(--trail)), transparent 100%)
```

Where the fade is focal rather than per-edge, one oversized radial stop replaces
the whole composited stack — no `mask-composite`, no prefix pair, one layer. A
decorative ground then exists only around the content it sits behind and is gone
by the section boundary, so it never has to be terminated. Size the ellipse
1.5–2.5x the content block and push its centre to the optical focus, usually
above middle; opaque to 40–60%, clear by 80–90%.
```css
mask-image: radial-gradient(900px 700px at 50% 30%, #000 50%, transparent 85%)
```
⚠ Percentage stops here are of the *gradient box*, not the element, so an
explicit ellipse size is what keeps the falloff stable across viewports.

Invert the stops on that radial and the same single layer becomes a keep-out
rather than a frame: clear through the middle, opaque at the rim. An ambient
field laid full-bleed behind an article is then incapable of appearing across
the measure — no z-index race, no per-element placement, and the body-text
contrast floor holds by construction instead of by restraint. Clear to 50–60% of
the ellipse, opaque by 75–90%.
```css
mask-image: radial-gradient(48% 68%, transparent 0 54%, #000 78%)
```
⚠ The gradient box is the element, so on a wide viewport a full-bleed field
clears far more than the column it is protecting — size the ellipse against the
measure, and widen the hole again where the column takes most of the width.
