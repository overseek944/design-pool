---
id: asymmetric-enter-exit-delay
category: timing
tags: [motion,sequencing,state,transition]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A staggered group should cascade in and collapse out together. Carry the
per-item delay on the *entering* state only, zeroed on exit. Otherwise a group
that reverses spends the whole cascade again leaving, and a panel being
replaced is still dismantling itself as its successor arrives. Steps 60–250ms.
```jsx
transition: 'opacity .38s ease, transform .38s ease',
transitionDelay: on ? `${i * 120}ms` : '0ms'
```
⚠ The delay must flip in the same commit as the state, or the old delay holds
for a frame. Keep the full cascade under ~600ms; longer and a reader who has
already scrolled past sees items still at zero opacity.

`prefers-reduced-motion` is the third state, and collapsing the duration alone
does not serve it: the delay is untouched, so the reader still waits out the
whole ladder for changes that are now instantaneous — a stagger with nothing
staggered, which reads as lag rather than as calm. Zero the delay in the same
block as the duration. Where the per-item value arrives as an inline custom
property it outranks the stylesheet, so override the longhand rather than the
property it reads.
```css
@media (prefers-reduced-motion: reduce) {
  .item { transition-duration: .01ms; transition-delay: 0s !important } }
```
⚠ Collapse rather than cancel — `transition: none` fires no `transitionend`, and
anything sequenced off the last item's completion never runs.
