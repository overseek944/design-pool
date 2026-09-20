---
id: reveal-trigger-band
category: scroll
tags: [scroll,reveal,thresholds]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 10
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
