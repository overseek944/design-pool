---
id: unit-aware-token-read
category: timing
tags: [tokens,correctness,motion,build]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Script reading duration tokens out of computed style must parse the unit. CSS
minifiers rewrite `400ms` to `.4s`, so a bare `parseFloat` yields 0.4 and every
animation runs a thousand times fast — a bug that exists only in the production
build. Read the string, test the suffix, normalise to ms. The stylesheet may not
have parsed yet either: retry at 40–80ms for up to ~3s, then fall back to the
authored numbers.
```js
const ms = n => { const v = getComputedStyle(root).getPropertyValue(n).trim()
  const f = parseFloat(v) || 0
  return /ms$/i.test(v) ? f : /s$/i.test(v) ? f * 1000 : f }
```
⚠ Keep an easing fallback: `element.animate` throws on an empty easing string.
