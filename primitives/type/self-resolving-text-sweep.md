---
id: self-resolving-text-sweep
category: type
tags: [type,gradient,entrance,currentcolor,reveal]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 1
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
A one-shot sweep through `background-clip: text` normally needs cleanup: when it
ends, something must strip the transparent fill or the heading is left painted by
a dead gradient. Build the resting colour into the gradient instead —
`currentColor` across the leading third, the chroma band mid-strip, transparent
behind — at 300% width, and run `background-position` from 100% to 0 with
`forwards`. The end frame is plain inherited text. No listener, no class removal,
no state to unwind. Band 8–25% of the strip; 0.6–1.4s.

```css
.sweep { -webkit-text-fill-color: transparent; color: #0000;
  background: linear-gradient(90deg, currentColor 0 33%, var(--c1) 40%,
    var(--c2) 50%, var(--c3) 60%, #0000 67%) 100% 0 / 300% 100%;
  background-clip: text; animation: sweep 1s ease-in-out forwards }
@keyframes sweep { to { background-position: 0 0 } }
```
⚠ Under `reduce` the animation must not simply be cancelled — `forwards` never
applies and the text sits on the transparent tail, invisible. Restore
`-webkit-text-fill-color: currentColor` and drop the image.

A *looping* sweep says something different, and the timing function decides
what. Run the same gradient infinitely under `steps(N)` and the highlight
advances in visible increments instead of gliding — it stops reading as satin
and starts reading as output being produced, which is the right register for
text still arriving from a machine. Bind it to the streaming state only and
drop it the moment the run is final. N 24–64 over 1.5–2.5s; below ~16 the
chop reads as a dropped frame.
```css
.streaming { background: linear-gradient(90deg, #777 10%, #eee 45%, #777 80%)
    0 0 / 220% 100%; background-clip: text; color: transparent;
  animation: shimmer 2s steps(48) infinite }
@keyframes shimmer { to { background-position: -120% 0 } }
```
⚠ `color: transparent` with a loop has no end frame to fall back to — under
`reduce`, and on the final token, restore the inherited colour and remove the
image, or the text is left painted by a stopped gradient.

On a known solid ground the loop can skip `background-clip` entirely: leave the
text in its own muted ink and run a pseudo-element band — transparent, the
ground colour at 80–95% alpha, transparent — across it under `overflow:
hidden`. The ink never goes transparent, so there is no stopped-gradient state
to recover from; removing the class is the whole reset. Band 30–60% of the
width, 1.2–2s linear.
```css
.pending { position: relative; overflow: hidden; color: var(--fg-muted) }
.pending::after { content: ""; position: absolute; inset: 0 auto 0 0; width: 50%;
  background: linear-gradient(90deg, #0000, rgb(255 255 255 / .9), #0000);
  animation: band 1.5s linear infinite }
@keyframes band { from { translate: -100% } to { translate: 300% } }
```
⚠ The band paints the ground colour, so it shows as a stripe on any image or
tint behind the text — only for a flat surface you control.
