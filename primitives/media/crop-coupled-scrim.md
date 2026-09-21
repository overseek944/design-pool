---
id: crop-coupled-scrim
category: media
tags: [media,video,legibility,overlay,accessibility,responsive]
axes: none
cost: 1
seen: 6
requires: []
conflicts: []
completes: []
tension: []
---
Footage behind a headline crops differently at every width, so a scrim tuned
once is wrong everywhere else. Two values move together: `object-position`
holds the subject in frame as the crop narrows, and the overlay's alpha rises
on the side the copy occupies — a narrow viewport puts text over the busiest
part of the picture. Roughly +0.2–0.35 alpha across the range.

```css
.shot  { object-fit: cover; object-position: 58% 50% }
.scrim { background: linear-gradient(90deg, rgb(0 0 0/var(--a,.9)), transparent 74%) }
@media (min-width: 40rem) {
  .shot { object-position: center } .scrim { --a: .58 } }
```
⚠ Measure contrast at both ends and against the brightest frame — a loop that
passes on frame one can fail mid-play.

The gradient's *angle* is a layout fact, not an art-direction one. Where copy
sits beside the picture the scrim runs along the inline axis; at the width where
the copy stacks above it, the same scrim must be restated block-wise or it
darkens the edge nobody is reading over. Stack a second, shorter gradient from
the page ground at the trailing edge — 15–25% — and the frame fuses into the
section instead of ending on a seam.
```css
.scrim { background: linear-gradient(90deg, #000c, #0002 60%, transparent 80%),
                     linear-gradient(0deg, var(--ground), transparent 21%) }
@media (width <= 50rem) { .scrim { background:
  linear-gradient(180deg, var(--ground), transparent 30%),
  linear-gradient(0deg, var(--ground), transparent 20%) } }
```
⚠ The two layers compound where they meet — measure the corner they share, not
the average, and against the brightest frame.
