---
id: decaying-loop-restart-gap
category: timing
tags: [loop,timing,sequence,restraint,demo,attention]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 1
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A self-restarting demonstration does not want one restart gap. A reader
arriving part-way through the first pass needs to see the beginning soon, so
hold the finished frame briefly and run again; by the second restart they have
watched it, and a short gap now reads as nagging. Lengthen the hold on every
pass after the first and the piece decays from demonstration into ambient
without ever stopping. First gap 0.8–1.5s, later gaps 3–5s, or park it
permanently after three passes.
```js
const gap = firstPass ? FIRST : REST   // 1200 : 3400
firstPass = false
timer = setTimeout(restart, gap)
```
⚠ The held frame is the *last* one, so it has to be a legible end state on its
own — a sequence that finishes mid-transition parks on a half-drawn frame for
seconds at a time.

The same asymmetry belongs *inside* one pass, not only at its restart. Give the
opening beat a short dwell so a reader arriving mid-scroll sees the thing move
almost immediately, the middle beats an even one, and the closing beat two to
three times the middle so the resolved composition is legible before the wrap.
A flat delay per step makes the entrance feel dead and the ending feel snatched
at once. Opening 0.5–0.8×, closing 1.5–2× the middle step.
```js
const dwell = i === 0 ? 700 : i >= steps.length ? 3400 : 2100
```
⚠ Read the index, not a counter that survives the wrap — on the second pass the
opening beat must be short again, or the loop accelerates away from the reader.

The asymmetry only lands if the short pass is the *reader's* first, not the
document's. A loop armed at mount has spent its quick opening off-screen by the
time a section five viewports down is reached, and what arrives is the long
ambient cadence — the demonstration reads as static. Arm on intersection at
0.3–0.5 of the element and start the first gap there; a rotator, a filmstrip
and a scripted mock all take the same gate.
```js
new IntersectionObserver(([e]) => e.isIntersecting && start(),
  { threshold: .4 }).observe(el)
```
⚠ Do not re-arm on every re-entry. A reader scrolling back past a piece that
has already settled gets the fast pass again, which reads as the page
restarting rather than as a loop continuing.

The decay has a zero-script form when the piece is CSS: author the choreography
twice — a `both`-filled one-shot armed by the element's revealed class, and the
same beats as an infinite loop armed by `:hover, :focus-within`. A grid of eight
such figures each demonstrates itself once on arrival, parks on its end frame,
and moves again only under the pointer, where a grid of eight ambient loops is
noise nobody can read past. Cascade the one-shots 400–900ms apart off the index
so they arrive in sequence rather than together.
```css
.card { --once-delay: calc(var(--i) * 700ms + 1.2s) }
[data-reveal].is-revealed .card .art { animation: liftOnce 1.4s var(--ease) both var(--once-delay) }
.card:is(:hover, :focus-within) .art { animation: liftLoop 3.2s var(--ease) infinite }
```
⚠ Two keyframe blocks per figure is the cost, and they drift apart on the next
edit — derive the loop from the one-shot's stops, or the hover state slowly
stops matching the demonstration it is supposed to repeat.
