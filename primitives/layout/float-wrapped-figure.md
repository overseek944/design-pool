---
id: float-wrapped-figure
category: layout
tags: [layout,type,editorial,responsive,detail]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Neither grid nor flex wraps running text *around* a picture — float is still
the only mechanism, and in long-form it is the right one: the figure sits inside
the paragraph that earns it, the prose closes underneath, and the two read as
one block. Figure 35–50% of the measure, capped near 460px.

```css
.figure { float: inline-start; inline-size: min(46%, 460px);
          margin-inline-end: 2.25rem }
.prose  { display: flow-root }                    /* contains the float */
@media (width < 720px) { .figure { float: none; inline-size: 100% } }
```
⚠ A float taller than its paragraph pushes the next heading sideways. Go full
width before the wrapped column falls under ~28 characters — below that it
reads as a ladder.
