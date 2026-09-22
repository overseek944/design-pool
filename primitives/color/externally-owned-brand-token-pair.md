---
id: externally-owned-brand-token-pair
category: color
tags: [color,tokens,theming,third-party,contrast,icon,correctness]
axes: none
cost: 1
seen: 2
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

The constraint inverts where the brand hue is a *series key* rather than an
identity mark. A chart carrying a dozen owners' colours at their official values
fights every ground it is placed on, and nobody is checking a bar against a
brand book — mix each one toward the section's own paper by a tokenised amount
and the set reads as one palette, with the legend carrying the naming the colour
no longer has to. 40–60% on a tinted ground, less in dark where the same mix
flattens faster.
```css
.bar { background: color-mix(in oklab, var(--hue) var(--series-mix, 58%), var(--ground)) }
```
⚠ Mix toward the ground, never toward grey: hues pulled to neutral converge and
two providers stop being distinguishable. Check the mixed set for adjacent pairs
at the percentage you ship, not at the one you designed with.
