---
id: sequenced-root-view-transition
category: motion-system
tags: [motion,navigation,transition,accessibility]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
The default root view transition cross-fades outgoing and incoming pages on top
of each other, and on a dense page that reads as a double exposure — two
headlines, two navs, ghosting. Sequence the halves instead: fade out, then fade
in after the first finishes, and extend the *group* duration to their sum or it
clips the second half. Each half .18–.30s.

```css
::view-transition-old(root) { animation: .25s ease-in  both fade-out }
::view-transition-new(root) { animation: .25s ease-out .25s both fade-in }
::view-transition-group(root) { animation-duration: .5s }
```
⚠ Under `prefers-reduced-motion` keep this fade — it is opacity only and marks
that the page changed — and kill every *element-level* transition instead:
`::view-transition-group(*) { animation: none !important }`.
