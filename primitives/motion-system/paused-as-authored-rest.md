---
id: paused-as-authored-rest
category: motion-system
tags: [motion,architecture,correctness,scene,performance]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: [loop-gated-on-attention]
tension: []
---
A decorative scene whose resting state is *running* has already played its
opening beats by the time anyone scrolls to it, so the first thing a reader sees
is the middle of a loop. Invert the default: write `paused` into every
`animation` shorthand in the scene, hold the whole subtree paused from the
container, and let the visibility flag flip it to `running`. The still first
frame is then the authored resting composition — no hidden-then-revealed class,
nothing to un-hide, and nothing composited before it is looked at.
```css
.stage *, .stage ::before { animation-play-state: paused !important }
.stage[data-running=true] *, .stage[data-running=true] ::before { animation-play-state: running !important }
.beat { animation: rise 2.4s cubic-bezier(.23,1,.32,1) both paused }
```
⚠ Nothing ever runs if the flag is never set — a scene that ships without its
observer is silently frozen rather than visibly broken.

A scripted rotator has the same duty and one more step: under a standing motion
preference it must not merely stop, it must return to index zero. Freezing where
it happens to be leaves a reader who will never see the cycle looking at the
third variant, chosen by nothing. Reset inside the preference's `change`
handler, not only at mount, so switching the OS setting mid-session lands on the
authored opening rather than wherever the timer got to.
```js
const onPref = e => { clearInterval(t); t = null; if (e.matches) setIndex(0); else start() }
```
⚠ The same argument applies to a generative scene: hold it at a still frame the
composition was designed around — frame zero, or a seed chosen for it — rather
than at whatever the clock reached before the preference was read.
