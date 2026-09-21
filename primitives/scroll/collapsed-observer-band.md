---
id: collapsed-observer-band
category: scroll
tags: [scroll,observer,navigation,architecture,correctness]
axes: none
cost: 1
seen: 9
requires: []
conflicts: []
completes: []
tension: []
---
Squeeze an observer's root to a single horizontal line and "which section am I
in" answers itself. Top and bottom root margins summing to −100% leave a
zero-height band; at `threshold: 0` only one section can intersect it, so the
latest intersecting entry *is* the active one — no scroll listener, no
measuring, no nearest-distance tiebreak. Move the band to choose where the
hand-off reads: 20–35% from the top for a table of contents, ~50% for a reading
indicator.
```js
new IntersectionObserver(
  es => es.forEach(e => e.isIntersecting && setActive(e.target.id)),
  { rootMargin: "-20% 0px -80% 0px", threshold: 0 })
```
⚠ A section shorter than the band can pass through without intersecting, and
the highlight sticks on the previous one.

The band also answers "what is *under* my fixed chrome right now". Offset its
top by the chrome height rather than a percentage and squeeze the bottom to
−90%, and each section can declare its own ground polarity on a data attribute
— the overlay bar then recolours itself from the section it is currently
crossing instead of guessing from scroll position. Transition the colour over
200–300ms so the hand-off does not snap at the boundary.
```js
{ rootMargin: `-${navH}px 0px -90% 0px`, threshold: 0 }
// nav.classList.toggle('over-light', e.target.dataset.navbg === 'light')
```

Where a section shorter than the band is possible, drop the observer and hit-test
instead: on a throttled frame, walk the labelled sections and take the one whose
box spans a single probe line, defaulting if none does. It costs a rAF and a
handful of rect reads, and no section can slip through unnoticed because the
question is asked of every candidate rather than answered by whoever fired last.
```js
const y = bar.getBoundingClientRect().bottom + 36
let g = 'light'
for (const s of sections) { const r = s.getBoundingClientRect()
  if (r.top <= y && r.bottom > y) g = s.dataset.ground ?? 'light' }
```

For a binary — has the page left the top, is the hero behind us — the band
collapses further into a sentinel: a zero-height element placed in the document
at the threshold, observed with a top `rootMargin` of minus the chrome height.
The threshold is then expressed in layout rather than as a pixel constant that
goes stale the next time the hero changes height, and there is no scroll
listener at all.
```js
new IntersectionObserver(([e]) => bar.toggleAttribute('data-raised', !e.isIntersecting),
  { rootMargin: `-${navH}px 0px 0px 0px` }).observe(sentinel)
```
⚠ The sentinel must not be the sticky element's own child — it scrolls with the
bar and never leaves the root.

The sentinel need not be zero-height, and making it the sticky bar's *previous
sibling* is the tidier form: give it a real height and cancel that height with
an equal negative bottom margin, so it costs nothing in flow while the distance
scrolled before the state flips is the sentinel's own height. `rootMargin` goes
back to `0` and the chrome height stops being restated in script — the band is
tuned by editing one class, and a `w-px` keeps it from widening anything.
```html
<div aria-hidden="true" class="-mb-6 h-6 w-px"></div>   <!-- 16–48px band -->
<header class="sticky top-0">…</header>
```
⚠ Sized in `rem`, the band moves with the root scale; sized in `px` it does
not. Pick whichever matches what the threshold is meant to track.
