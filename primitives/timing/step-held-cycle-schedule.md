---
id: step-held-cycle-schedule
category: timing
tags: [motion,keyframes,loop,sequence,cycle]
axes: {energy: 2, density: 2, weight: 2, finish: 3}
cost: 1
seen: 6
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
`step-end` on the shorthand turns a keyframe list into a discrete schedule:
nothing interpolates, so a pair of stops holding one value becomes a *dwell* and
every change between pairs is a hard cut. An N-state rotator is then one
animation over one strip — no clock, no `transitionend` wrap, no duplicated
track, and the holds are readable as percentages instead of tuned timers. Use
where the states are alternatives rather than a continuum. Dwell 15–25% of the
cycle each, four to six states.

```css
@keyframes slots {                        /* hold, cut, hold, cut … */
  0%,20%  { translate: 0 0 }
  25%,45% { translate: 0 -100% }
  50%,70% { translate: 0 -200% }
}
.strip { animation: slots 12s step-end infinite }
```
⚠ A hard cut mid-word is unreadable at speed — under about 2s per dwell use a
crossfade instead. Live text swapping under a clock needs `aria-live` or it is
announced on every cut; mark it decorative otherwise.

Drop `step-end` and the same paired stops give the opposite reading. With an
ordinary easing the pair still holds — the two stops share a value — but the
gap *between* pairs interpolates, so the element rests on each state and then
glides to the next. A highlight walking down a fixed-pitch list is then one
keyframe and one duration: the pitch is the only number repeated, and each hop
carries the whole easing curve. Dwell 10–14% of the cycle, hop 4–6%, one pair
per row.
```css
@keyframes walk { 0%,11% { translate: 0 0 } 15%,27% { translate: 0 var(--pitch) }
                  31%,43% { translate: 0 calc(2 * var(--pitch)) } }
.cursor { animation: walk 12s ease-in-out infinite }
```
⚠ The last pair must end at 100% or the element snaps home across the cycle
boundary. Anything the reader is meant to act on cannot be selected by a clock —
this marks a demonstration, never a control.

Where the states are positions on a continuum rather than alternatives, the
keyframe list disappears entirely: `steps(n)` over a single two-stop travel
gives n equal hops for free, and n is the only number to tune. A marker crossing
a track then reads as a sampled signal rather than a glide — the quantisation
*is* the instrument — and re-pitching it is one integer, not a rewritten block.
6–10 steps over 1–2s reads as machine sampling; below about 4 it reads as a
stutter bug.
```css
.packet { animation: travel 1.2s steps(8) infinite }
@keyframes travel { from { left: 0 } to { left: calc(100% - var(--w)) } }
```
⚠ Animating `left` is a layout property — the hops are cheap only because there
are eight of them per cycle, and on anything larger than a mark use `translate`.
