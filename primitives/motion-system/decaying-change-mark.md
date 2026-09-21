---
id: decaying-change-mark
category: motion-system
tags: [motion-system,feedback,live-data,emphasis]
axes: {energy: 3, density: 1, weight: 2, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Marking a value that just changed with styling it keeps turns an event into a
category: an hour later the row still looks special and no one knows why. Give
the mark an envelope that peaks and returns to exactly the resting style — a
wash, a ring or a glow that is gone by the last frame. Authored CSS is never
touched, so nothing accumulates over a hundred updates and no cleanup pass has
to run. Peak at 60–75% of a 0.4–0.9s pass.

```css
@keyframes flashed { from { background: var(--wash) } to { background: transparent } }
@keyframes settled { 0%, to { text-shadow: 0 0 0 transparent }
                     70%   { text-shadow: 0 0 18px var(--glow) } }
```
⚠ A flash is invisible to anyone not looking at that moment and silent to a
screen reader: announce the change in a live region as well. Cap how many run
at once — a dozen at a time reads as noise, not as news.

Where the value has a sign, the mark should carry it: two mirrored passes, one
per direction, so the flash says *which way* rather than only that something
moved. Hold the peak through the first 25–40% before decaying — a half-second
mark that starts fading immediately is never caught on a fast feed. End on
`inherit` rather than a resting colour and the same pair composes over a row
that is already hovered, selected or muted.
```css
@keyframes up { 0%, 35% { color: var(--pos); text-shadow: 0 0 10px var(--pos-dim) }
                to     { color: inherit; text-shadow: none } }
```
⚠ Direction encoded as hue alone is the red-green pair by default, and it is
gone by the next frame either way — put the sign or an arrow in the text too.
