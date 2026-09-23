---
id: debounced-save-acknowledgement
category: interaction
tags: [interaction,form,input,feedback,state,autosave,status]
axes: {energy: 1, density: 1, weight: 1, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: [mounted-empty-status-slot]
tension: []
---

A field that saves itself needs a status that is quiet while typing and brief
once done. Every keystroke restarts one timer; when it fires the label reads
"Saving…", flips to "Saved ✓", then fades to nothing. Clear both timers on each
keystroke so a stale "Saved" never lands mid-edit. Debounce 600–1200ms, hold
the confirmation 1–2.5s, fade 200–400ms on opacity only.

```js
input.oninput = () => { clearTimeout(a); clearTimeout(b); set('saving')
  a = setTimeout(() => { set('saved'); b = setTimeout(() => set('idle'), 1500) }, 1000) }
```
⚠ Say "Saved" only after the write resolves, never on a timer alone. Reserve the
slot's width or the row shifts.
