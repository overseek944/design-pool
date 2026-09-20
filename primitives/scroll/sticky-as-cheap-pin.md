---
id: sticky-as-cheap-pin
category: scroll
tags: [scroll,layout,performance]
axes: {energy: 1, density: 2, weight: 2, finish: 3}
cost: 1
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
`position: sticky` for anything that only needs to hold position — no JS, no
layout recalculation, no pin-spacer. Reserve library pinning for cases that
genuinely need a scrubbed timeline.

Write the offset against the chrome, never as a literal: `top: calc(var(--chrome)
+ var(--gap))` where `--chrome` is the same token the fixed header is sized
from. A banner appearing above the header then moves every sticky element with
it instead of sliding half of them underneath. Gap 16–64px.
