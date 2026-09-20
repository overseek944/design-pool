---
id: once-versus-toggle
category: scroll
tags: [scroll,reveal,ux]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Two reveal policies, chosen per intent, never mixed arbitrarily:
- `once: true` — content reveals. Fires once; scrolling back shows a settled page.
- `toggleActions: "play none none reverse"` — decorative motion. Replays on
  return, so the page stays alive on a second pass.

Content that re-animates every time reads as unstable.
