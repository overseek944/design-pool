---
id: marquee-still-state
category: motion-system
tags: [motion,accessibility,marquee,correctness,overflow]
axes: none
cost: 1
seen: 25
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

Where the edge fade is *painted* rather than masked — a gradient pseudo-element
to the surface colour, the form that spares a scrollbar and a focus ring — the
still state has to drop it for a different reason. A surviving mask fades real
content; a surviving painted band covers it, and over wrapped rows it is an
opaque stripe down each side rather than a soft edge. Remove it in the same
block that releases the width.
```css
@media (prefers-reduced-motion: reduce) {
  .marquee::before, .marquee::after { display: none } }
```

Several lanes make the still state one step longer. Each row is its own
overflow context, so releasing the width inside them leaves N stacked wrapped
blocks with the old row rhythm between them. Dissolve the row wrappers as well
— `display: contents` retires them without touching the markup — and give the
cards a fraction width so the whole set reflows as one field rather than as
three short paragraphs of cards.
```css
@media (prefers-reduced-motion: reduce) {
  .row { display: contents }
  .track { flex-wrap: wrap; animation: none }
  .card { width: calc(50% - var(--g) / 2) }   /* 2–3 up */
}
```
⚠ The fraction must account for the gap or the last card in each row wraps
alone. `display: contents` also drops the row's own gap, so the surviving flex
container owns all spacing.

A vertical reel releases a *height*, not a width, and that is the release the
reduced-motion block forgets. Its window is clipped to a whole number of rows,
so stopping the translation leaves exactly those rows showing and crops the
rest — most of the list simply absent rather than still. Release `block-size`
alongside the mask and the duplicates.
```css
@media (prefers-reduced-motion: reduce) {
  .reel      { block-size: auto; mask-image: none }
  .reel ul   { transform: none; transition: none }
  .reel li:not(.real) { display: none } }
```
⚠ A reel worth building is taller than its window, so the release pushes
everything below it down. Reserve the section against the full list, or the
still state reflows the page for exactly the readers who asked for less motion.

Where the copy is fixed and short, the still state does not need a measurement
at all — a viewport width is a good enough proxy for "does this overflow", and
the whole loop apparatus becomes one compound variant chain. Author the still
layout as the plain markup and gate the track width, the overflow, the edge
mask, the `nowrap`, the trailing pad and the duplicate copy on the *same*
narrow-and-motion-safe condition. Reduced motion then falls out for free: the
condition fails, and every one of those six declarations drops together.
```html
<span class="max-md:motion-safe:whitespace-nowrap max-md:motion-safe:pr-24">…</span>
<span aria-hidden="true" class="hidden max-md:motion-safe:block …">…</span>
```
⚠ The duplicate is `hidden` by default and shown only by the same chain, so it
never reaches a reader who is not being shown a loop. Any chain that arms the
track and forgets one of the six leaves a half-marquee — usually the mask,
fading real content that is no longer moving.
