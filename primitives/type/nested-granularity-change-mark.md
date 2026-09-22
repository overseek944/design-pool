---
id: nested-granularity-change-mark
category: type
tags: [type,annotation,diff,editorial,color,state]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A change marked at one granularity answers half the question: a line washed as
changed does not say which words moved, and a word marked alone loses which
lines to read. Nest them — the block takes a weak tint, the run inside it a
stronger step of the *same* hue, and the ink darkens with the ground so both
levels hold contrast. Two steps read as one scale; a second hue reads as a third
category. Block 8–15% of the accent, inner run 25–40%.

```css
.changed      { background: color-mix(in oklab, var(--mark) 12%, transparent) }
.changed mark { background: color-mix(in oklab, var(--mark) 32%, transparent);
                color: var(--mark-ink) }   /* --mark/--mark-ink paired per sense */
```
⚠ Hue alone is the encoding, and added/removed is the pair a red-green
deficiency collapses — carry a `+`/`−` glyph too. The darker ink owes 4.5:1
against the stronger tint, not against the page.
