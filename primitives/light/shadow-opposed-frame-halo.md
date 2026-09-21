---
id: shadow-opposed-frame-halo
category: light
tags: [glow,media,surface,depth,dark-mode]
axes: {energy: 1, density: 2, weight: 3, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A large dark plate on a dark ground reads as a hole cut in the page, and more
shadow only deepens the hole. Light it from the opposite side instead: a faint
tinted ellipse on a wrapper pseudo-element behind the frame, bled past the
edges by *uneven* insets — widest at the sides, less above, least below, where
the drop shadow is already working. The two never overlap, so the plate reads
as lit and seated rather than as either alone. Bleed 4–16% per edge, peak
alpha .06–.12.

```css
.wrap::before { content: ""; position: absolute; inset: -10% -14% -4%;
  pointer-events: none; z-index: 0;
  background: radial-gradient(ellipse 62% 58% at 50% 42%, var(--halo), transparent 70%) }
```
⚠ Past ~.15 it stops being ambience and reads as an oval drawn on the ground.
Gone entirely under `forced-colors` — never the only thing separating frame
from page.
