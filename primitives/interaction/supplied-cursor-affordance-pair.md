---
id: supplied-cursor-affordance-pair
category: interaction
tags: [interaction,pointer,detail,chrome,accessibility]
axes: {energy: 2, density: 2, weight: 3, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Replacing the arrow is a strong voice, and the failure is replacing only the
arrow: one supplied bitmap everywhere kills the hand over links, so nothing
looks clickable. Ship the image twice under different fallback keywords — `auto`
on the ground, `pointer` on anything interactive — and the affordance grammar
survives the art failing as well as the art. Inline it as a data URI. 16–32px,
hotspot on the drawn tip.

```css
body { cursor: url("data:image/png;base64,…") 2 2, auto }
a, button, summary, [role=button] { cursor: url("data:image/png;base64,…") 2 2, pointer }
```
⚠ Platforms cap cursor size near 32px and silently fall back past it. A raster
cursor ignores the OS pointer-size setting, so it shrinks for the readers who
enlarged theirs — and no media query reports that.
