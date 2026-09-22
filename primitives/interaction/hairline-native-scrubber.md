---
id: hairline-native-scrubber
category: interaction
tags: [interaction,accessibility,control,scrub,native,diagram]
axes: {energy: 2, density: 1, weight: 1, finish: 5}
cost: 1
seen: 9
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

Filling the track behind the thumb is two different mechanisms, and only one is
free of the drift above. Firefox measures `::-moz-range-progress` itself, so it
is exact for free; WebKit and Blink have no such pseudo-element and want a
hard-stopped gradient on `::-webkit-slider-runnable-track`, fed from one custom
property the `input` handler writes. Give that stop the thumb-corrected position
rather than the raw percentage or the two engines disagree by up to half a thumb
at the ends. Track 4–8px, thumb 16–22px.
```css
.s::-webkit-slider-runnable-track { block-size: var(--track);
  background: linear-gradient(90deg, var(--fill) var(--at), var(--rail) var(--at)) }
.s::-moz-range-progress { block-size: var(--track); background: var(--fill) }
```
⚠ The webkit thumb needs `margin-block-start: calc((var(--track) - var(--thumb)) / 2)`
to sit on the track it now paints; Firefox centres its own. `90deg` is physical —
the control reverses in RTL and the gradient does not, so mirror the stop there.

The input need not be the visible mark at all. Stretched transparent across a
whole media box — `inset: 0`, full size, `opacity: 0` — it becomes a drag
surface for a reveal that has no control of its own, and the handle is painted
separately at the same fraction with `pointer-events: none`. Pointer, touch and
every key binding still arrive, and the box keeps whatever cursor the gesture
deserves.
```css
.surface > input[type=range] { position: absolute; inset: 0; width: 100%;
  height: 100%; margin: 0; opacity: 0; cursor: ew-resize }
```
⚠ An invisible input is still the default thumb width, so its value tops out
before the pointer reaches either edge. Correct the painted handle with the
thumb geometry above, or force the thumb to 1px so raw percentage is true.

A square thumb on a tinted track separates itself with a border in the *page
ground* colour, not a lighter ring: the 2px of ground cuts the thumb out of the
rail so the rail can sit at 30–40% of the accent and the thumb at full strength
with no shadow needed. Thumb 14–18px, shrinking a step on narrow screens.
```css
.s { background: color-mix(in srgb, var(--accent) 35%, transparent); height: 3px }
.s::-webkit-slider-thumb { appearance: none; width: 16px; height: 16px;
  background: var(--accent); border: 2px solid var(--ground) }
```
