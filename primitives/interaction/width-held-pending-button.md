---
id: width-held-pending-button
category: interaction
tags: [interaction,button,loading,pending,spinner,layout-stability]
axes: {energy: 2, density: 1, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A button that swaps its label for a spinner shrinks and shifts its neighbours.
Keep the label in flow at opacity 0 and centre the spinner over the box with
`inset: 0; margin: auto` — the button holds its exact size while pending.
Spinner 14–20px, turn 0.6–0.9s linear.

```css
.btn { position: relative } .is-loading { pointer-events: none }
.is-loading > .label { opacity: 0 }
.spin { position: absolute; inset: 0; margin: auto; width: 18px; height: 18px;
  border: 2px solid; border-right-color: #0000; border-radius: 50%; display: none }
.is-loading .spin { display: block; animation: turn .7s linear infinite }
```
⚠ `pointer-events` does not block Enter or Space — set `aria-busy`, guard the
handler. Reduced motion: pulse opacity, don't spin.
