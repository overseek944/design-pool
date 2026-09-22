---
id: evicting-stream-window
category: layout
tags: [stream,overflow,live-data,log,dom,performance]
axes: {energy: 3, density: 4, weight: 2, finish: 4}
cost: 2
seen: 8
requires: []
conflicts: []
completes: []
tension: []
---
An append-only stream in a scroll container grows without bound and fights
whoever is reading history. Where it is a *display* rather than a record, give
it no scroller at all: a fixed-height column stacking from the bottom, evicting
the oldest node past a cap of 6–12 rows. DOM, layout and memory then stay flat
at any arrival rate. Fade the top edge so the departing row dissolves rather
than being cut.

```css
.window { block-size: 10.5rem; overflow: clip; display: flex;
  flex-direction: column; justify-content: flex-end;
  mask-image: linear-gradient(180deg, transparent 0, #000 18%) }
/* while (win.children.length > CAP) win.removeChild(win.firstChild) */
```
⚠ Evicted rows are gone — nothing announces them, nothing scrolls back — so the
full record must be reachable elsewhere. Keep the window out of the tab order
rather than leaving a dead scroll region behind.
