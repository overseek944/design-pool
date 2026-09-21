---
id: idle-scroll-cue
category: interaction
tags: [scroll,affordance,feedback,motion]
axes: {energy: 2, density: 1, weight: 2, finish: 4}
cost: 1
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A page whose motion is entirely scroll-driven stops when the reader stops, and a
page that has stopped reads as broken rather than as waiting. After 1.5–2.5s of
stillness, surface one small fixed cue naming the action; any scroll takes it
away. Suppress it within 100–150px of the bottom, where the instruction would be
a lie and the cue would flash back on over the footer.
```js
const d = document.documentElement
const more = () => d.scrollHeight - (scrollY + innerHeight) > 120
const arm = () => { show(false); clearTimeout(t)
  t = setTimeout(() => more() && show(true), 1800) }
```
⚠ Measure `documentElement`, not `body` — a body carrying the page background
does not track pin spacers reliably.

The mirror policy uses the same idle timer inverted: a readout that exists only
*while* the reader moves — depth, percentage, section — and retires after
600ms–1.2s of stillness. It reports rather than instructs, so it may sit over
content that a persistent cue could not, and it never needs the
near-the-bottom suppression. Update it from a single rAF-coalesced scroll
handler and mark it `aria-hidden`; a per-frame figure is noise to a screen
reader.
