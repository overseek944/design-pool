---
id: expanding-shadow-beacon
category: timing
tags: [motion,indicator,status,ambient,glow]
axes: {energy: 2, density: 1, weight: 2, finish: 4}
cost: 1
seen: 23
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
column of them is free. Peak 1.3–2× (below 1.5× on a disc under 8px), trough alpha .35–.5, period 2–3s.
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

Where the level is a continuous value rather than a keyframe — a shader
uniform, a driven custom property — two decaying impulses read as a heartbeat
where one reads as a blink. An exponential decay times a half-rectified sine is
the thump; a second at 60–75% of a human inter-beat delay and half the
amplitude is what names it. Ride both on a slow breath with a floor, and couple
size to brightness: let the glow's decay constant *fall* at the peak so the
halo widens as it brightens, the way a real source does.
```js
const thump = (d, a) => a * Math.exp(-7 * d) * Math.max(Math.sin(d * 14), 0)
const p = t % 2.5, breath = smoothstep(-1, 1, Math.sin(t * 1.2))
const level = .12 + .88 * breath + thump(p, .3) + thump(Math.max(p - .18, 0), .15)
```
⚠ The floor is what stops a dark frame reading as a dead renderer, and the
thump is what stops the breath reading as a fade — neither substitutes for the
other. Under `reduce`, hold the floor and drop both.

Fired once by an action rather than by a state, the ring is an echo: proof the
press landed. Fix its width and scale the ring instead — .5–.7× out to 1.5–1.9×
over 0.25–0.4s — and let opacity *rise* to its peak at 15–25% before dying, so
the ring detaches from the control instead of being born glued to its edge.
Peak alpha .25–.4; brighter reads as an error.
```css
.echo { box-shadow: 0 0 0 2px var(--echo, currentColor); pointer-events: none;
  animation: echo .32s cubic-bezier(.23,1,.32,1) forwards }
@keyframes echo { 0% { opacity: 0; transform: scale(.6) } 20% { opacity: .35 }
                  to { opacity: 0; transform: scale(1.7) } }
```
⚠ A repeat press on a live class does not restart it — remount the node or key
it per press, or rapid taps get one echo.

The legible form of the breath: a still outlined frame — a 12–16px square
turned 45°, a 1–2px accent border and a fixed outer glow — with only a 4–6px
core inside it pulsing opacity 1 to 0.2–0.3 over 1.4–2s. The frame holds the
position constantly; the core alone reports liveness, so a field of them never
reads as failing at the trough.

On a call-to-action, stop the ring on `:hover` and `:focus-visible`. Once the
pointer or focus arrives, the call has been answered, and a ring that keeps
pulsing under the cursor reads as nagging. Use a 2–3s period and a 5–8px spread.
