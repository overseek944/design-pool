---
id: snap-suppressed-scroll-wrap
category: scroll
tags: [scroll,carousel,snap,loop,correctness]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A duplicated track makes a scroll container endless only if the scroll position
can be jumped back by exactly one repeat, and a snap container fights that jump
— the engine animates it, or re-snaps to where it came from, and the seam
shows. Clear `scroll-snap-type`, write the new offset, force a reflow so it
commits with snapping off, restore it, and only then issue the real smooth
`scrollBy`. Wrap within one item of an edge, never at it.

```js
if (el.scrollLeft < itemW) {            // within one item of the head
  el.style.scrollSnapType = 'none'
  el.scrollLeft += repeat               // items × (width + gap), measured
  void el.offsetHeight                  // commit before snapping returns
  el.style.scrollSnapType = ''
}
el.scrollBy({ left: -itemW, behavior: 'smooth' })
```
⚠ Measure the repeat from the live item width and gap, never a constant — a
breakpoint that changes either puts every wrap half an item out. Only the first
copy is real content; mark the rest `inert`.

A track moved by `transform` rather than by scrolling wraps the same way, with
the transition standing in for snapping. Lay out three copies, keep the index
in the middle one, and after the animated step to a clone *lands* — wait at
least the transition's duration, not a frame — clear the transition, write the
home index's offset, force a reflow, and restore it. Delay = duration + 30–80ms.
```js
setTimeout(() => { track.style.transition = 'none'; paint(home)
  void track.offsetHeight; track.style.transition = '' }, DUR + 50)
```
⚠ A click inside that window starts a step from the clone and the rebase then
yanks it — ignore input until the rebase has run.
