---
id: unit-aware-token-read
category: timing
tags: [tokens,correctness,motion,build]
axes: none
cost: 1
seen: 2
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

A *length* token does not survive this at all. `getPropertyValue` returns the
declaration text, so a fluid token hands back the literal `clamp(...)` string
and `parseFloat` yields its first term — a plausible number that ignores the
viewport entirely. Resolve it through layout instead: assign the token to a
probe's `width`, read the computed pixels back, and recompute on resize because
the `vw` term moves. Any library taking a unitless number needs this.
```js
probe.style.width = `var(${name})`
const px = parseFloat(getComputedStyle(probe).width)
```
⚠ A registered `<length>` property computes without the probe, but only where
`@property` is supported. Duplicating the slope in script is the trap this
replaces — the two copies drift at the next design change and nothing fails
loudly.
