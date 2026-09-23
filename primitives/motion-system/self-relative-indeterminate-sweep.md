---
id: self-relative-indeterminate-sweep
category: motion-system
tags: [motion,progress,loading,indeterminate,reduced-motion,accessibility]
axes: {energy: 3, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An indeterminate bar is a short segment crossing a clipped track. `translate`
percentages resolve against the segment, not the track, so the travel is set by
the width ratio: a segment 1/3–1/4 of the track runs from `-110%` to
`(track ÷ segment) × 100% + 10%` and fully clears both ends. Period 1–1.6s.
Under reduced motion, fill the track statically at .5–.7 opacity: still busy,
never empty or done.

```css
.bar { width: 33%; animation: sweep 1.25s ease-in-out infinite }
@keyframes sweep { from { translate: -110% } to { translate: 310% } }
@media (prefers-reduced-motion: reduce) { .bar { width: 100%; opacity: .65; animation: none } }
```
⚠ Track needs `overflow: hidden`; give it `role="progressbar"`, no `aria-valuenow`.
