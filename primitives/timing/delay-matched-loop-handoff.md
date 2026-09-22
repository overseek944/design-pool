---
id: delay-matched-loop-handoff
category: timing
tags: [timing,transition,loop,idle,state,css-only]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An element that expands into a state and should then idle there has two motions
to join, and scripting the seam costs a `transitionend` listener that fires per
property and not at all when interrupted. Declare both in one rule and set
`animation-delay` to the transition's duration: the loop arms at the state
change, waits out the travel, and takes over on the frame it lands. Start the
keyframes at the settled value. Delay within ~50ms of the duration.

```css
.panel      { flex-grow: 1; transition: flex-grow 3.5s cubic-bezier(.05,.4,.2,1) }
.panel:hover{ flex-grow: 6; animation: breathe 10s ease-in-out 3.5s infinite }
@keyframes breathe { 0%, to { flex-grow: 6 } 25% { flex-grow: 5.2 } 75% { flex-grow: 5.6 } }
```
⚠ Leaving the state mid-travel cancels the animation before it starts, which is
the wanted behaviour — but re-entering restarts the whole delay, so a reader
moving in and out never sees the idle. Keep the transition short where the loop
is the point.
