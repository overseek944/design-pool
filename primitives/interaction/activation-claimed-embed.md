---
id: activation-claimed-embed
category: interaction
tags: [embed,iframe,pointer-events,activation,accessibility,correctness]
axes: none
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
An embed rendered live on a page most readers only scroll past swallows their
first tap, their wheel and their focus before they have decided they want it.
Show it running and keep it inert: `pointer-events: none` at rest, a real button
over it carrying the invitation, and the claim released 150–400ms after the
pointer leaves — long enough that clipping a corner does not drop it mid-use.
The reader chooses when the region stops being a picture.

```jsx
<iframe style={{ pointerEvents: claimed ? 'auto' : 'none' }} … />
{!claimed && <button onClick={() => setClaimed(true)}>Explore it live</button>}
```
⚠ Releasing on pointer exit strands a keyboard or touch reader inside — pair it
with `Escape` and a visible exit. Until it is claimed the button carries the
only accessible name the region has.
