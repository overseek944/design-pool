---
id: edge-hotzone-sibling-reveal
category: interaction
tags: [interaction,hover,panel,chrome,css-only,accessibility]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Reclaim the width a hidden rail costs without a toggle: park an invisible strip
against the viewport edge and let its `:hover` drive the panel through the
sibling combinator. The panel's own `:hover` repeats the rule, which latches it
open while the pointer travels across it — the two selectors are what make this
work at all. No state, no listener, nothing to leave stuck open. Strip 4–16px;
widen it toward the top edge where pointers overshoot.

```css
.hotzone { position: fixed; inset-block: 0; inline-size: 8px; z-index: 1 }
.rail    { transform: translateX(-100%); transition: transform .22s var(--ease) }
.hotzone:hover ~ .rail, .rail:hover, .rail:focus-within { transform: none }
```
⚠ Hover-only means no keyboard or touch path: `:focus-within` must ride along,
and coarse pointers need a real button. Give a class on the root that suppresses
the peek, or a drag near the edge fights it.

The two selectors stop being enough once the rail can spawn anything that
leaves its own box — a tooltip in the top layer, a user menu, a confirmation
popover. The pointer travels to that surface, the rail loses `:hover`, and it
collapses out from under the thing it just opened. Every such surface has to
publish its open state back onto the rail as a flag, and the open condition
becomes the union: hover, focus-within, and one attribute per spawnable
surface. Author it once as a named variant rather than repeating the list at
each of the twenty rules that answer to it.
```css
.rail:hover, .rail:focus-within,
.rail[data-menu-open], .rail[data-tooltip-open] { inline-size: var(--rail-open) }
```
⚠ A flag written on open and cleared on close leaks whenever the close path is
not the one you wrote — route change, escape, outside click. Clear it from the
surface's own teardown, not from the handler that dismissed it.
