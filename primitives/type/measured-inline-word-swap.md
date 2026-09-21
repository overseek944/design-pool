---
id: measured-inline-word-swap
category: type
tags: [type,motion,headline,correctness]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A word cycling inside a running headline relays out the whole line on every
swap. Measure it first: hold a hidden copy of the incoming word in the same
face and size, read its width, and transition the inline container to that
width as the new word rises into the slot. The sentence closes around each
word instead of jumping. Re-measure on resize and on `document.fonts.ready` —
the fallback face sizes differently and the first swap lands wrong. 2.5–4.5s
per word, 0.5–0.6s for the move.
```css
.roll { display: inline-block; overflow: hidden; height: 1.4em;
        transition: width .52s var(--ease-out) }
```
⚠ `width` animates on the layout thread every frame; affordable only for one
small element. Give the line `aria-live="off"` or it is re-read on each turn.

Let the outgoing word finish fading well before it finishes moving: opacity to
zero by 35–45% of its exit keyframe while the transform runs the full 100%. Out
and in can then overlap on one clock without two words being legible in the same
slot, and the exit reads as quick while its travel stays unhurried.
```css
@keyframes word-out { 0% { opacity: 1 } 38% { opacity: 0 }
                      to { opacity: 0; translate: 0 -.5em } }
```
⚠ Both words must occupy the one slot — stack them in a single grid cell or
position them absolutely inside the measured box, or the incoming word lays out
after the outgoing one and the line jumps anyway.
