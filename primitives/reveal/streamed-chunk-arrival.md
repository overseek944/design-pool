---
id: streamed-chunk-arrival
category: reveal
tags: [reveal,streaming,text,entrance,list,custom-properties]
axes: {energy: 2, density: 2, weight: 1, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Text that arrives in chunks — a generated answer, a live log — pops in a block
at a time unless each chunk softens its own arrival. Tag chunks with one
attribute and read timing from custom properties with fallbacks, so the
container retunes the stream. `::marker` takes neither opacity nor transform,
only `color` — animate that from transparent or bullets land early. Fade or
blur 2–6px over 0.1–0.2s.

```css
[data-arrive] { animation: var(--arrive, fade) var(--arrive-dur, .15s) ease both }
[data-arrive]::marker { animation: marker-in var(--arrive-dur, .15s) ease both }
@keyframes marker-in { from { color: transparent } }
```
⚠ Keep `aria-live` on the finished message, not the fragments. Under reduced
motion drop the animation outright.
