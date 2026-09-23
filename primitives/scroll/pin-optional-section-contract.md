---
id: pin-optional-section-contract
category: scroll
tags: [scroll,architecture,correctness,accessibility,pin,fallback]
axes: none
cost: 2
seen: 9
requires: []
conflicts: []
completes: []
tension: []
---
A pinned stage and the unpinned version of the same material must be one
subtree, not two, or they drift the first time the copy changes. Give each
section one boolean: set, it renders bare for the stage to place; unset, it
wraps itself in an ordinary full-height section. The short-viewport, reduced-
motion and dead-runtime branches then all resolve to markup that already
exists.

```jsx
const body = <><Eyebrow/><h2>{title}</h2><Points/></>
return asSlide ? body
  : <section className="min-h-screen flex items-center py-16">{body}</section>
```
⚠ Only the standalone branch may carry the fragment `id` and its
`scroll-margin`, or the page has two targets for one name. A stage mounting one
scene at a time is invisible to find-in-page — so the fallback, not the stage,
is what a small viewport should get.

The control beside the stage needs the same contract as the content, or the
fallback ships a row of buttons that scroll a page with nothing left to scroll.
One handler, two branches: pinned, it converts the index to a scroll offset;
unpinned, it sets the selection directly and the figure holds that state in
ordinary flow. The affordance can differ — a spread row of counters under a
pinned stage, a wrapped grid of pressable chips in the static one — but the
handler and the state must not.
```js
const go = i => pinned
  ? scrollTo({ top: track.offsetTop + at[i] * (track.offsetHeight - stage.offsetHeight) })
  : select(i)
```
⚠ Both branches owe `aria-pressed` and one `aria-live="polite"` line naming the
current step — in the pinned branch nothing else announces it. The flip between
branches is itself an event: commit the index derived from the last progress
before the pin goes, or a resize drops the reader back at step one.

Gate the boolean on height as well as width. A wide but short window — a laptop
with the dock and toolbar up — cannot fit stage and list, and a width-only query
pins it anyway. Pin from roughly 64rem wide *and* 40–48rem tall, and re-evaluate
on `change` so a resized window flips branch.
```js
const mq = matchMedia('(min-width: 64rem) and (min-height: 44rem)')
mq.addEventListener('change', () => setPinned(mq.matches && !rm.matches))
```

A stepper that is pinned has a clock — the scroll; unpinned it has none, and a
static list of steps beside one figure never shows most of them. Hand the
clock over at the branch flip: start an auto-advance (4–6s) when the pin
disengages, stop it the moment it engages, and route clicks to `scrollTo` or
`select` accordingly.
```js
onPinnedChange: on => on ? stopAuto() : startAuto()
```
⚠ The timer must also yield to reduced motion and to reader input — see
auto-advance handling — or the fallback rotates content under someone reading it.
