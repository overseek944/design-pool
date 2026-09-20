---
id: namespaced-hook-families
category: motion-system
tags: [architecture,motion,scale]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
Prefix hooks by section (`data-why-card`, `data-why-canvas`, `data-why-gauge`)
so one section's motion system is self-describing and removable in one grep.
Scales to dozens of choreographed sections without collision.

Variant — make the prefix a path rather than a word: `section.beat.element`
(`s3.b2.caret`) in one attribute. A section is still one grep, a single beat is
a narrower one, and any node can name its owning section with
`el.dataset.motion.split('.')[0]` — which is what lets one observer route every
section's entrance without a lookup table.
