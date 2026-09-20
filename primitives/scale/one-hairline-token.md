---
id: one-hairline-token
category: scale
tags: [unit,tokens,border,precision,coherence]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Every thin line in a system should be the same line. Declare one hairline width
in `rem` and spend it on borders, list rules, underline thickness and icon
strokes — `vector-effect: non-scaling-stroke` keeps an icon's stroke at that
weight whatever box it is drawn into. In `rem` the whole system thickens
together on a large display instead of stranding one 1px line.
```css
:root { --hair: .0625rem }
.rule { border-top: var(--hair) solid var(--line) }
a { text-decoration-thickness: var(--hair); text-underline-offset: .2em }
svg [stroke] { stroke-width: var(--hair); vector-effect: non-scaling-stroke }
```
⚠ Useful range .0625–.125rem. Thinner and the line drops out on non-retina.
