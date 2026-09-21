---
id: blend-window-channel-strip
category: color
tags: [color,data,series,encoding,interpolation,two-tone]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [pattern-encoded-series]
tension: []
---
One strip can carry which of two sources owns each point along it. Switching the
token hard at every boundary reads as a stacked chart — two series sharing an
axis. Build ownership as a 0/1 array in run lengths, box-blur it, then
interpolate the two tokens by the blurred value: each run holds its colour flat
and only the handovers ramp, which reads as one signal changing hands. Runs
15–40 samples, window ±2–4.

```js
const b = ch.map((_, i) => {                 // ch: 0/1 per sample, w = 2..4
  let s = 0, n = 0
  for (let k = -w; k <= w; k++) if (ch[i + k] != null) { s += ch[i + k], n++ }
  return s / n })
bar[i].style.background = mix(A, B, b[i])    // oklab, not a hex lerp
```
⚠ Keep the window well under the shortest run or every segment blends and the
strip is one muddy gradient. Two hues cannot carry identity alone — legend it,
and give each source a second cue.
