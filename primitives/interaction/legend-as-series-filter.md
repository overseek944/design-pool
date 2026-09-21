---
id: legend-as-series-filter
category: interaction
tags: [legend,filter,state,accessibility,chart]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A key that only names the series is a second thing to read. Make it the
control: each entry a button carrying its swatch, its name and its own count,
toggling that series in the figure. The count is what makes hiding safe — a
suppressed kind still reports its weight, so an empty view reads as a filter, not an
empty dataset. Dim a disabled entry to 40–55% rather than dropping
it; which kinds exist is itself the finding.

```html
<button class="key" aria-pressed="true"><i></i>Camera shake <b>3 · 1.4s</b></button>
```
```css
.key[aria-pressed="false"] { opacity: .45 }
```
⚠ Opacity is not a state a reader hears, and 45% of a muted ink drops under
4.5:1 — keep `aria-pressed` accurate and the label legible in both states.
Readouts over the same data must skip hidden kinds too.
