---
id: width-stable-changing-number
category: type
tags: [numerals,data,motion,correctness]
axes: {energy: 2, density: 3, weight: 3, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A figure that animates or streams needs two guarantees, and tabular numerals
only give one. `tabular-nums` equalises digit advances so `1.7` and `4.8` sit
still; it does nothing when the digit *count* changes and `9.9` becomes `10.0`,
which relays out the whole row mid-count. Reserve the final width in `ch` and
fix the decimals at the source.
```css
.readout { font-variant-numeric: tabular-nums;
           min-inline-size: var(--digits, 5ch); text-align: end }
```
⚠ `ch` is the advance of `0` — correct only for the face actually rendering, so
reserve after the webfont loads or the fallback sets the floor. Give the element
`aria-live="off"`; a per-frame value read aloud is unusable.
