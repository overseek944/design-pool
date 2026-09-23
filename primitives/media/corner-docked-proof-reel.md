---
id: corner-docked-proof-reel
category: media
tags: [media,video,fixed,floating,dock,social-proof]
axes: {energy: 3, density: 2, weight: 3, finish: 3}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A short muted loop fixed in a corner for the whole page keeps a human face
beside every section, so proof travels with the argument. Size it on the
viewport with a floor and ceiling, and give it a labelled header strip so it
reads as a player, not an ad. Width 26–34vw, floor 280–320px, ceiling
380–440px, inset 16–24px.

```css
.reel { position: fixed; inset: auto 20px 20px auto; z-index: 40;
  width: clamp(300px, 30vw, 420px); aspect-ratio: 16 / 9 }
@media (max-width: 767px) { .reel { display: none } }
```
⚠ It covers content on every screen: give it a close control, reserve its height
as end padding before the footer, and pause the loop under reduced motion.
