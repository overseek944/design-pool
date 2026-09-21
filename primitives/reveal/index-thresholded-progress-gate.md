---
id: index-thresholded-progress-gate
category: reveal
tags: [reveal,scroll,custom-properties,progress,cheap,svg]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
One scalar can sequence a whole set with no tween per member and no per-element
script. Give each member its index as a custom property, publish the front's
position in those same units, and let `clamp()` gate: members behind the front
are fully on, the one at the front is partly on, everything ahead is off. The
whole set re-sequences by changing one number and a new member costs an index.
Spread the front over 1 unit for a hard edge, 2–4 for a soft one.

```css
.trail   { --p: 0 }                                /* script writes this only */
.trail g { opacity: clamp(0, calc((var(--p) - var(--i)) / var(--soft, 1)), 1);
           transition: opacity .35s linear }
```
⚠ A member the front never reaches holds at zero forever — the range must
exceed the highest index, and an off-by-one leaves the last item invisible with
nothing to report it. The input does not interpolate; the transition is what
keeps a coarse write from stepping.

The unit need not be an index. Where the members are unevenly sized — a
timeline whose entries run to different lengths — measure each member's own
mark against the track and publish *that* fraction as its threshold, so the
gate fires as the front passes the mark rather than on an even division. One
write per member at layout time, and the front is already in the same
fraction-of-track units. Spread 0.05–0.1 of the track.
```js
items.forEach(el => el.style.setProperty('--at',
  ((el.offsetTop + el.querySelector('.mark').offsetTop) / track.clientHeight).toFixed(4)))
```
```css
article { --on: clamp(0, calc((var(--p) - var(--at)) * 20), 1) }
```
⚠ The thresholds are layout, so they must be re-measured on resize — a reflow
that changes one member's height silently desynchronises every member after it.
