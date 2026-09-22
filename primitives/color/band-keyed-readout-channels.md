---
id: band-keyed-readout-channels
category: color
tags: [color,tokens,state,dataviz,correctness]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: [status-triad-tokens]
tension: []
---
A readout showing a measurement *and* a judgement of it carries one continuous
value and one discrete band. Threshold the value separately per channel — fill
interpolating, word from one map, backdrop from another — and around a boundary
they disagree: the panel reads "strong" in amber. Resolve the band once per
update and let colour, label and backdrop read that single key. Geometry stays
on the raw value, so the shape travels between bands while the verdict snaps.
Three or four bands; past five nobody holds the vocabulary.

```js
const band = v >= 3.6 ? 'green' : v >= 2.2 ? 'amber' : 'red'   // one key
label.textContent = WORD[band]; label.style.color = INK[band]
for (const b of BANDS) layer[b].style.opacity = +(b === band)  // all pre-mounted
```
⚠ Pre-mount every band's backdrop or the first crossing decodes mid-animation.
Hue is not the reading: the band owes its word, and the value in text beside it.
