---
id: crop-coupled-scrim
category: media
tags: [media,video,legibility,overlay,accessibility,responsive]
axes: none
cost: 1
seen: 4
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
