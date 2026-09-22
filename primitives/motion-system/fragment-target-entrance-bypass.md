---
id: fragment-target-entrance-bypass
category: motion-system
tags: [motion,correctness,anchor,fragment,reveal,navigation]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An in-page link or shared `#fragment` lands the reader on a section whose
entrance has not fired yet: they arrive at blank space, then watch the block
drift 20–40px under their eyes, and the jump was measured against the offset box.
Settle the hash target and everything inside it from CSS, before any observer
runs, so the destination is always already there.

```css
.rv { opacity: 0; translate: 0 28px; transition: opacity .7s, translate .7s }
.rv.in, :target .rv, .rv:target { opacity: 1; translate: none }
```
⚠ `:target` matches only the current hash — keep the observer's settled class
too, or the block re-hides when the fragment changes.
