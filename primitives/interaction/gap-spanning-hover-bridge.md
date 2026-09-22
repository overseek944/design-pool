---
id: gap-spanning-hover-bridge
category: interaction
tags: [interaction,hover,panel,menu,css-only,accessibility]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
A panel held off its trigger by a visual gap is unreachable by hover: the
pointer crosses dead ground and the panel closes under it. Give the panel a
pseudo-element spanning exactly that gap, so its hit area reaches back to the
trigger and the pointer path is continuous. Cheaper than a close-delay timer,
which guesses how long the trip takes and leaves the panel hanging when the
reader turns away. Gap 8–20px; bridge the full width.

```css
.panel { top: calc(100% + var(--gap, 12px)); opacity: 0; pointer-events: none }
.panel::before { content: ""; position: absolute; inset: calc(var(--gap, 12px) * -1) 0 auto; height: var(--gap, 12px) }
.trigger:hover .panel, .trigger:focus-within .panel { opacity: 1; pointer-events: auto }
```
⚠ The bridge is invisible and still takes the pointer — keep it inside the
trigger's own column or it eats clicks beside the panel. Hover has no keyboard
path: `:focus-within` must ride in the same selector list.

The corridor can belong to the trigger rather than the panel, which is shorter
and adds no pseudo-element: give the group symmetric block padding and cancel it
with equal negative margin. Its hover area now reaches down over the gap while
its layout box is unchanged, so nothing around it moves. Prefer this where the
trigger is one of several in a row and the panel is wider than it — the grown
area is the trigger's own column, not the panel's footprint.
```css
.group { padding-block: var(--gap, 14px); margin-block: calc(var(--gap, 14px) * -1) }
```
⚠ Vertical padding on a row of inline triggers can overlap the row above or
below once the gap goes past about 16px — the neighbours then trade hover states
along an invisible seam. Keep it under the row's own leading.

`:focus-within` has no way to close what it opened when the trigger is itself a
link or a button: activating it navigates, focus stays on the trigger, and the
panel is still open over the page it just went to. Blur the trigger on
activation and hold a suppression flag that outranks the selector until the
pointer leaves the group — the flag is what stops the panel reopening as focus
settles back.
```css
.group:not(.is-suppressed):focus-within .panel { opacity: 1 }
```
⚠ A click handler fires for keyboard `Enter` too, so an unconditional blur
throws keyboard users to the top of the document. Gate the blur on
`event.detail > 0` or on a pointer-origin check, and leave the keyboard path to
`Escape`.
