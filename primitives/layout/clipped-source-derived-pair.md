---
id: clipped-source-derived-pair
category: layout
tags: [layout,provenance,evidence,truncation,panel,mock,hierarchy]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A system that derives structure from unstructured input proves it by
composition, not by caption. Put the input in one pane and the output in the
other, and let the asymmetry argue: every input line clipped at the pane edge,
whole passages standing in as a lone `…` row, while every derived value wraps
freely and is keyed in one accent. Clipped and monochrome reads as *more where
that came from*; complete and coloured as *this is what we took*. Panes 1:1 to
1:1.4, input one tier down in size and ink.

```css
.panes  { display: grid; grid-template-columns: 1fr 1fr }
.src  p { overflow: hidden; text-overflow: ellipsis; white-space: nowrap }
.out dd { color: var(--accent) }
```
⚠ Clipped text loses its end silently — the input pane is illustrative, so mark
it `aria-hidden` rather than shipping severed strings to a screen reader. Stack
input-first below 30–45rem, or the output arrives before its evidence.
