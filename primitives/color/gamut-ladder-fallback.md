---
id: gamut-ladder-fallback
category: color
tags: [color,tokens,progressive-enhancement,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Ship every colour token twice: an sRGB hex baseline, then the wide-gamut value
inside a `@supports` probe. The probe is the smallest legal expression in the
feature itself, so it tests parsing rather than a version — the colour space and
the colour function need one each. Run the ladder over the token block, never per
component: one upgrade carries the system, and a browser that fails it keeps a
colour somebody authored rather than one the engine clamped.

```css
:root { --accent: #00d294 }
@supports (color: lab(0% 0 0)) { :root { --accent: lab(75% -60 19) } }
```
⚠ Convert, never re-pick — the two must match on an sRGB display or the fallback
becomes a second palette.
