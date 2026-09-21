---
id: stepped-follow-transition
category: motion-system
tags: [motion,pointer,transition,steps,character]
axes: {energy: 3, density: 1, weight: 2, finish: 3}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: [eased-pointer-influence]
---
Anything that follows the pointer glides, and glide reads as liquid. Put a
`steps()` timing function on the *transition* rather than the keyframes and the
follow lands in discrete positions instead — the element snaps between a small
number of poses, which reads as a mechanism watching rather than a blob
chasing. Two or three steps over 80–160ms is the whole character; more steps
and it just looks like a slow ease.

```css
.tracker { transition: transform .11s steps(2, end) }
```
```js
el.style.transform = `translate(${dx * 0.06}px, ${dy * 0.06}px)`  /* gain .04–.1 */
```
⚠ Quantising hides jitter but not cost — still write the pointer value from a
single rAF, not from every `pointermove`. Under `prefers-reduced-motion` drop
the transition and leave the element at its rest pose.

The same quantisation on a *paint* property is a different register again. Put
`steps()` on a `fill`, `background-color` or `color` transition across a set of
marks and the change lands in four to six visible ticks rather than dissolving —
the set reads as a readout updating, not as artwork fading. It costs nothing a
fade did not, because the property and the duration are unchanged. Steps 4–6
over 0.35–0.6s; below four it is a flicker, above eight the eye stops resolving
them.
```css
.cell { transition: fill .5s steps(5, end) }
```
⚠ A stepped colour crosses intermediate values that were never designed — check
the ones that land on text for contrast, not just the two endpoints.
