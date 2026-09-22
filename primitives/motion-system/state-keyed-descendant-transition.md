---
id: state-keyed-descendant-transition
category: motion-system
tags: [motion,reveal,transition,correctness,reduced-motion,architecture]
axes: none
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---

One observer entry can drive more than one animation. Let the settled class land
on the section, then key a descendant's own `transition` off it: a rule grows its
width, a bar fills, a mark rotates — each on its own property, duration and
delay, none of them needing an entry in the observer's set or a slot in a shared
delay ladder. Offset the child 100–250ms behind the parent so the section arrives
first and its ornament follows.

```css
.rule { width: 0; transition: width .9s var(--ease) .15s }
.section.is-visible .rule { width: 4.5rem }
@media (prefers-reduced-motion: reduce) { .rule { width: 4.5rem; transition: none } }
```
⚠ The reduced-motion branch that flattens the *parent* does not reach here — a
child whose pre-state is a layout property stays collapsed forever. Give every
descendant its own settled value in that block, not just `transition: none`.

A scripted child — a demo sequence, a canvas — cannot key off a class, so give
it a subscription that is race-free: if the section is already settled, run
now; otherwise wait once for a bubbling `reveal` event the section dispatches.
Schedule its beats after the parent's own entrance, not from zero.
```js
const onReveal = (el, fn) => el.dataset.reveal !== 'pending' ? fn()
  : el.addEventListener('section:reveal', fn, { once: true })
```
