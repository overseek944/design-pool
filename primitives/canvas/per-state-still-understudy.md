---
id: per-state-still-understudy
category: canvas
tags: [canvas,media,perf,progressive-enhancement,3d,fallback,accessibility]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A heavy renderer deferred behind one poster freezes the figure at a single
state, and every control beside it is dead until someone activates. Pre-render
a still per state instead — one per tab, selection or range end —
and bind the real state machine to the still path. Selection, labels and copy
all work before a renderer exists; activating swaps in a live view reading the
same state, and a device that refuses it keeps the whole figure rather than an
inert button. 6–12 states; past that the stills outweigh the renderer they
stand in for.

```jsx
<img src={`/stage/${sel}.webp`} className={live ? 'faded' : ''} alt={alt[sel]} />
<div ref={host} aria-hidden="true" hidden={!live} />
{!live && <button onClick={start}>{loading ? 'Loading…' : 'Explore interactively'}</button>}
```
⚠ Announce the closed path in a `role="status"` line. Removing the control
silently leaves that reader unsure what they missed.
