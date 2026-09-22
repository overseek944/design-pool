---
id: state-scoped-duration
category: timing
tags: [motion,timing,transition,state,asymmetry]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
Put `transition-duration` on the state selector rather than the base rule and
one property can enter and leave at completely different speeds. An ambient
layer that should appear the instant it becomes relevant and then leave without
anyone noticing wants roughly 80–120ms in against 500–800ms out — an order of
magnitude apart on the same `opacity`.

```css
.veil { transition: opacity ease-out }
[data-veil="shown"]  .veil { opacity: 1; transition-duration: 90ms }
[data-veil="hidden"] .veil { opacity: 0; transition-duration: .7s }
```
⚠ Invert the ratio for anything the user acted on: response fast, dismissal
faster. A slow exit on a control the user just dismissed reads as the interface
arguing, not as polish.

The same move works on a continuous loop: keep one keyframe and let the state
selector change `animation-duration`, so intensity is a tempo rather than a
second animation — an idle breath at 3–5s tightening to under 1.5s when the
thing is active, with no swap and no restart. States that mean *stopped* take
`animation-play-state: paused` on the same selector.

The timing *function* takes the same treatment and answers a different question:
which way the panel is falling. Open on a decelerating curve and close on an
accelerating one — `cubic-bezier(.3,0,1,1)` — and both directions read as the
thing settling into its rest state rather than as one motion played backwards.
Declare the curve on the base rule and override it on the open state, so the
closing curve is the default and no third selector is needed.
```css
.fold        { transition: grid-template-rows .26s cubic-bezier(.3,0,1,1) }
.row.is-open .fold { transition-timing-function: cubic-bezier(.215,.61,.355,1) }
```
⚠ Only legible where the travel is long enough to have a shape — under about
150ms the two curves are indistinguishable and the pair is dead weight.
