---
id: anchor-into-scrubbed-pin
category: scroll
tags: [scroll,navigation,anchor,correctness,pin]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
An in-page link into a scrubbed pin lands at the top of the pin — progress 0,
the timeline's first frame, where everything is still invisible. The reader
arrives on an empty screen. Give each scrubbed section the timeline position
where its entrance has finished and resolve the anchor to the matching scroll
offset: 8–20% into the pin for a typical entrance.
```js
const y = wrap.getBoundingClientRect().top + scrollY
        + (enterAt / total) * spacer.offsetHeight
scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' })
```
⚠ Read pinned-ness from computed `position`, not a stored flag, and snap a
smoothed scrub to the destination on arrival or it eases across the gap after
the scroll has stopped.

The opposite link is the one that breaks: a jump to a section *past* the pin,
where a global `scroll-behavior: smooth` animates the reader through every frame
of a timeline they asked to skip — several screens of scrub at whatever rate the
engine picks. Suppress the behaviour for that one click rather than abandoning
native anchor navigation, which is carrying focus, history and the hashchange.
Restore the declaration a frame later, and settle the timeline to its new
position in the same frame so it does not ease across the gap afterwards.
```js
s.setProperty('scroll-behavior', 'auto', 'important')   // then let the click run
requestAnimationFrame(() => { read(); elapsed = target; render(); s.removeProperty(…) })
```
⚠ Restore in a `finally` and guard re-entry — a second click while the override
is live captures it as the "previous" value and the page loses smooth scrolling
for good.
