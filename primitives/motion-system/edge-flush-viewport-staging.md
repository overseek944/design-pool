---
id: edge-flush-viewport-staging
category: motion-system
tags: [motion,entrance,viewport-units,responsive,css]
axes: {energy: 3, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An element staged beyond the frame is usually given a hand-picked distance, large
enough to clear the widest window — so at every other width it spends its first
frames crossing nothing. For anything horizontally centred the exact distance is
`50vw` plus half its own width, and CSS already knows both terms: the trailing
edge lands on the window edge at any viewport and any element size, re-derives
itself on resize, and nothing is measured. Add a few percent of slack where the
ink does not fill its box. `50vh` does the vertical.

```css
@keyframes arrive { 0% { transform: translateX(calc(-50vw - 50%)) } to { transform: none } }
/* slack: -50% ± 1–4% for a mark inset in its own box */
```
⚠ Staging past the *trailing* edge adds to `scrollWidth` and the page gains a
horizontal scrollbar mid-flight — clip on an ancestor, not the root. `50vw`
counts the scrollbar on a page that has one, so the element clears by a little
less than it looks.
