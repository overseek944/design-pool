---
id: keyboard-modality-stilled-ui
category: motion-system
tags: [motion,accessibility,keyboard,input,correctness,transition]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A reader tabbing through a page outruns transitions authored for a pointer:
every stop waits on an ease nobody chose, and smooth scrolling parks the
focused control after the eye has already arrived. Track which device last
drove the page — `keydown` writes keyboard, `pointerdown` writes pointer —
publish it on the root, and let the keyboard branch flatten transition,
animation and scroll behaviour. Exempt decorative art by selector: the point is
latency between two controls, not silencing the page.

```css
html[data-input=keyboard] :not([data-art], [data-art] *) {
  transition: none !important; animation: none !important }
html[data-input=keyboard] { scroll-behavior: auto }
```
⚠ Not a stand-in for `prefers-reduced-motion`, which is a stated preference
rather than an inference. Write the flag in the event handler, before focus
moves, or the first stop after a switch still eases.
