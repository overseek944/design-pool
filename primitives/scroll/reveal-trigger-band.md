---
id: reveal-trigger-band
category: scroll
tags: [scroll,reveal,thresholds]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 25
requires: []
conflicts: []
completes: []
tension: []
---
Entrance triggers fire at `top 85%`–`top 90%` — just inside the fold, so content
is already settled when the eye arrives. Drop to `top 55%`–`top 70%` only for
deliberate, high-emphasis reveals that should make the reader wait.
```js
{ trigger: el, start: "top 88%", once: true }
```

The band reaches to `top 80%` for ordinary section content — deep enough that a
fast scroller still meets it finished, shallow enough that a short section does
not fire before it is on screen at all. Treat 80–90% as the working range and
`once: true` as the default; a reveal that replays on scroll-back is a bug.

With an IntersectionObserver the band is not a start string but a negative
bottom `rootMargin`: `0px 0px -40px to -90px 0px` pulls the root's lower edge up
so nothing counts as arrived until it is genuinely inside the fold. Pair it with
a small `threshold` — 0.1–0.15 — and let the margin own the depth. Setting both
deep stacks them, and an element that should fire at 88% fires nearer 60%.
```js
new IntersectionObserver(cb, { rootMargin: "0px 0px -60px 0px", threshold: .12 })
```
⚠ A `threshold` is a fraction of the *element*: on anything taller than the root
it can never be met. Use `0` there and let `rootMargin` do all the work.

A scroll-driven timeline states the same band as a range rather than a trigger:
`animation-range: entry 15% entry 55%` scrubs the entrance across the element's
own crossing of the fold instead of firing at a line. The numbers are not the
observer's — they measure entry progress, where `entry 100%` is fully arrived,
so the 80–90% band above becomes a *window* roughly 10–20% to 50–60%. Cheaper
than either: no library, no observer, and it recomputes free on resize.

A `rootMargin` in pixels is a different band on every device: `-60px` is 9% of a
700px phone viewport and 5% of a 1200px desktop one, so the phone fires latest
in proportional terms exactly where the fold is tightest. State it as a
percentage and it resolves against the root's own box — `-6%` to `-10%` holds
the same fraction everywhere and needs no breakpoint.
```js
new IntersectionObserver(cb, { rootMargin: "0px 0px -8% 0px", threshold: .12 })
```

The same argument governs a scrub *distance*, with one extra move: clamp it. A
draw-on that consumes a fixed 200px of scroll is a flick on a tall monitor and a
drag on a laptop, so take a fraction of the viewport — but a bare fraction
degenerates at both ends, snapping shut on a short window and outstaying itself
on a very tall one. 20–28% of viewport height, floored near 120px and capped
near 260px.
```js
const run = Math.min(260, Math.max(120, innerHeight * .24))
const p = Math.min(1, Math.max(0, (innerHeight - box.top - offset) / run))
```
⚠ Recompute `run` on resize rather than once at setup — a rotated phone moves it
by more than the whole width of the clamp.

A band stated as a fraction of the viewport has one position where it is
unreachable: an element close enough to the document's end that its trigger line
lies past the last scrollable offset never fires, and the final section of a
short page stays hidden forever. Clamp every computed start to the maximum
scroll, and for anything already inside that tail fall back to a shallower line
so it still arrives rather than snapping in at the bottom of the travel.
```js
const max = document.documentElement.scrollHeight - innerHeight
start = Math.max(0, Math.min(top > max ? top - innerHeight : top - (innerHeight - 140), max))
```
⚠ It reproduces only on pages barely taller than the viewport — the case that
survives review on a laptop and fails on the first tall monitor.
