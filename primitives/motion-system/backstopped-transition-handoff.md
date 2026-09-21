---
id: backstopped-transition-handoff
category: motion-system
tags: [motion,transition,state,sequence,correctness,event]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Sequencing a state machine on `transitionend` rather than on a timer keeps every
step locked to whatever duration the CSS declares, so retiming the piece is one
token edit and nothing drifts out of phase. But the event is not a guarantee — a
transition on a `display: none` element never starts, an interrupted one never
finishes, a value that resolves unchanged fires nothing — and a machine waiting
on it wedges mid-state with the reader stuck behind it. Arm a timer at the
declared duration plus 10–20% beside the listener, and have both call one
advance guarded on the current state: whichever arrives first wins, the second
is a no-op.

```js
const advance = from => { if (from !== state) return; state = NEXT[state]; render() }
el.addEventListener('transitionend', () => advance(state), { once: true })
const t = setTimeout(() => advance(state), DUR * 1.15)   // 10–20% slack
```
⚠ `transitionend` fires once per animated property and bubbles from
descendants — filter on `propertyName` and `target`, or a three-property
transition advances the machine three times.
