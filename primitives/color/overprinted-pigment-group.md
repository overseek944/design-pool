---
id: overprinted-pigment-group
category: color
tags: [color,blend,texture,editorial,surface,cheap]
axes: {energy: 1, density: 2, weight: 4, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Overlap flat saturated shapes under `mix-blend-mode: multiply` and every
intersection mixes a fourth and fifth ink the palette never declared. It reads
as printed rather than composited — the overlaps are evidence the shapes are
pigment, not layers, which no amount of opacity buys. Isolate the group so the
blend stops at its own box. Two to four shapes, fills at 0.85–0.95 alpha, on a
ground light enough to mix into; over a dark one multiply makes mud.

```css
.group     { isolation: isolate }
.group > * { mix-blend-mode: multiply }
```
⚠ Nothing legible may sit beneath it: multiply darkens by the product of both
layers, so copy showing through drops below its measured contrast.
