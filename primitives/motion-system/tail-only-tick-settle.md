---
id: tail-only-tick-settle
category: motion-system
tags: [numerals, counter, data, motion, readout, reveal]
axes: {energy: 2, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [width-stable-changing-number]
tension: []
---
A figure counted up from zero is wrong for most of its animation. Count only
the tail: start at 99.2–99.7% of the target and write 6–10 values at 70–120ms,
so the leading digits never move and only the last few tick. The number is true
to its magnitude from the first frame and reads as a live meter catching up.

```js
el.style.minWidth = el.getBoundingClientRect().width + 'px'
for (let i = 1; i <= 8; i++) setTimeout(() => el.textContent =
  (i === 8 ? n : Math.round(n * (.9942 + .0058 * i / 8))).toLocaleString(), i * 90)
```
⚠ Pointless under ~1,000 — the tail is the whole number. Skip under reduced motion.
