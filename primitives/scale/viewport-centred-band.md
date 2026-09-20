---
id: viewport-centred-band
category: scale
tags: [tokens,responsive,unit,layout,rhythm]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A hero that should sit optically centred but must not vanish on a short laptop:
express its surrounding space as one token — half the viewport height less half
the block's own height, clamped both ends. Above the clamp the block centres;
below it the token hits its floor and the page simply scrolls. No `100vh`
centring, no JS measurement, and it degrades the way you chose.

```css
--band: clamp(12px, calc(50dvh - 265px), 120px);   /* 265px ≈ half block */
.hero { padding-block: var(--band) }
```
⚠ `dvh` not `vh`, or the mobile URL bar retunes the centring mid-scroll. Where
the block's height is fluid, carry its `vw` term into the subtrahend
(`calc(50dvh - 486px + 8.5vw)`) or it drifts off-centre across the range.
Retune the constant per breakpoint — it is a measurement, not a scale step.
