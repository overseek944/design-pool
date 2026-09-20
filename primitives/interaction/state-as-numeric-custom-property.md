---
id: state-as-numeric-custom-property
category: interaction
tags: [interaction,hover,state,tokens,architecture]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 1
seen: 3
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

The scalar can be global. Script writes it once on the root element's inline
style and any subtree reacts, however far from the source — which is the only
way an overlay and a fixed cursor treatment can share one hover state without a
common ancestor. CSS cannot compare a custom property's value in a selector, so
match the declaration itself:
```js
document.documentElement.style.setProperty('--focus', hit ? '1' : '0')
```
```css
html[style*="--focus: 1"] body { cursor: crosshair }
```
⚠ Fragile by construction — the selector matches text, so it breaks on a
whitespace change and cannot survive a `@property` registration that normalises
the serialisation. Use it for coarse, cosmetic state only; anything a component
depends on belongs in an attribute.
