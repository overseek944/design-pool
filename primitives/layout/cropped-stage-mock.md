---
id: cropped-stage-mock
category: layout
tags: [layout,responsive,overflow,media,scale,detail]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Show a framed artifact — a handset, a browser chrome, a console — as a crop
rather than a whole object: a stage of fixed height, the frame pushed down from
its top edge and running off the bottom. It reads as a live thing continuing
past the panel instead of a product shot, and it costs no vertical space it does
not earn. Drive both from two properties so the scrollable interior can be
derived rather than guessed, and retune only those two per breakpoint.
```css
.stage { --h: clamp(460px, 44vw, 650px); --top: 56px; height: var(--h); overflow: hidden }
.frame { margin: var(--top) auto 0; aspect-ratio: 9 / 19.5; width: 80% }
.feed  { height: calc(var(--h) - var(--top) - 200px); overscroll-behavior: contain }
```
⚠ The crop must fall on filler, never on a control or the last line of content.
