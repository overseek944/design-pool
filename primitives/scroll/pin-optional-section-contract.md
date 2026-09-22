---
id: pin-optional-section-contract
category: scroll
tags: [scroll,architecture,correctness,accessibility,pin,fallback]
axes: none
cost: 2
seen: 6
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
