---
id: underlaid-first-panel-track
category: scroll
tags: [scroll,pin,sticky,sequence,layout]
axes: {energy: 3, density: 2, weight: 3, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A lateral run of N full-viewport panels needs only an (N−1)×100vw track. Pin
the first as a sticky underlay on a lower layer and stage the track fully past
the trailing edge: entry costs no travel, and each later panel arrives over
what is already framed. Scrub by a fraction of the track's own width and resize
needs no handler.

```css
.floor { position: sticky; top: 0; height: 100vh; z-index: 1 }
.track { position: sticky; top: 0; width: 200vw; display: flex; z-index: 2 }
```
⚠ A percentage of the track's own width lands flush at one track:viewport
ratio only; at any other the run opens or closes mid-panel. Track panels need
an opaque ground.
