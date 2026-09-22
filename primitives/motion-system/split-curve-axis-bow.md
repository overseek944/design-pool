---
id: split-curve-axis-bow
category: motion-system
tags: [motion-system,easing,transform,arc,waapi,demo]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A mark travelling between two points on one transform moves in a straight line
whatever the easing — easing controls rate, never shape. Split the translate
across two nested boxes, one per axis, each with its own curve: the path bows by
exactly the disagreement between them, and identical curves measure a
dead-straight 0%. No path, no spring, no per-frame maths — a plain CSS
transition arcs. Bow 2.5–4% of the chord.

```js
const E = { major: 'cubic-bezier(.42,.03,.19,1)',    /* dominant axis */
            minor: 'cubic-bezier(.52,.04,.2,1)' }    /* the bow lives here */
bx.animate([{translate:`${x0}px 0`},{translate:`${x}px 0`}], {duration: d, easing: E.major, fill:'both'})
by.animate([{translate:`0 ${y0}px`},{translate:`0 ${y}px`}], {duration: d, easing: E.minor, fill:'both'})
```
⚠ Both tracks need one duration or the bow becomes a hook at one end. Past ~6%
it reads as a swerve, and on a near-vertical move the cross axis is the long
one — swap which curve carries the bow.
