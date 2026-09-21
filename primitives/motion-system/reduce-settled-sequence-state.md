---
id: reduce-settled-sequence-state
category: motion-system
tags: [motion,accessibility,reduced-motion,state,sequence,correctness]
axes: none
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A panel that builds itself over time — steps landing one at a time — holds its
content in state, not in styles, so `prefers-reduced-motion` cannot be served by
cancelling an animation: nothing exists yet and the branch renders empty. The
still state is the sequence's *last* frame, because the outcome is the argument.
Fold the preference into each derived value rather than branching the render, so
one path draws both and a later step cannot forget it. Schedules 6–12s.

```js
const still = reduceMotion()
const shown = still || revealed
const count = still ? items.length : n
```
⚠ Only where the sequence builds: a cycling one has no last frame, so elect one
and pin it.

A scroll-scrubbed scene has the same shape and no render to branch: its still
state is every driver variable at its terminal value, written from inside the
same writer before it returns. One function then serves both paths, and a
channel added later cannot be present in one and missing from the other. Kill
the transitions on exactly those properties in the reduced-motion block too, or
the settle animates — which is the motion the preference asked you not to run.
```js
if (reduce) { for (const [k, v] of END) el.style.setProperty(k, v); return }
```
⚠ The terminal value is not always 1. A channel that rises and falls ends at 0,
and copying 1 into every driver leaves the scene stopped mid-beat with two
states painted over each other.
