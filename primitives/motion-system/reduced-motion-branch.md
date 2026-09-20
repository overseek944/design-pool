---
id: reduced-motion-branch
category: motion-system
tags: [motion,accessibility,required]
axes: none
cost: 1
seen: 21
requires: []
conflicts: []
completes: []
tension: []
---
Branch at setup, not per-animation: if the user prefers reduced motion, set end
states directly and skip building timelines entirely. Cheaper than guarding
every tween, and guarantees nothing is left mid-transform.
```js
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.set(targets, { opacity: 1, y: 0, clearProps: "all" }); return
}
```

Variant — for motion that lives in CSS, invert the query: declare the animation
inside `@media (prefers-reduced-motion: no-preference)` rather than undoing it
inside `reduce`. Still is then the default state and a new animation cannot ship
without an accessibility branch, because it has nowhere else to go.

Variant — where a transition must stay in one place, keep the declaration and
neutralise it centrally: redefine the duration *tokens* to `0s` under `reduce`.
Every consumer reading `var(--dur-nav)` goes still at once, and the reduced
branch is three lines rather than one per component.

The query can flip mid-session. Read `matches` once at setup and you miss the
user reaching for the OS switch — listen for `change` and re-run the branch.

Variant — for a blanket reset over code you do not own, collapse rather than
cancel: `animation-duration: 1ms`, `animation-iteration-count: 1`,
`transition-duration: 1ms`. `animation: none` cancels outright, so `animationend`
never fires and a script waiting on it stalls with content still hidden. The
iteration cap is the half that stops infinite loops.

For a sequence that *cycles* — steps appearing one at a time — neither the first
nor the last frame is the right still state. Elect one and pin it: every step
`opacity: 0`, the elected one `1`, and any property mid-transit written to rest
(`clip-path: inset(0)`, `stroke-dashoffset: 0`). `animation: none` alone leaves
each element at its authored 0%, which for a wipe is invisible.

For a continuously-rendered surface the still state is a *drawn* frame: render
once with every time term at rest and never re-request the loop. Skipping the
draw leaves a blank canvas.

A blanket reset that only collapses durations still strands any system whose
resting state is *paused* or delayed — a marquee waiting on a play flag, a
cascade holding at 0% behind `animation-delay`. Force both in the same reset:
`animation-play-state: running !important` and `animation-delay: 0s !important`.

A scrubbed sequence of *scenes* has a better still state than one elected frame:
keep the scroll driving it and quantise the progress value onto the scene stops.
Every scene stays reachable and only the interpolation between them is gone —
the argument survives, the movement does not. Bias the snap slightly ahead of
each boundary so a scene commits as its copy arrives rather than after it.
```js
const stops = [0, 1.3, 2.4, 3.4]                    // one per authored scene
const p = reduced ? stops[clamp(Math.floor(raw + .15), 0, stops.length - 1)] : raw
```

A procedural scene has no authored end state to set — the resting composition is
whatever the simulation converges to. Run it rather than skipping it: under
`reduce`, step the same update function to completion inside a bounded loop,
then draw one frame and never request another. The still image is then exactly
the one a reader who waited would have seen, with no second hand-built
"static version" to drift out of sync with the real one.
```js
for (let i = 0; i < 200 && !settled(); i++) step(FIXED_DT)
draw(); return
```
⚠ Bound the loop by iteration count as well as by the settled test — a rule that
never converges otherwise hangs the main thread instead of playing too long.

Where the sequence is *authored* rather than simulated, the still state is the
schedule fast-forwarded: walk every cue in order, calling each immediately with
no waiting, then draw once and never request a frame. The reader sees the final
composition — every stage resolved, every log line present — and it cannot
drift from the animated version because it is the same list of cues.
```js
cues.forEach(c => c.fn())      // no clock, no waiting
draw()
```
⚠ Only safe when the cues are idempotent end-state writes. A cue that toggles,
appends or increments runs the whole timeline's worth of side effects in one
tick and lands somewhere the animation never reaches.
