---
id: state-as-numeric-custom-property
category: interaction
tags: [interaction,hover,state,tokens,architecture]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Express interaction state as a number, then derive every dependent value with
`calc()`. One rule raises the flag on hover *and* `:focus-visible`, so the two
can never drift apart, and a fourth response costs one declaration rather than a
fourth selector. Scalars also compose — blend a scroll progress and a hover flag
into one value with weights around 0.9/0.1 for a base motion the pointer nudges.

```css
.card { --active: 0 }
@media (prefers-reduced-motion: no-preference) {
  .card:is(:hover, :focus-visible) { --active: 1 }
}
.card .arrow { transform: translateX(calc(var(--active) * 6px)) }
```
⚠ An unregistered custom property does not interpolate — the flag jumps.
Transition the derived properties, or `@property` it with `syntax: "<number>"`.
