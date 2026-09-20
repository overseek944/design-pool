---
id: eased-pointer-influence
category: canvas
tags: [shader,interaction,feel]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Never feed raw pointer state to a shader. Keep a `uMouseActive` float lerped
toward 0/1 and a smoothed `uMouse` — influence then fades in and out instead of
snapping, and the effect survives the pointer leaving the window.
