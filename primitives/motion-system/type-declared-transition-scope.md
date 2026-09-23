---
id: type-declared-transition-scope
category: motion-system
tags: [motion-system,view-transition,scoping,state,correctness,routing]
axes: none
cost: 2
seen: 3
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

Types also carry *direction*. Pass `forward` or `back` from the navigation that
triggered the change and mirror one pair of keyframes on the sign: old page
leaves toward the side the new one arrives from the other, so history reads as
spatial. Travel 3–6% with a fade, not a full-width push — the eye gets
direction, not a carousel.
```css
@keyframes out-l { to { opacity: 0; translate: -4% } }
@keyframes in-r  { from { opacity: 0; translate: 4% } }
:root:active-view-transition-type(forward)::view-transition-old(root) { animation-name: out-l }
:root:active-view-transition-type(forward)::view-transition-new(root) { animation-name: in-r }
```
⚠ Write the `back` pair explicitly; an untyped transition falls through to the
default cross-fade. Under reduced motion drop the translate and keep the fade.
