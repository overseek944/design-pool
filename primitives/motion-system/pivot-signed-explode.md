---
id: pivot-signed-explode
category: motion-system
tags: [explode,assembly,stack,progress,figure,scrub]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A stack opening to show what it is made of must separate *about* something, or
it reads as the whole assembly sliding. Elect a pivot layer and offset every
other by its **signed** distance from that index, scaled by one progress
scalar. The stack splits both ways and the pivot holds its place, so the layer
under discussion stays put. Closed pitch 16–24px, open 80–120px — under 60 the
plates touch and the view is loose, not exploded.

```js
layers.forEach((el, i) =>
  el.style.transform = `translateY(${(i - PIVOT) * (pitch + open * p)}px)`)
```
⚠ Elect the pivot for what it means, not as the middle index. Reserve the open
height up front — the separation is transform-only, but a figure sized to the
closed stack lets the open one overlap its neighbours.

As an ambient loop it needs no script: give each layer its signed offset as a
custom property and let one shared keyframe travel to `var(--shift)` and back,
so the stack breathes about its pivot on one clock.
Offsets pointing toward the pivot collapse the stack; away from it, open it. Offset step 12–24px, cycle 4–6s with
a hold at both ends.
```css
.layer { animation: breathe 5s cubic-bezier(.45,0,.25,1) infinite }
.layer:nth-child(1) { --shift: 32px } .layer:nth-child(5) { --shift: -32px }
@keyframes breathe { 0%,15%,to { translate: 0 } 45%,65% { translate: 0 var(--shift) } }
```
⚠ Put the loop on `translate`, not `transform`, when the plates already carry a
shear (`rotate() skew()` for a flat isometric plane) — or the keyframe wipes it.
