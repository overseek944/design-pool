---
id: weight-dropped-display-line
category: type
tags: [type,display,headline,hierarchy,contrast]
axes: {energy: 1, density: 2, weight: 4, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A display block can carry its own hierarchy with no second size, colour or
face: hold the opening line at the heaviest cut and drop the continuation to
the lightest, same size and same ink. Tight leading closes the pair into one
mass rather than a heading stacked on a subhead, and the break is authored, so
the split lands on the clause you chose.

```css
h1        { font-weight: 650; line-height: 1.02; letter-spacing: -.02em }
h1 > span { display: block; font-weight: 300 }   /* gap 250–400 */
```
⚠ Needs a drawn light cut; a synthesised one thins unevenly. Below ~40px the
light line loses stroke and reads as a render fault, so this wants 48px up.
Return the span to inline at 390px or the authored break strands a word.

Keep the pair on one line rather than breaking it and the same drop changes
role: the heavy run stops being a first line and becomes a label, with the light
run as its content — a colon or a dash after the heavy cut makes the reading
explicit. The optical gap needs help, because the weight change eats it; add
0.2–0.4em of extra space at the join rather than a second word-space. This
survives small sizes better than the stacked form, since the two cuts are read
against each other in the same eye span.
```css
h2 b + span { margin-inline-start: .3em; font-weight: 300 }
```
