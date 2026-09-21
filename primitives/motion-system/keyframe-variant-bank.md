---
id: keyframe-variant-bank
category: motion-system
tags: [motion,generative,ambient,tokens,architecture]
axes: {energy: 3, density: 4, weight: 2, finish: 3}
cost: 2
seen: 6
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
