---
id: drive-mode-scoped-transition
category: motion-system
tags: [motion,scroll,scrub,custom-properties,correctness,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A property that eases on arrival and later *tracks* a continuous input cannot
keep one declaration. While the transition is live every frame's write is
re-eased, so the value trails the input by the whole duration and never catches
it. Publish the drive mode as an attribute: the scrubbed branch carries
`transition: none`, the entry branch keeps its easing at 0.6–1.2s.

```css
[data-drive] .mark       { transition: stroke-dashoffset .9s var(--ease) }
[data-drive=armed] .mark { stroke-dashoffset: 1 }
[data-drive=scrub] .mark { stroke-dashoffset: calc(1 - var(--p,1)); transition: none }
```
⚠ Leaving it on looks right under a slow drag and fails only under fast input,
reading as lag with no obvious source. Write `--p` once per frame from rAF.
