---
id: action-yielding-label-fade
category: interaction
tags: [list,row-actions,mask,truncation,hover,focus,overflow]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Row actions that appear on hover land on top of the label, and shortening the
label to make room reflows the row. Keep the label's box, and on hover or
focus-within mask its trailing edge: fully transparent across the width the
actions occupy, ramping to opaque over another 16–32px. The text dissolves out
from under the buttons, and nothing moves.

```css
.row:is(:hover, :focus-within) .label {
  mask-image: linear-gradient(to left, #0000 var(--actions, 80px),
                              #000 calc(var(--actions, 80px) + 24px)) }
```
⚠ Bind `:focus-within` as well as `:hover`, or keyboard users tab onto buttons
drawn over unreadable text. Measure `--actions` when the action count varies.
