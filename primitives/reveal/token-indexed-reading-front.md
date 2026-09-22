---
id: token-indexed-reading-front
category: reveal
tags: [type,scroll,progress,reveal,colour]
axes: {energy: 2, density: 2, weight: 3, finish: 4}
cost: 2
seen: 10
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
Text that inks in as it is read cannot be a gradient sweep: a gradient fills by
geometry, a reader advances by line, and they disagree past the first line.
Split to tokens, map the block's rect to an integer index, light every token
under it. `color` alone changes — no layout, no layer, nothing to re-measure —
so hundreds of spans stay cheap and a frame touches one node. Front 0.8–0.9 to
0.3–0.4 viewport height, 0.08–0.15s each.

```css
.tok { color: rgb(from var(--ink) r g b / .18); transition: color .12s linear }
.tok.lit { color: var(--ink) }
```
⚠ Unlit tokens sit far under 4.5:1 — land the front before the block exits.
Wrap each word in a `nowrap` span before splitting to characters, or lines
break mid-word. Under reduced motion bail before splitting: the node stays
inked and findable.

Landing the front before the block exits is a tuning, and tuning does not cover
the block that is never scrubbed at all: a deep link, a restored scroll position
or one fast flick puts it above the viewport having received no frame, and it
holds its unlit value — body text far under 4.5:1, above the fold, permanently.
Complete it from the observer rather than the scroll handler, on the exit whose
rect has already passed the top.
```js
if (!e.isIntersecting && e.boundingClientRect.top < 0) light(e.target, 1)
```
⚠ Reload at an anchor below the block to see it — the failure is invisible to
anyone who scrolls in from the top, which is everyone testing it.

The objection to a gradient is about its scope, not about gradients: confine one
to a single `inline-block` token and the geometry it fills is that word, so the
front gains sub-token resolution — a wipe *through* each word rather than a
switch between two colours. Allocate each window by character count, not by
index, and long words take proportionally longer, which is what reading does.
```css
.tok { --fill: clamp(0%, calc((var(--p) - var(--start)) / var(--len) * 100%), 100%);
  display: inline-block; background: linear-gradient(90deg, var(--ink) var(--fill),
  var(--dim) var(--fill)); background-clip: text; color: transparent }
```
⚠ `color: transparent` is what the selection highlight and forced-colours mode
both read, so the text is unreadable in both. Restore a real `color` and drop
the gradient under `forced-colors: active` and `prefers-reduced-motion`.

Uncouple the sweep from progress and it stops meaning "read" and starts meaning
"not final". A slow gradient band looping through live text — the real words,
legible the whole time — marks a block as still being written far better than a
skeleton bar, which shows nothing and reserves the wrong height. Scope it to the
generated block and remove the class the moment the content settles. Band 8–16%
of the gradient, 2–3s per lap.
```css
.provisional p { background-image: linear-gradient(110deg, var(--dim) 0 42%,
  var(--ink) 50%, var(--dim) 58% 100%); background-size: 200% 200%;
  background-clip: text; color: transparent; animation: sweep 2.5s linear infinite }
```
⚠ The same `color: transparent` trap, now on text a reader is actively waiting
to read: under forced colours and in the selection highlight it is invisible,
and it stays that way for as long as generation runs. Ship the un-swept colour
under `forced-colors: active` and `prefers-reduced-motion`, where the block
should be plainly readable and merely marked.

Where the text is being *spoken*, the front belongs to the media clock, not to
scroll. Take word timestamps from the synthesis, read `currentTime` in a rAF
loop — `timeupdate` fires only 4–15 times a second and the fill visibly steps —
and advance by character within the current word. Across silence, interpolate
from the last word's end to the next word's start rather than holding: the fill
then glides through a pause instead of stalling and jumping.
```js
if (t < w.startMs && prev) n = prev.charEnd + (w.charStart - prev.charEnd) * (t - prev.endMs) / (w.startMs - prev.endMs)
else if (t < w.endMs)      n = w.charStart + Math.ceil((w.charEnd - w.charStart) * (t - w.startMs) / (w.endMs - w.startMs))
```
⚠ Render the plain, fully inked string whenever playback is stopped — the dim
tail is only legible as *not yet spoken* while audio is running.
