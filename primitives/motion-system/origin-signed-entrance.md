---
id: origin-signed-entrance
category: motion-system
tags: [motion,tabs,state,custom-properties,transition]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 4
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

Signed travel is a claim about distance, and it is false the moment the index
can *jump* — a rail tapped from step one to step five slides the same 16px as a
neighbour change and says the two are equally far apart. Branch on the delta,
not the sign: adjacent moves slide, anything further crossfades on a shorter
clock, 200–300ms. The strip reads as continuous where it is and as a cut where
it is not, which is the honest answer in both cases.
```js
const d = next - cur
el.className = Math.abs(d) > 1 ? 'snap' : d > 0 ? 'enter' : 'enter-rev'
```
⚠ The outgoing layer needs the same branch — pair a slide-out with the slide and
nothing at all with the cut, or the cut animates one half of a swap it is not
part of.
