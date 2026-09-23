---
id: range-offset-scroll-stagger
category: scroll
tags: [scroll,scroll-driven,stagger,sequence,css-only]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 4
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

Step below about a quarter of the window width and the group stops reading as a
sequence at all: six parts that each take 24–28% of the timeline, starting 4–5%
apart, arrive as one object leaning into place rather than as parts being
assembled. That is what a composed unit wants — a product mock, a card and its
contents — where a visible order would say the thing is built from pieces.
Reserve the 40–60% step for sets whose members are genuinely separate.
```css
.card  { animation-range: cover 0    cover 24% }
.panel { animation-range: cover 5%   cover 30% }   /* +5% on a 24% window */
.body  { animation-range: cover 9%   cover 34% }
```
⚠ The whole group then finishes inside a third of the timeline, so the settle
lands while the section is still arriving — start the last window before the
element is comfortably in view, not after.

Per-word ranges need no `nth-child` ladder: stamp each span with an index
property and compute the window from three knobs on the group, so one rule
serves a headline of any length and a second group retunes by overriding the
knobs alone. Words want a far smaller step than cards — 0.3–1% of the timeline
on a window of 8–12% — or a long line finishes after the section has left.
```css
.words > span { display: inline-block; animation: rise linear both;
  animation-timeline: --words; animation-range:
    cover calc(var(--from) + var(--i) * var(--step))
    cover calc(var(--from) + var(--i) * var(--step) + var(--span)) }
.title { --from: 0%; --step: .8%; --span: 12% }
```
⚠ The span must be `inline-block` or its transform is ignored; wrap the whole
block in `@supports (animation-timeline: view())` so unsupported engines show
static text instead of words parked at the 0% frame.
