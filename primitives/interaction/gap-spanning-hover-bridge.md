---
id: gap-spanning-hover-bridge
category: interaction
tags: [interaction,hover,panel,menu,css-only,accessibility]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A panel held off its trigger by a visual gap is unreachable by hover: the
pointer crosses dead ground and the panel closes under it. Give the panel a
pseudo-element spanning exactly that gap, so its hit area reaches back to the
trigger and the pointer path is continuous. Cheaper than a close-delay timer,
which guesses how long the trip takes and leaves the panel hanging when the
reader turns away. Gap 8–20px; bridge the full width.

```css
.panel { top: calc(100% + var(--gap, 12px)); opacity: 0; pointer-events: none }
.panel::before { content: ""; position: absolute; inset: calc(var(--gap, 12px) * -1) 0 auto; height: var(--gap, 12px) }
.trigger:hover .panel, .trigger:focus-within .panel { opacity: 1; pointer-events: auto }
```
⚠ The bridge is invisible and still takes the pointer — keep it inside the
trigger's own column or it eats clicks beside the panel. Hover has no keyboard
path: `:focus-within` must ride in the same selector list.
