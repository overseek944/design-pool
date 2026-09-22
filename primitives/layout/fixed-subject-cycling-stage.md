---
id: fixed-subject-cycling-stage
category: layout
tags: [layout,mock,demo,loop,composition,evidence]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A looping product vignette that replaces its whole stage every beat reads as a
set of unrelated screenshots — the reader re-parses from nothing each frame and
learns sequence from none of it. Hold one element fixed at the top of the stage,
the subject the frames are acting *on*, and cycle only what happens beneath it.
The same three frames then argue one continuous thing rather than three separate
ones. Fixed region 25–40% of stage height: under that it stops anchoring, over it
the cycling half goes cramped.

```css
.stage   { display: grid; grid-template-rows: auto minmax(var(--tallest), auto) }
.subject { grid-row: 1 }                    /* never animates */
.frame   { grid-row: 2; grid-column: 1 }    /* frames stack, one shared clock */
```
⚠ Floor the cycling row at the tallest frame or the stage resizes every beat and
the fixed subject moves — which is the one thing it exists not to do.
