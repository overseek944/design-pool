---
id: marquee-still-state
category: motion-system
tags: [motion,accessibility,marquee,correctness,overflow]
axes: none
cost: 1
seen: 11
requires: []
conflicts: []
completes: []
tension: []
---
A marquee's reduced-motion state is not a paused marquee. The track carries its
content twice so the loop can wrap seamlessly, and the copy is hidden only by
being in motion — stop the animation and the list is simply there, read out
twice, half of it clipped. The still state is a different layout: drop the
duplicate, release the single-line width, let the items wrap, and remove the
edge mask that now fades real content.
```css
@media (prefers-reduced-motion: reduce) {
  .track { animation: none; width: auto; flex-wrap: wrap; gap: 20px }
  .track [aria-hidden] { display: none }
  .marquee { mask-image: none }
}
```
⚠ Pause-on-hover is not a substitute: it needs a pointer and never fires.

Variant — when wrapping would take over the page, make the still state a native
horizontal scroller: keep the single-line width and the mask, which now marks a
real affordance, and hand the track to the reader.
```css
.row { overflow-x: auto; scroll-snap-type: x mandatory; overscroll-behavior-x: contain }
```

A single-line label that scrolls only *because* it might clip has a third state
between the two: at rest one line with `text-overflow: ellipsis`, armed only
where the text genuinely overflows, and `ellipsis` swapped for `clip` while it
runs — otherwise the ellipsis stays pinned at the trailing edge and eats the
characters the scroll exists to show.

Invert which state is authored: ship the wrapped still layout as the markup's
default and let script upgrade it to a track once it has confirmed the
capability it needs. The fallback is then the thing that always renders, not a
branch nobody tests.
```css
.marquee:not([data-enhanced]) .track { animation: none; flex-wrap: wrap; width: 100% }
```

Give it a real pause control rather than relying on hover — a visible button
above 44px that flips the same running flag. It is the only stop available to a
touch reader, and it outranks every automatic gate.

The duplicate goes in the scroller variant too. A native horizontal scroller
over a doubled track spends half its distance on a repeat the reader has just
passed, which reads as a bug rather than as a loop — drop the `aria-hidden`
copy and let the real content set the scroll width.
