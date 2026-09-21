---
id: expanding-shadow-beacon
category: timing
tags: [motion,indicator,status,ambient,glow]
axes: {energy: 2, density: 1, weight: 2, finish: 4}
cost: 1
seen: 2
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: [stepped-two-frame-blink]
---
A mark that blinks *reports* a state; one that throws a ring outward and lets
it die *emits* one, which is what a live status wants. Animate
`box-shadow` spread alone on a 6–9px disc — 0 out to 8–12px while the alpha
falls to nothing — so the ring costs no pseudo-element, no scaled child and no
box of its own. Park the last 25–35% of the period at zero, or rings tread on
each other and the dot reads as a spinner. Period 2–3s; under 1.5s, an alarm.

```css
.dot { animation: beacon 2.4s ease-out infinite }
@keyframes beacon { 0% { box-shadow: 0 0 0 0 var(--beam) }
  70%, 100% { box-shadow: 0 0 0 9px transparent } }
```
⚠ Spread animates by repaint, never on the compositor — one dot is free, a
column of them is not. Under `reduce` it stops rather than slows.

A ring that must be noticed and then forgotten is the same mechanism with a
count on it. Drop `infinite` for 2–4 iterations behind a 0.4–1s delay: the delay
lets the element arrive and settle so the first ring throws against a still
page, and the count lets the cue expire instead of becoming furniture. An
indefinite pulse on a control the reader has already found is a permanent
distraction, and it is the shape most motion-sensitivity complaints take.
Period 1.6–2.2s here rather than the status range; faster reads as an error.
```css
.cue { animation: beacon 1.8s cubic-bezier(.4,0,.6,1) .6s 3 }
```
⚠ It fires once per mount, so a cue for something the reader must actually do
needs a persisted flag to re-arm it — otherwise it nags on every visit and
teaches them to ignore it.
