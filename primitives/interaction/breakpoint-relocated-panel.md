---
id: breakpoint-relocated-panel
category: interaction
tags: [disclosure,responsive,dom,breakpoint,accessibility,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: [focus-handoff-on-self-removal]
tension: []
---

A row of triggers whose detail opens in one shared panel below them loses that
arrangement when the row collapses to a single column: the panel lands several
cards below the one that opened it, and no restyling reaches it — a grid child
cannot render inside a sibling. Relocate the node instead: into the active
trigger's own card below the breakpoint, back to the shared slot above it. Run
the placement from the media query's `change` as well as from every state
change. Swap at 600–800px, wherever the row loses its second column.

```js
const narrow = matchMedia('(max-width: 44rem)')
const place = () => { const host = narrow.matches && open ? open.card : slot
  host.moveBefore ? host.moveBefore(open.panel, null) : host.append(open.panel) }
narrow.addEventListener('change', place)
```
⚠ `append` reinserts rather than moves: an embed inside reloads and the keyboard
drops to `<body>`. Park inactive panels in the shared slot, never in a card, or
a closed card is taller than its neighbours by a hidden box.
