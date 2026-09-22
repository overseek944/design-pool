---
id: event-sourced-audio-control
category: media
tags: [media,audio,state,correctness,accessibility,interaction]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A play control that flips its own boolean on click desynchronises from the
sound the first time anything else touches it: `play()` is rejected without a
gesture, the system pauses on a disconnected output, and `ended` is a third
state no click produces. Let the element's `play`, `pause` and `ended` events
write the label and let the handler only ask. Build it on first press rather
than at mount — `preload="metadata"` then costs a range request, not the file.
If nothing has started in 300–600ms, say *loading*.

```js
;['play','pause','ended'].forEach(t => a.addEventListener(t, e => setState(e.type)))
btn.onclick = () => a.paused
  ? (a.ended && (a.currentTime = 0), a.play().catch(() => {}))
  : a.pause()
```
⚠ An unhandled rejection leaves the button reading *pause* over silence. There
is no `prefers-reduced-motion` for sound, so nothing may start unpressed, and
the state must reach a label or `aria-pressed`, never colour alone.

Several independent players on one page need a single owner, not a pause-all
broadcast. Keep a module-level slot holding the stop callback of whichever
player last claimed it; claiming calls the previous holder's stop first, and
stopping releases only if the slot still holds *your* callback. Each player
then resets its own label, progress and visuals through the same path its own
stop button uses.
```js
let owner = null
export const claim = stop => { if (owner && owner !== stop) owner(); owner = stop }
export const release = stop => { if (owner === stop) owner = null }
```
⚠ Pass a stable function reference (a ref-wrapped callback), or identity
comparison fails on re-render and a player releases a slot it no longer owns.
