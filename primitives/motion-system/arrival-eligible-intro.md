---
id: arrival-eligible-intro
category: motion-system
tags: [motion,intro,entrance,correctness,accessibility,session]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: [paused-as-authored-rest]
tension: []
---
An opening sequence is owed only to a fresh arrival at the top. Play it only if
it has not run this session, there is no fragment, the page is not already
scrolled (restored position, back navigation) and motion is allowed. Everyone
else gets the resting page. Mark it played when it *starts*; hold the
page's own entrance keyframes paused under a root attribute until it ends, so
they run after the intro, not behind it. Intro 1–2.5s, skippable.

```js
const ok = !sessionStorage.getItem('intro') && !location.hash && scrollY === 0
  && !matchMedia('(prefers-reduced-motion: reduce)').matches
```
⚠ Storage can throw (private modes, blocked cookies) — wrap it and treat failure
as *ineligible*, or the intro replays on every page.
