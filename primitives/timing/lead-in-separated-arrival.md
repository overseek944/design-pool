---
id: lead-in-separated-arrival
category: timing
tags: [timing,motion,sequence,stream,demo,mock,cadence,delay]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 3
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
A mock of anything that arrives over a network — streamed tokens, search
results, build lines — reads as fake at a uniform cadence: the real thing
pauses once, then is steady. Split the schedule in two, a lead-in before the
first item and a constant gap after it. The lead-in is the number worth varying
between scenarios, because it is what a faster path actually changes. Lead-in
200–600ms, gap 40–90ms.

```js
const t = items.map((_, i) => setTimeout(() => show(i + 1), leadIn + gap * i))
return () => t.forEach(clearTimeout)
```
⚠ Clear the whole set on every re-arm, not the pending tail — a scenario
switched mid-pass interleaves two schedules. Under `reduce`, render the
finished state.

The lead-in need not be a constant. Where the thing arriving has a size — a
message about to be printed, a result set, a generated block — derive the pause
from it: a floor, plus a per-unit rate, clamped. A long answer then visibly
takes longer to begin than a short one, which is most of what separates a mock
from a canned loop, and the cap stops one outlier holding the scene. Floor
0.6–1s, 15–25ms per character, cap 1.5–2.5s.
```js
const leadIn = FLOOR + Math.min(text.length * RATE, CAP)
```
⚠ The rate is for the reader's sense of size, not the machine's — scale it on
what will be visible, so an item that lands as a chart rather than as prose
gets its own flat figure instead of one derived from a string it has no words in.

Streamed prose wants a unit between the character and the line: append two to
three words per tick, with the whitespace carried inside each chunk, and jitter
the gap by ±10–20% around 70–100ms. Characters read as a typewriter, lines as a
paste; word bursts read as tokens. Keep the chunking random per run but the
final string captured before first paint and cleared synchronously, or the full
text flashes once.
```js
const gap = 85 + (Math.random() * 30 - 15)   // per chunk
```
⚠ A growing block inside a scroll port pushes its tail out of view — pin the
port to the bottom on every append, and only while the reader has not scrolled
it themselves.
