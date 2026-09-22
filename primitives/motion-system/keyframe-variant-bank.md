---
id: keyframe-variant-bank
category: motion-system
tags: [motion,generative,ambient,tokens,architecture]
axes: {energy: 3, density: 4, weight: 2, finish: 3}
cost: 2
seen: 12
requires: []
conflicts: []
completes: []
tension: []
---
Phase and period offsets only ever translate one curve; they cannot make a
crowd look *unrehearsed*. Generate 16–40 keyframe blocks of irregular on/off
timings once at build time, have one rule read `animation-name` from a custom
property, and let each element pick a track. A hundred dots then flicker on a
hundred unrelated schedules with no runtime scheduler, no per-element JS and
only opacity animating.

```css
.ember { animation-name: var(--track, none); animation-duration: var(--loop, 4s);
         animation-iteration-count: infinite }
.t7 { --track: flicker-7 }              /* 16–40 tracks */
@keyframes flicker-7 { 0%,18%{opacity:1} 19%,37%{opacity:0} 38%{opacity:1} }
```
⚠ Every track is parsed and kept resident — past ~40 the stylesheet cost stops
paying. Under `prefers-reduced-motion` set `animation: none` *and* an explicit
resting opacity, or elements freeze wherever their track happened to start.

Where instances differ by one *scalar* rather than by schedule, skip the bank:
read a custom property with a fallback from inside the keyframe, and one block
serves every element off a single inline declaration.
Express the animated value as a `calc()` *multiple* of that property rather than
as an absolute, and the block becomes amplitude-relative: every element returns
to its own resting value at 0% and 100%, so a field whose members sit at twenty
different opacities breathes without any of them jumping to a shared level on
the first frame. Peak 1.8–2.5× rest; an absolute peak flattens the field the
moment it plays.
```css
@keyframes breathe { 0%, to { opacity: var(--rest, .3) }
                     50% { opacity: calc(var(--rest, .3) * 2.2) } }
```
⚠ `calc()` will happily exceed 1 — clamp with `min()` or the brightest members
all saturate to the same ceiling and the variation you paid for disappears.

Cheaper than a bank where the members are few: give duration and delay
*different* moduli over the index, coprime, and a row of eight bars repeats on
their least common multiple rather than on either one. Two expressions, no
generated CSS, and nothing lines up inside a group small enough for the eye to
check.
```js
el.style.animation = `wave ${1 + (i % 4) * .16}s ease-in-out ${(i % 5) * .11}s infinite`
```
⚠ Coprime or it is worse than no variation — moduli sharing a factor give a
short visible cycle that reads as a pattern.

One track is enough when the crowd should read as *sparse* rather than
unrehearsed. Give the keyframe a short visible window — present from 10% to 58%
of the cycle, absent either side — and the duty fraction becomes the fraction of
the pool on screen at any moment: N members at duty d show about N × d. Density
stops being a count tuned by hand and becomes a number you set, with delays
scattered across one period doing the rest. Duty .3–.6 reads as activity; under
.2 the field reads as broken.
```css
@keyframes surface { 0%, to { opacity: 0; scale: .82 }
                     10%, 58% { opacity: 1; scale: 1 } }
```
⚠ Spread the delays over the *whole* period. Every member shares one duration,
so a delay range covering a fraction of it fixes the phase relationship
permanently — the population bunches into one burst per cycle and never drifts.

A track can be chosen by width as well as by element. Where the layout reflows
from a row to a column, motion authored along one axis is wrong in the other — a
marker travelling a horizontal rail has to travel down the vertical one — and
overriding `animation-name` alone in the media query leaves every other part of
the declaration, the duration above all, in one place. Duplicating the whole
shorthand per breakpoint gives the two widths two clocks, which drift from the
shared token the first time either is retuned.
```css
.pip { animation: var(--seq) linear infinite both; animation-name: run-x }
@media (width < 48rem) { .pip { animation-name: run-y } }
```
⚠ Changing the name restarts the animation, so an element on a shared sequence
re-enters at 0% on every resize across the breakpoint — invisible on a loop,
visible on a one-shot and on anything meant to stay in phase with its neighbours.
