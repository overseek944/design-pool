---
id: octave-summed-edge-profile
category: canvas
tags: [canvas,generative,motion,noise,field,cheap]
axes: {energy: 2, density: 2, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A horizon, a wave crest or a ribbon edge needs an organic profile, not a noise
table. Sum three sines along the axis with amplitude halving and frequency
roughly doubling each term, and give each octave its own phase offset, its own
time coefficient and a sign — differing rates are what make the silhouette
morph in place instead of sliding past. Three terms is the whole budget: two
reads as a wave, four is indistinguishable from three.

```js
const edge = (x, t) => 22 * Math.sin(x / 118 + .70 * t)
                     + 12 * Math.sin(x / 61  - 1.10 * t + 1.7)
                     +  6 * Math.sin(x / 29  + 1.90 * t + 4.2)
```
⚠ Keep the wavelengths mutually incommensurate or the profile repeats visibly
within a minute. Amplitudes are in the field's own units — rescale them with
the element or the edge flattens as it widens.
