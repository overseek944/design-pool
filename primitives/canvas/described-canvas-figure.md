---
id: described-canvas-figure
category: canvas
tags: [canvas,accessibility,architecture,diagram]
axes: none
cost: 1
seen: 3
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

The same decision governs a figure built out of DOM — a chart of divs, a record
of labelled rows. `role="img"` collapses the subtree into one node, which is
exactly what is wanted: otherwise a reader walks forty unframed numbers. A
*timed* re-enactment cannot be labelled at all, because no one sentence is true
of it for more than a second — `aria-hidden` it and put the story in the
section's visible lede, where it serves every reader instead of hiding in a
visually-hidden block.
```html
<figure role="img" aria-label="A week of meter readings against the learned
  baseline, with weekend load 38 percent above it flagged."> … </figure>
```

The argument that saves a scrubbed canvas saves a *timed* re-enactment too,
and the pruning is the mechanism rather than the cost: the subtree churns, the
node does not, so one label written as the whole story in reading order stays
true for the whole run. What makes it fair is the transport beside it — a
demonstration that moves for more than five seconds owes a pause, and a seek
turns the label's sequence into something a reader can actually reach. Serve
the transport `hidden` and let the runtime reveal it on the one path where the
thing really moves, so a page with no script never offers controls for a still
picture.
```html
<div role="img" aria-label="…every beat, in order, as one sentence…">…</div>
<div class="transport" hidden><button aria-label="Pause demo">Pause</button></div>
```
⚠ Label and film drift the first time a beat is added — generate it from the
sequence's own step table, or review both together or neither.
