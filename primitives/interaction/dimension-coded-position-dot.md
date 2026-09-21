---
id: dimension-coded-position-dot
category: interaction
tags: [interaction,state,indicator,accessibility,carousel]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 1
seen: 10
requires: []
conflicts: []
completes: []
tension: []
---
Let the active item in a position indicator change *size*, not only colour. A
dot elongating into a capsule at 5–8× its width is legible without hue and
against a ground whose contrast you do not control — and its length is then free
to carry progress *within* the step, not only which step.

```css
.dot { inline-size: 3px; block-size: 3px; border-radius: 999px;
       transition: inline-size .3s }
.dot[aria-current] { inline-size: 22px; background: var(--ink) }
```
⚠ Animating width reflows the row and nudges every other dot; fix the container
width and animate `flex-basis` instead. `scaleX` avoids the reflow but stretches
the radius into an ellipse. Dots are a position, never a label — keep a count
beside them.

For a row of steps that advances itself, promote the indicator to the hairline
already above each step: `scaleX()` from `transform-origin: left` over the
step's dwell, past steps full and future ones dimmed to .35–.5. A rule has no
radius to distort, so the `scaleX` objection above does not apply.

Let that rail's animation *be* the timer rather than mirror one. `animation:
fill var(--dwell) linear forwards` with the advance fired from `animationend`
cannot desync from what the reader sees, and suspending is one
`animation-play-state: paused` on the same element — where a `setTimeout` beside
a CSS transition drifts the moment the tab is backgrounded, because timers
throttle and animations do not.
⚠ `animationend` bubbles from descendants too; check the target, and drop the
listener when the step changes or a stale rail advances the sequence twice.

The same trick makes a one-shot signal self-clearing. A value that just changed
— a balance, a count, a saved state — flashes by gaining a `data-` flag; let
the element drop the flag in its own `animationend` and the duration lives only
in the stylesheet, where retuning it needs no matching constant in script. A
second change arriving mid-flash removes and re-adds the flag rather than
stacking a timer on a timer.
```jsx
<b data-flash={flashing || undefined} onAnimationEnd={() => setFlashing(false)} />
```

When a step's dwell is a real asset's duration, let the asset be the clock
rather than restating it as a CSS time. Drive each rail's width from
`currentTime / duration` and fire the advance from `ended`: the indicator cannot
disagree with what is playing, a slow decode holds the bar instead of running
past it, and retiming means re-cutting the clip and nothing else. Transition the
width at 100–200ms linear to absorb the event's coarse cadence.
```jsx
<video onTimeUpdate={e => setP(e.currentTarget.currentTime / e.currentTarget.duration)}
       onEnded={() => setI(i => (i + 1) % n)} />
```
⚠ `timeupdate` fires every ~250ms, not per frame — without the transition the
bar visibly steps. A rail row given `role="tab"` owes arrow keys and a roving
`tabindex`, or it is a tablist in name only.

The absorbing transition generalises beyond a media clock: any fill driven by a
coarse event — `timeupdate` at ~250ms, a scroll handler under a fast wheel —
steps visibly without one, and lags behind the input with too much. 80–200ms
linear, scaled to the event's cadence: 80–100ms where the source fires near
frame rate and only stutters, 150–200ms where it genuinely arrives four times a
second. Never eased — an ease on a repeating small delta reads as hesitation.
```css
.fill { transition: block-size 80ms linear }   /* scroll-driven */
```

On a rail where position *is* the value — a span on a time track, a mark on a
scale — the size channel is only free across the axis. Grow the mark
perpendicular to it, 1.25–1.5×, and never along it: a hover that widens a 0.6s
span makes it read as a second longer, so the emphasis has falsified the datum
it was meant to point at. Take the second channel from a 1px ring instead of
from length.
```css
.span:hover, .span.is-current { transform: scaleY(1.4);
  box-shadow: 0 0 0 1px var(--ground) }
```
⚠ The grown mark clips against the track's own overflow on the outer lanes —
reserve the extra height in the lane's box rather than in the mark's.
