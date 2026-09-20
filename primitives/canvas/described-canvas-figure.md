---
id: described-canvas-figure
category: canvas
tags: [canvas,accessibility,architecture,diagram]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A canvas carrying the argument — a diagram, a chart, a staged explanation — is
content, and `aria-hidden` throws it away. Give it `role="img"` and a label
stating what the drawing *shows*: the entities, the direction of flow, the
point. One label serves every scene a scrubbed canvas passes through, so write
the whole sequence in reading order rather than the current frame. 40–90 words;
past that, move it to a visually-hidden paragraph and `aria-describedby` it.
```html
<canvas role="img" aria-label="Five intake queues converge on one shared
  record, then fan out to six review agents and back to one person."></canvas>
```
⚠ `role="img"` prunes the subtree, so fallback markup inside the element stops
being read. Decoration takes `aria-hidden` instead — both are decisions.
