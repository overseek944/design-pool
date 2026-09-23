---
id: content-cleared-shell-morph
category: motion-system
tags: [morph, sequencing, panel, spring, transition, exit]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A surface that reshapes between modes — pill to panel — smears if its contents
and its geometry move together. Order them: contents leave on a short monotone
exit, the shell's size and radius transitions wait out exactly that exit, then
spring; returning contents are delayed into the back half of the spring. Exit
60–120ms, shell 350–550ms, contents in at 30–50% of the shell.

```css
.shell { transition: width var(--shape) var(--spring) var(--exit),
  height var(--shape) var(--spring) var(--exit), border-radius var(--shape) var(--spring) var(--exit) }
.shell > * { transition: opacity var(--exit) ease-in }
.open > * { transition-delay: calc(var(--exit) + var(--shape) * .4) }
```
⚠ Animating width/height lays out every frame — keep the shell's subtree small or contain it.

Where the contents must stay legible through the move — a live readout, a
visual the reader is watching — defocus them in place instead of clearing
them: drop to 0.5–0.65 opacity and 1–3px blur on the morph's start event,
restore on its end, on a 250–400ms curve. The eye reads the shell as the thing
moving and the contents as held.
```css
.shell[data-morphing] > * { opacity: .55; filter: blur(2px) }
.shell > * { transition: opacity .35s var(--ease), filter .35s var(--ease) }
```
⚠ A blurred subtree repaints every frame of the morph — add `contain: layout
paint` to it, and under `reduce` drop the blur and keep only the fade.
