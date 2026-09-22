---
id: twin-named-keyframe-restart
category: motion-system
tags: [motion,keyframes,transition,correctness,css-animation]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An animation runs once per name, so after content changes under the same class
the swapped value, prompt or title arrives without its entrance. Author the
keyframes twice under two names and alternate a class between them per change.
A new name restarts it — no reflow hack, no remount, no lost caret.

```css
@keyframes enter-a { from { opacity: 0; translate: 0 8px } }   /* 4–14px */
@keyframes enter-b { from { opacity: 0; translate: 0 8px } }
.swap.is-a { animation: enter-a .3s ease-out both }            /* .2–.5s */
.swap.is-b { animation: enter-b .3s ease-out both }
```
⚠ Two changes in one frame share a name; the second entrance is lost.
