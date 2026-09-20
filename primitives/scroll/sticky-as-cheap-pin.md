---
id: sticky-as-cheap-pin
category: scroll
tags: [scroll,layout,performance]
axes: {energy: 1, density: 2, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`position: sticky` for anything that only needs to hold position — no JS, no
layout recalculation, no pin-spacer. Reserve library pinning for cases that
genuinely need a scrubbed timeline.
