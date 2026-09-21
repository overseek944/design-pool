---
id: range-offset-scroll-stagger
category: scroll
tags: [scroll,scroll-driven,stagger,sequence,css-only]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A scroll timeline has no clock, so `animation-delay` and any stagger written in
seconds do nothing — every child resolves at the same scroll position. Name one
timeline on the container and give each child its own `animation-range`
instead: the sequence becomes N windows on one shared progress, scrubbed in
both directions and correct at any scroll speed. Step the window start by
40–60% of its width so consecutive items overlap into a wave; disjoint windows
read as a queue being served.

```css
.card       { view-timeline: --flow block }
.step .bar  { animation: draw linear both; animation-timeline: --flow }
.step:nth-child(1) .bar { animation-range: entry 5%  cover 22% }
.step:nth-child(2) .bar { animation-range: entry 14% cover 31% }   /* +9% a step */
```
⚠ A window ending past `cover 100%` never completes — the last item of a long
run holds part-drawn forever. Budget the whole sequence inside the timeline and
shorten the windows, not the step.
