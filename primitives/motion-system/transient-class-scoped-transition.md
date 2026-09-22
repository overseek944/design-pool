---
id: transient-class-scoped-transition
category: motion-system
tags: [motion-system,view-transition,theme,correctness,reduced-motion]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A view transition, or a global colour transition, must animate for the one
state change it was written for and be absent the rest of the time — otherwise
every route change inherits the theme cross-fade and every hover drags a
`transition: background-color` it never asked for. Gate it on a class the root
carries only for the duration of that change, and select the
`::view-transition-*` rules through it.

```js
root.classList.add('theme-vt')
const t = document.startViewTransition(() => apply(next))
t.ready.catch(() => {})                      // skipped transitions reject
const off = () => root.classList.remove('theme-vt')
t.finished.then(off, off)
```
⚠ Apply the first value with no animation at all — a stored preference must not
cross-fade on load. On the no-`startViewTransition` path, force a reflow after
adding the class or the pre-state never flushes, and remove it on a timer 1–1.5×
the duration. Reduced motion takes the plain-assignment branch.

The same gate answers a second question when the transient state names the
*direction* rather than merely the fact of a change. A pane whose width is also
set by dragging and by breakpoints must animate only when someone deliberately
toggles it — a transition left on permanently makes every drag frame lag the
pointer and every resize a slow crawl. Write `collapsing` or `expanding` for the
toggle's duration only, select the `transition-property` through it, and both
the pane and everything measuring against it stay instant the rest of the time.
Direction also gives the two halves different curves, which one flag cannot.
```css
.pane[data-state=collapsing], .pane[data-state=expanding] {
  transition-property: flex-grow, border-color }
.pane[data-state=expanding] { transition-timing-function: var(--ease-out) }
```
⚠ Clear the attribute from the animation's own completion, not from a timer
retyping the duration — an interrupted toggle otherwise leaves the pane
transitioning for the rest of the session.
