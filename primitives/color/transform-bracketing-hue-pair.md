---
id: transform-bracketing-hue-pair
category: color
tags: [color,diagram,semantics,pipeline,hue,accessibility]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A pipeline figure whose input and output look alike asks the reader to trust
the arrow. Give everything upstream of the transforming node one hue and
everything downstream a second, and switch *at* the node — never gradually
along a route, never a third hue between them. Anything crossing takes its
side's colour, so the junction is where identity changes rather than where two
lists meet. Hold the pair within about 8% lightness, or one side reads as the
answer and the other as the question.

```css
.upstream   { --side: #818cf8 }     /* nodes, labels, anything travelling */
.downstream { --side: #4ade80 }
.node { box-shadow: 0 0 48px 8px rgb(from var(--side) r g b / .22) }
```
⚠ Hue alone cannot say before and after — it is gone in greyscale and under
`forced-colors`. Owe the two sides a non-colour difference as well: position, a
word, or the arrowhead.
