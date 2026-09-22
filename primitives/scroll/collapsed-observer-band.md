---
id: collapsed-observer-band
category: scroll
tags: [scroll,observer,navigation,architecture,correctness]
axes: none
cost: 1
seen: 17
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

Where the answer wanted is *how many have passed* rather than *which one is
here* — a panel accumulating a line per item as the column scrolls by — take
the highest index whose top has crossed the probe line, not the one spanning
it. The cursor is then monotone in scroll position, an item shorter than any
band cannot slip through unseen, and the same number drives both the active
item's emphasis and the length of what the panel shows. Probe at 50–60% of the
viewport, where a reader's attention already sits.
```js
let n = -1
items.forEach((el, i) => { if (el.getBoundingClientRect().top < .55 * innerHeight) n = i })
setActive(n); setShown(lines.slice(0, n + 1))
```
⚠ Monotone in position, not in time — scrolling back up must retract the panel
too, or the accumulation becomes a one-way animation that cannot be replayed.

The short-section hole is structural — a zero-height band cannot see an element
that never overlaps it — and closing it means asking a different question. Keep
the sightline, drop the observer: on a rAF-coalesced scroll, walk the targets in
document order and take the *last* one whose top is above the line. Every
section is then answerable whatever its height, ties resolve by order rather
than by whichever entry arrived last, and the same pass can gate other chrome on
the same geometry. Sightline 20–35% of the viewport, as before.
```js
let queued = false
const at = y => targets.filter(t => t.getBoundingClientRect().top <= y).pop()
addEventListener('scroll', () => { if (queued) return; queued = true
  requestAnimationFrame(() => { queued = false; setActive(at(innerHeight * .28)) }) },
  { passive: true })
```
⚠ This is `getBoundingClientRect()` per target per frame — fine for the dozen
entries of a page map, a forced reflow at a hundred. The observer band stays
correct for long uniform sections; take this one where the list is short and
the sections are not.

Where items can miss the band the question has to be answered by distance
rather than by intersection. Take the minimum of `|centre − midline|` across the
set on a rAF-coalesced `scroll` listener: exactly one item always wins, short
items and gaps between them stop mattering, and the first and last go active at
the ends where no band is ever crossed. Write the index only when it changes —
the comparison is the whole cost, the state update is not.
```js
const pick = () => set(i => { let best = i, d = Infinity
  els.forEach((el, n) => { const b = el.getBoundingClientRect()
    const x = Math.abs(b.top + b.height / 2 - innerHeight / 2)
    if (x < d) { d = x; best = n } })
  return best })
```
⚠ It measures every item on every frame it runs, so it does not scale past a
few dozen — and it reads layout, so nothing in the same handler may write it.

`!isIntersecting` is not "we are past it" — it is also true before the sentinel
has ever been reached, and the observer delivers exactly that entry on the first
callback, so a sentinel below the fold flips the state *on* at first paint and
the chrome renders raised on a page nobody has scrolled. Test the direction as
well: only an entry whose rect has passed the top of the root counts.
```js
new IntersectionObserver(([e]) =>
  set(!e.isIntersecting && e.boundingClientRect.top < 0)).observe(sentinel)
```
⚠ Invisible from the top of the page, which is where it is always tested — load
at a `#fragment` below the sentinel, or restore a scroll position, to see it.
Publish the boolean from one module-level store rather than re-observing per
consumer; the answer is a fact about the document, and N observers on one 1px
node is N callbacks per crossing for one bit.

Collapse it nearly, not exactly. Margins summing to −95% leave a band a few
percent of the viewport tall, and a section shorter than a zero-height band
still intersects it — the failure this entry opens with — at the cost of
letting two sections hold the band at once. Resolve that where it happens: of
the intersecting entries take the smallest `boundingClientRect.top`, so the
hand-off still goes to whichever is higher on the page. Band 3–8%.
```js
const hit = es.filter(e => e.isIntersecting)
if (hit.length) setActive(hit.reduce((a, b) =>
  a.boundingClientRect.top <= b.boundingClientRect.top ? a : b).target.id)
```
⚠ The reduce sees only the entries that *changed*, not every observed section —
one already sitting in the band without crossing an edge this tick is absent
from the list, not marked inactive in it.

A single band position is behind the reader in one of the two directions.
Scrolling up, a line fixed at mid-viewport hands off only after the section
above has already filled the top half of the screen, so the marker reads as
lagging — while the same line going down is right. Move the band *toward* the
direction of travel: lower scrolling down, higher scrolling up, and both
directions hand off as the arriving section reaches the leading edge. 8–15% of
the viewport between the two positions.
```js
const m = dir === 'down' ? '-50% 0px -50% 0px' : '-40% 0px -60% 0px'
```
⚠ `rootMargin` is fixed at construction, so this costs a disconnect and rebuild
on every direction change. Debounce the test against a few pixels of travel or
a trackpad's noise rebuilds the observer several times a second — and the
rebuild re-fires for every section, so the active write must be idempotent.

A band with real height is the third answer to the short-section hole, and it
needs no rects. Size it taller than the tallest gap a section can leave —
15–25% of the viewport — so nothing can pass through unseen, then resolve the
several entries that now intersect at once with a rule rather than by arrival
order: take the topmost, sorted on `boundingClientRect.top`. The read is
deterministic at any scroll speed, where "whoever fired last" is not.
```js
const a = es.filter(e => e.isIntersecting)
  .sort((x, y) => x.boundingClientRect.top - y.boundingClientRect.top)[0]
if (a) setActive(a.target)          // rootMargin "-30% 0px -55% 0px"
```
⚠ The two margins no longer sum to −100%, so the band's position is the pair,
not one number — change either and the hand-off point moves.
