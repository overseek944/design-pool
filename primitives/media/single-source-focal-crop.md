---
id: single-source-focal-crop
category: media
tags: [media,responsive,performance,detail]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One photograph can hold a headline at every width without a second crop. Keep
the file and change what is in frame: `object-position` moves the focal point,
and `transform: scale()` against a chosen origin decides how much of the subject
is cut. A composition whose quiet region sits left on a wide screen wants that
region pulled toward 60–70% and the frame tightened 8–15% at the narrow end. One
decode, one cache entry, no `<picture>` fork.

```css
.shot { object-fit: cover; object-position: 65% center;
        transform: scale(1.12); transform-origin: top }
@media (min-width: 40rem) { .shot { object-position: center; transform: none } }
```
⚠ Whatever the alt text names must survive the tightest frame.
