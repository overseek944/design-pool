---
id: externally-owned-brand-token-pair
category: color
tags: [color,tokens,theming,third-party,contrast,icon,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A third-party brand colour is fixed by its owner, so deriving the dark variant
with `color-mix()` is closed to you: move it and it stops reading as that brand.
Define each one twice instead — the official value on the light ground, a
hand-picked sibling on the dark, lifted just enough to clear 3:1. 15–30% lighter
suits a saturated mark. A monochrome brand has no lighter sibling and must flip
outright, which is why one derivation rule never covers a set.

```css
:root { --net-a:#0866ff; --net-b:#e4405f; --net-mono:#0c1249 }
.dark { --net-a:#4d8dff; --net-b:#f0648c; --net-mono:#fff }
```
⚠ A recoloured mark may breach the owner's brand terms on anything reading as
endorsement. Keep the shift to icon tint and accent rules, never a reproduced
logo, and never let tint alone name which service it is.
