---
id: twin-suppressed-persistent-action
category: interaction
tags: [interaction,sticky,state,observer,accessibility]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A persistent action pinned to the viewport is right through the middle of a page
and wrong wherever the page already offers the same action — over the footer
form, on top of the inline button it duplicates. Arm it from a sentinel, suppress
it from a *set*: every element marked a yield zone is observed, and the bar shows
only while that set is empty and the sentinel is behind. One boolean from two
independent facts, and a new inline instance is an attribute, not a threshold.

```js
const live = new Set(), sync = () => bar.toggleAttribute('data-on', past && !live.size)
const io = new IntersectionObserver(es => { for (const e of es)
  e.isIntersecting ? live.add(e.target) : live.delete(e.target); sync() })
document.querySelectorAll('footer,[data-cta-yield]').forEach(el => io.observe(el))
```
⚠ Fading on opacity alone leaves a fixed bar eating taps over the twin it yielded
to — flip `pointer-events` and `aria-hidden` from the same boolean.
