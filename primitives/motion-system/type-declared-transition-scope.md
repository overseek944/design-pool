---
id: type-declared-transition-scope
category: motion-system
tags: [motion-system,view-transition,scoping,state,correctness,routing]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Every `::view-transition-*` rule applies to every transition, so a route change
inherits the keyframes written for a panel opening. Gating them on a class the
root carries for the duration is state that leaks — an aborted or rejected
transition leaves it set and the next change animates as the wrong thing.
Declare the identity to the API instead: `types` scopes the rules to that one
call and the engine drops it when the transition ends, so there is nothing to
clean up and no timer to guess. Durations .18–.30s.

```js
document.startViewTransition({ update: apply, types: ['panel-open'] })
```
```css
:root:active-view-transition-type(panel-open)::view-transition { pointer-events: none }
:root:active-view-transition-type(panel-open)::view-transition-group(*) { animation-duration: .22s }
```
⚠ The snapshot layer sits over the live page and swallows clicks for the whole
duration — scope that `pointer-events: none` to the type, never globally. The
object form of `startViewTransition` is newer than the callback form: an engine
without `types` ignores it and never runs the update.
