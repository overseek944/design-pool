---
id: dimension-coded-position-dot
category: interaction
tags: [interaction,state,indicator,accessibility,carousel]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Let the active item in a position indicator change *size*, not only colour. A
dot elongating into a capsule at 5–8× its width is legible without hue and
against a ground whose contrast you do not control — and its length is then free
to carry progress *within* the step, not only which step.

```css
.dot { inline-size: 3px; block-size: 3px; border-radius: 999px;
       transition: inline-size .3s }
.dot[aria-current] { inline-size: 22px; background: var(--ink) }
```
⚠ Animating width reflows the row and nudges every other dot; fix the container
width and animate `flex-basis` instead. `scaleX` avoids the reflow but stretches
the radius into an ellipse. Dots are a position, never a label — keep a count
beside them.

For a row of steps that advances itself, promote the indicator to the hairline
already above each step: `scaleX()` from `transform-origin: left` over the
step's dwell, past steps full and future ones dimmed to .35–.5. A rule has no
radius to distort, so the `scaleX` objection above does not apply.
