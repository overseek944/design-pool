---
id: crop-panned-backdrop-scrub
category: scroll
tags: [scroll,parallax,media,scrub,surface,performance]
axes: {energy: 2, density: 1, weight: 3, finish: 4}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Scrub a backdrop's `background-position` instead of translating it. The layer
never leaves its box — no oversized child to mask, no overshoot derived from
container height — and the endpoints are stated in the picture's own composition
rather than in pixels. Travel 55–75% of the crop range; past that the subject
leaves frame at one end.

```css
.plate { background: url(x.jpg) 50% var(--pan, 15%) / cover }
```
⚠ The pan range *is* the crop overflow, so a picture whose aspect matches its
box has none and the effect silently does nothing — force headroom with
`background-size: auto 125–150%` on the pan axis — the higher end where the
layer is also scaled or inset past its box, so no edge can enter frame. It repaints rather than
composites: decorative layers only, and hold the still under reduced motion.
