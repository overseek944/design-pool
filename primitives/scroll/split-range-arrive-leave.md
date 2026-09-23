---
id: split-range-arrive-leave
category: scroll
tags: [view-timeline, scroll, entrance, exit, headline, css-only]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One element can own its arrival and its departure with no script: list two
animations, each on its own `view()` timeline with its own range. Between the
ranges the element sits at rest. Arrive over `entry 0–60%`, leave over the
first 25–40% of exit; rise 16–32px, leave 20–40px.

```css
.head { animation: rise linear both, leave linear forwards;
  animation-timeline: view(), view();
  animation-range: entry 0% entry 60%, exit 0% exit 30% }
```
⚠ The later animation in the list wins where both apply: fill the leave
`forwards` only, or its backward fill pins the rest pose over the whole rise.
Gate with `@supports` and drop both under reduced motion.
