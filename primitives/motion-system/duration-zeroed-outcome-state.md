---
id: duration-zeroed-outcome-state
category: motion-system
tags: [motion,architecture,correctness,scene,reduced-motion]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: [paused-as-authored-rest]
---
A scene built from dozens of delayed one-shots has a still state nobody wrote:
the composition after every beat has landed. Zero `animation-duration` and
`animation-delay` across the subtree and each filled animation resolves to its
last keyframe at once — the outcome paints with no second render path and no
inventory of the scene's contents. Serves a thumbnail, a reduced-motion
branch. Earns its place past 4–12s of beats.

```css
[data-scene=static] * { animation-duration: 0s !important;
                        animation-delay: 0s !important }
```
⚠ It renders *after everything finished* — an element whose last beat is an exit
resolves to gone, and one animating without `both`/`forwards` snaps back to its
unanimated base. Elect a frame for loops.

The same zeroing serves an imperative timeline, where the branch is otherwise a
second code path nobody tests. Multiply every duration and stagger by the
preference as a number — `.9 * !reduce` — and the identical calls build the
identical timeline, which simply lands on its first frame. One list of tweens,
one set of end states, and a preference that can be re-read without a second
implementation to keep in step.
```js
tl.to(els, { opacity: 1, y: 0, duration: .9 * !reduce, stagger: .12 * !reduce })
```
⚠ Only safe for tweens that end where the content belongs. A zeroed `from()`
still runs — instantly — so anything whose *start* state is the hidden one needs
a `set()` instead, or the reader gets the un-revealed frame permanently.
