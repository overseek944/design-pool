---
id: cue-list-on-looping-clock
category: timing
tags: [motion,timing,loop,architecture,correctness]
axes: none
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A multi-beat scripted sequence built from chained timers cannot be paused,
seeked or restarted without bookkeeping, and every pause leaks a handle. Hold
the beats as data instead — `{at, fn}` in time order — and run one cursor
against a single accumulating clock: fire while the next cue is due, reset
cursor and clock together at the period. Pausing is then simply not requesting
frames, with nothing to clear; retiming is one number. Periods 8–30s read as a
demonstration, under 5s as a blink.
```js
for (; i < cues.length && cues[i].at <= t; i++) cues[i].fn()
if ((t += Math.min(dt, .05)) >= PERIOD) { t = 0; i = 0; reset() }
```
⚠ The reset must return every element a cue touched to its start state — a cue
list is a schedule, not a state machine, and it will not undo itself.

Where the cues are generated rather than authored, their durations will not sum
to the period and the ring closes on a visible jump. Draw random durations
until the total first exceeds the period, then absorb the overshoot by
shortening the last cue — and if that would push it under its own legibility
floor, drop it and lengthen its predecessor instead. Every generated sequence
then fills exactly one period, so a grid of independently-seeded ones stays
locked to one clock. Floor each cue at 60–75% of its drawn duration.
```js
while (total < PERIOD) { const c = make(); cues.push(c); total += c.dur }
const over = total - PERIOD, last = cues.at(-1)
if (over > last.dur - last.min) { cues.pop(); cues.at(-1).dur += PERIOD - (total - last.dur) }
else last.dur -= over
```
⚠ Give each participant its own random phase offset into the period, or every
one of them restarts on the same frame and the field pulses.

Where every beat's effect is a property of the current time rather than an event,
drop the cursor entirely: derive the whole scene from `t` on each frame. A typed
count is `floor((t - at) / perChar)`, a phase is a comparison, a reveal is a
toggle. Nothing accumulated, so there is nothing to reset — wrapping, pausing,
seeking and the reduced-motion still frame are the same call with a different
`t`, and that answers the undo problem above. Use where the beats are states,
not side effects.
```js
const t = (now - start) % PERIOD
el.dataset.phase = t < ANSWER_AT ? 'ask' : 'answer'
CUES.forEach(({ at, node }) => node.classList.toggle('in', t >= at))
```
⚠ Every write must be a no-op when unchanged — compare before assigning text, or
a per-frame `textContent` write destroys selection and re-announces to a screen
reader. The derivation must also be total: a `t` falling between two beats has
to name a state rather than leave the last one standing by accident.
