---
id: state-scoped-entry-animation
category: motion-system
tags: [tabs, entrance, state, css-only, replay]
axes: none
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---

A tabset that ships every panel has no handle on its entrance: re-adding a class
restarts nothing without a forced reflow, and a remount costs focus and scroll.
Declare the animation inside a rule scoped to the *visible* state —
`:not([hidden])`, `[aria-selected=true]`, `[data-active]`. An element starts
every animation a rule grants it the moment it begins matching, so the reveal
replays on each switch off the attribute already toggled. Stagger from an index
property in the same rule; 0.6–1s.

```css
.view:not([hidden]) .bar { animation: rise 760ms cubic-bezier(.16,1,.3,1) both;
                           animation-delay: calc(var(--i) * 90ms) }
```
⚠ It fires on every entry including a return — right for a chart, wrong for a
one-time hint, and nothing animates the panel *out*.

Where the panel is not re-matched — one element whose content is swapped — the
replay needs the off state painted once. Drop the animated flag, wait two
animation frames (the first schedules the paint, the second lands after it),
raise it again. No forced reflow, no remount.
```js
set(false); requestAnimationFrame(() => requestAnimationFrame(() => set(true)))
```
⚠ One frame is not enough — the two writes coalesce and nothing replays.
