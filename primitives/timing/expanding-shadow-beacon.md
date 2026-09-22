---
id: expanding-shadow-beacon
category: timing
tags: [motion,indicator,status,ambient,glow]
axes: {energy: 2, density: 1, weight: 2, finish: 4}
cost: 1
seen: 7
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

The two readings above are not exclusive. Dip the disc's own `opacity` on the
same keyframes as the ring and the mark reads as *spending* light to emit it
rather than as two effects sharing a node — the source dims as the ring leaves
and recovers as it dies. Opacity composites, so the dip is free where the spread
is not, and it is what keeps the dot legible when the ring is too faint to see
on a busy ground. Trough 0.35–0.5; below that the dot disappears and the
indicator reads as broken rather than alive.
```css
@keyframes beacon { 0%, 100% { opacity: 1; box-shadow: 0 0 0 0 var(--beam) }
  50% { opacity: .4; box-shadow: 0 0 0 6px transparent } }
```
⚠ With the trough at 50% the ring gets no parked tail, so hold the period at the
top of the status range — 2–3s — or the rings overlap and the dip is all that
reads.

Where the page carries more than one or two of these, the repaint the spread
costs is the whole argument against it, and the compositor form is a different
reading rather than the same one made cheap: scale the disc itself and fade it,
and the mark *breathes* instead of emitting — the source is what grows, so
there is no ring leaving it. `transform` and `opacity` both composite, so a
column of them is free. Peak 1.6–2×, trough alpha .35–.5, period 2–3s.
```css
.dot { animation: breathe 2.4s infinite }
@keyframes breathe { 0%, 100% { transform: scale(1); opacity: 1 }
                     50% { transform: scale(1.8); opacity: .45 } }
```
⚠ The disc is the animation, so at the trough there is no solid core left and
the indicator can read as failing rather than live. Where the mark must stay
legible throughout, put the breath on a pseudo-element and leave the dot still.

Better than counting iterations: retire the cue on the event it was cueing.
Hold it behind a delay long enough that anyone already going to act never sees
it — 1.5–2.5s over a poster or an idle control — then let the state class that
marks the action taken kill the animation outright. A count expires on a
schedule and can still nag someone who has acted; this cannot, and it re-arms
for free whenever the state goes back — paused, closed, reset — with no
persisted flag to keep.
```css
.cue::after { animation: beacon 3.6s ease-out 1.8s infinite }
.player:is(.is-playing, .is-scrubbing) .cue::after { animation: none }
```
⚠ Gate it on the same state the rest of the chrome reads, or the ring outlives
the thing it was pointing at.
