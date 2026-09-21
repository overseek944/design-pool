---
id: wrap-joined-marker-block
category: type
tags: [type,emphasis,highlight,decoration,radius,detail]
axes: {energy: 2, density: 2, weight: 4, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A solid block behind a phrase paints one rectangle per line, so at a wrap the
two fragments read as two separate marks. `box-decoration-break: clone` gives
each fragment its own padding and radius; then round only the corners on the
outside of the run and cut the two at the join almost square, and the pair reads
as one shape folded around the break. Where the leading opens a seam, overlap
the fragments by 2–6% of the line box and order them on z. Outer radius
0.2–0.4em, join 0.04–0.1em.

```css
.mark { box-decoration-break: clone; padding: .1em .22em; background: var(--accent) }
.mark-a { border-radius: .3em .3em .3em .05em; z-index: 2 }
.mark-b { border-radius: .3em .05em .3em .3em; margin-top: -.04em }
```
⚠ The fragments are authored spans, so the join sits where the line broke at one
width — give them a uniform radius at any breakpoint where the text rewraps, or
the notch lands mid-line. The block is a colour change: the pair must clear
4.5:1 on its own.
