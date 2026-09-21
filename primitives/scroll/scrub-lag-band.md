---
id: scrub-lag-band
category: scroll
tags: [scroll,motion,feel]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 2
seen: 11
requires: []
conflicts: []
completes: []
tension: []
---
`scrub` as a *number* adds catch-up lag in seconds and is what separates
expensive-feeling scroll from stiff. **.3–.6** is the usable band: `.3` for
tight, mechanical tracking; `.6` for weighted and cinematic. `scrub: true`
(zero lag) feels stuck to the finger; above ~1s feels broken.

Variant — the same feel without a library. Smooth in a single rAF loop with a
frame-rate-independent coefficient: `k = 1 - Math.exp(-dt / τ)` where `τ` is the
lag divided by 3, giving ~95% catch-up after that many seconds. A fixed
per-frame factor is not equivalent; it makes the lag a function of refresh rate,
so the same page feels tight at 60Hz and sluggish at 120.
```js
const k = 1 - Math.exp(-dt / (LAG * 1000 / 3))
disp += (target - disp) * k
```

Where the smoothed quantity is cyclic — a longitude, a hue, a heading — the
same loop takes the long way round whenever the target crosses the wrap: 355°
to 5° eases backwards through 180 instead of forwards through 10. Wrap the
*difference* into ±half a turn before applying the coefficient, and keep the
accumulator unwrapped so it never fights its own modulo.
```js
const d = ((target - cur + 540) % 360) - 180      // shortest arc
cur += d * (1 - Math.exp(-dt / tau))
```

An exponential approach never arrives, so the loop that runs it never ends: a
page at rest keeps a rAF alive forever, a frame's work per frame, for a
difference in the fourth decimal. Snap and stop instead — below an epsilon,
assign the target outright and decline to reschedule, letting the next scroll
event restart the loop. Epsilon at about 1/1000 of the driven range.
```js
disp += (target - disp) * k
if (Math.abs(target - disp) < EPS) { disp = target; return }   // no reschedule
raf = requestAnimationFrame(tick)
```
⚠ Clear the stored timestamp on the way out or the first delta after the pause
is the whole pause, and the value jumps the gap it was smoothing.

Parameterise that coefficient by *half-life* rather than by τ: `k = 1 - 0.5^(dt
/ h)` is the same curve with a number that can be specified and reviewed — half
the distance closed in `h` milliseconds — where τ is a constant nobody reads off
a design. The decay of something fading out is the same expression without the
complement. Half-lives 80–160ms for tracking, 400–700ms for a value that should
visibly linger.
```js
const k = 1 - Math.pow(.5, dt / H)                 // H in the same units as dt
```

Clearing the timestamp on the way out only covers a *deliberate* pause. A GC
stall, a restored background tab or a blocked main thread delivers a delta of
seconds through a path that never exited, and the value closes the whole gap in
one frame. Clamp the delta itself at the top of the loop — 30–60ms, two to four
frames — and each degrades to a slightly fast catch-up. A per-frame
displacement ceiling does the same where the range makes even a clamped delta
visible.
```js
const dt = Math.min((now - last) / 1000, .05); last = now       // real stamp
disp += Math.sign(d) * Math.min(Math.abs(d), Math.abs(d) * k, MAX_RATE * dt)
```
⚠ Clamp the delta, never the accumulator — advance `last` to the true timestamp
or two long frames in a row each measure from a stale base and the loop falls
permanently behind the input.
