---
id: clipped-source-derived-pair
category: layout
tags: [layout,provenance,evidence,truncation,panel,mock,hierarchy]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 2
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

Where one derived value is the proof, draw its lineage instead of trusting the
panes to imply it. Tint the exact source span and the filled field in the same
accent wash, then join them with a single hairline curve that leaves the span
and arrives at the field's facing edge — one tie per figure, never one per
value, or the pair becomes a wiring diagram. Stroke 1–1.5px, wash 15–25% alpha.
```css
.src mark, .out .tied { background: color-mix(in oklab, var(--accent) 20%, #0000) }
.tie { fill: none; stroke: var(--accent); stroke-width: 1.25 }
```
⚠ The curve is decorative — `aria-hidden`, and re-solve its ends when either
pane reflows.
