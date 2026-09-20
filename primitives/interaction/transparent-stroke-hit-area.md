---
id: transparent-stroke-hit-area
category: interaction
tags: [accessibility,svg,interaction,touch,correctness,detail]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A small mark inside a `viewBox` — a path node, a scrubber dot — is a three-pixel
target that no box trick reaches: padding does nothing to a shape, and a shape
takes no pseudo-element. Its stroke is the hit area. Widen `stroke-width` far past
the drawn size and give it a zero-alpha colour; `paint-order: stroke
fill` stops the fat stroke swallowing the fill it straddles. The geometry never
moves. Hit stroke 6–12 user units against a 2–3 unit mark.

```css
.node             { fill: #fff; stroke: var(--line); stroke-width: 2 }
.node[data-grab]  { stroke: rgb(0 0 0 / 0); stroke-width: 8; cursor: grab;
                    paint-order: stroke fill; pointer-events: all }
```
⚠ `pointer-events` must be `all` or `stroke`: the default `visiblePainted`
ignores an unpainted stroke, so the target silently does not exist. Stroke width
is in user units and shrinks with the fit; `vector-effect: non-scaling-stroke`
pins it to screen pixels.
