---
id: prefetch-on-intent-band
category: perf
tags: [performance,navigation,prefetch,observer,architecture]
axes: none
cost: 2
seen: 7
requires: []
conflicts: []
completes: []
tension: []
---
Prefetching is two policies, not one. *Intent* arms on `mouseenter`, `focus` and
`touchstart` and commits only after a short delay, so a pointer crossing a nav
never fetches it; cancel on leave and blur. *Viewport* uses an observer at a
high threshold for the one or two links a reader is almost certain to take.
Default everything to intent.

```js
const io = new IntersectionObserver(es =>
  es.forEach(e => e.isIntersecting && prefetch(e.target)), { threshold: .5 })
onEnter = () => (t = setTimeout(prefetch, 100))   // 80–150ms
onLeave = () => clearTimeout(t)
```
⚠ Viewport prefetch on a long page eventually fetches every route on it — the
threshold limits *when*, not *how many*. Skip both under `navigator.connection.saveData`.

Bound the cache: a 30–90s TTL and a cap near 8 entries, evicted oldest-first.
Validate before storing — a redirect or a non-HTML content type means the URL
went somewhere else, and caching it hands the router the wrong document.

Below both policies sits a third, nearly free tier: warm the *connection*, not
the document. On the same intent signal, point a single reused
`<link rel=preconnect>` at the origin about to be needed and retarget that one
element as intent moves — DNS, TCP and TLS are paid ahead while nothing is
fetched. Browsers keep only a handful of preconnects, so accumulating one link
per hovered card evicts the ones that mattered.
```js
let l = document.querySelector('link[data-warm]') ?? mkLink()
if (l.dataset.warm !== origin) (l.href = origin, l.dataset.warm = origin)
```
Gate the whole ladder on connection quality, not just `saveData`:
`effectiveType` of `2g` or `slow-2g` means speculative bytes compete with the
ones actually asked for.

Widen the band when the payoff is *visible* rather than hidden. A dwell that
swaps a still for a moving preview is a change the reader will see land, so a
100ms arm strobes the whole grid on the way past — 300–500ms, and the response
must be discarded if the pointer has already left, because the request outlives
the intent that started it. Keep a live flag beside the timer and check it after
the await; clearing the timer alone does not cancel a fetch in flight.
```js
onEnter = () => { live = true; t = setTimeout(async () => {
  const r = await load(id); if (live) show(r) }, 400) }        // 300–500ms
onLeave = () => { live = false; clearTimeout(t); hide() }
```
⚠ Gate the arm on a precise pointer *and* on reduced motion — a preview that
begins moving on dwell is motion the reader did not request.

Tier by *resource class* as well as by signal. A route's code chunk is shared,
content-hashed and immutable, so viewport is a safe policy for it; the route's
data is per-reader, uncacheable and often a database read, so it stays on
intent. One page then warms the JS for every link a reader can see and fetches
not one of their payloads.
```html
<body data-preload-code="viewport" data-preload-data="tap">
```
⚠ This only holds while the code tier is genuinely immutable. A bundle served
without a content hash is re-fetched per route and viewport prefetch becomes
worse than none.

Attach the intent listeners once on the document rather than once per link.
`mouseenter` and `focus` do not bubble, so delegation forces `pointerover` and
`focusin` — the pair that does — with `closest('a[href]')` resolving the target
and an origin check keeping speculation first-party. Anchors rendered after load
are covered with no re-scan, and the page holds two listeners instead of one per
link.
```js
const on = e => { const a = e.target.closest?.('a[href]')
  if (a && a.origin === location.origin) warm(a.href) }
addEventListener('pointerover', on, { passive: true }); addEventListener('focusin', on)
```
⚠ `pointerover` re-fires on every descendant crossed inside the same link, so the
fetched set is load-bearing here rather than an optimisation — without it one
pass over a card with an icon and a label arms three times.
