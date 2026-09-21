---
id: mirror-flanked-panorama
category: media
tags: [media,image,panorama,mirror,responsive,full-bleed]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Artwork with a fixed aspect either stretches or loses its composition as the
viewport outgrows it. Hold it at its own ratio, centred, and hang a mirrored
copy outside each edge under a gradient to the page ground: the mirror makes the
seam continuous, so the flank reads as more of the same scene, and the gradient
means nothing has to be invented past where the eye stops. One file, any width.
Flank gradient at ground by 100%, 80–90% at two-thirds, 50–65% at one-third.

```css
.flank { position: absolute; inset-block: 0; inline-size: 100%; right: 100% }
.flank > .art { transform: scaleX(-1) }
.flank::after { content: ""; position: absolute; inset: 0;
  background: linear-gradient(to left, transparent, var(--ground)) }
```
⚠ Distant or non-representational material only — a mirrored building, figure
or letterform reads as a fold. The flanks are decorative duplicates: `aria-hidden`,
empty `alt`, and the description stays on the centre copy alone.
