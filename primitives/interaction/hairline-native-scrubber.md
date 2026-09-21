---
id: hairline-native-scrubber
category: interaction
tags: [interaction,accessibility,control,scrub,native,diagram]
axes: {energy: 2, density: 1, weight: 1, finish: 5}
cost: 1
seen: 5
requires: []
conflicts: []
completes: []
tension: []
---
A diagram that scrubs deserves a real `<input type=range>`, not a div with
pointer handlers: arrow keys, Home/End, page steps and a spoken value arrive
free. Then style it until it stops reading as a control — no track, a thumb
that is a 2–3px hairline the height of a tick — so it becomes the drawing's
playhead.

```css
.scrub { appearance: none; background: none; width: 100%; height: 24px }
.scrub::-webkit-slider-thumb { appearance: none; width: 2px; height: 14px;
  border-radius: 0; background: var(--ink) }
.scrub::-moz-range-thumb { width: 2px; height: 14px; border: 0 }
```
⚠ Thumb pseudo-elements cannot share a selector list — one comma and both
engines drop the rule. The 24px box is the target, not the hairline.

The thumb is not restricted to rectangles. `transform` applies to both engines'
thumb pseudo-elements, so a square rotated 45° gives a diamond marker with no
background image, no mask and no clipping — and it stays crisp at any zoom
where a bitmap would not. Size it by the diagonal rather than the side: a 15px
square reads about 21px wide once turned, which is the number that has to clear
the track. Keep the rotation off the track itself, which must stay axis-aligned
to measure.
```css
.scrub::-webkit-slider-thumb { appearance: none; width: 15px; height: 15px;
  border: 0; background: var(--accent); transform: rotate(45deg) }
```
⚠ A rotated thumb's hit area is still the unrotated box, so the corners of the
diamond are outside it. Non-rectangular thumbs want the track box taller —
24–32px — rather than a bigger mark.

Painted parts beside the input must use the thumb's geometry, not the raw
percentage. A thumb of width `w` travels only `track − w`, so its centre at
fraction `p` sits at `calc(p*100% + (.5 − p) * w)` — a fill drawn straight to
`p%` drifts up to `w/2` away from it, and the error is worst at the two ends
where it is most visible. Clamp any length built from that expression: leaving
air around the thumb takes it negative near zero.
```css
--at: calc(var(--p) * 100% + (.5 - var(--p)) * var(--thumb));
.fill { inline-size: max(0px, calc(var(--at) - var(--gap))) }
.mark { inset-inline-start: calc(var(--at) - var(--thumb) / 2) }
```
⚠ Transition the fill's size and the marker's offset together, over one
duration and one curve. Either alone lags the other by the whole duration and
the two visibly separate mid-drag.
