---
id: registered-property-scope
category: scale
tags: [tokens,architecture,animation,correctness]
axes: none
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
`@property` registration is an API decision, not a formality. `syntax` buys
interpolation and validation; `inherits` decides whether the value is a
per-element parameter or a system one. Register a mask stop or a per-card offset
`inherits: false` so a parent's value cannot leak downward, and a shared angle or
duration `inherits: true` so one ancestor retunes a whole subtree. Type each to
the narrowest syntax that fits and a bad value falls back to `initial-value`
instead of invalidating the rule.

```css
@property --fade-start { syntax: "<length-percentage>"; inherits: false; initial-value: 0 }
@property --sweep-angle { syntax: "<angle>"; inherits: true; initial-value: 20deg }
```
⚠ `inherits: false` silently breaks inheritance that worked before registration.

`inherits: true` is also the cheapest fan-out there is at runtime. One
registered number written on an ancestor each frame is read through `calc()` by
every descendant that depends on it, so N elements animate from a single
`setProperty` and no per-element script — the loop stays O(1) in the DOM and the
work happens in style resolution. Registration is load-bearing twice over here:
an unregistered property is an untyped string, so `calc()` against it is invalid
and every consumer silently drops the declaration rather than failing loudly.
```css
@property --head { syntax: "<number>"; inherits: true; initial-value: 0 }
.seg { stroke-dashoffset: calc(var(--head) + var(--phase)) }
```
⚠ Every consumer restyles on every write whether its own value moved or not —
scope the property to the animating subtree, never to `:root`.
