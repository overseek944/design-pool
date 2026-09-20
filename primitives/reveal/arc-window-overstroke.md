---
id: arc-window-overstroke
category: reveal
tags: [draw-on,highlight,canvas,pulse,path]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A path being drawn reads as inert when the settled trail and the growing tip
look identical. Make the tip a second pass over the same path, clipped to an
arc-length window ending at the head, 3–5px wider and at full alpha. The window
is the whole primitive — slide one along a finished path and the identical call
becomes a travelling pulse, which is how a completed composition stays alive
without visibly looping. Window 25–45px, pulse 400–800px/s, one every 1.5–4s.

```js
stroke(window(e, 0, e.progress), e.width, e.alpha)
stroke(window(e, e.progress - 32, e.progress), e.width + 4, 1)
```
⚠ Butt caps on the window — a round cap overhangs the head by half its width
and blunts the tip. Keep pulses sparse; past one a second on a dense network it
reads as a loading state.
