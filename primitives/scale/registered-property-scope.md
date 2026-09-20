---
id: registered-property-scope
category: scale
tags: [tokens,architecture,animation,correctness]
axes: none
cost: 1
seen: 2
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
