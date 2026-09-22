---
id: outward-corner-target
category: interaction
tags: [interaction,state,focus,border,precision,detail]
axes: {energy: 3, density: 2, weight: 1, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Four L-brackets absent at rest, then flying *outward* past the element's edge on
hover — the target appears to be acquired rather than highlighted, and nothing
in the resting layout moves. Each corner is one box drawing two adjacent
borders, so a single `--offset` token drives all four diagonals. Shrink that
offset and shorten the duration on `:active` and the press reads as the brackets
closing on the target. Bind `:focus-within` alongside `:hover` and the keyboard
gets the identical affordance for free.

```css
.corner { position: absolute; opacity: 0; transform: scale(0);
  transition: transform var(--dur) var(--ease), opacity var(--dur) var(--ease) }
.tl { top: 0; left: 0; border-top: var(--hair) solid; border-left: var(--hair) solid }
:is(:hover, :focus-within) > .tl { opacity: 1;
  transform: translate(calc(-1 * var(--offset)), calc(-1 * var(--offset))) scale(1) }
```
⚠ Offset 2–6px; past that the brackets read as a second element. Decoration —
it does not replace a focus ring, and it needs room outside the box to fly into.

Bind the brackets to a *persistent* state rather than to hover and they stop
being an affordance and become registration: chrome that has docked, a panel
that has been pinned, a row that is selected. Nothing is being pointed at, so
the marks may sit further out and hold indefinitely — and because the state
outlives the pointer they must also be reachable without one, which hover never
guaranteed. Offset 4–8px here; fade opacity and translate on separate
durations so the frame settles after it appears.
```css
.frame { opacity: 0; transition: opacity .3s }
[data-docked] .frame { opacity: 1 }
[data-docked] .tl { transform: translate(0, 0) }   /* inset at rest, out on dock */
```
⚠ A frame that never goes away is read as a border — if it marks a selection,
the selection needs a second, non-positional channel as well.
