---
id: anchor-into-scrubbed-pin
category: scroll
tags: [scroll,navigation,anchor,correctness,pin]
axes: none
cost: 2
seen: 1
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
