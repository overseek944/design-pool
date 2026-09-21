---
id: reserved-gutter-pinned-action
category: layout
tags: [layout,overflow,correctness,affordance,scrim,accessibility]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An action pinned over a horizontally scrolling strip — a copy button on a
one-line command, a clear on a filter rail — hides whatever scrolls under it
permanently, because there is nothing past the end to scroll further. Three
numbers must agree: the action's track width, a trailing padding on the scroll
box equal to it, and a scrim reaching full ground colour *before* the action's
edge, so text dissolves instead of ghosting behind the glyph. Track 48–72px.

```css
.port  { overflow-x: auto; padding-inline-end: var(--track, 64px) }
.scrim { position: absolute; inset-block: 0; inset-inline-end: 0; width: var(--track);
  pointer-events: none; background: linear-gradient(90deg, transparent, var(--bg) 68%) }
.scrim button { pointer-events: auto }
```
⚠ `pointer-events: none` is what keeps the strip draggable through the scrim —
re-enable it on the button or the action is dead. A scrim with no matching
padding hides the last characters at every scroll position.
