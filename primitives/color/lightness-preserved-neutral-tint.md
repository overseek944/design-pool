---
id: lightness-preserved-neutral-tint
category: color
tags: [color,tokens,theming,neutral,contrast]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Greys left literally grey under a coloured theme read as a second system bolted
to the first. Name every neutral after its own hex — a mechanical replace, no
judgement per call site — then have each theme ship a full replacement set,
every entry pulled toward its hue and held at its original lightness. The
surface takes the accent's temperature and no contrast pair moves, because
nothing changed on the axis contrast is measured against. Chroma 2–6% dark,
under 2% near white.

```css
:root             { --n-1d1d1f: #1d1d1f; --n-8e8e93: #8e8e93 }
[data-theme=fern] { --n-1d1d1f: #151f1a; --n-8e8e93: #8a938e }
```
⚠ The namespace means nothing, so it cannot swap light for dark — that needs a
semantic layer above choosing which neutral a role reads.
