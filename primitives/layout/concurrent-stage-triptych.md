---
id: concurrent-stage-triptych
category: layout
tags: [layout,mock,state,hierarchy,progression,figure]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: [state-dimmed-subordinate-tier]
---
Show every stage of a gated process at once, each panel in its own real state,
and the progression needs no interaction to read. The trap: finished and
not-yet-reached are both inactive, so one dimming treatment cannot separate
them. The completed panel keeps its content at full strength and takes a mark;
the locked one drops to placeholder geometry, so the reader sees there is
nothing there to read yet. Three to five stages.
```css
.stage[data-at="done"]  { --mark: var(--ok) }
.stage[data-at="later"] { filter: saturate(.35); opacity: .55 }
```
⚠ Draining the locked panel is only honest where the reader genuinely cannot
act on it; where all stages are open choices, dim the supporting tier instead.
