---
id: anchor-into-scrubbed-pin
category: scroll
tags: [scroll,navigation,anchor,correctness,pin]
axes: none
cost: 2
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
An in-page link into a scrubbed pin lands at the top of the pin — progress 0,
the timeline's first frame, where everything is still invisible. The reader
arrives on an empty screen. Give each scrubbed section the timeline position
where its entrance has finished and resolve the anchor to the matching scroll
offset: 6–20% into the pin for a typical entrance, the low end where the target
is one beat of a multi-chapter timeline rather than the pin itself.
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

The same map run backwards turns the pin's progress indicator into a control:
step *i* of *n* sits at `i / (n - 1)` of the **usable** travel, which is the
spacer's height minus one viewport, not its height. Using the full height puts
the last step past the end and it can never be reached; using `i / n` lands
every step short by one slot. One expression serves the dots, a keyboard
handler and a deep link.
```js
const span = wrap.offsetHeight - innerHeight          // usable, not offsetHeight
scrollTo({ top: wrap.offsetTop + (i / (n - 1)) * span,
           behavior: reduced ? 'auto' : 'smooth' })
```
⚠ A jump is a scripted scroll that fires the same handler the wheel does, so the
index it lands on must be derived, never assigned alongside it — assigning both
leaves the state disagreeing with the position the moment the user interrupts.

Smooth is the wrong default when the control lives beside the states it selects
— a step rail on screen throughout. A smooth scroll sweeps every intermediate
position, so the rail flashes through each step on the way to the one just
picked, which reads as the page choosing rather than the reader. Jump with
`behavior: 'instant'` from a control inside the pin, and keep the smooth branch
for links arriving from elsewhere on the page, where the travel is the thing
being shown.
⚠ An instant jump still fires the handler, so the state lands in the same frame
and needs no suppression window — which is what makes it worth preferring over
blacking the spy out for the duration of a tween.
