---
id: overflow-traversing-label
category: interaction
tags: [overflow,hover,focus,type,css-only,detail]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A label too long for its row is usually handed a tooltip or left truncated. Let
the row play it back instead: on hover or `:focus-within`, travel the text left
by exactly its own overflow and return. This is not a marquee — no duplicate
track, no seam, and because the keyframe ends where it began the resting frame
is always the truncated head, so stopping part-way is harmless. Measure the
overflow once into a custom property and scale the duration by it, or a
slightly-long label crawls while a very long one sprints. 60–110px/s,
`ease-in-out`.

```css
@keyframes traverse { 0%, 100% { translate: 0 } 50% { translate: calc(-1 * var(--over)) } }
.row:hover .label,
.row:focus-within .label { animation: traverse var(--dur, 4s) ease-in-out infinite }
```
⚠ Key it on the row, never on the text: a pointer over the label's own box loses
the hover the moment the text slides out from under it, and the run stutters.
Nothing here reaches a reader who never hovers — the whole string still has to be
in the accessible name.
