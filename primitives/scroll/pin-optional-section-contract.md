---
id: pin-optional-section-contract
category: scroll
tags: [scroll,architecture,correctness,accessibility,pin,fallback]
axes: none
cost: 2
seen: 3
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
