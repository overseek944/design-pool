---
id: lit-uncovering-front
category: reveal
tags: [reveal,wipe,blend,light,scroll,edge]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Revealing by retreating an opaque cover, rather than by fading or masking,
leaves a hard edge — and a hard edge can be doubled. Ride a second layer on the
same travel: a narrow band in a lightening blend mode whose peak sits a few
percent ahead of the cover's edge. The front stops reading as a rectangle
sliding off and starts reading as the content being burned into existence. Band
10–20% of the travel, peak alpha 30–60%, the two edges within 4–8%.

```css
.cover, .heat { position: absolute; inset-block: 0; left: -100%; width: 200% }
.cover { background: linear-gradient(90deg, transparent 50%, var(--bg) 56%) }
.heat  { mix-blend-mode: color-dodge;
  background: linear-gradient(90deg, #0000 36%, #ffffff4d 46%, #ffffff9e 52%, #0000 56%) }
```
⚠ `isolation: isolate` on the wrapper, or the dodge reaches the page behind and
blows out what is there. One transform must drive both layers; a near-match
cover colour means the band lights the seam before it lights the content.
