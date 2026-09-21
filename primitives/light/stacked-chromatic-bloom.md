---
id: stacked-chromatic-bloom
category: light
tags: [effect,glow,filter,svg,depth]
axes: {energy: 3, density: 2, weight: 4, finish: 4}
cost: 3
seen: 3
requires: []
conflicts: []
completes: [overflow-visible-for-glow-bleed]
tension: []
---
`filter: drop-shadow()` chains, and follows the alpha channel — so unlike
`box-shadow` it glows the actual silhouette, not its bounding box. Stack two at
different radii and opposing hues (one warm, one cool) for a bloom with colour
separation instead of a flat halo.
```css
filter: drop-shadow(0 0 1.5vh rgba(255,147,103,.40))
        drop-shadow(0 0 2.5vh rgba(177,159,255,.30));
```
⚠ compositor-heavy on large or animated elements. Promote deliberately.

Write the geometry in `em` and the bloom belongs to the type rather than to a
breakpoint: offsets and radii scale with a `clamp()`-sized headline, so one
declaration holds from a phone to a wall. Signing the first shadow's *vertical*
offset turns the halo into a riser — the letterform sits on a coloured shelf
instead of floating in a glow — which survives over a photograph where a
symmetric bloom is eaten by the ground.
```css
.display { filter: drop-shadow(0 .035em rgb(var(--accent) / .62))
                   drop-shadow(0 0 .16em rgb(var(--accent) / .28));
           padding-inline-end: .04em }        /* offset .02–.05em, blur .1–.25em */
```
⚠ `filter` paints inside the inline box, so an offset or blur wider than the
glyph's side bearing is clipped at the edge of the line — reserve padding equal
to the largest offset. It also creates a containing block for descendants.
