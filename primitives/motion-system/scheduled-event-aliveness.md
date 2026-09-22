---
id: scheduled-event-aliveness
category: motion-system
tags: [idle,loop,character,randomness,raf,ambient]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 3
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Anything idling on sines reads as a mechanism — the period is audible within two
cycles. Build the idle from *events* instead: a next-at timestamp, a weighted
pick of what happens, a fresh random interval, a damped lerp carrying the value
there. It holds still, jumps, holds again. Weight small adjustments common and
big relocations rare, and schedule each channel separately.

```js
if (t > nextAt) { aim = pick()                  // weighted, mostly small
  nextAt = t + 400 + Math.random() * 1400 }     // 0.3–2s per channel
cur += (aim - cur) * 0.35                       // .25–.5 reads as a jump
```
⚠ Initialise every target before the first tick — one `undefined` poisons the
lerp with `NaN` for good.

Scheduling *when* is half of it; *which* participant fires is the half that
gives the loop away. Picking uniformly from a pool lets the same few elements
recur within a few seconds and the eye locks onto the pattern immediately. Keep
a short ring of recently used indices — about a third of what is on screen — and
draw only from outside it, so nothing returns until most of the field has had a
turn. Let the concurrency cap drift as well, firing a second event on a fraction
of ticks, and the density keeps changing instead of settling into a rhythm.
```js
const free = pool.filter((_, i) => !busy[i] && !recent.includes(i))
const i = free[Math.random() * free.length | 0]
recent.push(i); while (recent.length > Math.min(20, pool.length / 3)) recent.shift()
```
⚠ Size the ring against the *visible* pool, not the total — a ring longer than
what is on screen starves the picker and the field goes still.

For a pool small enough that a recent-ring would swallow it — three states, four
labels, five glyphs — advance by a random *stride* instead of picking a member:
`(i + 1 + floor(random() * (n - 1))) % n` lands anywhere except where it already
is, so a repeat is impossible by construction with no stored history at all.
The `+ 1` is the whole guarantee; without it the stride can be zero.
```js
i = (i + 1 + Math.random() * (n - 1) | 0) % n
```
⚠ At n = 2 it degenerates to strict alternation, which is a visible pattern —
below three members, vary the *interval* instead, since the value cannot carry
the variation.

The objection has a floor. Where the moving thing carries no legible landmark —
a wash blurred past 100px, a gradient the size of the section — there is
nothing in it to track, no period is audible, and the event machinery buys
nothing. Two oscillators suffice there, provided x and y take *different*
periods: equal periods trace a circle, a ratio near but not at 1:1 opens it
into a figure that only closes on the least common multiple. Periods 25–60s,
the two offset 15–25%, plus a phase offset per element.
```js
x = x0 + Math.sin(t * 0.00018 + px) * ax    // 18 against 23 is the whole trick
y = y0 + Math.cos(t * 0.00023 + py) * ay    // equal rates would draw a circle
```
⚠ Write `translate`, not `left`/`top` — the latter lays out the page every
frame, and at this blur radius the element is already a viewport-sized
composited buffer. Gate the loop on visibility and drop it under `reduce`.

Where the next state is a point in a *continuous* range rather than a member of
a pool, the recent-ring has no analogue — but rejection sampling does. Redraw
the target until it is at least a minimum fraction of the range from where the
thing already is, and every move is a journey. Without the test roughly half of
a uniform draw lands near the current position, so the loop spends its time
twitching and the few real relocations read as accidents. Floor 0.2–0.35 of the
range; above 0.5 the thing only ever crosses the middle and that is its own
pattern.
```js
do { aim = lo + Math.random() * (hi - lo) } while (Math.abs(aim - cur) < MIN)
```
⚠ Guaranteed to terminate only while `MIN` is under half the range — past that
the admissible set empties near the ends and the loop spins.
