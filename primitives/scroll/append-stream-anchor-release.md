---
id: append-stream-anchor-release
category: scroll
tags: [scroll,correctness,stream,log,architecture]
axes: none
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
Engines silently hold the reading position steady when content is inserted
above the viewport. In a log, a transcript or any append-only stream that also
re-renders earlier rows, that correction fights the component's own scroll
handling — the browser adjusts, the code adjusts, and the view jitters or
refuses to settle at the end. Release anchoring on the scroller and own the
position outright: follow the tail only while the reader is already within
50–150px of it, so arriving content never yanks someone reading history.

```css
.stream { overflow-anchor: none }
/* follow only if already near the end */
/* const near = el.scrollHeight - el.scrollTop - el.clientHeight < 120 */
```
⚠ Release it only where something replaces it. On ordinary prose that
lazy-loads images above the fold, anchoring is the thing keeping the reader's
place, and turning it off is a regression with no visible cause.

Proximity infers the reader's intent from where they are; the gesture states it.
Latch the follow off on the first upward wheel or drag whatever the distance,
and release it only when a downward gesture brings the scroller back inside the
tail band — a reader who nudged up by one notch then stays where they put
themselves, which the proximity test alone will not give them on a fast stream.
Do the release check inside a rAF so a burst of wheel events costs one layout
read. Band 30–80px.
```js
el.addEventListener('wheel', e => {
  if (e.deltaY < 0) return void (held = true)
  cancelAnimationFrame(r); r = requestAnimationFrame(() => {
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 50) held = false })
}, { passive: true })      // each frame: if (!held) el.scrollTop = el.scrollHeight
```
⚠ Wheel and drag are not the whole input set — a keyboard PageUp, a find-in-page
jump or a scripted `scrollIntoView` moves the reader with no gesture to latch
on. Keep the proximity test underneath this one as the floor, not instead of it.

Following the tail by `scrollIntoView` on a trailing sentinel instead of by
assigning `scrollTop` moves one decision into CSS: give the sentinel
`scroll-margin-block-end` and the tail parks that far clear of the viewport edge
instead of flush against it, so the newest line is never the one the reader's
eye has to hunt at the very bottom. Ask for `behavior: 'instant'` explicitly —
`smooth` starts an animation per append and a fast stream leaves the scroller
permanently chasing a target that has already moved. Margin 4–10rem.
```html
<div data-tail aria-hidden="true" style="scroll-margin-block-end: 8rem"></div>
```
⚠ Keep the sentinel empty and out of the accessibility tree. An element with
content is a row the reader can land on that says nothing.

Between an instant jump and `smooth`, close a fixed fraction of the remaining
gap per frame in one rAF loop, restarted — not stacked — on each append. The
tail glides to a moving target and never queues animations. Fraction 0.15–0.25;
snap once the gap is under 1px.
```js
cancelAnimationFrame(s.id); (function f() { const g = el.scrollHeight - el.clientHeight - el.scrollTop
  if (g > 1) { el.scrollTop += g * .18; s.id = requestAnimationFrame(f) } else el.scrollTop += g })()
```
