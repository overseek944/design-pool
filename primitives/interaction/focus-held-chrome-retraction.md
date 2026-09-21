---
id: focus-held-chrome-retraction
category: interaction
tags: [interaction,correctness,accessibility,focus,keyboard,scroll,chrome,navigation]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A bar that retracts on downward scroll must ask more than which way the page
moved. While it contains `document.activeElement` or an open panel it must
stay — focus moving through its links scrolls the page, and the bar hides
out from under the focused control. Gate the direction test on that boolean,
and re-baseline only past a 4–8px delta, or jitter flips it.

```js
const held = bar.contains(document.activeElement) || bar.querySelector('[open]')
const hide = !held && y > FLOOR && (Math.abs(y - last) >= 5 ? y > last : hidden)
```
⚠ Restore the bar when the behaviour is torn down at a breakpoint — a retracted
bar whose listener is removed on resize never comes back.
