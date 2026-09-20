---
id: edge-hotzone-sibling-reveal
category: interaction
tags: [interaction,hover,panel,chrome,css-only,accessibility]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Reclaim the width a hidden rail costs without a toggle: park an invisible strip
against the viewport edge and let its `:hover` drive the panel through the
sibling combinator. The panel's own `:hover` repeats the rule, which latches it
open while the pointer travels across it — the two selectors are what make this
work at all. No state, no listener, nothing to leave stuck open. Strip 4–16px;
widen it toward the top edge where pointers overshoot.

```css
.hotzone { position: fixed; inset-block: 0; inline-size: 8px; z-index: 1 }
.rail    { transform: translateX(-100%); transition: transform .22s var(--ease) }
.hotzone:hover ~ .rail, .rail:hover, .rail:focus-within { transform: none }
```
⚠ Hover-only means no keyboard or touch path: `:focus-within` must ride along,
and coarse pointers need a real button. Give a class on the root that suppresses
the peek, or a drag near the edge fights it.
