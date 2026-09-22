---
id: band-split-spectral-displacement
category: canvas
tags: [canvas,audio,audio-reactive,fft,generative,data]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A visual driven by one loudness value pulses; three bands make it speak. Split
the analyser's bins into low, mid and high, gain each more steeply — high bins
carry far less energy — and map each band to a different
*spatial* scale: lows swell the whole form, mids drive a slow travelling wave
across it, highs jitter individual points. Gains 1–2×, 2–3×, 3–5×.

```js
an.getByteFrequencyData(bins)
low  = follow(low,  Math.min(1, 1.5 * avg(bins, 1, 9)))
mid  = follow(mid,  Math.min(1, 2.4 * avg(bins, 9, 40)))
high = follow(high, Math.min(1, 4.0 * avg(bins, 40, 100)))
```
⚠ A cross-origin source without CORS and `crossOrigin="anonymous"` reads as
silence. Create the `AudioContext` on the play gesture, not at mount.
