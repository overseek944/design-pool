---
id: origin-signed-entrance
category: motion-system
tags: [motion,tabs,state,custom-properties,transition]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
A tab set whose panels all enter from the same side throws away the one thing
the motion could say: which way you moved. Keep a single keyframe, put the
travel in a custom property, and let the *outgoing* item set its sign through a
data attribute on the container. The incoming panel then arrives from the side
you left, and the set reads as a strip you are moving along rather than a stack
of unrelated screens. 12–24px of travel over 180–260ms; further and it stops
being one place.
```css
.view                    { --from: 16px }
.view[data-prev=right]   { --from: -16px }
.view[data-prev] .copy > * { animation: enter .24s cubic-bezier(.23,1,.32,1) backwards }
@keyframes enter { from { opacity: .45; translate: var(--from) 0 } }
```
⚠ `backwards` is load-bearing — without it the element paints at its end
position for a frame first. Under reduced motion drop the animation, not just
the offset.
