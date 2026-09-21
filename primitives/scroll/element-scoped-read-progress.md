---
id: element-scoped-read-progress
category: scroll
tags: [scroll,progress,correctness,observer,reading]
axes: none
cost: 2
seen: 8
requires: []
conflicts: []
completes: []
tension: []
---
Reading progress belongs to the article, not the document. Measured against the
tracked element's own box, headers and footers stop counting as distance the
reader must cover and the bar fills at the last line. Two failures come
free: content shorter than the viewport divides by a negative, and late images
change the height after first paint. Draw the rail short — 40–60vh at 2–3px —
so it reads as a gauge, not a page border.
```js
const b = el.getBoundingClientRect(), run = b.height - innerHeight
const f = run > 0 ? Math.min(1, Math.max(0, -b.top / run)) : 0
new ResizeObserver(update).observe(el)
```
⚠ Without the `run > 0` branch a short page pins the indicator at zero forever.

Measure against the viewport's *midline* rather than its top when the rail
tracks which step is being read instead of how much is left. Progress is then
`(innerHeight / 2 - top) / height`, which needs no `run > 0` guard because the
divisor is the element's own height and can never go negative — the short-page
failure disappears with the formula. A step commits as it reaches the middle of
the screen, which is where the reader is looking.
```js
const b = el.getBoundingClientRect()
const f = clamp01((innerHeight * .5 - b.top) / b.height)
```
⚠ The rail keeps reporting once its section leaves; drop it to 0.3–0.4 opacity
when the tracked box is entirely above or below the viewport, or a full bar
hangs beside unrelated content.

Where the article scrolls inside its own box rather than the document, the rect
maths disappears: progress is `scrollTop / (scrollHeight - clientHeight)` read
straight off the scroller, with no viewport term and no `run > 0` guard, and it
stays correct while the shell around it — brand, rail, the gauge itself — never
moves. Add `overscroll-behavior-y: contain` so reaching the end does not hand the
gesture to the document behind.
```css
.panel { overflow-y: auto; overscroll-behavior-y: contain }
.rail > span { transform: scaleX(var(--p)); transform-origin: 0 }
```
⚠ A scroll container is not keyboard-reachable by default — give it
`tabindex="0"` and an accessible name, or the article cannot be paged without a
pointer.

Subtract a hold tail from the runway and the finished state dwells. Progress
that reaches 1 exactly as the tracked box leaves gives the end of the sequence a
single frame before it scrolls away — the payoff is the part nobody sees. Take a
viewport or more off the denominator instead: the scrub completes early and the
remaining scroll is spent holding the last frame under a reader who is still
moving. Tail 1–1.5 viewports.
```js
const run = b.height - innerHeight - innerHeight * 1.2
const f = run > 0 ? clamp01(-b.top / run) : 1
```
⚠ The tail is height the section must actually have — a stage shorter than
viewport plus tail collapses the runway to nothing and the whole sequence snaps.

An element *shorter* than the viewport falls into the `run > 0` branch above and
never moves — which is exactly the case when the progress is driving an effect
rather than reporting a position. Measure the approach instead of the traverse:
define the window in fractions of the viewport, independent of the element's own
height, so a 200px band and a 2000px one both ramp over the same travel. Start
when the top crosses 35–45% of the viewport and finish over the next 50–70%.
```js
const vh = innerHeight || 1
const t = Math.min(1, Math.max(0, (.4 * vh - el.getBoundingClientRect().top) / (.6 * vh)))
```
⚠ This never reaches 0 or 1 by arithmetic alone — clamp both ends or a shader
uniform receives values outside its range on a fast flick.

The rail does not have to be a separate gauge. Where sections are already
divided by a full-bleed hairline, draw the progress as that same hairline in the
next rule tier up, pinned to the section's own top edge and grown by width: the
page gains no new furniture, and a reader parses it as the section filling in
rather than as an indicator to consult. It costs the section a positioning
context and nothing else. Hairline 1px, the progress tier one step darker than
the resting rule.
```css
.section { position: relative }
.section > .fill { position: absolute; inset-block-start: 0; inset-inline-start: 0;
  block-size: 1px; background: var(--rule-strong); inline-size: calc(var(--p) * 100%) }
```
⚠ Animating `inline-size` relayouts every frame — drive `transform: scaleX()`
from a `transform-origin` at the inline start instead once the section holds
more than a few nodes. It reports nothing a reader needs: `aria-hidden`.

The probe line is a range, not the midpoint. Anywhere from 0.5 to 0.75 of the
viewport height works, and the lower the line sits the more of the step the
reader has actually passed before it commits — 0.7–0.75 for a sequence whose
marks report *read*, nearer 0.5 where they report *arrived*. Below 0.75 the
last item can never reach the line on a short page, so clamp the fraction and
let the final step commit at the document end.
