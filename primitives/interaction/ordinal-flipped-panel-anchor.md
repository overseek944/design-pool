---
id: ordinal-flipped-panel-anchor
category: interaction
tags: [interaction,menu,panel,css-only,layout,correctness]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A panel wider than its trigger and centred on it runs off the viewport when the
trigger sits near the end of a row. Measuring at runtime is more machinery than
the problem needs, because the trigger's ordinal position already predicts it:
anchor the panel to the row's end for the last few triggers and centre it for
everything before them. One selector, no script, no second layout pass. Flip the
last 2–4 depending on how the panel's width compares to the container's.

```css
.item > .panel { left: 50%; translate: -50% 0 }
.row > .item:nth-last-child(-n+3) > .panel { left: auto; right: 0; translate: 0 }
```
⚠ The count is tuned against one row width. Re-check it wherever the row wraps
or drops items, or a middle trigger keeps a flip it no longer needs — and keep
the offset in `translate` so it cannot fight a transition on `transform`.
