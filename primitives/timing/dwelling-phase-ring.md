---
id: dwelling-phase-ring
category: timing
tags: [timing,state,loop,choreography,architecture,demo]
axes: none
cost: 2
seen: 4
requires: []
conflicts: []
completes: [loop-gated-on-attention]
tension: [cue-list-on-looping-clock]
---
A looping demonstration written as a schedule of effects has to undo itself
before it can repeat. Write it as a ring: an ordered table of `{phase, dwell}`
where each phase is a complete authored state published on one attribute and the
stylesheet interpolates. Wrapping to index zero is then another state change,
with no teardown. Any phase can be the parked one, so reduced motion
and offscreen resolve to a named frame rather than a blank. Dwell 300–600ms for a
press, 1.2–1.8s for anything read, 2–4s on rest.
```js
const RING = [{p:'aim',d:700},{p:'press',d:360},{p:'open',d:500},{p:'rest',d:3000}]
const step = () => { el.dataset.phase = RING[i].p
  t = setTimeout(step, RING[i].d); i = (i + 1) % RING.length }
```
⚠ Every phase is held long enough to read, so each must be legible as a frame.
Keep transitions shorter than the dwell they land in, or phases smear.

Nest a second ring outside the first and one renderer plays several scripts:
when the phase index wraps, advance a scene index modulo a list of phase tables.
Nothing is per-scene except data, the seam between scenes is the same state
change as any other wrap, and a scene is added by appending a row. Carry any
positional value in the table as a percentage of the frame rather than pixels,
or the script drifts off its targets at every width it was not authored at.
```js
i + 1 < SCENES[s].ring.length ? setPhase(i + 1)
                              : (setScene((s + 1) % SCENES.length), setPhase(0))
```
⚠ Two rings means the outer period is the sum of the inner dwells — audit it,
or a four-scene loop takes a minute to return and nobody sees scene one twice.
