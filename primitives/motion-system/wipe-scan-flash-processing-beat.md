---
id: wipe-scan-flash-processing-beat
category: motion-system
tags: [processing, scan, sequence, demo, mock, clip-path, keyframes, loading]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A spinner says "wait", never "reading this". Stage processing on the input
itself: it arrives by a top-down `clip-path` wipe, a thin gradient bar crosses
its height, a flash washes the frame as the bar lands, then the output shows.
Remount the bar each cycle to replay. Wipe 0.8–1.6s, scan 0.9–1.6s, flash
0.5–0.8s peaking at 0.6–0.9.

```css
@keyframes wipe { from { clip-path: inset(0 0 100%) } }
@keyframes scan { to { top: 100% } }
.bar { position: absolute; top: 0; inset-inline: 0; height: 2px;
       animation: scan 1.2s ease-out forwards }
```
⚠ `top` lays out per frame — fine on a thumbnail, not a panel. Under reduced
motion drop bar and flash; show the result.
