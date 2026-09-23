---
id: equal-track-segment-thumb
category: interaction
tags: [interaction,segmented,toggle,selection,state,control,transform]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Where every option in a segmented control is the same width, the sliding thumb
needs no measurement. Put options on equal grid tracks, size the thumb to one
track, and move it by `translateX(k × 100%)` of its own width: position is the
selected index, so font swaps and resizes never leave it stale. 160–260ms ease-out.

```css
.seg { display: inline-grid; grid-template-columns: repeat(var(--n), 1fr); position: relative; padding: 4px }
.thumb { position: absolute; inset-block: 4px; left: 4px; width: calc((100% - 8px) / var(--n));
  transform: translateX(calc(var(--i) * 100%)); transition: transform .2s ease-out }
```
⚠ Unequal labels break it — measure instead. Under RTL set `--i` to n−1−k. Thumb
`aria-hidden`; state lives on the buttons (`aria-pressed`).
