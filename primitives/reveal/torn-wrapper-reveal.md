---
id: torn-wrapper-reveal
category: reveal
tags: [reveal,entrance,sequence,keyframes,reward]
axes: {energy: 5, density: 2, weight: 3, finish: 3}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Something *given* rather than loaded earns an opening: destroy the wrapper on
screen instead of retreating it. Four beats on one clock — a decaying shake for
anticipation, a glow charging under it, one scaling flash, then two halves
leaving the frame in opposite directions with a little rotation. Start the
contents' entrance beneath the flash so the stage is never empty. Shake 0.4–0.7s
falling from 3px to under 1px, charge 0.6–1s, flash 0.25–0.4s, halves 0.3–0.5s
to ±110–140%.

```css
@keyframes burst  { 0% { scale: .3; opacity: 0 } 40% { opacity: 1 }
                    to { scale: 2.5; opacity: 0 } }
@keyframes tear-l { to { translate: -120% 0; rotate: -15deg; opacity: 0 } }
```
⚠ Departed halves still take clicks and tab stops — remove them on
`animationend`, never park them at opacity 0. Skippable on press, and off
entirely under reduced motion, where the contents are simply already there.
