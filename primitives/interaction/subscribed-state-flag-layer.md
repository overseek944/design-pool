---
id: subscribed-state-flag-layer
category: interaction
tags: [state,accessibility,correctness,tokens,css-only,has,focus,hover]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Raise the state flag from the attribute that already carries the state —
`aria-pressed`, `aria-expanded`, `open`, `:checked`, `:focus-visible` — and the
visible state cannot drift from the announced one, because script has one thing
to update rather than two. Let each element name the states it answers to in a
space-separated attribute, so the rules live in one global block instead of per
component and `:has()` lets a container subscribe to a descendant. Four to eight
names is the whole vocabulary.

```css
[data-state] { --on: 0 }
[data-state~="open"]:is([open], :has([open])),
[data-state~="pressed"]:is([aria-pressed="true"], :has([aria-pressed="true"])) { --on: 1 }
@media (hover: hover) { [data-state~="hover"]:hover { --on: 1 } }
```
⚠ Nothing raises a hover subscription on a touchscreen, so anything reachable
only in the raised state is unreachable there — pin it on under `(hover: none)`
or give that element a real control.
