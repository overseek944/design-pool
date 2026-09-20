---
id: hoisted-scroll-timeline
category: scroll
tags: [scroll,motion,architecture,progressive-enhancement]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A named `scroll-timeline` is visible only to descendants of the scroller.
`timeline-scope` on a common ancestor hoists the name so siblings and parents
can read it — a backdrop tracking a panel's own scroll, a progress rail outside
the region it measures. The animation's `animation-duration` (1ms–1s) is inert;
the timeline supplies progress.

```css
.shell  { timeline-scope: --panel }
.panel  { overflow-y: scroll; scroll-timeline: --panel block }
.veil   { animation: fade 1ms linear both; animation-timeline: --panel }
```
⚠ `timeline-scope` must be declared on an ancestor of both the scroller and
every consumer, or the name resolves to `none` silently and the animation sits
frozen at its start value — a blank overlay, with no error anywhere.
