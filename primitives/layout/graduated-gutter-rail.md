---
id: graduated-gutter-rail
category: layout
tags: [layout,grid,rule,scale,gutter,precision,technical]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Give the page a measuring scale down both edges: reserve a narrow grid track
each side of the content and tile a graduation into it — major, half and minor
ticks at three lengths from one SVG tile repeated on y. Tick hierarchy reads
as a ruler; uniform ticks read as a dashed border. The rails own their
tracks, so nothing ever sits on them. Track 1.5–2.5rem, tile 48–96px, ticks
spaced 6–12px.

```css
.frame { display: grid; grid-template-columns: var(--rail) minmax(0,1fr) var(--rail) }
.rail  { background: url(ticks.svg) repeat-y; background-size: var(--rail) 72px }
.rail--end { transform: scaleX(-1) }
```
⚠ Drop the tracks below ~480px — two rails cost 12–20% of a phone's width.
Keep them `aria-hidden` and under 3:1 contrast.
