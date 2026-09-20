---
id: fixed-attachment-band
category: scroll
tags: [scroll,parallax,media,surface,progressive-enhancement,performance]
axes: {energy: 2, density: 1, weight: 3, finish: 3}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A full-bleed decorative band whose image is pinned to the viewport rather than
to the band: the window travels over a still picture and the depth cue costs no
script, no listener, no transform. It earns its place as a breath between two
dense sections — the one interstitial where nothing is being argued. Height
40–85vh.

```css
.band { block-size: 60vh; background: url(x.jpg) center/cover fixed no-repeat }
@media (max-width: 720px) { .band { background-attachment: scroll;
                                    block-size: 45vh } }
```
⚠ Pinned backgrounds repaint the whole surface on every scroll tick: affordable
on an `aria-hidden` band, never behind text. iOS ignores it and paints a static
crop, so the band must still read at rest.
