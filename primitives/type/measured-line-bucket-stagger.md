---
id: measured-line-bucket-stagger
category: type
tags: [type,stagger,reveal,measurement,font-loading,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A cascade down the rendered lines of a heading does not require splitting it.
Take the inline spans already in the markup, read each one's `top`, and bucket
them by that value within a couple of pixels — the buckets *are* the visual
lines, at any width, in any script, with no DOM surgery to revert on resize and
no nested links destroyed. Delay each bucket by its index. Measure after
`document.fonts.ready` or the fallback face's line boxes are what you group.

```js
const tops = []
const line = el => { const t = el.getBoundingClientRect().top
  let i = tops.findIndex(v => Math.abs(v - t) < 2)
  return i < 0 ? tops.push(t) - 1 : i }
spans.forEach(s => animate(s, base + line(s) * 50))     // 40–90ms per line
```
⚠ Zero-size spans return `top: 0` and collapse into one phantom first line —
skip any with no measured box. One read pass before any writes, or each
measurement pays for the previous element's layout.
