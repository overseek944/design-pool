---
id: reduce-settled-sequence-state
category: motion-system
tags: [motion,accessibility,reduced-motion,state,sequence,correctness]
axes: none
cost: 2
seen: 2
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
